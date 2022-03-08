const User = require("../models/user");
const { ErrorHandler } = require("../helpers/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

function createUser(res, req, next) {
  return User.create({ ...req.body }, { fields: ["email", "password"] })
    .then((user) => {
      res.status(201).json({ status: "SUCCESS", message: "User created successfully" });
    })
    .catch((error) => {
      next(
        new ErrorHandler(
          500,
          "USER_ERR_001",
          error.errors.map((err) => err.message)
        )
      );
    });
}

function login(res, req, next) {
  return User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
          res.status(200).json({ token: token });
        } else {
          next(new ErrorHandler(404, "USER_ERR_002", ["Invalid credentials"]));
        }
      });
    })
    .catch((error) => {
      next(new ErrorHandler(404, "USER_ERR_002", ["Invalid credentials"]));
    });
}

module.exports = { createUser, login };
