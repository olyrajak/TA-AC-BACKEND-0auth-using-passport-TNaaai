var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    var error = req.flash("error");
    res.render("register", { error });
});

router.post("/", function(req, res, next) {
    const { email, password } = req.body;

    if (password.length <= 4) {
        req.flash("error", "Password must be at least 4 characters");
        return res.redirect("/register");
    }

    User.findOne({ email: email }, (err, user) => {
        if (err) return next(err);
        if (user) {
            req.flash("error", "Email already Exist!");
            return res.redirect("/register");
        } else {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("/register");
                } else {
                    res.redirect("/login");
                }
            });
        }
    });
});
module.exports = router;