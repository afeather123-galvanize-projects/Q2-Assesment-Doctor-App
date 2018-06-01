
exports.up = function(knex, Promise) {
  return knex.schema.createTable('note', table => {
      table.increments();
      table.text('body');
      table.integer('appointment_id')
      .notNullable()
      .references('id')
      .inTable('appointment')
      .onDelete('CASCADE')
      .index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('note');
};
