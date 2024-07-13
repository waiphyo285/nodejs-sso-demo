const express = require("express");
const Account = require("@services/account");

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  Account.findDataBy({}).then((result) => {
    return res.json(result);
  });
});

module.exports = router;
