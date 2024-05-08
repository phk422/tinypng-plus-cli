import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { program } from "commander";

const DEFAULT_OUTPUT_NAME = "tinified";

const options = program
  .option("-i, --input <input...>", "input path list")
  .option("-o, --output <output>", "output folder", ".")
  .option(
    "-r, --rename <name>",
    "the output file is renamed",
    DEFAULT_OUTPUT_NAME
  )
  .parse(process.argv)
  .opts();

const cwd = process.cwd();
const inputPaths = options.input.map((input) => path.resolve(cwd, input));
const outputPath = path.resolve(cwd, options.output);
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
    "#__next > div > main > div.uexekpa > div.upload__footer > div.s1uwtt8h > div.button-wrapper.b1g7mude > div:nth-child(4) > button"
  );
  await downloadBtn.evaluateHandle((el) => el.click());
  const session = await page.target().createCDPSession();
  await session.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: outputPath,
  });
  const watcher = fs.watch(outputPath, (type) => {
    if (type == "change") {
      if (fs.existsSync(path.resolve(outputPath, `./${DEFAULT_OUTPUT_NAME}.zip`))) {
        watcher.close();
        if (DEFAULT_OUTPUT_NAME !== newName) {
          fs.renameSync(
            path.resolve(outputPath, `./${DEFAULT_OUTPUT_NAME}.zip`),
            path.resolve(outputPath, `./${newName}.zip`)
          );
        }
        browser.close();
      }
    }
  });
}

main();
