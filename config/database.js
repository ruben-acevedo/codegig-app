const sequelize = require("sequelize");

module.exports = new sequelize("codegig", "root", "mariapass", {
  host: "localhost",
  port: 3306,
  dialect: "mariadb"
});
