import type { TDailyWeather } from '@weather-app/core';

const WeatherStats = ({ weather }: { weather: TDailyWeather }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <div className="text-blue-400 text-2xl mb-2">💨</div>
        <div className="text-white text-sm font-medium">Wind</div>
        <div className="text-white text-lg font-bold">{weather?.wind_speed} km/h</div>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <div className="text-blue-400 text-2xl mb-2">💧</div>
        <div className="text-white text-sm font-medium">Humidity</div>
        <div className="text-white text-lg font-bold">{weather.humidity}%</div>
      </div>

      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <div className="text-yellow-400 text-2xl mb-2">🌅</div>
        <div className="text-white text-sm font-medium">Sunrise</div>
        <div className="text-white text-lg font-bold">
          {new Date(weather.sunrise * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;