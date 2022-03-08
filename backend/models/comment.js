const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db.js");

const Post = require("../models/post");
const User = require("../models/user");

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

Post.hasOne(Comment, { foreignKey: "postId" });
User.hasOne(Comment, { foreignKey: "author" });

module.exports = Comment;
