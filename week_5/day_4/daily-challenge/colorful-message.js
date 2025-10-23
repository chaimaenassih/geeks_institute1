// colorful-message.js
const chalk = require('chalk');

function printColorfulMessage(message = 'This is a colorful message!') {
  console.log(chalk.green(message));
}

module.exports = { printColorfulMessage };
