const axios = require('axios');

// Fonction pour récupérer les posts depuis JSONPlaceholder
async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data; // retourne un tableau d'environ 100 objets
  } catch (error) {
    console.error('Erreur lors de la récupération des posts :', error.message);
    throw error;
  }
}

module.exports = { fetchPosts };