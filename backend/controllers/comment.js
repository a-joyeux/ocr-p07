const { ErrorHandler } = require("../helpers/error");
const Comment = require("../models/comment");

function createComment(res, req, next) {
  return Comment.create({ ...req.body, author: req.user.id }, { fields: ["content", "postId", "author"] })
    .then((comment) => {
      res.status(201).json({ status: "SUCCESS", message: "Comment created successfully" });
    })
    .catch((error) => {
      console.log(error);
      next(
        new ErrorHandler(
          500,
          "COMMENT_ERR_001",
          error.errors.map((err) => err.message)
        )
      );
    });
}


module.exports = { createComment };
