const faker = require('faker');
const {
  hash
} = require('../../config/hasher.js');
const {
  num_doctors
} = require('../../config/seedInfo.js');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctor').del()
    .then(function () {
      return makeFakeDoctors().then(doctors => {
        return knex('doctor').insert(doctors);
      })
    });
};


function makeFakeDoctors() {

  return new Promise(function (resolve, reject) {
    const doctors = [];

    let doctors_pushed = 0;

    for (let i = 0; i < num_doctors; i++) {
      const doctor = {
        name: faker.name.findName(),
        imgurl: faker.image.people(400, 400),
        email: faker.internet.email(),
        bio: faker.lorem.paragraph(),
        password: 'test'
      };

      hash(doctor).then(hashedDoctor => {
        doctors.push(hashedDoctor);
        if (++doctors_pushed === num_doctors) {
          resolve(doctors)
        }
      })
    }
  })
}