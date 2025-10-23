// CommonJS
const fs = require("fs/promises");

(async () => {
  try {
    const content = await fs.readFile("./source.txt", "utf8");
    await fs.writeFile("./destination.txt", content, "utf8");
    console.log("Copie OK → destination.txt");
  } catch (err) {
    console.error("Erreur copie:", err.message);
  }
})();
