const { Sequelize } = require("sequelize");
const dbConfig = require("./database");

const sequelize = new Sequelize({
  dialect: "mssql",
  dialectModule: require("tedious"),
  dialectOptions: {
    options: {
      instanceName: "SQLEXPRESS01",
      trustedConnection: true,
    },
    driver: "SQL Server Native Client 11.0",
  },
  host: dbConfig.server,
  port: 1433,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
});

module.exports = sequelize;
