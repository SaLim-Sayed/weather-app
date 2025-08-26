import { useState } from "react";
import {
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
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCitySearch } from "@weather-app/core";

export type City = {
  id: number;
  name: string;
  sys?: { country?: string };
  coord: { lat: number; lon: number };
  main?: { temp: number };
  weather?: { icon: string; description: string }[];
};

type SearchPageProps = {
  onCitySelect: (city: City) => void;
};

export default function SearchPage({ onCitySelect }: SearchPageProps) {
  const {
    query,
    setQuery,
    debouncedQuery,
    cities,
    isCityLoading,
    isCityFetching,
    isLocationLoading,
    latestSearch,
    handleCitySelect,
    handleCurrentLocation,
  } = useCitySearch(onCitySelect);
  
  const [showSearch, setShowSearch] = useState(false);
   const CityCard = ({ city }: { city: City }) => (
    <TouchableOpacity
      onPress={() => handleCitySelect(city)}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3 border border-white/20"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <MapPinIcon size={24} color="white" />
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">{city.name}</Text>
            <Text className="text-gray-300 text-sm">{city.sys?.country}</Text>
          </View>
        </View>

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

          <FlatList
            data={cities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CityCard city={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {latestSearch && (
            <View className="mx-4 mb-4">
              <Text className="text-gray-300 mb-2">Last searched:</Text>
              <CityCard city={latestSearch} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
