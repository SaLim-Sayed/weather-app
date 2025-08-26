import React from "react";
import { View, Text, Image } from "react-native";

type CurrentWeatherProps = {
  weather: {
    name: string;
    sys?: { country?: string };
    weather?: { icon?: string; description?: string }[];
    temp?: number;
  };
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  return (
    <View className="items-center mx-4 mb-8">
      {/* City + Country */}
      <Text className="text-white text-center text-4xl font-bold">
        {weather.name},{" "}
        <Text className="text-lg text-gray-300 font-medium">
          {weather.sys?.country}
        </Text>
      </Text>

      {/* Weather Icon */}
      <View className="flex-row items-center justify-center gap-4 my-6">
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`,
          }}
          className="w-40 h-40"
        />
      </View>

      {/* Temperature + Description */}
      <View className="flex-col items-center justify-center gap-4">
        <Text className="text-white text-center text-6xl font-bold">
          {Math.round(weather?.temp || 0)}°C
        </Text>
        <Text className="text-white text-center text-lg tracking-widest capitalize">
          {weather?.weather?.[0]?.description}
        </Text>
      </View>
    </View>
  );
};

export default CurrentWeather;
