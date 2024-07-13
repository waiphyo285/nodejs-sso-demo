const express = require("express");

const router = express.Router();

/* GET product listing. */
router.get("/", function (req, res, next) {
  res.render("product", {
    title: "Product list",
    data: [
      {
        link: "http://localhost:4000",
        name: "Product A",
      },
    ],
  });
});

module.exports = router;
