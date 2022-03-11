const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db.js");

const User = require("../models/user");
const Comment = require("../models/comment");

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

Post.hasMany(Comment, { foreignKey: "postId", onDelete: "cascade" });

module.exports = Post;
