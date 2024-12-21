const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { User, UserRole } = require("../../models/User");
const isAdmin = require("../../middleware/admin");
const Reservation = require("../../models/Reservation");
const { validateRegistrationData } = require("../../validation/validation");

//@route POST api/users/login
//@desc login user / returning the token
//@access public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Користувач не знайдений" });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Неправильний пароль" });
    }

    // Отримання ролі користувача
    const userRole = await UserRole.findOne({
      where: { user_id: user.user_id },
    });

    // Створення JWT токену
    const payload = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: userRole ? userRole.role : null, // Додаємо роль до payload
    };
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
    res.json({
      success: true,
      token: "Bearer " + token,
    });
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні користувача" });
  }
});

//@route POST api/users/register
//@desc register user
//@access public
router.post("/register", async (req, res) => {
  const { full_name, username, email, phone, password } = req.body;

  // Валідація даних
  const { errors, isValid } = validateRegistrationData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // Перевірка, чи існує користувач
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Користувач вже існує" });
    }

    // Хешування паролю
    const hashedPassword = await hashPassword(password);

    // Створення нового користувача
    const newUser = await User.create({
      full_name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    // Додавання ролі для нового користувача
    await UserRole.create({
      user_id: newUser.user_id,
      role: "Reader", // Встановлення ролі (можна змінити за потреби)
    });

    res.json({ success: true, user: { full_name, username, email, phone } });
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

//@route  GET api/users/current
//@desc   Return current user
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userRole = await UserRole.findOne({
      where: { user_id: req.user.user_id },
    });
    res.json({
      user_id: req.user.user_id,
      full_name: req.user.full_name,
      username: req.user.username,
      email: req.user.email,
      phone: req.user.phone,
      role: userRole.role,
    });
  }
);

//@route GETi/users/reservations
//@desc Get all reservations for the current user
//@access private
router.get(
  "/reservations",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const reservations = await Reservation.findAll({
        where: { user_id: req.user.user_id },
      });
      if (!reservations || reservations.length === 0) {
        return res
          .status(404)
          .json({ error: "Жодних резервувань не знайдено" });
      }
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: "Помилка при отриманні резервувань" });
    }
  }
);

//@route GET api/users/id
//@desc Return user by id (for admin)
//@access private
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Користувач не знайдений" });
      }
      res.json({
        user: {
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "Помилка при отриманні користувача" });
    }
  }
);

//@route GET api/users/all
//@desc Return all users (for admin)
//@access private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      const users = await User.findAll();
      if (!users) {
        return res
          .status(404)
          .json({ error: "Жодного користувача не знайдено!" });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Помилка при отриманні користувачів" });
    }
  }
);

//@route PUT api/users/id
//@desc Update user by id (for admin)
//@access private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { full_name, username, email, phone } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Користувач не знайдений" });
      }

      user.full_name = full_name;
      user.username = username;
      user.email = email;
      user.phone = phone;

      await user.save();
      res.json({ message: "Користувач оновлений" });
    } catch (err) {
      res.status(500).json({ error: "Помилка при оновленні користувача" });
    }
  }
);

//@route DELETE api/users/id
//@desc Delete user by id (for admin)
//@access private
router.delete(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Користувач не знайдений" });
      }
      await UserRole.destroy({ where: { user_id: id } });
      await User.destroy({ where: { user_id: id } });
      res.json({ message: "Користувач видалений" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Помилка при видаленні користувача: " + err });
    }
  }
);

// Функція для хешування паролю
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = router;
