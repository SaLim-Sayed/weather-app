import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiQuery } from "@weather-app/core";
 
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

 const {data: location = {list: []}} = useApiQuery<{list: any[]}>({
    key: ["search-city", query],
    url:
      query.length > 2
        ? `/data/2.5/find?q=${query}&appid=${API_KEY}&units=metric`
        : null,
    enabled: query.length > 2,
   
  });
  console.log({location})

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Weather Search</h1>
      <input
        type="text"
        value={query}
        placeholder="Search city"
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg w-72"
      />

      {location?.list?.length > 0 && (
        <div className="w-72 bg-gray-100 rounded-lg shadow-md divide-y">
          {location?.list?.map((item) => (
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
