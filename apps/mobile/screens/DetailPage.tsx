import { useWeatherDetails } from "@weather-app/core";
import { useEffect } from "react";
import { Image, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useRoute } from "@react-navigation/native";
import LoaderBoundary from "components/LoaderBoundary";
import CurrentWeather from "../components/WeatherDetails/CurrentWeather";
import ErrorView from "../components/WeatherDetails/ErrorView";
import ForecastList from "../components/WeatherDetails/ForecastList";
import Header from "../components/WeatherDetails/Header";
import WeatherStats from "../components/WeatherDetails/WeatherStats";


export default function WeatherDetailsPage() {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const city = params.city;
  const { weather, daily, isLoading, refetch } = useWeatherDetails(params.city);


  useEffect(() => {
    refetch();
  }, [params.city]);

  useEffect(() => {
    refetch();
  }, [city]);


  return (
    <View style={{ direction: "ltr" }} className="flex-1 relative ">
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={1}
        source={require("@repo/assets/images/background.png")}
        className="w-full h-full absolute flex-1 z-0"
      />

      <SafeAreaView className="flex-1 z-10">

        <Header onBack={() => navigation.goBack()} />
        <LoaderBoundary isLoading={isLoading}>

          <ScrollView>
            {weather ? (
              <>
                <CurrentWeather weather={weather} />
                <WeatherStats weather={weather} />
                <ForecastList daily={daily} />
              </>
            ) : (
              <ErrorView onRetry={refetch} />
            )}
          </ScrollView>
        </LoaderBoundary>
      </SafeAreaView>
    </View>
  );
}
