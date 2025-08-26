import { StyleSheet, Text, View } from "react-native";
import { WeatherCard } from "./WeatherCard";

type CityWeatherProps = {
  city: any;
};

export function CityWeather({ city }: CityWeatherProps) {
  const { name, sys, main, weather } = city;

  const weatherIcon = weather[0]?.icon;
  const description = weather[0]?.description;

  return (
    <View className="items-center mx-4 mb-8">
      <WeatherCard
        title={`${name}, ${sys.country}`}
        value={`${Math.round(main.temp)}°C`}
        icon={{
          uri: `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`,
        }}
      />
      <Text className="text-white text-center text-lg tracking-widest capitalize">{description}</Text>
    </View>
  );
}

 
