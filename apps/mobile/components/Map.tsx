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
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View   className="flex-1 items-center justify-center">
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
        <View  className="absolute bottom-20 left-20 right-20 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <Text className="text-white text-lg font-bold">Current: {weather.current.temp}°C</Text>
          <Text className="text-white text-lg font-bold">Condition: {weather.current.weather[0].description}</Text>
          <Text className="text-white text-lg font-bold">Next Days:</Text>
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
 