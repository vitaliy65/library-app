import React from "react";
import { DataProvider } from "./components/DataProvider";
import { Routes, Route } from "react-router-dom";
import Libraries from "./components/Libraries";
import Books from "./components/Books";
import Header from "./components/Header";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import RegistrationForm from "./components/Registration";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Libraries />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/library/id/:id/books" element={<Books />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
