// challenge.js
const { greet } = require('./greeting');
const { printColorfulMessage } = require('./colorful-message');
const { readAndPrintFile } = require('./read-file');

function runChallenge() {
  const user = process.argv[2] || 'World';

  console.log('=== Greeting ===');
  console.log(greet(user));
  console.log();

  console.log('=== Colorful Message ===');
  printColorfulMessage(`Welcome, ${user}! You are running the challenge.`);
  console.log();

  console.log('=== File Content ===');
  readAndPrintFile();
  console.log('====================');
}

runChallenge();
