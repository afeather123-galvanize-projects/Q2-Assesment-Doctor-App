const knex = require("../db/knex.js");

module.exports = {
    new: (req,res) => {
        knex('doctor')
        .where('id', req.params.id)
        .then (doctor => {
            doctor = doctor[0];
            res.render('new-appointment', {doctor: doctor});
        })
        .catch(err => {
            console.log(err);
            res.render('new-appointment', {message: 'Sorry, this doctor doesn\'t seem to exist!'});
        })
        
    },

    create: (req,res) => {
        req.body.date = new Date(req.body.date + ' ' + req.body.time);
        delete req.body.time;
        req.body.confirmed = false;
        req.body.completed = false;
        knex('appointment')
        .insert(req.body)
        .then(() => {
            res.redirect('/');
        });
    },

    confirmed_appointments: (req,res) => {
        knex('doctor')
        .where('id', req.session.user_id)
        .then(doctor => {
            doctor = doctor[0];
            knex('appointment')
            .where('doctor_id', req.session.user_id)
            .where('confirmed', true)
            .where('completed', false)
            .then(appointments => {
                res.render('appointments', {title: "Confirmed Appointments", appointments: appointments, doctor_name: doctor.name});
            })
        })
        
        
    },

    unconfirmed_appointments: (req,res) => {
        knex('doctor')
        .where('id', req.session.user_id)
        .then(doctor => {
            doctor = doctor[0];
            knex('appointment')
            .where('doctor_id', req.session.user_id)
            .where('confirmed', false)
            .then(appointments => {
                res.render('appointments', {title: "Unconfirmed Appointments", appointments: appointments, doctor_name: doctor.name});
            })
        })
    },

    completed_appointments: (req,res) => {
        knex('doctor')
        .where('id', req.session.user_id)
        .then(doctor => {
            doctor = doctor[0];
            knex('appointment')
            .where('doctor_id', req.session.user_id)
            .where('completed', true)
            .then(appointments => {
                res.render('appointments', {title: "Completed Appointments", appointments: appointments, doctor_name: doctor.name});
            })
        })
    },
    
    show: (req,res) => {
        knex('appointment')
        .where('id', req.params.id)
        .then(appointment => {
            
            if(appointment.length <= 0) {
                res.render('missing-appointment');
                return;
            }
            appointment = appointment[0];
            knex('note')
            .where('appointment_id', appointment.id)
            .then((notes) => {
                res.render('appointment', {appointment: appointment, notes: notes});
            })
        })
    },

    confirm_appointment: (req,res) => {
        knex('appointment')
        .where('id', req.params.id)
        .update('confirmed', true)
        .then(() => {
            res.redirect('/appointments/' + req.params.id);
        })
    },

    complete_appointment: (req,res) => {
        knex('appointment')
        .where('id', req.params.id)
        .update('completed', true)
        .then(() => {
            res.redirect('/appointments/' + req.params.id);
        })
    },

    delete_appointment: (req,res) => {
        knex('appointment')
        .where('id', req.params.id)
        .delete()
        .then(() => {
            res.redirect('/appointments');
        })
    },

    update: (req,res) => {
        req.body.date = new Date(req.body.date + ' ' + req.body.time);
        delete req.body.time;
        req.body.confirmed = false;
        req.body.completed = false;
        knex('appointment')
        .where('id', req.params.id)
        .update(req.body)
        .then(() => {
            res.redirect('/appointments/' + req.params.id);
        })
    },

    edit: (req,res) => {
        knex('appointment')
        .where('id', req.params.id)
        .then(appointment => {
            if(appointment.length <= 0) {
                res.render('missing-appointment');
                return;
            }
            appointment = appointment[0];
            appointment.time = appointment.date.toLocaleTimeString();
            appointment.date = appointment.date.toDateString();
            console.log(appointment.date);
            res.render('edit-appointment', {appointment: appointment});
        })
        
    }
}