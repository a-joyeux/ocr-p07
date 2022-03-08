var express = require("express");
var router = express.Router();
const { auth } = require("../auth/auth");
const User = require("../controllers/user");
const Post = require("../controllers/post");
const Comment = require("../controllers/comment");

router.post("/api/signup", function (req, res, next) {
  User.createUser(res, req, next).catch((error) => next(error));
});

router.post("/api/login", function (req, res, next) {
  User.login(res, req, next).catch((error) => next(error));
});

router.post("/api/post", auth, function (req, res, next) {
  Post.createPost(res, req, next).catch((error) => next(error));
});

router.post("/api/comment", auth, function (req, res, next) {
  Comment.createComment(res, req, next).catch((error) => next(error));
});

router.put("/api/post/:id", auth, function (req, res, next) {
  Post.updatePost(res, req, next).catch((error) => next(error));
});

router.put("/api/comment/:id", auth, function (req, res, next) {
  Comment.updateComment(res, req, next).catch((error) => next(error));
});

module.exports = router;
