const express = require("express");
const passport = require("passport");
const User = require("@models/schemas/account");
const checkAuth = require("@middlewares/dto/is-valid-user");
const { verifyToken, signToken } = require("@middlewares/jwt/index");

const router = express.Router();

/* GET home page. */
router.get("/", checkAuth, function (req, res, next) {
  res.render("index", { title: "Home (logged user)" });
});

// sso call from pos, hr, etc.
router.get("/sso", checkAuth, function (req, res, next) {
  const redirectUrl = res.query.webhook;
  return res.redirect(`${redirectUrl}?user=${JSON.stringify(req.user)}`);
});

router
  .get("/signup", function (req, res, next) {
    res.render("login", {
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
    const redirectUrl = req.query.webhook;

    res.render("login", {
      title: "Login page",
      showBtn: "Login",
      webhook: redirectUrl || "",
    });
  })
  .post("/login", function (req, res, next) {
    passport.authenticate(
      "local",
      { failureRedirect: "/login" },
      async (err, user, info) => {
        if (err) {
          console.error("Authentication error:", err);
          return next(err);
        }

        if (!user) {
          console.log("No user found, redirect /login");
          return res.redirect("/login?message=error");
        }

        req.logIn(user, (err) => {
          if (err) {
            console.error("Error logging in:", err);
            return next(err);
          }

          req.session.user = user;
          const redirectUrl = req.body.webhook;

          if (redirectUrl) {
            const encodedUser = JSON.stringify(user);
            return res.json({ user: encodedUser, redirectUrl });
            // return res.redirect(`${redirectUrl}?user=${encodedUser}`);
          }

          return res.json({ user });
          // return res.redirect("/");
        });
      }
    )(req, res, next);
  });

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
