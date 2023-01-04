var express = require("express");
var router = express.Router();
var passport = require("passport");

const User = require("./../models/User");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/failure", function (req, res, next) {
  res.render("failure", { title: "Express" });
});
router.get("/success", function (req, res) {
  res.render("success", { title: "Express" });
});
router.get("/auth/github", passport.authenticate("github"));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/failure" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

router.get("/test-promise", async (req, res) => {
  try {
    // const user =
    // User.find({}, (err, user) => {
    //   console.log(user);
    // }); //callback

    // User.find({}).then((user) => console.log(user));/promise
    // async => await
    const user = await User.find({});
    console.log(user);

    res.send("hi");
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  (req, res) => {
    res.redirect("/success");
  }
);
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});
module.exports = router;
