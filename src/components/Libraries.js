import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "./DataProvider";

export default function Libraries() {
  const [showLibraries, setShowLibraries] = useState(null);
  const { libraries } = useData();

  useEffect(() => {
    setShowLibraries(libraries);
  }, [libraries]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Каталог бібліотек</h1>
      {showLibraries ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showLibraries.map((library) => (
            <div
              key={library.library_id}
              className="border rounded-lg p-6 shadow-md"
            >
              <div className="flex flex-col space-y-3 text-left">
                <h2 className="text-xl font-semibold text-center">
                  {library.library_name}
                </h2>
                <p>
                  <strong>Адреса:</strong> {library.address}
                </p>
                <p>
                  <strong>Телефон:</strong> {library.contact_number}
                </p>
                <p>
                  <strong>Години роботи:</strong> {library.working_hours}
                </p>
                <Link
                  key={library.library_id}
                  to={`/library/id/${library.library_id}/books`}
                >
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Переглянути книги
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
