// app.task2.js
const { printColorfulMessage } = require('./colorful-message');

const msg = process.argv.slice(2).join(' ') || 'Node.js + chalk demo';
printColorfulMessage(msg);
