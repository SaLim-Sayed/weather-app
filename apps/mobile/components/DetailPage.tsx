import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
// eslint-disable-next-line import/no-unresolved
 import { ModerateRain } from "@repo/assets";
import { WeatherCard } from "./WeatherCard";
import { useWeatherAxios } from "@weather-app/core/src/api/weather";   
export default function DetailPage() {
  const route = useRoute<any>();
  const city = route.params?.city || "London";
  const { data, loading, error } = useWeatherAxios(city);

  if (loading) return <Text style={styles.center}>Loading...</Text>;
  if (error) return <Text style={[styles.center, { color: "red" }]}>{String(error)}</Text>;
  if (!data) return <Text style={styles.center}>No data available</Text>;

  const toCelsius = (k: number) => Math.round(k - 273.15);

  const cards = [
    {
      title: "Humidity",
      value: `${data.main?.humidity}%`,
      icon: ModerateRain,
    },
    {
      title: "Wind",
      value: `${data.wind?.speed} m/s`,
      icon: ModerateRain,
    },
    {
      title: "Clouds",
      value: `${data.clouds?.all}%`,
      icon: ModerateRain,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.temp}>{toCelsius(data.main?.temp ?? 0)}°</Text>
        <Text style={styles.range}>
          H:{toCelsius(data.main?.temp_max ?? 0)}° | L:{toCelsius(data.main?.temp_min ?? 0)}°
        </Text>
        <Text style={styles.city}>
          {data.name}, {data.sys?.country}
        </Text>
      </View>

      <Text style={styles.description}>{data.weather?.[0]?.description}</Text>

      <View style={styles.cards}>
        {cards.map((card) => (
          <WeatherCard key={card.title} {...card} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0f172a", // bg-slate-900 style
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  temp: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#fff",
  },
  range: {
    fontSize: 18,
    color: "#ddd",
    marginTop: 4,
  },
  city: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginTop: 6,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    textTransform: "capitalize",
    color: "#ddd",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  center: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});
