const { ErrorHandler } = require('../helpers/error');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

function createPost(res, req, next) {
  return Post.create({ ...req.body, author: req.user.id })
    .then((post) => {
      res.status(201).json({ status: 'SUCCESS', message: 'Post created successfully' });
    })
    .catch((error) => {
      console.log(error);
      next(
        new ErrorHandler(
          500,
          'POST_ERR_001',
          error.errors.map((err) => err.message)
        )
      );
    });
}

function getAllPost(res, req, next) {
  return Post.findAll({
    include: [
      {
        model: User,
        attributes: ['lastName', 'firstName'],
      },
      {
        model: Comment,
      },
    ],
  })
    .then((posts) => {
      if (posts.length == 0) next(new ErrorHandler(404, 'POST_ERR_004', ['Post not found']));
      else {
        const filters = req.query;
        const filteredPosts = posts.filter((post) => {
          let isValid = true;
          for (key in filters) {
            isValid = isValid && post[key] == filters[key];
          }
          return isValid;
        });
        res.status(200).json(filteredPosts);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getPostById(res, req, next) {
  return Post.findByPk(req.params.id).then((post) => {
    if (!post) next(new ErrorHandler(404, 'POST_ERR_004', ['Post not found']));
    else res.status(200).json(post);
  });
}

function updatePost(res, req, next) {
  return Post.findByPk(req.params.id).then((post) => {
    if (!post) next(new ErrorHandler(404, 'POST_ERR_004', ['Post not found']));
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
          res.status(200).json({ status: 'SUCCESS', message: 'Post updated successfully' });
        })
        .catch((error) => {
          next(
            new ErrorHandler(
              500,
              'POST_ERR_002',
              error.errors.map((err) => err.message)
            )
          );
        });
    } else {
      next(new ErrorHandler(500, 'POST_ERR_003', ['You are not allowed to modify this post.']));
    }
  });
}

function deletePost(res, req, next) {
  return Post.destroy({
    where: {
      id: req.params.id,
    },
  }).then((destroyed) => {
    if (destroyed) {
      res.status(200).json({ status: 'SUCCESS', message: 'Post deleted successfully' });
    } else next(new ErrorHandler(404, 'POST_ERR_005', ['Post not found']));
  });
}

module.exports = { createPost, updatePost, getPostById, deletePost, getAllPost };
