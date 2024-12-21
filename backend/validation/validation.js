const validateRegistrationData = (data) => {
  const errors = {};

  // Перевірка повного імені
  if (!data.full_name || data.full_name.trim() === "") {
    errors.full_name = "Повне ім'я є обов'язковим";
  }

  // Перевірка імені користувача
  if (!data.username || data.username.trim() === "") {
    errors.username = "Ім'я користувача є обов'язковим";
  }

  // Перевірка електронної пошти
  if (!data.email || data.email.trim() === "") {
    errors.email = "Електронна пошта є обов'язковою";
  }

  // Перевірка телефону
  if (!data.phone || data.phone.trim() === "") {
    errors.phone = "Телефон є обов'язковим";
  }

  // Перевірка пароля
  if (!data.password || data.password.length < 6) {
    errors.password = "Пароль повинен містити не менше 6 символів";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = {
  validateRegistrationData,
};
