import fs from "fs";
import path from "path";

export const cwd = process.cwd();
export function getAllImagePaths(folderPath) {
  const imagePaths = [];
  const filesPath = fs.readdirSync(folderPath);
  filesPath.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      imagePaths.push(...getAllImagePaths(filePath));
    } else if (isImageFile(file) && stats.isFile()) {
      imagePaths.push(filePath);
    }
  });
  return imagePaths;
}

export function isImageFile(filename) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

export function normalizeInputPaths(inputPaths) {
  const imagesPaths = [];
  inputPaths.forEach((item) => {
    if (!path.isAbsolute(item)) {
      item = path.resolve(cwd, item);
    }
    const stats = fs.statSync(item);
    if (stats.isDirectory()) {
      imagesPaths.push(...getAllImagePaths(item));
    } else if (stats.isFile() && isImageFile(item)) {
      imagesPaths.push(item);
    }
  });
  return Array.from(new Set(imagesPaths));
}

export function normalizeOutputPath(outputPath) {
  if(path.isAbsolute(outputPath)) {
    return outputPath;
  }
  return path.resolve(cwd, outputPath);
}
