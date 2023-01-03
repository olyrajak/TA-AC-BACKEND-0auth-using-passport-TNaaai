var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    var error = req.flash('error')[0];
    console.log(error);
    res.render('login', { error: error });
});
router.post('/', function(req, res, next) {
    console.log(req.user);
    var { email, password } = req.body;
    if (!email || !password) {
        req.flash('error', 'Email/Password Is Required');
        return res.redirect('/login');
    }
    User.findOne({ email }, (err, user) => {
        if (err) return next(err);

        if (!user) {

            req.flash('error', 'Email Is Required');
            return res.redirect('/login')
        }
        user.verifyPassword(password, (err, result) => {
            if (err) return next(err);
            if (!result) {
                req.flash('error', 'Password Is Required');
                return res.redirect('/login')
            }
            req.session.UserId = user.id;
            return res.redirect("/users")

        })


    })

});


module.exports = router;