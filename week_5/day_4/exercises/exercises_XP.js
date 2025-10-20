const fs = require("fs/promises");
const path = require("path");
const { execSync } = require("child_process");

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function write(p, content) {
  await ensureDir(path.dirname(p));
  await fs.writeFile(p, content, { encoding: "utf8" });
  console.log("✔ created", p);
}

function tryRun(cmd, cwd) {
  try {
    console.log(`$ ${cmd}  (cwd: ${cwd})`);
    execSync(cmd, { stdio: "inherit", cwd });
    console.log("✔ done");
  } catch (e) {
    console.log("⚠ commande échouée (poursuite du setup) →", cmd);
  }
}

(async () => {
  // -------------------------
  // Exercice 1 (CommonJS)
  // -------------------------
  await write(
    "ex1/products.js",
    [
      "// CommonJS",
      "const products = [",
      '  { name: "Laptop", price: 1200, category: "Electronics" },',
      '  { name: "Headphones", price: 99, category: "Audio" },',
      '  { name: "Coffee", price: 5, category: "Grocery" },',
      '  { name: "Backpack", price: 49, category: "Accessories" },',
      "];",
      "",
      "module.exports = products;",
      "",
    ].join("\n")
  );

  await write(
    "ex1/shop.js",
    [
      "// CommonJS",
      'const products = require("./products");',
      "",
      "function findProductByName(name) {",
      "  return products.find(p => p.name.toLowerCase() === name.toLowerCase());",
      "}",
      "",
      '["Laptop", "Coffee", "Backpack", "Unknown"].forEach(n => {',
      "  const p = findProductByName(n);",
      "  if (p) {",
      '    console.log(`✔ ${p.name} — ${p.category} — $${p.price}`);',
      "  } else {",
      '    console.log(`✖ Produit introuvable: ${n}`);',
      "  }",
      "});",
      "",
    ].join("\n")
  );

  // -------------------------
  // Exercice 2 (ES Modules)
  // -------------------------
  await write(
    "ex2/package.json",
    JSON.stringify({ type: "module" }, null, 2) + "\n"
  );

  await write(
    "ex2/data.js",
    [
      "// ES module",
      "export const people = [",
      '  { name: "Alice", age: 24, location: "Paris" },',
      '  { name: "Bob", age: 31, location: "Lyon" },',
      '  { name: "Chloé", age: 27, location: "Marseille" }',
      "];",
      "",
    ].join("\n")
  );

  await write(
    "ex2/app.js",
    [
      "// ES module",
      'import { people } from "./data.js";',
      "",
      "function averageAge(items) {",
      "  const sum = items.reduce((acc, p) => acc + p.age, 0);",
      "  return (sum / items.length) || 0;",
      "}",
      "",
      "console.log('Personnes:', people);",
      "console.log('Âge moyen:', averageAge(people).toFixed(2));",
      "",
    ].join("\n")
  );

  // -------------------------
  // Exercice 3 (fs CommonJS)
  // -------------------------
  await write(
    "ex3/fileManager.js",
    [
      "// CommonJS + fs/promises",
      'const fs = require("fs/promises");',
      "",
      "async function readFile(path, encoding = 'utf8') {",
      "  return fs.readFile(path, { encoding });",
      "}",
      "",
      "async function writeFile(path, content, encoding = 'utf8') {",
      "  await fs.writeFile(path, content, { encoding });",
      "}",
      "",
      "module.exports = { readFile, writeFile };",
      "",
    ].join("\n")
  );

  await write("ex3/Hello World.txt", "Hello World !!\n");
  await write("ex3/Bye World.txt", "Bye World !!\n");

  await write(
    "ex3/app.js",
    [
      "// CommonJS",
      'const { readFile, writeFile } = require("./fileManager");',
      "",
      "(async () => {",
      "  try {",
      '    const content = await readFile("./Hello World.txt");',
      '    console.log("Contenu de Hello World.txt:", content);',
      "",
      '    await writeFile("./Bye World.txt", "Writing to the file");',
      '    console.log("Écriture dans Bye World.txt effectuée.");',
      "  } catch (err) {",
      '    console.error("Erreur:", err.message);',
      "  }",
      "})();",
      "",
    ].join("\n")
  );

  // -------------------------
  // Exercice 4 (Todo ES Modules)
  // -------------------------
  await write(
    "ex4-todoApp/package.json",
    JSON.stringify({ type: "module" }, null, 2) + "\n"
  );

  await write(
    "ex4-todoApp/todo.js",
    [
      "// ES module",
      "export class TodoList {",
      "  #tasks = []; // { title, done }",
      "",
      "  add(title) {",
      "    this.#tasks.push({ title, done: false });",
      "  }",
      "  complete(title) {",
      "    const t = this.#tasks.find(x => x.title === title);",
      "    if (t) t.done = true;",
      "  }",
      "  list() {",
      "    return this.#tasks.slice();",
      "  }",
      "}",
      "",
    ].join("\n")
  );

  await write(
    "ex4-todoApp/app.js",
    [
      "// ES module",
      'import { TodoList } from "./todo.js";',
      "",
      "const todos = new TodoList();",
      'todos.add("Apprendre Node.js");',
      'todos.add("Coder un converter");',
      'todos.add("Réviser les modules");',
      "",
      'todos.complete("Coder un converter");',
      "",
      'console.log("Toutes les tâches:");',
      "for (const t of todos.list()) {",
      "  console.log(`${t.done ? '✔' : '✖'} ${t.title}`);",
      "}",
      "",
    ].join("\n")
  );

  // -------------------------
  // Exercice 5 (math-app + lodash)
  // -------------------------
  await ensureDir("math-app");
  tryRun("npm init -y", "math-app");
  tryRun("npm install lodash", "math-app");

  await write(
    "math-app/math.js",
    [
      "// CommonJS",
      "function add(a, b) { return a + b; }",
      "function mul(a, b) { return a * b; }",
      "",
      "module.exports = { add, mul };",
      "",
    ].join("\n")
  );

  await write(
    "math-app/app.js",
    [
      "// CommonJS",
      'const _ = require("lodash");',
      'const { add, mul } = require("./math");',
      "",
      "const nums = [2, 4, 6, 8];",
      'console.log("Somme avec lodash:", _.sum(nums));',
      'console.log("Moyenne lodash:", _.mean(nums));',
      "",
      'console.log("add(3,5) =", add(3,5));',
      'console.log("mul(3,5) =", mul(3,5));',
      "",
    ].join("\n")
  );

  // -------------------------
  // Exercice 6 (npm-beginner + chalk@4)
  // -------------------------
  await ensureDir("npm-beginner");
  tryRun("npm init -y", "npm-beginner");
  tryRun("npm install chalk@4", "npm-beginner"); // v4 = CommonJS compatible

  await write(
    "npm-beginner/app.js",
    [
      "// CommonJS (compatible avec chalk@4)",
      'const chalk = require("chalk");',
      "",
      'console.log(chalk.blue.bold("Hello"), chalk.bgYellow.black("NPM Beginner!"));',
      'console.log(chalk.green("Succès ✔"), chalk.red("Erreur ✖"), chalk.cyan("Info ℹ"));',
      "",
    ].join("\n")
  );

  // -------------------------
  // Exercice 7 (file-explorer)
  // -------------------------
  await write("file-explorer/source.txt", "Du texte à copier.\n");

  await write(
    "file-explorer/copy-file.js",
    [
      "// CommonJS",
      'const fs = require("fs/promises");',
      "",
      "(async () => {",
      "  try {",
      '    const content = await fs.readFile("./source.txt", "utf8");',
      '    await fs.writeFile("./destination.txt", content, "utf8");',
      '    console.log("Copie OK → destination.txt");',
      "  } catch (err) {",
      '    console.error("Erreur copie:", err.message);',
      "  }",
      "})();",
      "",
    ].join("\n")
  );

  await write(
    "file-explorer/read-directory.js",
    [
      "// CommonJS",
      'const fs = require("fs/promises");',
      'const path = require("path");',
      "",
      "(async () => {",
      "  try {",
      '    const dir = process.argv[2] || "."; // node read-directory.js ./un/dossier',
      "    const files = await fs.readdir(dir);",
      '    console.log(`Fichiers dans ${path.resolve(dir)}:`);',
      "    files.forEach(f => console.log(' -', f));",
      "  } catch (err) {",
      '    console.error("Erreur lecture répertoire:", err.message);',
      "  }",
      "})();",
      "",
    ].join("\n")
  );

  console.log("\n🎉 Setup terminé !");
  console.log("\n▶ Commandes utiles :");
  console.log("  node ex1/shop.js");
  console.log("  node ex2/app.js");
  console.log("  node ex3/app.js");
  console.log("  node ex4-todoApp/app.js");
  console.log("  (dans math-app)       node app.js");
  console.log("  (dans npm-beginner)   node app.js");
  console.log("  (dans file-explorer)  node copy-file.js");
  console.log("  (dans file-explorer)  node read-directory.js");
})();
