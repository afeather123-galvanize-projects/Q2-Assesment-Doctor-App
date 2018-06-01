module.exports = function(app) {
    app.use(function(req,res,next) {
        req.session.__proto__.flash = function(message_name, message, callback) {
            if(!this.messages) {
                this.messages = {};
            }
            this.messages[message_name] = message;
            this.save(() => {
                callback();
            });
        }
        next();
    })

    app.use(function(req,res,next) {
        if(req.session.messages) {
            req.messages = req.session.messages;
            req.session.messages = null;
            req.session.save(() => {
                next();
            })
        } else {
            req.messages = {};
            next();
        }
        
    })
}



