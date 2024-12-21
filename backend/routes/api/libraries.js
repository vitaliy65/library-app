const express = require("express");
const router = express.Router();
const passport = require("passport");
const Library = require("../../models/Library");
const Book = require("../../models/Book");
const Librarian = require("../../models/Librarian");
const isAdmin = require("../../middleware/admin");

//@route GET api/libraries/all
//@desc GET all libraries
//@access public
router.get("/all", async (req, res) => {
  try {
    const libraries = await Library.findAll();
    res.json(libraries);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні бібліотек" });
  }
});

//@route GET api/libraries/id
//@desc GET library by id
//@access public
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const library = await Library.findByPk(id);
    if (!library) {
      return res.status(404).json({ error: "Бібліотеку не знайдено" });
    }
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні бібліотеки" });
  }
});

//@route GET api/library/id/:libraryId/books
//@desc GET all books for this library
//@access private
router.get(
  "/id/:libraryId/books",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { libraryId } = req.params;
    try {
      const library = await Library.findByPk(libraryId);
      if (!library) {
        return res.status(404).json({ error: "Бібліотека не знайдена" });
      }
      const books = await Book.findAll({ where: { library_id: libraryId } });
      if (!books || books.length === 0) {
        return res
          .status(404)
          .json({ error: "Книги не знайдено для цієї бібліотеки" });
      }
      res.json(books);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Помилка при отриманні книг для бібліотеки" });
    }
  }
);

router.get("/id/:libraryId/librarians", async (req, res) => {
  const { libraryId } = req.params;
  try {
    const library = await Library.findByPk(libraryId);
    if (!library) {
      return res.status(404).json({ error: "Бібліотека не знайдена" });
    }
    const librarians = await Librarian.findAll({
      where: { library_id: libraryId },
    });
    if (!librarians || librarians.length === 0) {
      return res
        .status(404)
        .json({ error: "Бібліотекарі не знайдені для цієї бібліотеки" });
    }
    res.json(librarians);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Помилка при отриманні бібліотекарів для бібліотеки" });
  }
});

//@route ADD api/libraries/id
//@desc ADD library (for admin)
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { library_name, address, contact_number, working_hours } = req.body;
    try {
      const newLibrary = await Library.create({
        library_name,
        address,
        contact_number,
        working_hours,
      });
      res.status(201).json(newLibrary);
    } catch (err) {
      res.status(500).json({ error: "Помилка при додаванні бібліотеки" });
    }
  }
);

//@route UPDATE api/libraries/id
//@desc UPDATE library by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { library_name, address, contact_number, working_hours } = req.body;
    try {
      const library = await Library.findByPk(id);
      if (!library) {
        return res.status(404).json({ error: "Бібліотеку не знайдено" });
      }
      library.library_name = library_name;
      library.address = address;
      library.contact_number = contact_number;
      library.working_hours = working_hours;

      await library.save();
      res.json({ message: "Бібліотеку оновлено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні бібліотеки" });
    }
  }
);

//@route DELETE api/libraries/id
//@desc DELETE library by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const library = await Library.findByPk(id);
      if (!library) {
        return res.status(404).json({ error: "Бібліотеку не знайдено" });
      }
      await library.destroy();
      res.json({ message: "Бібліотеку видалено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при видаленні бібліотеки" });
    }
  }
);

module.exports = router;
