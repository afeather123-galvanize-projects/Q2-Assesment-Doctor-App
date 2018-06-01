
exports.up = function(knex, Promise) {
  return knex.schema.createTable('appointment', table => {
      table.increments();
      table.string('name');
      table.dateTime('date');
      table.string('reason');
      table.text('details');
      table.boolean('confirmed');
      table.boolean('completed');
      table.integer('doctor_id')
      .notNullable()
      .references('id')
      .inTable('doctor')
      .onDelete('CASCADE')
      .index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('appointment');
};
