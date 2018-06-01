const {num_notes, num_appointments} = require('../../config/seedInfo');
const faker = require('faker');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('note').del()
    .then(function () {
      
      const notes = [];

      for (let i = 0; i < num_notes; i++) {
        const note = {
          body: faker.lorem.paragraph(),
          appointment_id: Math.ceil(Math.random() * num_appointments)
        }
        notes.push(note);
      }

      return knex('note').insert(notes);
    });
};
