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
  -i, --input <input...>  input path list
  -o, --output <output>   output folder (default: ".")
  -r, --rename <name>     the output file is renamed (default: "tinified")
  -h, --help              display help for command
```

### Example

```bash
tinypng-plus-cli -i .\test1.jpg .\test2.jpg
```

## TODO

1. 相对路径与绝对路径支持
2. 支持输入可以是文件夹
3. loading展示效果
4. 边界情况处理
