const N = 6;

// Version 1 : un seul for
let line = "";
for (let i = 1; i <= N; i++) {
  line += "* ";
  console.log(line.trim());
}

console.log("");

// Version 2 : deux for imbriqués
for (let i = 1; i <= N; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) row += "* ";
  console.log(row.trim());
}
