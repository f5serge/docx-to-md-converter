#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as mammoth from 'mammoth';
import TurndownService from 'turndown';
import { program } from 'commander';
import { v4 as uuidv4 } from 'uuid';

program
  .version('1.0.0')
  .description('Convert DOCX to Markdown with image extraction and table formatting')
  .argument('<input>', 'Input DOCX file')
  .argument('[output]', 'Output Markdown file (default: same as input with .md extension)')
  .action(async (input, output) => {
    try {
      await convertDocxToMarkdown(input, output);
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);

function createMarkdownTable(table: HTMLTableElement): string {
  const rows = Array.from(table.rows);
  if (rows.length === 0) return '';

  const headers = Array.from(rows[0].cells).map(cell => cell.textContent?.trim() || '');
  const markdownRows = rows.slice(1).map(row => 
    Array.from(row.cells).map(cell => cell.textContent?.trim() || '')
  );

  let markdown = '| ' + headers.join(' | ') + ' |\n';
  markdown += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
  markdownRows.forEach(row => {
    markdown += '| ' + row.join(' | ') + ' |\n';
  });

  return markdown;
}

async function convertDocxToMarkdown(inputFile: string, outputFile?: string) {
  if (!outputFile) {
    outputFile = path.join(path.dirname(inputFile), `${path.basename(inputFile, '.docx')}.md`);
  }

  const imageDir = path.join(path.dirname(outputFile), 'images');
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const result = await mammoth.convertToHtml({ path: inputFile }, {
    convertImage: mammoth.images.imgElement(async (image) => {
      const buffer = await image.read();
      const extension = image.contentType.split('/')[1];
      const imageName = `image-${uuidv4()}.${extension}`;
      const imagePath = path.join(imageDir, imageName);
      await fs.promises.writeFile(imagePath, buffer);
      return { src: `images/${imageName}` };
    })
  });

  let html = result.value;

  // Convert HTML to Markdown
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });

  // Custom rule for tables
  turndownService.addRule('table', {
    filter: 'table',
    replacement: function(content, node) {
      return '\n\n' + createMarkdownTable(node as HTMLTableElement) + '\n\n';
    }
  });

  let markdown = turndownService.turndown(html);

  await fs.promises.writeFile(outputFile, markdown);
  console.log(`Conversion complete. Output saved to ${outputFile}`);
}