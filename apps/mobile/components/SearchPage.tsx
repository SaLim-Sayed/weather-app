import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileStorage, useCitySearch } from "@weather-app/core";
import { useApiQuery } from "@weather-app/core";
  
const API_KEY = "5796abbde9106b7da4febfae8c44c232";

export type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
  main?: { temp: number };
  weather?: { icon: string; description: string }[];
  timestamp?: number; // Add timestamp for sorting
};

type SearchPageProps = {
  onCitySelect: (city: City) => void;
};

// Add recent searches storage
const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 5;

export default function SearchPage({ onCitySelect }: SearchPageProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [lastSearchedCity, setLastSearchedCity] = useState<City | null>(null);
  const [recentSearches, setRecentSearches] = useState<City[]>([]);

  // Load saved data on component mount
  useEffect(() => {
    loadSavedSearches();
  }, []);

  const loadSavedSearches = async () => {
    try {
      // Load last searched city
      const lastCity = await MobileStorage.getLastSearchedCity();
      if (lastCity) setLastSearchedCity(lastCity);

      // Load recent searches
      const recentData = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (recentData) {
        const recent = JSON.parse(recentData);
        setRecentSearches(recent);
      }
    } catch (error) {
      console.error('Error loading saved searches:', error);
    }
  };

  const {
    query,
    setQuery,
    debouncedQuery,
    cities,
    isCityLoading,
    isCityFetching,
    handleCitySelect: originalHandleCitySelect,
  } = useCitySearch(onCitySelect);

  // Enhanced city selection handler with storage
  const handleCitySelect = async (city: City) => {
    try {
      // Add timestamp to city
      const cityWithTimestamp = {
        ...city,
        timestamp: Date.now()
      };

      // Save as last searched city
      await MobileStorage.saveLastSearchedCity(cityWithTimestamp);
      setLastSearchedCity(cityWithTimestamp);

      // Add to recent searches
      await addToRecentSearches(cityWithTimestamp);

      // Call original handler
      originalHandleCitySelect(city);
    } catch (error) {
      console.error('Error saving city selection:', error);
    }
  };

  // Add city to recent searches
  const addToRecentSearches = async (city: City) => {
    try {
      const updatedRecent = [
        city,
        ...recentSearches.filter(item => item.id !== city.id)
      ].slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updatedRecent);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecent));
    } catch (error) {
      console.error('Error adding to recent searches:', error);
    }
  };
 

   const clearLastSearched = async () => {
    try {
      setLastSearchedCity(null);
      await MobileStorage.clearLastSearchedCity();
    } catch (error) {
      console.error('Error clearing last searched city:', error);
    }
  };

  const {
    data: currentLocationCity,
    isLoading: isLocationLoading,
  } = useApiQuery<City>({
    key: locationCoords ? ["weather-by-coords", locationCoords] : [],
    url: locationCoords
      ? `/data/2.5/weather?lat=${locationCoords.lat}&lon=${locationCoords.lon}&appid=${API_KEY}&units=metric`
      : null,
    enabled: !!locationCoords,
  });

  const handleCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocationCoords({
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      });
    } catch (err) {
      console.log("Error getting location:", err);
      Alert.alert('Error', 'Failed to get current location');
    }
  };

 
  useEffect(() => {
    if (currentLocationCity) {
      handleCitySelect(currentLocationCity);
      setLocationCoords(null);
    }
  }, [currentLocationCity]);

  // 🧱 UI Component: City Card
  const CityCard = ({ city, showDelete = false, onDelete }: { 
    city: City; 
    showDelete?: boolean;
    onDelete?: () => void;
  }) => (
    <TouchableOpacity
      onPress={() => handleCitySelect(city)}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/20"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <MapPinIcon size={24} color="white" />
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">{city.name}</Text>
            <Text className="text-gray-300 text-sm">
              {city.sys?.country}
              {city.timestamp && (
                <Text className="text-gray-400 text-xs">
                  {' • ' + new Date(city.timestamp).toLocaleDateString()}
                </Text>
              )}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          {city.main?.temp && (
            <View className="flex-row items-center gap-2">
              {city.weather?.[0]?.icon && (
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`,
                  }}
                  className="w-12 h-12"
                />
              )}
              <Text className="text-white text-xl font-bold">
                {Math.round(city.main.temp)}°C
              </Text>
            </View>
          )}
          
          {showDelete && (
            <TouchableOpacity onPress={onDelete} className="p-2">
              <TrashIcon size={20} color="#ff6b6b" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {city.weather?.[0]?.description && (
        <Text className="text-gray-300 text-sm mt-2 ml-9 capitalize">
          {city.weather[0].description}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={1}
        source={require("@repo/assets/images/background.png")}
        className="w-full h-full absolute flex-1 z-0"
      />

      <SafeAreaView className="flex-1 z-10">
        {/* Header */}
        <View className="mx-4 mt-4 mb-6">
          <Text className="text-white text-3xl font-bold text-center">
            Weather Search
          </Text>
          <Text className="text-gray-300 text-center mt-2">
            Search for cities to view weather
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 relative mb-6 flex-row gap-4 items-center space-x-2">
          <View
            style={{
              borderRadius: 50,
              borderWidth: showSearch ? 1 : 0,
              borderColor: showSearch ? "white" : "transparent",
            }}
            className="flex-row items-center flex-1 border-white rounded-full bg-white/10 backdrop-blur-sm"
          >
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholderTextColor="lightgray"
              placeholder="Search cities..."
              className="text-white pl-6 h-12 flex-1 text-base"
              autoFocus
            />

            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              className="h-14 w-14 rounded-full items-center justify-center bg-cyan-500/30"
            >
              <MagnifyingGlassIcon size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleCurrentLocation}
            className="h-14 w-14 rounded-full items-center justify-center bg-green-500/30"
          >
            <MapPinIcon size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Results */}
        <View className="flex-1 mx-4">
          {(isCityLoading || isCityFetching || isLocationLoading) && (
            <View className="items-center py-8">
              <Text className="text-white text-lg">Loading...</Text>
            </View>
          )}

          {debouncedQuery.length >= 2 && cities.length === 0 && !isCityLoading && (
            <View className="items-center py-8">
              <Text className="text-gray-300 text-lg">No cities found</Text>
              <Text className="text-gray-400 text-sm mt-2">
                Try a different search term
              </Text>
            </View>
          )}

          {/* Search Results */}
          {debouncedQuery.length >= 2 && cities.length > 0 && (
            <View className="mb-4">
              <Text className="text-gray-300 mb-2">Search Results:</Text>
              <FlatList
                data={cities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CityCard city={item} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {/* Last Searched City */}
          {lastSearchedCity && (
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-300">Last searched:</Text>
                <TouchableOpacity onPress={clearLastSearched}>
                  <Text className="text-gray-400 text-sm">Clear</Text>
                </TouchableOpacity>
              </View>
              <CityCard city={lastSearchedCity} />
            </View>
          )}

       
        </View>
      </SafeAreaView>
    </View>
  );
}