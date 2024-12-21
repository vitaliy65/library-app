import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [userData, SetUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    await axios
      .post("http://localhost:5000/api/users/register", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) navigate("/login");
      })
      .catch((err) => {
        setSubmitError(err.response.data);
        setIsSubmitting(false);
      });
  };

  const setUserData = (data) => {
    SetUserData({
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
  };

  const renderInputField = (label, id, error, onChange) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type="text"
          onChange={onChange}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Создать новый аккаунт
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-left">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-6" onSubmit={onSubmit}>
            {renderInputField(
              "Полное имя",
              "full_name",
              submitError?.full_name,
              (e) => setUserData({ ...userData, full_name: e.target.value })
            )}
            {renderInputField(
              "Имя пользователя",
              "username",
              submitError?.username,
              (e) => setUserData({ ...userData, username: e.target.value })
            )}
            {renderInputField("Email", "email", submitError?.email, (e) =>
              setUserData({ ...userData, email: e.target.value })
            )}
            {renderInputField("Телефон", "phone", submitError?.phone, (e) =>
              setUserData({ ...userData, phone: e.target.value })
            )}
            {renderInputField(
              "Пароль",
              "password",
              submitError?.password,
              (e) => setUserData({ ...userData, password: e.target.value })
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Уже есть аккаунт?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
