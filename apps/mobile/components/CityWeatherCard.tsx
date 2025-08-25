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
    <View style={styles.container}>
      <WeatherCard
        title={`${name}, ${sys.country}`}
        value={`${Math.round(main.temp)}°C`}
        icon={{
          uri: `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`,
        }}
      />
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  desc: {
    fontSize: 16,
    color: "#fff",
    marginTop: -8,
    textTransform: "capitalize",
  },
});
