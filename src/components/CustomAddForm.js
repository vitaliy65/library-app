import React, { useState } from "react";
import axios from "axios";

const CustomAddForm = ({ category, keys, onClose }) => {
  const [newItem, setNewItem] = useState({});

  const handleChange = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    await axios
      .post(`http://localhost:5000/api/${category}/add`, newItem, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <form onSubmit={handleSubmit} className="mb-4">
          {keys.map((key) => (
            <div key={key} className="mb-2">
              <label className="block">{key}</label>
              <input
                type="text"
                value={newItem[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border p-1 w-full"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mr-10"
          >
            Додати
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Закрити
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomAddForm;
