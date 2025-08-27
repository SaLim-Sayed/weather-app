import type { TDailyWeather } from '@weather-app/core';

 

const WeatherStats = ({ weather }: { weather: TDailyWeather| any }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-4">
      <Stat label="Wind" value={`${weather.wind_speed} km/h`} icon="💨" />
      <Stat label="Humidity" value={`${weather.humidity}%`} icon="💧" />
      <Stat
        label="Sunrise"
        value={new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        icon="🌅"
      />
      <Stat
        label="Sunset"
        value={new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        icon="🌇"
      />
      <Stat label="Feels Like" value={`${Math.round(weather?.feels_like)}°C`} icon="🌡️" />
      <Stat
        label="Visibility"
        value={weather?.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}
        icon="👁️"
      />
      <Stat label="UV Index" value={weather?.uvi ? `${Math.round(weather.uvi)}` : 'N/A'} icon="☀️" />
      <Stat label="Pressure" value={`${weather.pressure} hPa`} icon="🏔️" />
      <Stat label="Wind Dir" value={weather?.wind_deg ? `${weather.wind_deg}°` : 'N/A'} icon="🧭" />
    </div>
  );
};

function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/10 rounded-2xl p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-white text-sm font-medium">{label}</div>
      <div className="text-white text-lg font-bold">{value}</div>
    </div>
  );
}

export default WeatherStats;
