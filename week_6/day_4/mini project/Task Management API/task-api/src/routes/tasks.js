import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { readTasks, writeTasks } from "../utils/storage.js";

const router = Router();

/**
 * Schéma de tâche :
 * {
 *   id: string (uuid),
 *   title: string,
 *   description?: string,
 *   status: "pending" | "in_progress" | "done",
 *   dueDate?: string (ISO 8601),
 *   createdAt: string (ISO 8601),
 *   updatedAt: string (ISO 8601)
 * }
 */

const STATUS = ["pending", "in_progress", "done"];

// --- Middlewares de validation ---

const validateId = [
  param("id").isString().notEmpty().withMessage("Paramètre id invalide."),
];

const validateCreate = [
  body("title").isString().trim().notEmpty().withMessage("title requis (string non vide)."),
  body("description").optional().isString().withMessage("description doit être une string."),
  body("status").optional().isIn(STATUS).withMessage(`status doit être l'un de: ${STATUS.join(", ")}`),
  body("dueDate").optional().isISO8601().withMessage("dueDate doit être une date ISO (ex: 2025-11-02)."),
];

const validateUpdate = [
  body("title").optional().isString().trim().notEmpty().withMessage("title doit être une string non vide."),
  body("description").optional().isString().withMessage("description doit être une string."),
  body("status").optional().isIn(STATUS).withMessage(`status doit être l'un de: ${STATUS.join(", ")}`),
  body("dueDate").optional().isISO8601().withMessage("dueDate doit être une date ISO (ex: 2025-11-02)."),
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "ValidationError",
      details: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// --- Routes ---

// GET /tasks : liste toutes les tâches
router.get("/", async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (e) {
    next(e);
  }
});

// GET /tasks/:id : récupère une tâche par ID
router.get("/:id", validateId, handleValidation, async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: "NotFound", message: "Tâche non trouvée." });
    }
    res.json(task);
  } catch (e) {
    next(e);
  }
});

// POST /tasks : crée une tâche
router.post("/", validateCreate, handleValidation, async (req, res, next) => {
  try {
    const now = new Date().toISOString();
    const { title, description = "", status = "pending", dueDate } = req.body;

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description,
      status,
      dueDate: dueDate || null,
      createdAt: now,
      updatedAt: now,
    };

    const tasks = await readTasks();
    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (e) {
    next(e);
  }
});

// PUT /tasks/:id : mise à jour (partielle acceptée)
router.put("/:id", validateId, validateUpdate, handleValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const patch = req.body;

    const tasks = await readTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "NotFound", message: "Tâche non trouvée." });
    }

    const updated = {
      ...tasks[idx],
      ...patch,
      title: patch.title !== undefined ? patch.title.trim() : tasks[idx].title,
      updatedAt: new Date().toISOString(),
    };

    tasks[idx] = updated;
    await writeTasks(tasks);

    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /tasks/:id : supprime une tâche
router.delete("/:id", validateId, handleValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: "NotFound", message: "Tâche non trouvée." });
    }

    const [removed] = tasks.splice(idx, 1);
    await writeTasks(tasks);

    res.json({ deleted: removed.id });
  } catch (e) {
    next(e);
  }
});

export default router;
