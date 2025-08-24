import { useParams } from "react-router-dom";
import { useWeatherAxios } from "../../../../packages/core/src/api/weather";
import midRain from "../assets/mid-rain.png";
import { WeatherCard } from "./WeatherCard";
export default function DetailPage() {
    const { city = "London" } = useParams();
    const { data, loading, error } = useWeatherAxios(city);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{String(error)}</p>;
    if (!data) return <p className="text-center mt-10">No data available</p>;

    const toCelsius = (k: number) => Math.round(k - 273.15);

    const cards = [
        {
          title: "Humidity",
          value: `${data.main?.humidity}%`,
          icon: midRain,
        },
        {
          title: "Wind",
          value: `${data.wind?.speed} m/s`,
          icon: midRain,
        },
        {
          title: "Clouds",
          value: `${data.clouds?.all}%`,
          icon: midRain,
        },
      ];

    return (
        <div
            className="relative w-full mx-auto mt-10 rounded-3xl p-6 flex flex-col items-center text-white shadow-xl"

        >
            {/* Temperature & City */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-6xl font-bold">
                        {toCelsius(data.main?.temp ?? 0)}°
                    </div>
                    <div className="text-lg">
                        H:{toCelsius(data.main?.temp_max ?? 0)}° | L:
                        {toCelsius(data.main?.temp_min ?? 0)}°
                    </div>
                    <div className="mt-1 text-xl font-medium">
                        {data.name}, {data.sys?.country}
                    </div>
                </div>
              
            </div>

            {/* Description */}
            <p className="mt-2 text-right text-md capitalize">
                {data.weather?.[0]?.description}
            </p>

            <div className="flex gap-4 mt-6 justify-center w-full flex-wrap">
        {cards.map((card) => (
          <WeatherCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>
        </div>
    );
}