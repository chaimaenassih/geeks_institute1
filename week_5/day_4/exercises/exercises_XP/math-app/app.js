// CommonJS
const _ = require("lodash");
const { add, mul } = require("./math");

const nums = [2, 4, 6, 8];
console.log("Somme avec lodash:", _.sum(nums));
console.log("Moyenne lodash:", _.mean(nums));

console.log("add(3,5) =", add(3,5));
console.log("mul(3,5) =", mul(3,5));
