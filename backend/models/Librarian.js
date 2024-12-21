const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Librarian = sequelize.define(
  "Librarian",
  {
    librarian_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    library_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Librarians",
    timestamps: false,
  }
);

module.exports = Librarian;
