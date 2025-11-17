// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3' // le fichier DB sera créé automatiquement
    },
    useNullAsDefault: true, // requis pour sqlite
    migrations: {
      directory: './migrations'
    }
  }
};
