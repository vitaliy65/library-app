const express = require("express");
const router = express.Router();
const passport = require("passport");
const Genre = require("../../models/Genre");
const isAdmin = require("../../middleware/admin");

//@route GET api/genres/all
//@desc GET all genres
//@access private
router.get("/all", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні жанрів" });
  }
});

//@route GET api/genres/id
//@desc GET genre by id
//@access public
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "Жанр не знайдено" });
    }
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні жанру" });
  }
});

//@route POST api/genres/add
//@desc ADD genre (for admin)
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { genre_name, genre_description } = req.body;
    try {
      const newGenre = await Genre.create({
        genre_name,
        genre_description,
      });
      res.status(201).json(newGenre);
    } catch (err) {
      res.status(500).json({ error: "Помилка при додаванні жанру" });
    }
  }
);

//@route PUT api/genres/id
//@desc UPDATE genre by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { genre_name, genre_description } = req.body;
    try {
      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ error: "Жанр не знайдено" });
      }
      genre.genre_name = genre_name;
      genre.genre_description = genre_description;

      await genre.save();
      res.json({ message: "Жанр оновлений" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні жанру" });
    }
  }
);

//@route DELETE api/genres/id
//@desc DELETE genre by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ error: "Жанр не знайдено" });
      }
      await genre.destroy();
      res.json({ message: "Жанр видалений" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при видаленні жанру" });
    }
  }
);

module.exports = router;
