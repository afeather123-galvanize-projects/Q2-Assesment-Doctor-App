const {num_appointments, num_doctors} = require('../../config/seedInfo');
const faker = require('faker');

exports.seed = function(knex, Promise) {

  return knex('appointment').del()
    .then(function () {
      
      const appointments = [];

      for(let i = 0; i < num_appointments; i++) {
        const appointment = {
          name: faker.name.findName(),
          date: faker.date.future(),
          reason: faker.lorem.sentence(3),
          details: faker.lorem.paragraph(),
          confirmed: false,
          completed: false,
          doctor_id: Math.ceil(Math.random() * num_doctors)
        };
        console.log(appointment.doctor_id);
        appointments.push(appointment);
      }

      return knex('appointment').insert(appointments);
    });
};
