import fs from "fs";
import readline from "readline";

const VERSION = 1.10;

function cccat(source, currentLineNumber) {
  try {
    if (source === '-') {
      // Read from standard input
      const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });

      if (currentLineNumber === 0) {
        r1.on("line", (line) => {
          console.log(line);
        });
      } else {
        r1.on("line", (line) => {
          console.log(`${currentLineNumber}. ${line}`);
          currentLineNumber = currentLineNumber + 1;
        })
      }

      r1.on("close", () => {
        process.exit(0);
      });
    } else {
      // Read from file 
      if (currentLineNumber === 0) {
        const content = fs.readFileSync(source, 'utf-8').split('\n');
        content.forEach(line => {
          if (line) {
            console.log(line);
          }
        })
      } else {
        const content = fs.readFileSync(source, 'utf-8').split('\n');
        content.forEach((line) => {
          if (line) {
            console.log(`${currentLineNumber} ${line}`);
            currentLineNumber = currentLineNumber + 1;
          }
        })
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

function cccatMultipleFiles(files, currentLineNumber) {
  try {
    for (let file of files) {
      if (file === "-n") continue;

      if (currentLineNumber === 0) {
        const content = fs.readFileSync(file, 'utf-8').split('\n');
        content.forEach(line => {
          if (line) {
            console.log(line);
          }
        })
      } else {
        const content = fs.readFileSync(file, 'utf-8').split('\n');
        content.forEach(line => {
          if (line) {
            console.log(`${currentLineNumber} ${line}`);
            currentLineNumber = currentLineNumber + 1;
          }
        })
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

if (process.argv.length < 3) {
  console.error(`Usage: node cccat.js <file_paths> <options>`);
  process.exit(1);
}

function printVersion() {
  console.log(`cccat (cat clone) ${VERSION}`);
  console.log();
  console.log(`Written by Rahul Dey`);
}

function printHelp() {
  console.log("Usage: node cccat [FILE]...[OPTION]")
  console.log("Concatenate FILE(s) to standard output. [Clone of cat command from linux]");
  console.log();
  console.log("When FILE is -, read standard input.");
  console.log();
  console.log("-n          number all output lines");
  console.log("--version   output version information and exit");
  console.log("--help      display this help and exit");
  console.log();
  console.log("Examples:")
  console.log(" node cccat        Copy standard input to standard output.");
  console.log(" node cccat file   Output file's contents");
}

const source = process.argv.slice(2);

if (source[source.length - 1] === "--help" || source[0] === "--help") {
  printHelp();
}
else if (source[source.length - 1] === "--version" || source[0] === "--version") {
  printVersion();
}
else if (source[source.length - 1] === "-n") {
  if (source.length === 1) {
    cccat("-", 1);
  } else if (source.length === 2) {
    cccat(source[0], 1);
  } else {
    cccatMultipleFiles(source, 1);
  }
}
else if (source.length === 1) {
  cccat(source[0], 0);
} else {
  cccatMultipleFiles(source, 0);
}
