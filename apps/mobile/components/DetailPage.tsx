import { useWeatherDetails } from '@weather-app/core';
import { useEffect } from 'react';
import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeftIcon, CalendarDaysIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native-safe-area-context';

type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
};

type WeatherDetailsPageProps = {
  city: City;
  onBack: () => void;
};

export default function WeatherDetailsPage({ city, onBack }: WeatherDetailsPageProps) {
  const { weather, daily, isLoading, refetch } = useWeatherDetails(city);

 
  useEffect(() => {
    refetch();
  }, [city]);

 

  const formatDay = (dt: number) =>
    new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "short" });

  if (isLoading) {
    return (
      <View className="flex-1 relative">
        <StatusBar barStyle="light-content" />
        <Image
          blurRadius={1}
          source={require("@repo/assets/images/background.png")}
          className="w-full h-full absolute flex-1 z-0"
        />
        <SafeAreaView className="flex-1 z-10 items-center justify-center">
          <Text className="text-white text-xl">Loading weather data...</Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 relative">
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={1}
        source={require("@repo/assets/images/background.png")}
        className="w-full h-full absolute flex-1 z-0"
      />
      <SafeAreaView className="flex-1 z-10">
        {/* Header with Back Button */}
        <View className="flex-row items-center mx-4 mt-4 mb-6">
          <TouchableOpacity
            onPress={onBack}
            className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mr-4"
          >
            <ArrowLeftIcon size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Weather Details</Text>
        </View>

        <ScrollView>
          {weather ? (
            <>
              {/* Current Weather */}
              <View className="items-center mx-4 mb-8">
                <Text className="text-white text-center text-4xl font-bold">
                  {weather.name},{" "}
                  <Text className="text-lg text-gray-300 font-medium">
                    {weather.sys?.country}
                  </Text>
                </Text>

                <View className="flex-row items-center justify-center gap-4 my-6">
                  <Image
                    source={{ uri: `https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png` }}
                    className="w-40 h-40"
                  />
                </View>

                <View className="flex-col items-center justify-center gap-4">
                  <Text className="text-white text-center text-6xl font-bold">
                    {Math.round(weather?.temp)}°C
                  </Text>
                  <Text className="text-white text-center text-lg tracking-widest capitalize">
                    {weather?.weather?.[0]?.description}
                  </Text>
                </View>
              </View>

              {/* Weather Stats */}
              <View className="mx-4 mb-6">
                {/* First row */}
                <View className="flex-row items-center justify-between mb-4 gap-2">
                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-blue-400 text-2xl mb-2">💨</Text>
                    <Text className="text-white text-sm font-medium">Wind</Text>
                    <Text className="text-white text-lg font-bold">
                      {weather?.wind_speed} km/h
                    </Text>
                  </View>

                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-blue-400 text-2xl mb-2">💧</Text>
                    <Text className="text-white text-sm font-medium">Humidity</Text>
                    <Text className="text-white text-lg font-bold">
                      {weather.humidity}%
                    </Text>
                  </View>

                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-yellow-400 text-2xl mb-2">🌅</Text>
                    <Text className="text-white text-sm font-medium">Sunrise</Text>
                    <Text className="text-white text-lg font-bold">
                      {new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                </View>

                {/* Second row */}
                <View className="flex-row items-center justify-between mb-4 gap-2">
                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-orange-400 text-2xl mb-2">🌇</Text>
                    <Text className="text-white text-sm font-medium">Sunset</Text>
                    <Text className="text-white text-lg font-bold">
                      {new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>

                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-red-400 text-2xl mb-2">🌡️</Text>
                    <Text className="text-white text-sm font-medium">Feels Like</Text>
                    <Text className="text-white text-lg font-bold">
                      {Math.round(weather.feels_like)}°C
                    </Text>
                  </View>

                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-gray-300 text-2xl mb-2">👁️</Text>
                    <Text className="text-white text-sm font-medium">Visibility</Text>
                    <Text className="text-white text-lg font-bold">
                      {weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} km
                    </Text>
                  </View>
                </View>

                {/* Third row */}
                <View className="flex-row items-center justify-between gap-2">
                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-yellow-300 text-2xl mb-2">☀️</Text>
                    <Text className="text-white text-sm font-medium">UV Index</Text>
                    <Text className="text-white text-lg font-bold">
                      {weather.uvi ? Math.round(weather.uvi) : 'N/A'}
                    </Text>
                  </View>

                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-purple-300 text-2xl mb-2">🏔️</Text>
                    <Text className="text-white text-sm font-medium">Pressure</Text>
                    <Text className="text-white text-lg font-bold">
                      {weather.pressure} hPa
                    </Text>
                  </View>

                  <View className="flex-1 bg-white/10 rounded-2xl p-4 items-center">
                    <Text className="text-cyan-300 text-2xl mb-2">🧭</Text>
                    <Text className="text-white text-sm font-medium">Wind Dir</Text>
                    <Text className="text-white text-lg font-bold">
                      {weather.wind_deg ? `${weather.wind_deg}°` : 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 7-Day Forecast */}
              {daily.length > 0 && (
                <View className="mx-4 mb-6">
                  <View className="flex-row items-center gap-4 mb-4">
                    <CalendarDaysIcon size={20} color="white" />
                    <Text className="text-white text-xl font-bold">7-Day Forecast</Text>
                  </View>
                  <FlatList
                    data={daily}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item }) => (
                      <View className="flex-col w-32 items-center bg-white/10 rounded-2xl p-4">
                        <Image
                          source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                          className="w-16 h-16 mb-2"
                        />
                        <Text className="text-gray-300 text-base font-bold mb-2">
                          {formatDay(item.dt)}
                        </Text>
                        <Text className="text-white text-lg font-bold">
                          {Math.round(item.temp.max)}°
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          {Math.round(item.temp.min)}°
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-xl">Failed to load weather data</Text>
              <TouchableOpacity
                onPress={() => refetch?.()}
                className="bg-cyan-500 px-6 py-3 rounded-2xl mt-4"
              >
                <Text className="text-white font-bold">Try Again</Text>
              </TouchableOpacity>
            </View>
          )}</ScrollView>
      </SafeAreaView>
    </View>
  );
}