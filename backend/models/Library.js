const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Library = sequelize.define(
  "Library",
  {
    library_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    library_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    working_hours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Libraries",
    timestamps: false,
  }
);

module.exports = Library;
