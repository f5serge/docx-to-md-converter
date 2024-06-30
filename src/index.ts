#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as mammoth from 'mammoth';
import TurndownService from 'turndown';
import { program } from 'commander';
import { v4 as uuidv4 } from 'uuid';

program
  .version('1.0.0')
  .description('Convert DOCX to Markdown with image extraction')
  .argument('<input>', 'Input DOCX file')
  .argument('[output]', 'Output Markdown file (default: output.md)', 'output.md')
  .action(async (input, output = 'output.md') => {
    try {
      await convertDocxToMarkdown(input, output);
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);

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
      // Generate a unique file name for each image
      const imageName = `image-${uuidv4()}.${extension}`;
      const imagePath = path.join(imageDir, imageName);
      await fs.promises.writeFile(imagePath, buffer);
      return { src: `images/${imageName}` };
    })
  });

  let html = result.value;

  // Convert HTML to Markdown
  const turndownService = new TurndownService();
  let markdown = turndownService.turndown(html);

  await fs.promises.writeFile(outputFile, markdown);
  console.log(`Conversion complete. Output saved to ${outputFile}`);
}
