exports.up = (knex) => {
  return knex.schema.createTable('books', (t) => {
    t.increments('id').primary();
    t.text('title').notNullable();
    t.text('author').notNullable();
    t.integer('published_year').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => knex.schema.dropTableIfExists('books');
