// CommonJS
const { readFile, writeFile } = require("./fileManager");

(async () => {
  try {
    const content = await readFile("./Hello World.txt");
    console.log("Contenu de Hello World.txt:", content);

    await writeFile("./Bye World.txt", "Writing to the file");
    console.log("Écriture dans Bye World.txt effectuée.");
  } catch (err) {
    console.error("Erreur:", err.message);
  }
})();
