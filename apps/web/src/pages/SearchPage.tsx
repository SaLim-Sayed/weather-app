import { useCitySearch } from "@weather-app/core/src/hooks/useCitySearch";
import { useNavigate } from "react-router-dom";
  
export default function SearchPage() {
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    cities,
    isCityLoading,
    handleCitySelect,
  } = useCitySearch((city: any) => {
    navigate(
      `/details/${city.name}?lat=${city.coord.lat}&lon=${city.coord.lon}&country=${city.sys?.country}`
    );
  });

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

      {isCityLoading && <p className="text-gray-300">Loading...</p>}

      {cities.length > 0 && (
        <div className="w-72 bg-gray-100 rounded-lg shadow-md divide-y">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {city.name}, {city.sys?.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
