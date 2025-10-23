// read-file.js
const fs = require('fs');
const path = require('path');

function readAndPrintFile() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(content);
}

module.exports = { readAndPrintFile };
