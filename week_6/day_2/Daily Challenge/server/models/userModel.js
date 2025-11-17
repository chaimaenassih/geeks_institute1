const db = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function findUserByUsername(username) {
  return db('users').where({ username }).first();
}

async function getAllUsers() {
  return db('users').select('id', 'email', 'username', 'first_name', 'last_name');
}

async function getUserById(id) {
  return db('users')
    .select('id', 'email', 'username', 'first_name', 'last_name')
    .where({ id })
    .first();
}

async function getPasswordHashByUsername(username) {
  return db('hashpwd').where({ username }).first();
}

async function createUserWithPassword({ email, username, first_name, last_name, password }) {
  return db.transaction(async (trx) => {
    const existingUser = await trx('users')
      .where({ username })
      .orWhere({ email })
      .first();

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    await trx('users').insert({
      email,
      username,
      first_name,
      last_name
    });

    const user = await trx('users')
      .where({ username })
      .select('id', 'email', 'username', 'first_name', 'last_name')
      .first();

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await trx('hashpwd').insert({
      username,
      password: hash
    });

    return user;
  });
}

async function updateUserById(id, { email, username, first_name, last_name }) {
  const updateData = {};
  if (email) updateData.email = email;
  if (username) updateData.username = username;
  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;

  if (Object.keys(updateData).length === 0) {
    return getUserById(id);
  }

  await db('users').where({ id }).update(updateData);

  return getUserById(id);
}

module.exports = {
  findUserByUsername,
  getAllUsers,
  getUserById,
  getPasswordHashByUsername,
  createUserWithPassword,
  updateUserById
};
