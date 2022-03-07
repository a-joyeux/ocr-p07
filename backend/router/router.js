var express = require("express");
var router = express.Router();
const { auth } = require("../auth/auth");
const User = require("../controllers/user");

router.post("/api/signup", function (req, res, next) {
  User.createUser(res, req, next).catch((error) => next(error));
});

router.post("/api/login", function (req, res, next) {
  User.login(res, req, next).catch((error) => next(error));
});

module.exports = router;
