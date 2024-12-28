import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [librarians, setLibrarians] = useState([]);
  const [genres, setGenres] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [authors, setAuthors] = useState([]);
  const token = localStorage.getItem("userToken");

  const fetchData = async () => {
    try {
      const [
        booksResponse,
        librariesResponse,
        librariansResponse,
        genresResponse,
        reservationsResponse,
        authorsResponse,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/books/all", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:5000/api/libraries/all", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:5000/api/librarians/all", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:5000/api/genres/all", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:5000/api/reservations/all", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:5000/api/authors/all", {
          headers: { Authorization: token },
        }),
      ]);
      setBooks(booksResponse.data);
      setLibraries(librariesResponse.data);
      setLibrarians(librariansResponse.data);
      setGenres(genresResponse.data);
      setReservations(reservationsResponse.data);
      setAuthors(authorsResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async () => {
    try {
      fetchData();
      console.log("im updating!");
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        books,
        libraries,
        librarians,
        genres,
        reservations,
        authors,
        updateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
