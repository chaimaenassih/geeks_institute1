import express from "express";
import morgan from "morgan";
import tasksRouter from "./routes/tasks.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    service: "Task Management API",
    endpoints: ["/tasks", "/tasks/:id"]
  });
});


// Middlewares
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// Routes
app.use("/tasks", tasksRouter);

// 404 pour routes inconnues
app.use((req, res) => {
  res.status(404).json({ error: "NotFound", message: "Route introuvable." });
});

// Gestion centrale des erreurs
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    error: err.name || "InternalServerError",
    message: err.message || "Erreur interne.",
  };
  if (process.env.NODE_ENV === "development" && err.cause) {
    payload.cause = err.cause.message;
  }
  res.status(status).json(payload);
});

// Démarrage
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task API en écoute sur http://localhost:${PORT}`);
});
