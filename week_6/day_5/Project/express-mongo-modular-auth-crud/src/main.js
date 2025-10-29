
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectMongo } from '#@/databases/connect-mongo.js';
import routes from '#@/routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Monter le routeur principal
app.use('/', routes);

// Route 404 (à laisser en dernier)
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectMongo();
    app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
  } catch (err) {
    console.error('[db] connection error:', err.message || err);
    process.exit(1);
  }
}

start();
