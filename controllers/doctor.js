const knex = require("../db/knex.js");
const {hash,check} = require('../config/hasher');

module.exports = {
    index: (req,res) => {
        knex('doctor')
        .then(doctors => {
            res.render('index', {doctors: doctors});
        })
    },

    register_login: (req,res) => {
        console.log(req.messages);
        res.render('register-login', {messages: req.messages});
    },

    register: (req,res) => {
        if(req.body.password !== req.body.confirmPassword) {
            res.redirect('/doctors/login');
            return;
        }
        delete req.body.confirmPassword;
        hash(req.body).then(doctor => {
            knex('doctor')
            .insert(doctor)
            .then(() => {
                req.session.flash('success', 'User has been successfully created. You can now login.', () => {
                    res.redirect('/doctors/login');    
                })
            })
        })
    },

    login: (req,res) => {
        knex('doctor')
        .where('email', req.body.email)
        .then(doctor => {
            if(doctor.length <= 0) {
                req.session.flash('error', 'Invalid email', () => {
                    res.redirect('/doctors/login');
                });
                return;
            }
            doctor = doctor[0];
            check(doctor, req.body).then(() => {
                req.session.user_id = doctor.id;
                req.session.save(() => {
                    res.redirect('/appointments');
                })
            })
            .catch(() => {
                req.session.flash('error', 'Invalid password.', () => {
                    res.redirect('/doctors/login');
                })
            })
        })
    }
}