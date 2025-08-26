import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "5796abbde9106b7da4febfae8c44c232";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setLocation([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        if (data?.list) {
          setLocation(data.list);
        } else {
          setLocation([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const handler = setTimeout(() => {
      fetchCities();
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Weather Search</h1>
      <input
        type="text"
        value={query}
        placeholder="Search city"
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg w-72"
      />

      {location.length > 0 && (
        <div className="w-72 bg-gray-100 rounded-lg shadow-md divide-y">
          {location.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                navigate(
                  `/details/${item.name}?lat=${item.coord.lat}&lon=${item.coord.lon}&country=${item.sys?.country}`
                )
              }
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {item.name}, {item.sys?.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
