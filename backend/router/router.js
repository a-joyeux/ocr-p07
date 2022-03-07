var express = require("express");
var router = express.Router();
const { auth } = require("../auth/auth");
const User = require("../controllers/user");
const Post = require("../controllers/post");

router.post("/api/signup", function (req, res, next) {
  User.createUser(res, req, next).catch((error) => next(error));
});

router.post("/api/login", function (req, res, next) {
  User.login(res, req, next).catch((error) => next(error));
});

router.post("/api/post", auth, function (req, res, next) {
  Post.createPost(res, req, next).catch((error) => next(error));
});

module.exports = router;
