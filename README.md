# tinypng

使用[TinyPng](https://tinypng.com/)压缩图片的命令行工具。

## Installation

```bash
npm install -g tinypng
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
