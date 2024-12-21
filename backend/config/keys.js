const dbConfig = require("./database");

module.exports = {
  connectionString: `Server=${dbConfig.server};Database=${dbConfig.database};Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}`,
  secretOrKey: "secret", // секретный ключ для JWT
};
