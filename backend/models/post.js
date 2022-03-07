const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db.js");

const User = require("../models/user");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

User.hasOne(Post, { foreignKey: "author" });

module.exports = Post;
