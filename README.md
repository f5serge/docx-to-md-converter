# DOCX to Markdown Converter

This is a simple tool to convert DOCX files to Markdown. It's useful for converting documents to a format that can be easily read and edited in a VSCode or other text editor.

## Installation

Before you can use this tool, you need to install it. Here's how you can do that:

```sh
git clone <repo-url>
```

After cloning the repository, you can install the tool by running the following command:

```sh
npm install -g
```

## Usage

To convert a DOCX file to Markdown, you can use the following command:

```sh
docx-to-md input.docx [output.md]
```

- `input.docx` is the path to the DOCX file you want to convert.
- `[output.md]` is an optional argument. If provided, the converted Markdown will be saved to this file. If not provided, the output will be printed to the console.

### Examples

To convert `input.docx` and save the output to `output.md`:

```sh
docx-to-md input.docx output.md
```

## Features

- Convert DOCX files to Markdown
- Save the image files in the DOCX file to a folder and update the image links in the Markdown file

## Contributing

Contributions are always welcome! Please read the [contributing guide](CONTRIBUTING.md) first.

## License

This project is licensed under the [MIT License](LICENSE).
