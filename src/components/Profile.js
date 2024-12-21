import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useData } from "./DataProvider";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState(null);
  const { books } = useData();

  const filteredReservations =
    reservations && userData
      ? reservations.filter(
          (reservation) => reservation.user_id === userData.user_id
        )
      : [];

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    const fetchUserData = async () => {
      await axios
        .get("http://localhost:5000/api/users/current", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    };

    const UpdateReservationData = async () => {
      const token = localStorage.getItem("userToken");
      await axios
        .get("http://localhost:5000/api/reservations/all", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setReservations(res.data);
        })
        .catch((err) => {
          console.log("Помилка при оновленні даних резервування:", err);
        });
    };

    fetchUserData();
    UpdateReservationData();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
  };

  const handleDeleteReservation = async (reservationId, bookId) => {
    const token = localStorage.getItem("userToken");
    const status = "available";

    await axios
      .post(
        `http://localhost:5000/api/books/id/${bookId}/changeStatus`,
        { status },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log("Статус успішно змінено");
      })
      .catch((err) => {
        console.error("Помилка при зміні статусу:" + err);
      });

    await axios
      .delete(`http://localhost:5000/api/reservations/id/${reservationId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        window.location.reload();
        console.log("Резервування успішно видалено");
      })
      .catch((err) => {
        console.error("Помилка при видаленні резервування:", err);
      });
  };

  const UpdateReservations = () => {
    filteredReservations = userData
      ? reservations.filter(
          (reservation) => reservation.user_id === userData.user_id
        )
      : [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        &larr; Назад на головну
      </Link>

      {userData && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-2">
              {userData.full_name.toUpperCase()}
            </h1>
            <p className="text-gray-600 text-center mb-4">
              {userData.username}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {userData.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Телефон:</span> {userData.phone}
              </p>
            </div>
          </div>
        </div>
      )}

      {() => {
        UpdateReservations();
      }}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Зарезервовані книги</h2>
          {filteredReservations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredReservations.map((reservation) => {
                const book = books.find(
                  (b) => b.book_id === reservation.book_id
                );
                return (
                  <li key={reservation.reservation_id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">
                          {book
                            ? book.title
                            : `Книга ID: ${reservation.book_id}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          Дата резервації:{" "}
                          {new Date(
                            reservation.reservation_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            reservation.status === "active"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {reservation.status}
                        </p>
                        <button
                          onClick={() =>
                            handleDeleteReservation(
                              reservation.reservation_id,
                              reservation.book_id
                            )
                          }
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-300"
                        >
                          Видалити
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">У вас немає активних резервацій.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center m-5">
        <Link to="/" onClick={handleLogOut}>
          <div className="w-20 h-10 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300 p-2 text-white mr-10">
            Log out
          </div>
        </Link>
        {userData && userData.role === "Admin" ? (
          <Link to="/Admin">
            <div className="w-35 h-10 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300 p-2 text-white">
              Admin panel
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
