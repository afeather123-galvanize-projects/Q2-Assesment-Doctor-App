//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
const appointment = require('../controllers/appointment.js');
const doctor = require('../controllers/doctor.js');
const note = require('../controllers/note.js');
module.exports = function(app){

  app.get('/', doctor.index);
  app.get('/book/:id', appointment.new);
  app.post('/appointment', appointment.create);
  app.get('/doctors/login', doctor.register_login);
  app.post('/doctors', doctor.register);
  app.post('/login', doctor.login);

  app.use(function(req,res,next) {
    if(!req.session.user_id) {
      res.redirect('/');
      return;
    }
    next();
  })

  app.get('/appointments', appointment.confirmed_appointments);
  app.get('/appointments/unconfirmed', appointment.unconfirmed_appointments);
  app.get('/appointments/completed', appointment.completed_appointments);
  app.post('/appointments/complete/:id', appointment.complete_appointment);
  app.post('/appointments/confirm/:id', appointment.confirm_appointment);
  app.post('/appointments/delete/:id', appointment.delete_appointment);
  app.get('/appointments/edit/:id', appointment.edit);
  app.post('/appointments/edit/:id', appointment.update);
  app.get('/appointments/:id', appointment.show);
  app.post('/notes/:id', note.create);
}
