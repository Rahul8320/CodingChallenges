import fs from "fs";
import readline from "readline";

function cccat(source) {
  try {
    if (source === '-') {
      // Read from standard input
      const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });

      r1.on("line", (line) => {
        console.log(line);
      });

      r1.on("close", () => {
        process.exit(0);
      });
    } else {
      // Read from file 
      const content = fs.readFileSync(source, 'utf-8');
      console.log(content);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

if (process.argv.length !== 3) {
  console.error(`Usage: node cccat.js <file_path>`);
  process.exit(1);
}

const source = process.argv[2];
cccat(source);
