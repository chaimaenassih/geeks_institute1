import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le fichier est à la racine du projet (../.. depuis utils/)
const DATA_FILE = path.resolve(__dirname, "../../tasks.json");

// Petite file d’attente pour sérialiser les écritures et éviter les courses.
let writing = Promise.resolve();

console.log("DATA_FILE =", DATA_FILE);


async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

export async function readTasks() {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      throw new Error("Le fichier de données n'est pas un tableau JSON.");
    }
    return data;
  } catch (e) {
    const err = new Error("Fichier JSON invalide (tasks.json).");
    err.cause = e;
    err.status = 500;
    throw err;
  }
}

export async function writeTasks(tasksArray) {
  if (!Array.isArray(tasksArray)) {
    const err = new Error("writeTasks attend un tableau.");
    err.status = 500;
    throw err;
  }

  // Sérialise les écritures (évite des write concurrents)
  writing = writing.then(async () => {
    const tmpPath = `${DATA_FILE}.tmp`;
    const json = JSON.stringify(tasksArray, null, 2);
    await fs.writeFile(tmpPath, json, "utf8");
    await fs.rename(tmpPath, DATA_FILE); 
  });

  return writing;
}
