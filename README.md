# tinypng

Command line tool for compressing images with TinyPNG without requiring a key; Smart WebP, PNG and JPEG Compression for Faster Websites

无需申请 KEY, 可直接使用[TinyPng](https://tinypng.com/)压缩图片的命令行工具。

## Installation

```bash
npm install -g tinypng-plus-cli
```

## Usage

```bash
> tinypng-plus-cli -h

Usage: index [options]

Options:
  -i, --input <input...>  input path list, The total file size cannot exceed 5M
  -o, --output <output>   output folder (default: ".")
  -r, --rename <name>     the output file is renamed (default: "tinified")
  -h, --help              display help for command
```

### Example

```bash
tinypng-plus-cli -i .\test2.jpg .\images d:\static\images
```

## TODO

边界情况处理
