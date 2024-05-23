import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { program } from "commander";
import { normalizeInputPaths, normalizeOutputPath } from "./utils.js";
import consola from "consola";

const DEFAULT_OUTPUT_NAME = "tinified";

const options = program
  .option(
    "-i, --input <input...>",
    "input path list, The total file size cannot exceed 5M"
  )
  .option("-o, --output <output>", "output folder", ".")
  .option(
    "-r, --rename <name>",
    "the output file is renamed",
    DEFAULT_OUTPUT_NAME
  )
  .parse(process.argv)
  .opts();

consola.start("Compression in progress, please wait...");
const inputPaths = normalizeInputPaths(options.input);
const outputPath = normalizeOutputPath(options.output);
const newName = options.rename;

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://tinypng.com/");
  const inputEle = await page.waitForSelector(
    "#upload-dropbox-zone > input[type=file]"
  );
  await inputEle.uploadFile(...inputPaths);
  const downloadBtn = await page.waitForSelector(
    "#__next > div > main > div.uexekpa > div.upload__output-container > div.c1uwtt8h > div > div.button-wrapper.b1g7mude > div.button-wrapper.action-button.s1e4q9ty > button"
  );
  await downloadBtn.evaluateHandle((el) => el.click());
  const session = await page.target().createCDPSession();
  await session.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: outputPath,
  });
  const outputName = `${newName}-${Date.now()}`;
  const _outputPath = path.resolve(outputPath, `./${outputName}.zip`);
  const watcher = fs.watch(outputPath, (type) => {
    if (type == "change") {
      if (
        fs.existsSync(path.resolve(outputPath, `./${DEFAULT_OUTPUT_NAME}.zip`))
      ) {
        watcher.close();
        fs.renameSync(
          path.resolve(outputPath, `./${DEFAULT_OUTPUT_NAME}.zip`),
          _outputPath
        );
        consola.success(`Compressed successfully. output: ${_outputPath}`);
        browser.close();
      }
    }
  });
}

main();
