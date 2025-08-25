import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const API_KEY = "5796abbde9106b7da4febfae8c44c232";

export default function WeatherMapScreen() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // call weather API
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((err) => {
          setErrorMsg(err.message);
          setLoading(false);
        });
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        </MapView>
      )}

      {weather && (
        <View style={styles.weatherBox}>
          <Text style={styles.title}>Current: {weather.current.temp}°C</Text>
          <Text>Condition: {weather.current.weather[0].description}</Text>
          <Text style={styles.subtitle}>Next Days:</Text>
          {weather.daily.slice(0, 5).map((day: any, idx: number) => (
            <Text key={idx}>
              {new Date(day.dt * 1000).toDateString()} - {day.temp.day}°C
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  weatherBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 12,
    borderRadius: 10,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { marginTop: 8, fontWeight: "600" },
});
