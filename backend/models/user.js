const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db.js");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../helpers/error");
var SALT_WORK_FACTOR = 10;

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Member",
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new ErrorHandler(500, ["Password cannot be hashed"]);
    });
});
module.exports = User;
