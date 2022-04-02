const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../helpers/error');
const Comment = require('../models/comment');
const Post = require('../models/post');
var SALT_WORK_FACTOR = 10;

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'DEFAULT',
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  }
);

User.hasMany(Comment, { foreignKey: 'author', onDelete: 'cascade' });
User.hasMany(Post, { foreignKey: 'author', onDelete: 'cascade' });

Comment.belongsTo(User, { foreignKey: 'author' });
Post.belongsTo(User, { foreignKey: 'author' });

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, SALT_WORK_FACTOR)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new ErrorHandler(500, ['Password cannot be hashed']);
    });
});
module.exports = User;
