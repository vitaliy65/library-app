import React, { useState, useEffect } from "react";
import { useData } from "./DataProvider";
import axios from "axios";
import CustomAddForm from "./CustomAddForm";

const AdminPage = () => {
  const { books, libraries, librarians, genres, reservations, authors } =
    useData();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [userData, setUserData] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [keysToAdd, setKeysToAdd] = useState(null);

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

    fetchUserData();
  }, []);

  const categories = {
    books,
    libraries,
    librarians,
    genres,
    reservations,
    authors,
  };

  const getItemId = (item) => {
    const idKey =
      Object.keys(item).find((key) => key.toLowerCase().includes("id")) || "";
    return item[idKey]?.toString() || "";
  };

  const handleSearch = (items) => {
    return items.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleAdd = (Category) => {
    const categoryToAdd = Object.entries(categories)
      .map(([category, items]) => {
        if (Category === category) return items;
      })
      .filter((item) => item !== undefined);

    const firstItemKeys = categoryToAdd[0]
      ? Object.keys(categoryToAdd[0][0]).slice(1)
      : [];

    setShowForm(true);
    setAddCategory(Category);
    setKeysToAdd(firstItemKeys);
  };

  const handleEdit = (item) => {
    const id = getItemId(item);
    setEditingId(id);
    setEditedItem(item);
  };

  const handleSave = async (category) => {
    const token = localStorage.getItem("userToken");
    const id = getItemId(editedItem);
    await axios
      .put(`http://localhost:5000/api/${category}/id/${id}`, editedItem, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setEditingId(null);
    setEditedItem(null);
  };

  const handleDelete = async (category, item) => {
    const token = localStorage.getItem("userToken");
    const id = getItemId(item);
    await axios
      .delete(`http://localhost:5000/api/${category}/id/${id}`, {
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

  const handleChange = (key, value) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [key]: value });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {userData && userData.role === "Admin" ? (
        Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-6">
            <button
              className="w-full bg-blue-500 text-white p-3 rounded-t-lg font-semibold text-left"
              onClick={() =>
                setActiveCategory(activeCategory === category ? null : category)
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>

            {activeCategory === category && (
              <div className="border border-t-0 border-gray-200 p-4 rounded-b-lg">
                <div className="mb-4 flex justify-between">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAdd(category)}
                  >
                    Add New
                  </button>
                </div>

                <table className="w-full">
                  <thead>
                    <tr>
                      {Object.keys(items[0] || {}).map((key) => (
                        <th key={key} className="text-left p-2">
                          {key}
                        </th>
                      ))}
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {handleSearch(items).map((item) => {
                      const itemId = getItemId(item);
                      return (
                        <tr key={itemId}>
                          {Object.entries(item).map(([key, value]) => (
                            <td key={key} className="p-2">
                              {editingId === itemId ? (
                                <input
                                  type="text"
                                  value={editedItem?.[key] || ""}
                                  onChange={(e) =>
                                    handleChange(key, e.target.value)
                                  }
                                  className="border p-1 w-full"
                                />
                              ) : (
                                value
                              )}
                            </td>
                          ))}
                          <td className="p-2">
                            {editingId === itemId ? (
                              <button
                                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                onClick={() => handleSave(category)}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </button>
                            )}
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDelete(category, item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Не достатньо прав</p>
      )}
      {showForm && (
        <CustomAddForm
          category={addCategory}
          keys={keysToAdd}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
