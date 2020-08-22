const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      //options for the strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    //passport callback function
    (accessToken, refreshToken, profile, done) => {
      //check if the user already exists in the database
      User.findOne({
        googleId: profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          //already have the user
          console.log("User is:", currentUser);
        } else {
          //create user in the database
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("New user created" + newUser);
            });
        }
      });
    }
  )
);
