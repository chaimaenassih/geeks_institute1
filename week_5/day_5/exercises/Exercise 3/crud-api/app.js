const express = require('express');
const { fetchPosts } = require('./data/dataService'); // import du module

const app = express();

// Endpoint pour récupérer les posts
app.get('/api/external-posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log('✅ Données récupérées et envoyées au client.');
    res.json(posts);
  } catch (err) {
    console.error('❌ Erreur dans /api/external-posts :', err.message);
    res.status(502).json({ error: 'Échec de la récupération des données externes' });
  }
});

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ CRUD API en cours sur http://localhost:${PORT}`));
