const express = require("express");
const router = express.Router();
const passport = require("passport");
const Librarian = require("../../models/Librarian");
const isAdmin = require("../../middleware/admin");

//@route GET api/librarians/all
//@desc GET all librarians
//@access private
router.get("/all", async (req, res) => {
  try {
    const librarians = await Librarian.findAll();
    res.json(librarians);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні бібліотекарів" });
  }
});

//@route GET api/librarians/id
//@desc GET librarian by id
//@access private
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const librarian = await Librarian.findByPk(id);
      if (!librarian) {
        return res.status(404).json({ error: "Бібліотекаря не знайдено" });
      }
      res.json(librarian);
    } catch (err) {
      res.status(500).json({ error: "Помилка при отриманні бібліотекаря" });
    }
  }
);

//@route POST api/librarians/add
//@desc ADD librarian (for admin)
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { first_name, last_name, position, library_id } = req.body;
    try {
      const newLibrarian = await Librarian.create({
        first_name,
        last_name,
        position,
        library_id,
      });
      res.status(201).json(newLibrarian);
    } catch (err) {
      res.status(500).json({ error: "Помилка при додаванні бібліотекаря" });
    }
  }
);

//@route PUT api/librarians/id
//@desc UPDATE librarian by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, position, library_id } = req.body;
    try {
      const librarian = await Librarian.findByPk(id);
      if (!librarian) {
        return res.status(404).json({ error: "Бібліотекаря не знайдено" });
      }
      librarian.first_name = first_name;
      librarian.last_name = last_name;
      librarian.position = position;
      librarian.library_id = library_id;

      await librarian.save();
      res.json({ message: "Бібліотекаря оновлено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні бібліотекаря" });
    }
  }
);

//@route DELETE api/librarians/id
//@desc DELETE librarian by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const librarian = await Librarian.findByPk(id);
      if (!librarian) {
        return res.status(404).json({ error: "Бібліотекаря не знайдено" });
      }
      await librarian.destroy();
      res.json({ message: "Бібліотекаря видалено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при видаленні бібліотекаря" });
    }
  }
);

module.exports = router;
