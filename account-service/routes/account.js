var express = require("express");
var router = express.Router();

const Account = require("@services/account");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Account.findDataBy({}).then((result) => {
    return res.json(result);
  });
});

module.exports = router;
