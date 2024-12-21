import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="w-1/3">{/* Пустой div для выравнивания */}</div>

        <div className="w-1/3 flex justify-center">
          <Link to="/">
            <img src="/logo.jpg" alt="Logo" className="h-12" />
          </Link>
        </div>

        <div className="w-1/3 flex justify-end">
          {isLoggedIn ? (
            <Link to="/Profile">
              <div className="w-10 h-10 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300 p-2">
                <img src="profile_icon.png" alt="" />
              </div>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
