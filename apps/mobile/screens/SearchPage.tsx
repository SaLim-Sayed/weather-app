import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoaderBoundary from "components/LoaderBoundary";
import CityCard from "../components/SearchPage/CityCard";
import SearchBar from "../components/SearchPage/SearchBar";

import { useAppCitySearch, type City } from "@weather-app/core/src/hooks/useAppCitySearch"; // ✅ use new unified hook
 
export default function SearchPage() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showSearch, setShowSearch] = useState(false);

 
  const {
    query,
    setQuery,
    debouncedQuery,
    cities,
    isCityLoading,
    isCityFetching,
    handleCitySelect: baseHandleCitySelect,
    handleCurrentLocation,
    isLocationLoading,
    latestSearch,
    clearLatestSearch,
  } = useAppCitySearch({
    os: "native",
    onCitySelect: (city) => {
      navigation.navigate("details", { city });
    },
  });

  const handleSelect = async (city: City) => {
     baseHandleCitySelect(city);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ direction: "ltr" }} className="flex-1 relative">
        {/* Background */}
        <Image
          blurRadius={1}
          source={require("@repo/assets/images/background.png")}
          className="w-full h-full absolute flex-1 z-0"
        />

        <SafeAreaView className="flex-1 z-10">
          {/* Title */}
          <View className="mx-4 mt-4 mb-6">
            <Text className="text-white text-3xl font-bold text-center">Weather Search</Text>
            <Text className="text-gray-300 text-center mt-2">
              Search for cities to view weather
            </Text>
          </View>

          {/* SearchBar */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            onCurrentLocation={handleCurrentLocation}
            isLocationLoading={isLocationLoading}
          />

          {/* Results */}
          <View className="flex-1 mx-4">
            {(isCityLoading || isCityFetching) && (
              <View className="flex-row justify-center items-center py-8">
                <Text className="text-white text-lg mr-2">Loading...</Text>
                <ActivityIndicator size={"large"} color="#fff" />
              </View>
            )}

            <LoaderBoundary isLoading={isCityLoading || isCityFetching}>
              {debouncedQuery.length >= 2 && cities.length > 0 && (
                <FlatList
                  data={cities}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <CityCard city={item} onSelect={handleSelect} />
                  )}
                />
              )}
            </LoaderBoundary>

            {/* Last Search */}
            {latestSearch && (
              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-300">Last searched:</Text>
                  <TouchableOpacity onPress={clearLatestSearch}>
                    <Text className="text-gray-400 text-sm">Clear</Text>
                  </TouchableOpacity>
                </View>
                <CityCard city={latestSearch} onSelect={handleSelect} />
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
