const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
      const loggedUser = { username, password };
      return done(null, loggedUser);
    }
  )
);
