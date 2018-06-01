const knex = require("../db/knex.js");


module.exports = {
    create: (req,res) => {
        req.body.appointment_id =  req.params.id;
        knex('note')
        .insert(req.body)
        .then(() => {
            res.redirect('/appointments/' + req.params.id);
        })
    }
}