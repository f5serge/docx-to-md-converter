# DOCX to Markdown Converter

This is a simple tool to convert DOCX files to Markdown. It's useful for converting documents to a format that can be easily read and edited in VSCode or other text editors.

## Installation

Before you can use this tool, you need to install it. Here's how you can do that:

```sh
git clone <repo-url>
```

After cloning the repository, navigate to the project directory and install the dependencies:

```sh
npm install
```

## Usage

To convert a DOCX file to Markdown, you can use the following command:

```sh
node index.js input.docx [output.md]
```

- `input.docx` is the path to the DOCX file you want to convert.
- `[output.md]` is an optional argument. If provided, the converted Markdown will be saved to this file. If not provided, the output will be saved to a file with the same name as the input but with a `.md` extension.

### Examples

To convert `input.docx` and save the output to `output.md`:

```sh
node index.js input.docx output.md
```

To convert `input.docx` and save the output to a file with the same name in the same directory:

```sh
node index.js input.docx
```

## Features

- Convert DOCX files to Markdown
- Extract and save images from DOCX files to an `images` folder, updating image links in the Markdown file
- Format tables in DOCX files to Markdown tables

## Code Overview

### Main Script

The main script is `index.js`, which includes the following key functions:

- `createMarkdownTable`: Converts HTML tables to Markdown tables.
- `convertDocxToMarkdown`: The main function that handles the conversion process from DOCX to Markdown, including image extraction and HTML to Markdown conversion using Turndown.

### Dependencies

- `mammoth`: Library for converting DOCX files to HTML.
- `TurndownService`: Library for converting HTML to Markdown.
- `commander`: Library for building command-line interfaces.
- `uuid`: Library for generating unique identifiers.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out if you have any questions or need further assistance with this tool. Enjoy converting your DOCX files to Markdown!