const express = require("express");
const router = express.Router();
const passport = require("passport");
const Author = require("../../models/Author");
const isAdmin = require("../../middleware/admin");

//@route GET api/authors/all
//@desc GET all authors
//@access private
router.get("/all", async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні авторів" });
  }
});

//@route GET api/authors/id
//@desc GET author by id
//@access private
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({ error: "Автора не знайдено" });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні автора" });
  }
});

//@route POST api/authors/add
//@desc ADD author (for admin)
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { name, birth_year } = req.body;
    try {
      const newAuthor = await Author.create({
        name,
        birth_year,
      });
      res.status(201).json(newAuthor);
    } catch (err) {
      res.status(500).json({ error: "Помилка при додаванні автора" });
    }
  }
);

//@route PUT api/authors/id
//@desc UPDATE author by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { name, birth_year } = req.body;
    try {
      const author = await Author.findByPk(id);
      if (!author) {
        return res.status(404).json({ error: "Автора не знайдено" });
      }
      author.name = name;
      author.birth_year = birth_year;

      await author.save();
      res.json({ message: "Автор оновлений" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні автора" });
    }
  }
);

//@route DELETE api/authors/id
//@desc DELETE author by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const author = await Author.findByPk(id);
      if (!author) {
        return res.status(404).json({ error: "Автора не знайдено" });
      }
      await author.destroy();
      res.json({ message: "Автор видалено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при видаленні автора" });
    }
  }
);

module.exports = router;
