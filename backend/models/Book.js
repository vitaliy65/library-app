const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    library_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Books",
    timestamps: false,
  }
);

module.exports = Book;
