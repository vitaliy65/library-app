const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const sequelize = require("./config/sequelize");
require("./config/passport");

const users = require("./routes/api/users");
const books = require("./routes/api/books");
const genres = require("./routes/api/genres");
const authors = require("./routes/api/authors");
const librarians = require("./routes/api/librarians");
const libraries = require("./routes/api/libraries");
const reservations = require("./routes/api/reservations");

const app = express();

// Middleware Setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Use Routes
app.use("/api/users", users);
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/api/authors", authors);
app.use("/api/librarians", librarians);
app.use("/api/libraries", libraries);
app.use("/api/reservations", reservations);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize
  .sync()
  .then(() => {
    console.log("Синхронізація з базою даних успішна");
  })
  .catch((err) => {
    console.error("Помилка синхронізації з базою даних:", err);
  });
