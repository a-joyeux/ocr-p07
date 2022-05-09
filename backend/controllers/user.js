const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

function createUser(res, req, next) {
  return User.create({ ...req.body }, { fields: ['email', 'password', 'lastName', 'firstName'] })
    .then((user) => {
      res.status(201).json({ status: 'SUCCESS', message: 'User created successfully' });
    })
    .catch((error) => {
      next(
        new ErrorHandler(
          500,
          'USER_ERR_001',
          error.errors.map((err) => err.message)
        )
      );
    });
}

function deleteUser(res, req, next) {
  return User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((destroyed) => {
    if (destroyed) {
      res.status(200).json({ status: 'SUCCESS', message: 'User deleted successfully' });
    } else next(new ErrorHandler(404, 'USER_ERR_004', ['Post not found']));
  });
}

function login(res, req, next) {
  return User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
          res.status(200).json({
            id: user.id,
            token: token,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          });
        } else {
          next(new ErrorHandler(404, 'USER_ERR_002', ['Email ou mot de passe incorrect']));
        }
      });
    })
    .catch((error) => {
      next(new ErrorHandler(404, 'USER_ERR_002', ['Email ou mot de passe incorrect']));
    });
}

module.exports = { createUser, login, deleteUser };
