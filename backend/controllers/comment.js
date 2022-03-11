const { ErrorHandler } = require("../helpers/error");
const Comment = require("../models/comment");
const User = require("../models/user");

function createComment(res, req, next) {
  return Comment.create({ ...req.body, author: req.user.id }, { fields: ["content", "postId", "author"] })
    .then((comment) => {
      res.status(201).json({ status: "SUCCESS", message: "Comment created successfully" });
    })
    .catch((error) => {
      next(new ErrorHandler(500, "COMMENT_ERR_001", error.message));
    });
}

function getAllComment(res, req, next) {
  return Comment.findAll({ include: { model: User, attributes: ["id", "email"] } })
    .then((comments) => {
      if (comments.length == 0) next(new ErrorHandler(404, "POST_ERR_004", ["Comment not found"]));
      else {
        const filters = req.query;
        const filteredComments = comments.filter((comment) => {
          let isValid = true;
          for (key in filters) {
            isValid = isValid && comment[key] == filters[key];
          }
          return isValid;
        });
        res.status(200).json(filteredComments);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCommentById(res, req, next) {
  return Comment.findByPk(req.params.id).then((comment) => {
    if (!comment) next(new ErrorHandler(404, "COMMENT_ERR_004", ["Comment not found"]));
    else res.status(200).json(comment);
  });
}

function updateComment(res, req, next) {
  return Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment.author == req.user.id) {
        return Comment.update(
          { ...req.body },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then((user) => {
            res.status(200).json({ status: "SUCCESS", message: "Comment updated successfully" });
          })
          .catch((error) => {
            next(
              new ErrorHandler(
                500,
                "COMMENT_ERR_002",
                error.errors.map((err) => err.message)
              )
            );
          });
      } else {
        next(new ErrorHandler(500, "COMMENT_ERR_003", ["You are not allowed to modify this comment."]));
      }
    })
    .catch((error) => {
      next(new ErrorHandler(404, "COMMENT_ERR_004", ["Comment not found"]));
    });
}

function deleteComment(res, req, next) {
  return Comment.destroy({
    where: {
      id: req.params.id,
    },
  }).then((destroyed) => {
    if (destroyed) {
      res.status(200).json({ status: "SUCCESS", message: "Comment deleted successfully" });
    } else next(new ErrorHandler(404, "COMMENT_ERR_004", ["Comment not found"]));
  });
}

module.exports = { createComment, updateComment, getCommentById, deleteComment, getAllComment };
