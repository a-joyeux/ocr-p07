const { ErrorHandler } = require("../helpers/error");
const Post = require("../models/post");

function createPost(res, req, next) {
  console.log(req.user);
  return Post.create({ ...req.body, author: req.user.id })
    .then((post) => {
      res.status(201).json({ status: "SUCCESS", message: "Post created successfully" });
    })
    .catch((error) => {
      next(
        new ErrorHandler(
          500,
          "POST_ERR_001",
          error.errors.map((err) => err.message)
        )
      );
    });
}

module.exports = { createPost };
