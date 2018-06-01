const knex = require('knex');


exports.up = function(knex, Promise) {
  return knex.schema.createTable('doctor', table => {
    table.increments();
    table.string('name');
    table.text('imgurl');
    table.string('email')
    .unique();
    table.text('bio');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('doctor');
};
