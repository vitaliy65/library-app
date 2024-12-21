const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Genre = sequelize.define(
  "Genre",
  {
    genre_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Genres",
    timestamps: false,
  }
);

module.exports = Genre;
