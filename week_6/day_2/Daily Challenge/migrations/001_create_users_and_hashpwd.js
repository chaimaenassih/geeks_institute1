// migrations/001_create_users_and_hashpwd.js
/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
  const hasUsers = await knex.schema.hasTable('users');
  if (!hasUsers) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.timestamps(true, true);
    });
  }

  const hasHashpwd = await knex.schema.hasTable('hashpwd');
  if (!hasHashpwd) {
    await knex.schema.createTable('hashpwd', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table
        .foreign('username')
        .references('username')
        .inTable('users')
        .onDelete('CASCADE');
    });
  }
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('hashpwd');
  await knex.schema.dropTableIfExists('users');
};
