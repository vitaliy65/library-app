const { UserRole } = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const userRole = await UserRole.findOne({
      where: { user_id: req.user.user_id },
    });
    if (userRole && userRole.role === "Admin") {
      return next();
    }
    return res
      .status(403)
      .json({ error: "Доступ заборонено: недостатньо прав" });
  } catch (err) {
    return res.status(500).json({ error: "Помилка при перевірці ролі" });
  }
};

module.exports = isAdmin;
