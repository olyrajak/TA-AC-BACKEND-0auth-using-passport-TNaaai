var User = require('../models/user')
module.exports = {
    loggedInUser: (req, res, next) => {
        if (req.session && req.session.UserId) {
            next();
        } else {
            return res.redirect("/login")
        }
    },
    UserInfo: (req, res, next) => {
        var userid = req.session && req.session.UserId;
        if (userid) {
            User.findById(userid, "name email", (err, user) => {
                if (err) return next(err);
                req.user = user;
                res.locals.user = user;
                next();
            })
        } else {
            req.user = null;
            res.locals.user = null;
            next();
        }
    }
}