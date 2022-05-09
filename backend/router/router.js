var express = require('express');
var router = express.Router();
const { auth } = require('../auth/auth');
const User = require('../controllers/user');
const Post = require('../controllers/post');
const Comment = require('../controllers/comment');

router.post('/api/signup', function (req, res, next) {
  User.createUser(res, req, next).catch((error) => next(error));
});

router.post('/api/login', function (req, res, next) {
  User.login(res, req, next).catch((error) => next(error));
});

router.get('/api/user/:id', auth, function (req, res, next) {
  User.getUserInfos(res, req, next).catch((error) => next(error));
});

router.get('/api/post', auth, function (req, res, next) {
  Post.getAllPost(res, req, next).catch((error) => next(error));
});

router.get('/api/comment', auth, function (req, res, next) {
  Comment.getAllComment(res, req, next).catch((error) => next(error));
});

router.post('/api/post', auth, function (req, res, next) {
  Post.createPost(res, req, next).catch((error) => next(error));
});

router.post('/api/comment', auth, function (req, res, next) {
  Comment.createComment(res, req, next).catch((error) => next(error));
});

router.put('/api/post/:id', auth, function (req, res, next) {
  Post.updatePost(res, req, next).catch((error) => next(error));
});

router.put('/api/comment/:id', auth, function (req, res, next) {
  Comment.updateComment(res, req, next).catch((error) => next(error));
});

router.delete('/api/post/:id', auth, function (req, res, next) {
  Post.deletePost(res, req, next).catch((error) => next(error));
});

router.delete('/api/comment/:id', auth, function (req, res, next) {
  Comment.deleteComment(res, req, next).catch((error) => next(error));
});

module.exports = router;
