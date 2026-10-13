const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("social_app", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = sequelize;
