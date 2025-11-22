const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware pour parser le JSON et autoriser les requêtes venant du client (port 3000)
app.use(cors());
app.use(express.json());

/**
 * PARTIE I
 * GET /api/hello → renvoie "Hello From Express"
 */
app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

/**
 * PARTIE II
 * POST /api/world
 * - lit le body (valeur envoyée depuis le formulaire React)
 * - affiche dans la console
 * - renvoie le message demandé
 */
app.post("/api/world", (req, res) => {
  console.log("Body reçu depuis le client :", req.body);

  const { post } = req.body; // le champ s'appelle "post" côté client

  res.send(
    `I received your POST request. This is what you sent me: ${post}`
  );
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
