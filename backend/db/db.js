const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

module.exports = sequelize;
