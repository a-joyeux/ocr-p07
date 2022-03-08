const { ErrorHandler } = require("../helpers/error");
const Post = require("../models/post");

function createPost(res, req, next) {
  return Post.create({ ...req.body, author: req.user.id })
    .then((post) => {
      res.status(201).json({ status: "SUCCESS", message: "Post created successfully" });
    })
    .catch((error) => {
      console.log(error);
      next(
        new ErrorHandler(
          500,
          "POST_ERR_001",
          error.errors.map((err) => err.message)
        )
      );
    });
}

function getPostById(res, req, next) {
  return Post.findByPk(req.params.id).then((post) => {
    if (!post) next(new ErrorHandler(404, "POST_ERR_004", ["Post not found"]));
    else res.status(200).json(post);
  });
}

function updatePost(res, req, next) {
  return Post.findByPk(req.params.id).then((post) => {
    if (!post) next(new ErrorHandler(404, "POST_ERR_004", ["Post not found"]));
    if (post.author == req.user.id) {
      return Post.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((user) => {
          res.status(200).json({ status: "SUCCESS", message: "Post updated successfully" });
        })
        .catch((error) => {
          next(
            new ErrorHandler(
              500,
              "POST_ERR_002",
              error.errors.map((err) => err.message)
            )
          );
        });
    } else {
      next(new ErrorHandler(500, "POST_ERR_003", ["You are not allowed to modify this post."]));
    }
  });
}

module.exports = { createPost, updatePost, getPostById };
