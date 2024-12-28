import React from "react";
import { Routes, Route } from "react-router-dom";
import Libraries from "./components/Libraries";
import Books from "./components/Books";
import Header from "./components/Header";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import RegistrationForm from "./components/Registration";
import AdminPage from "./components/AdminPage";
import { useData } from "./components/DataProvider";

function App() {
  const { books, libraries, librarians, genres, reservations, authors } =
    useData();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Libraries />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route
          path="/Profile"
          element={<Profile reservations={reservations} />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/library/id/:id/books"
          element={
            <Books
              books={books}
              librarians={librarians}
              libraries={libraries}
              genres={genres}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
