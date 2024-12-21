const express = require("express");
const router = express.Router();
const passport = require("passport");
const Reservation = require("../../models/Reservation");
const isAdmin = require("../../middleware/admin");

//@route GET api/reservations/all
//@desc GET all reservations
//@access private
router.get("/all", async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні резервувань" });
  }
});

//@route GET api/reservations/id
//@desc GET reservation by id
//@access private
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Резервування не знайдено" });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні резервування" });
  }
});

//@route POST api/reservations/add
//@desc ADD reservation (for admin)
//@access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id, book_id, librarian_id } = req.body;
    const reservation_date = new Date().toISOString();
    const status = "active";
    try {
      const newReservation = await Reservation.create({
        reservation_date,
        user_id,
        book_id,
        status,
        librarian_id,
      });
      console.log(newReservation);
      res.status(201).json(newReservation);
    } catch (err) {
      res.status(500).json({
        error: "Помилка при додаванні резервування",
        ERROR: err,
      });
    }
  }
);

//@route PUT api/reservations/id
//@desc UPDATE reservation by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { reservation_date, user_id, book_id, status, librarian_id } =
      req.body;
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return res.status(404).json({ error: "Резервування не знайдено" });
      }
      reservation.reservation_date = reservation_date;
      reservation.user_id = user_id;
      reservation.book_id = book_id;
      reservation.status = status;
      reservation.librarian_id = librarian_id;

      await reservation.save();
      res.json({ message: "Резервування оновлено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні резервування" });
    }
  }
);

//@route DELETE api/reservations/id
//@desc DELETE reservation by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return res.status(404).json({ error: "Резервування не знайдено" });
      }
      await reservation.destroy();
      res.json({ message: "Резервування видалено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при видаленні резервування" });
    }
  }
);

module.exports = router;
