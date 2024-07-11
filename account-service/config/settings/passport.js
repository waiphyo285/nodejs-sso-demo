const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// auth model
const User = require("@models/schemas/account");

// passport local authentication
passport.serializeUser(function (user, done) {
  // the values returned here will be used to deserializeUser
  // this can be use for further logins
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // the values returned from serializeUser
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      // new version - with populate
      const user = await User.findOne({ username });

      if (!user) return done(null, false);

      user.comparePassword(password, (err, match) => {
        if (err) return done(err, false);

        // prevent data here
        user.password = null;

        if (match) return done(null, user);
        return done(null, false);
      });
    }
  )
);
