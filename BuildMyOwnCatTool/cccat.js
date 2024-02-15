import fs from "fs";

function cccat(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(content);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

if (process.argv.length !== 3) {
  console.error(`Usage: node cccat.js <file_path>`);
  process.exit(1);
}

const filePath = process.argv[2];
cccat(filePath);
