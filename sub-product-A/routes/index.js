const express = require("express");
const checkAuth = require("@middlewares/dto/is-valid-user");

const router = express.Router();

/* GET home page. */
router.get("/", checkAuth, function (req, res, next) {
  res.render("index", { title: "Product A" });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
