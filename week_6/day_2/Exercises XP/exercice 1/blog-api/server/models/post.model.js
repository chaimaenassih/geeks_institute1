const db = require('../config/db');

const table = 'posts';

async function findAll() {
  return db(table).select('id', 'title', 'content', 'created_at').orderBy('id', 'asc');
}

async function findById(id) {
  return db(table).where({ id }).first();
}

async function create({ title, content }) {
  const [row] = await db(table)
    .insert({ title, content })
    .returning(['id', 'title', 'content', 'created_at']);
  return row;
}

async function update(id, { title, content }) {
  const [row] = await db(table)
    .where({ id })
    .update({ title, content })
    .returning(['id', 'title', 'content', 'created_at']);
  return row;
}

async function remove(id) {
  const [row] = await db(table)
    .where({ id })
    .del()
    .returning(['id', 'title', 'content', 'created_at']);
  return row;
}

module.exports = { findAll, findById, create, update, remove };
