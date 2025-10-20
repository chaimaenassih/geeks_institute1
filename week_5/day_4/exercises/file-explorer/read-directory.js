// CommonJS
const fs = require("fs/promises");
const path = require("path");

(async () => {
  try {
    const dir = process.argv[2] || "."; // node read-directory.js ./un/dossier
    const files = await fs.readdir(dir);
    console.log(`Fichiers dans ${path.resolve(dir)}:`);
    files.forEach(f => console.log(' -', f));
  } catch (err) {
    console.error("Erreur lecture répertoire:", err.message);
  }
})();
