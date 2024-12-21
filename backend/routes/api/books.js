const express = require("express");
const router = express.Router();
const passport = require("passport");
const Book = require("../../models/Book");
const isAdmin = require("../../middleware/admin");

//@route GET api/books/all
//@desc GET all books
//@access private
router.get("/all", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні книг" });
  }
});

//@route GET api/books/id
//@desc GET book by id
//@access private
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: "Книгу не знайдено" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні книги" });
  }
});

//@route POST api/books/add
//@desc ADD book (for admin)
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const {
      title,
      author_id,
      publication_year,
      copies,
      status,
      genre_id,
      library_id,
    } = req.body;
    try {
      const newBook = await Book.create({
        title,
        author_id,
        publication_year,
        copies,
        status,
        genre_id,
        library_id,
      });
      res.status(201).json(newBook);
    } catch (err) {
      res.status(500).json({ error: "Помилка при додаванні книги" });
    }
  }
);

//@route PUT api/books/id
//@desc UPDATE book by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { title, author_id, publication_year, copies, status, genre_id } =
      req.body;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ error: "Книгу не знайдено" });
      }
      book.title = title;
      book.author_id = author_id;
      book.publication_year = publication_year;
      book.copies = copies;
      book.status = status;
      book.genre_id = genre_id;

      await book.save();
      res.json({ message: "Книга оновлена" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні книги" });
    }
  }
);

//@route POST api/books/id/:id/changeStatus
//@desc CHANGE status of a book (for admin)
//@access private
router.post(
  "/id/:id/changeStatus",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Отримуємо id книги та новий статус з тіла запиту
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ error: "Книгу не знайдено" });
      }

      if (
        book.copies > 0 &&
        status === "reserved" &&
        book.status === "available"
      ) {
        book.copies -= 1;
      } else if (
        book.copies >= 0 &&
        status === "available" &&
        book.status === "available"
      ) {
        book.copies += 1;
      } else if (book.copies === 0 && status === "available") {
        book.copies += 1;
      } else if (book.copies === 0 && status === "reserved") {
        return res.status(404).json({ error: "Книг більше немає" });
      }

      if (book.copies === 0) book.status = "checked out";

      await book.save(); // Зберігаємо зміни
      res.json({ message: "Статус книги оновлено", book });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні статусу книги" });
    }
  }
);

//@route DELETE api/books/id
//@desc DELETE book by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ error: "Книгу не знайдено" });
      }
      await book.destroy();
      res.json({ message: "Книга видалена" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при видаленні книги" });
    }
  }
);

module.exports = router;
