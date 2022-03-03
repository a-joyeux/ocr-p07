var express = require("express");
var router = express.Router();
const { auth } = require("../auth/auth.js");

// GET all sauces
router.get("/api/", function (req, res, next) {
  res.status(200).json("Ok super");
});

module.exports = router;
