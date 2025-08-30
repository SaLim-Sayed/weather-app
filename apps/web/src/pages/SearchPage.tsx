import { useAppCitySearch, type City } from "@weather-app/core/src/hooks/useAppCitySearch"; // ✅ use your new hook
import { FiMapPin, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import CityCard from "../shared-ui/WeatherCard";

export default function SearchPage() {
  const navigate = useNavigate();

 
  const {
    query,
    setQuery,
    cities,
    isCityLoading,
    handleCitySelect: baseHandleCitySelect,
    handleCurrentLocation,
    isLocationLoading,
    latestSearch,
   } = useAppCitySearch({
    os: "web",
    onCitySelect: (city) => {
      navigate(`/details/${city.name}/${city.coord.lat}/${city.coord.lon}/${city.sys?.country}`);
    },
  });

  // wrap to also store last search
  const handleCitySelect = (city: City) => {
     baseHandleCitySelect(city);
  };

  return (
    <div className="flex flex-col items-center text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-2">Weather Search</h1>
      <p className="text-gray-300 mb-6">Search for cities or use your location</p>

      <div className="flex items-center gap-2">
        <div className="flex-row items-center flex-1 relative rounded-full bg-white/10 backdrop-blur-sm">
          <Input
            value={query}
            placeholder="Search cities..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md min-w-80 border-0 bg-white/10 text-white pl-6 h-[50px] p-4 flex-1 rounded-full"
          />

          <Button
            className="h-14 w-14 rounded-full absolute top-1/2 -translate-y-1/2 right-0 items-center justify-center bg-cyan-500/30"
          >
            <FiSearch size={24} color="white" />
          </Button>
        </div>

        <Button
          className="h-14 w-14 rounded-full items-center justify-center bg-green-500/30"
          onClick={handleCurrentLocation}
          disabled={isLocationLoading}
        >
          <FiMapPin size={40} />
        </Button>
      </div>

      {isCityLoading && <p className="text-gray-300 mt-4">Loading...</p>}

      {cities.length > 0 && (
        <div className="flex flex-wrap gap-6 w-full justify-center items-center max-w-6xl mt-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} onClick={() => handleCitySelect(city)} />
          ))}
        </div>
      )}

      {latestSearch && (
        <div className="mt-10 w-full max-w-xl">
          <h2 className="text-gray-400 mb-4">Last Searched City</h2>
          <CityCard
            city={latestSearch}
            onClick={() => handleCitySelect(latestSearch)}
          />
        </div>
      )}
    </div>
  );
}
