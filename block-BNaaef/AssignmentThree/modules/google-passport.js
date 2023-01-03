const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: "f673a6bf60c38880ccec",
//       clientSecret: "8443e1491abfbd90d29ec01feb6e141ce1c1d816",
//       callbackURL: "/auth/github/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       //     return cb(err, user);
//       //   });
//       console.log(profile);
//       const profileData = {
//         name: profile._json.name,
//         username: profile._json.login,
//         email: profile._json.emails,
//         photo: profile._json.profileUrl,
//       };
//       User.findOne({ username: profileData.username }, (err, user) => {
//         if (err) return done(err);

//         if (!user) {
//           User.create(profileData, (err, adduser) => {
//             if (err) return done(err);
//             return done(null, adduser);
//           });
//         } else {
//           return done(null, user);
//         }
//       });
//       done(null, false);
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: "f673a6bf60c38880ccec",
      clientSecret: "8443e1491abfbd90d29ec01feb6e141ce1c1d816",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var profileData = {
        name: profile._json.name,
        username: profile._json.login,
        email: profile._json.email,
        avatar: profile._json.avatar_url,
      };
      try {
        const user = await User.findOne({ email: profile._json.email });
        if (!user) {
          const addedUser = await User.create(profileData);
          return done(null, addedUser);
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
