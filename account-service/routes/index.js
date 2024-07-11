var express = require("express");
var router = express.Router();
var passport = require("passport");
const User = require("@models/schemas/account");
const checkAuth = require("@middlewares/dto/is-valid-user");
const { verifyToken, signToken } = require("@middlewares/jwt/index");

/* GET home page. */
router.get("/", checkAuth, function (req, res, next) {
  res.render("index", { title: "Home (logged user)" });
});

// sso call from pos, hr, etc.
router.get("/sso", checkAuth, function (req, res, next) {
  const redirectUrl = res.query.redirectUrl;
  return res.redirect(`${redirectUrl}?user=${JSON.stringify(req.user)}`);
});

router
  .get("/signup", function (req, res, next) {
    res.render("index", {
      title: "Sign up page",
      showBtn: "Signup",
    });
  })
  .post("/signup", function (req, res, next) {
    const user = new User({
      phone: "092213456",
      username: "helloworld",
      password: "helloworld",
      role: "developer",
    });

    user.save(function (err, result) {
      console.log("error ", err);

      if (err) {
        return res.redirect("/signup?message=error");
      }

      result["latmat"] = signToken({
        userrole: result.role,
        username: result.username,
        password: result.password,
      });

      req.session.user = result;
      res.redirect("/");
    });
  });

router
  .get("/login", function (req, res, next) {
    res.render("index", {
      title: "Login page",
      showBtn: "Login",
    });
  })
  .post("/login", function (req, res, next) {
    passport.authenticate(
      "local",
      { failureRedirect: "/login" },
      async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect("/login?message=error");

        req.logIn(user, (err) => {
          req.session.user = user;
          return res.redirect("/");
        });
      }
    )(req, res, next);
  });

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
