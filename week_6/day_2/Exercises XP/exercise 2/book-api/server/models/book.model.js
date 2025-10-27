
const db = require("../config/db");
const table = "books";

const findAll  = () =>
  db(table)
    .select("id", "title", "author", { publishedYear: "published_year" })
    .orderBy("id", "asc");

const findById = (id) =>
  db(table)
    .where({ id })
    .first(["id", "title", "author", { publishedYear: "published_year" }]);

async function create({ title, author, publishedYear }) {
  const [row] = await db(table)
    .insert({ title, author, published_year: publishedYear })
    .returning(["id", "title", "author", { publishedYear: "published_year" }]);
  return row;
}

async function update(id, patch) {
  const upd = {};
  if (patch.title !== undefined) upd.title = patch.title;
  if (patch.author !== undefined) upd.author = patch.author;
  if (patch.publishedYear !== undefined) upd.published_year = patch.publishedYear;

  const [row] = await db(table)
    .where({ id })
    .update(upd)
    .returning(["id", "title", "author", { publishedYear: "published_year" }]);

  return row;
}

async function remove(id) {
  const [row] = await db(table)
    .where({ id })
    .del()
    .returning(["id", "title", "author", { publishedYear: "published_year" }]);
  return row;
}

module.exports = { findAll, findById, create, update, remove };
