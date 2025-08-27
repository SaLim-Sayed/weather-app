import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { API_KEY, useApiQuery, useCitySearch, useRecentMobileSearches } from "@weather-app/core";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SearchBar from "../components/SearchPage/SearchBar";
import CityCard from "../components/SearchPage/CityCard";
import LoaderBoundary from "components/LoaderBoundary";

export type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
  main?: { temp: number };
  weather?: { icon: string; description: string }[];
  timestamp?: number;
};

export default function SearchPage() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showSearch, setShowSearch] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lon: number } | null>(null);

  const { lastSearchedCity, saveCity, clearLast } = useRecentMobileSearches();
  const { query, setQuery, debouncedQuery, cities, isCityLoading, isCityFetching, handleCitySelect: originalHandleCitySelect } = useCitySearch(() => { });

  const { data: currentLocationCity } = useApiQuery<City>({
    key: locationCoords ? ["weather-by-coords", locationCoords] : [],
    url: locationCoords
      ? `/data/2.5/weather?lat=${locationCoords.lat}&lon=${locationCoords.lon}&appid=${API_KEY}&units=metric`
      : null,
    enabled: !!locationCoords,
  });

  useEffect(() => {
    if (currentLocationCity) {
      handleSelect(currentLocationCity);
      setLocationCoords(null);
    }
  }, [currentLocationCity]);

  const handleSelect = async (city: City) => {
    await saveCity(city);
    navigation.navigate("details", { city });
    originalHandleCitySelect(city);
  };

  const handleCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return alert("Permission denied");
    const loc = await Location.getCurrentPositionAsync({});
    setLocationCoords({ lat: loc.coords.latitude, lon: loc.coords.longitude });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 relative">
        <Image
          blurRadius={1}
          source={require("@repo/assets/images/background.png")}
          className="w-full h-full absolute flex-1 z-0"
        />

        <SafeAreaView className="flex-1 z-10">
          <View className="mx-4 mt-4 mb-6">
            <Text className="text-white text-3xl font-bold text-center">Weather Search</Text>
            <Text className="text-gray-300 text-center mt-2">Search for cities to view weather</Text>
          </View>

          <SearchBar
            query={query}
            setQuery={setQuery}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            onCurrentLocation={handleCurrentLocation}
          />

          <View className="flex-1 mx-4">
            {(isCityLoading || isCityFetching) && (
              <View className="flex-row justify-center items-center py-8">
                <Text className="text-white text-lg text-center flex-row justify-center items-center py-8">
                  Loading...
                </Text>
                <ActivityIndicator size={"large"} color="#fff" />
              </View>
            )}

            <LoaderBoundary isLoading={isCityLoading || isCityFetching}>
              {debouncedQuery.length >= 2 && cities.length > 0 && (
                <FlatList
                  data={cities}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <CityCard city={item} onSelect={handleSelect} />}
                />
              )}
            </LoaderBoundary>

            {lastSearchedCity && (
              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-300">Last searched:</Text>
                  <TouchableOpacity onPress={clearLast}>
                    <Text className="text-gray-400 text-sm">Clear</Text>
                  </TouchableOpacity>
                </View>
                <CityCard city={lastSearchedCity} onSelect={handleSelect} />
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
