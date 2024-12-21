const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Author = sequelize.define(
  "Author",
  {
    author_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Authors",
    timestamps: false,
  }
);

module.exports = Author;
