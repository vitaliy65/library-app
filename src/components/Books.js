import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useData } from "./DataProvider";
import CustomAlert from "./CustomAlert";

export default function Books() {
  const { id } = useParams();
  const { books, librarians, libraries, genres } = useData();
  const [userData, setUserData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const library = libraries[id];
  const filteredBooks = books.filter(
    (book) => book.library_id === parseInt(id)
  );
  const filteredlibraries = librarians.filter(
    (librarian) => librarian.library_id === parseInt(id)
  );

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    // информация про зарегистрированного юзера
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

    fetchUserData();
  }, [id]);

  const HandleReservation = async (user_id, book_id, librarian_id) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setShowAlert(true);
      return;
    }
    const status = "reserved";
    await axios
      .post(
        `http://localhost:5000/api/reservations/add`,
        {
          user_id,
          book_id,
          librarian_id,
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log("Резервування успішно створено");
      })
      .catch((err) => {
        console.error("Помилка при створенні резервування:");
      });

    await axios
      .post(
        `http://localhost:5000/api/books/id/${book_id}/changeStatus`,
        { status },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log("Статус успішно змінено");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Помилка при зміні статусу:" + err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          &larr; Назад до списку бібліотек
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Книги бібліотеки: {library ? library.library_name : "Завантаження..."}
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Бібліотекарі:{" "}
          {filteredlibraries.length > 0
            ? filteredlibraries.map((librarian) => (
                <div key={librarian.id}>
                  {librarian.first_name} {librarian.last_name}:{" "}
                  {librarian.position}
                </div>
              ))
            : "Завантаження..."}
        </h2>
        {books ? (
          <div className="space-y-6">
            {filteredBooks.filter((book) => book.copies > 0).length > 0 ? (
              filteredBooks
                .filter((book) => book.copies > 0)
                .map((book) => {
                  const genre = genres.find(
                    (g) => g.genre_id === book.genre_id
                  );
                  return (
                    <div
                      key={book.book_id}
                      className="bg-white shadow-lg rounded-lg overflow-hidden flex mb-4"
                    >
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-1/3 h-auto object-cover"
                      />
                      <div className="p-6 w-2/3">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          {book.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          Автор: {book.author_name || "Невідомий"}
                        </p>
                        <p className="text-gray-700 mb-4">{book.description}</p>
                        <div className="grid grid-cols-1 gap-4 text-left">
                          <div>
                            <p className="text-sm text-gray-500">
                              Рік видання: {book.publication_year}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Кількість копій: {book.copies}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Жанр: {genre.genre_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Опис жанру: {genre.genre_description}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <button
                              onClick={() =>
                                HandleReservation(
                                  userData?.user_id,
                                  book.book_id,
                                  filteredlibraries[0].librarian_id
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Зарезервувати
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-gray-600">Доступних книг в наявності немає</p>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {showAlert && (
          <CustomAlert
            message="Для резервування книги вам потрібно залогінитися."
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </div>
  );
}
