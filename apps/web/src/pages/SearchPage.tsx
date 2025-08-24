import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const searchCities = async (value: string) => {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://samples.openweathermap.org/data/2.5/direct?q=${value}&limit=5&appid=b6907d289e10d714a6e88b30761fae22`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching cities", err);
    }
  };

  const handleSelect = (city: any) => {
    const cityName = city.name;
    const country = city.country;
    navigate(`/details/${cityName},${country}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Weather Search</h1>

      <div className="relative w-64">
        <Input
          placeholder="Enter city"
          value={query}
          onChange={(e) => searchCities(e.target.value)}
        />

        {results.length > 0 && (
          <ul className="absolute bg-white border rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-lg z-10">
            {results.map((city, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(city)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {city.name}, {city.state ? city.state + ", " : ""}
                {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        onClick={() => navigate(`/details/${query || "Montreal"}`)}
        className="w-64"
      >
        See Weather
      </Button>
    </div>
  );
}
