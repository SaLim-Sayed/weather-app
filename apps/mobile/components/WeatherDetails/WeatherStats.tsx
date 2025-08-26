import { Text, View } from "react-native";

type Weather = {
  wind_speed: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  feels_like: number;
  visibility?: number;
  uvi?: number;
  pressure: number;
  wind_deg?: number;
};

type Props = {
  weather: Weather;
};

export default function WeatherStats({ weather }: Props) {
  return (
    <View className="mx-4 mb-6">
      {/* Row 1 */}
      <View className="flex-row items-center justify-between mb-4 gap-2">
        <Stat label="Wind" value={`${weather?.wind_speed} km/h`} icon="💨" />
        <Stat label="Humidity" value={`${weather?.humidity}%`} icon="💧" />
        <Stat
          label="Sunrise"
          value={new Date(weather?.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          icon="🌅"
        />
      </View>

      {/* Row 2 */}
      <View className="flex-row items-center justify-between mb-4 gap-2">
        <Stat
          label="Sunset"
          value={new Date(weather?.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          icon="🌇"
        />
        <Stat label="Feels Like" value={`${Math.round(weather?.feels_like)}°C`} icon="🌡️" />
        <Stat
          label="Visibility"
          value={weather?.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "N/A"}
          icon="👁️"
        />
      </View>

      {/* Row 3 */}
      <View className="flex-row items-center justify-between gap-2">
        <Stat label="UV Index" value={weather.uvi ? `${Math.round(weather.uvi)}` : "N/A"} icon="☀️" />
        <Stat label="Pressure" value={`${weather.pressure} hPa`} icon="🏔️" />
        <Stat label="Wind Dir" value={weather.wind_deg ? `${weather.wind_deg}°` : "N/A"} icon="🧭" />
      </View>
    </View>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
      <Text className="text-2xl mb-2">{icon}</Text>
      <Text className="text-white text-sm font-medium">{label}</Text>
      <Text className="text-white text-lg font-bold">{value}</Text>
    </View>
  );
}
