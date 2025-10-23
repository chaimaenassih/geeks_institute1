// app.js
const { greet } = require('./greeting');

const user = process.argv[2] || 'World';
console.log(greet(user));
