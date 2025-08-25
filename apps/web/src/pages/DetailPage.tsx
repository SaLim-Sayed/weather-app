import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const API_KEY = "5796abbde9106b7da4febfae8c44c232";

export default function DetailPage() {
  const { city } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");
  const country = queryParams.get("country");

  const [weather, setWeather] = useState<any>(null);
  const [daily, setDaily] = useState<any[]>([]);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeather({ ...data.current, name: city, sys: { country } });
        setDaily(data.daily.slice(0, 7));
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [lat, lon, city, country]);

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-700">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        {weather.name}, {weather.sys?.country}
      </h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`}
          alt={weather.weather?.[0]?.description || "Weather icon"}
          className="w-32 h-32"
        />
        <p className="text-5xl font-bold">{Math.round(weather.temp)}°C</p>
        <p className="capitalize">{weather.weather?.[0]?.description}</p>
      </div>

      {/* Forecast */}
      {daily.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Daily Forecast</h3>
          <div className="flex gap-4 overflow-x-auto">
            {daily.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-blue-100 rounded-lg text-center min-w-[100px]"
              >
                <p className="font-semibold">
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
                <p className="font-bold">
                  {Math.round(item.temp.max)}° / {Math.round(item.temp.min)}°
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
