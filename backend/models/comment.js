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
    post: {
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
    modelName: "Post",
  }
);

Post.hasOne(Comment, { foreignKey: "post" });
User.hasOne(Comment, { foreignKey: "author" });

module.exports = Post;
