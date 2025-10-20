// CommonJS + fs/promises
const fs = require("fs/promises");

async function readFile(path, encoding = 'utf8') {
  return fs.readFile(path, { encoding });
}

async function writeFile(path, content, encoding = 'utf8') {
  await fs.writeFile(path, content, { encoding });
}

module.exports = { readFile, writeFile };
