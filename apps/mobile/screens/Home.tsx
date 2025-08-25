import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline";
import { useEffect, useState } from 'react';
import { cn } from "@weather-app/core/src/cn";
import WeatherMapScreen from 'components/Map';

const API_KEY = "5796abbde9106b7da4febfae8c44c232";

export default function Home() {
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState<any[]>([]);
    const [weather, setWeather] = useState<any>(null);
    const [daily, setDaily] = useState<any[]>([]);

    // fetch cities when query changes
    useEffect(() => {
        if (query.length < 2) {
            setLocation([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${API_KEY}&units=metric`
                );
                const data = await res.json();
                if (data?.list) {
                    setLocation(data.list);
                } else {
                    setLocation([]);
                }
            } catch (error) {
                console.log("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, [query]);

    const handleLocation = async (item: any) => {
        try {
            // Fetch full forecast (One Call API)
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${item.coord.lat}&lon=${item.coord.lon}&units=metric&appid=${API_KEY}`
            );
            const data = await res.json();
            console.log({ data });

            setWeather({ ...data.current, name: item.name, sys: { country: item.sys?.country } });
            setDaily(data.daily.slice(0, 7)); // next 7 days
        } catch (error) {
            console.log("Error fetching weather:", error);
        }
        setShowSearch(false);
        setQuery("");
        setLocation([]);
    };

    const formatDay = (dt: number) =>
        new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "short" });

    return (
        <View className="flex-1 relative">
            <StatusBar barStyle="light-content" />
            <Image
                blurRadius={1}
                source={require("@repo/assets/images/background.png")}
                className="w-full h-full absolute flex-1 z-0"
            />
            <SafeAreaView className="flex-1 z-10">

                {/* <WeatherMapScreen/> */}
                {/* Search */}
                <View style={{ height: "10%" }} className="mx-4 relative mt-2 z-10">
                    <View
                        style={{
                            borderRadius: 50,
                            borderWidth: showSearch ? 1 : 0,
                            borderColor: "transparent",
                        }}
                        className={
                            showSearch
                                ? "flex-row items-center justify-end border-white border-px rounded-full bg-cyan-100/20"
                                : "flex-row items-center justify-end rounded-full"
                        }
                    >
                        {showSearch ? (
                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholderTextColor="lightgray"
                                placeholder="Search"
                                className="text-white pl-6 h-10 flex-1 text-base"
                            />
                        ) : null}
                        <TouchableOpacity
                            onPress={() => setShowSearch(!showSearch)}
                            className="h-16 w-16 rounded-full items-center justify-center bg-cyan-200/30"
                        >
                            <MagnifyingGlassIcon size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    {(location.length > 0 && showSearch) && (
                        <View className="w-full absolute top-20 bg-gray-200 p-4 rounded-2xl">
                            <FlatList
                                data={location}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleLocation(item)}
                                        className={cn(
                                            "flex-row items-center gap-4 p-2 text-blue-950",
                                            item.id !== location[location.length - 1].id
                                                ? "border-b-2 border-gray-300"
                                                : ""
                                        )}
                                    >
                                        <MapPinIcon size={20} color="darkgray" />
                                        <Text className="text-gray-600 text-base font-medium">
                                            {item.name}, {item.sys?.country}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>

                {/* forecast */}
                <View className="flex-1 items-center justify-around mx-4 mb-4">
                    {weather ? (
                        <>
                            <Text className="text-white text-center text-4xl font-[700]">
                                {weather.name},{" "}

                                <Text className="text-lg text-gray-300 font-medium">
                                    {weather.sys?.country}
                                </Text>
                            </Text>

                            <View className="flex-row items-center justify-center gap-4">
                                <Image
                                    source={{ uri: `https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png` }}
                                    className="w-40 h-40"
                                />
                            </View>

                            <View className="flex-col items-center justify-center gap-4">
                                <Text className="text-white text-center text-6xl font-bold">
                                    {Math.round(weather.temp)}&#8451;
                                </Text>
                                <Text className="text-white text-center text-lg tracking-widest capitalize">
                                    {weather.weather?.[0]?.description}
                                </Text>
                            </View>
                        </>
                    ) : (
                        <Text className="text-white text-xl">Search for a city</Text>
                    )}
                </View>

                {/* other states */}
                {/* Enhanced other states section with more weather data */}
                {weather && (
                    <View className="m-4">
                        {/* First row */}
                        <View className="flex-row items-center justify-between mb-4 gap-2">
                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Image source={require("@repo/assets/images/wind.png")} className="w-6 h-6" />
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Wind</Text>
                                    <Text className="text-white text-base font-bold">
                                        {weather.wind_speed} km/h
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Image source={require("@repo/assets/images/drop.png")} className="w-6 h-6" />
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Humidity</Text>
                                    <Text className="text-white text-base font-bold">
                                        {weather.humidity}%
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Image source={require("@repo/assets/images/suns.png")} className="w-6 h-6" />
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Sunrise</Text>
                                    <Text className="text-white text-base font-bold">
                                        {new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Second row */}
                        <View className="flex-row items-center justify-between mb-4 gap-2">
                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Text className="text-orange-300 text-lg">🌅</Text>
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Sunset</Text>
                                    <Text className="text-white text-base font-bold">
                                        {new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Text className="text-blue-300 text-lg">🌡️</Text>
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Feels Like</Text>
                                    <Text className="text-white text-base font-bold">
                                        {Math.round(weather.feels_like)}°C
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Text className="text-gray-300 text-lg">👁️</Text>
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Visibility</Text>
                                    <Text className="text-white text-base font-bold">
                                        {weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} km
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Third row */}
                        <View className="flex-row items-center justify-between gap-2">
                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Text className="text-yellow-300 text-lg">☀️</Text>
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">UV Index</Text>
                                    <Text className="text-white text-base font-bold">
                                        {weather.uvi ? Math.round(weather.uvi) : 'N/A'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Text className="text-gray-300 text-lg">🏔️</Text>
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Pressure</Text>
                                    <Text className="text-white text-base font-bold">
                                        {weather.pressure} hPa
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-row items-center justify-center gap-2 flex-1">
                                <Text className="text-blue-300 text-lg">💨</Text>
                                <View className="flex-col items-center">
                                    <Text className="text-white text-sm font-medium">Wind Dir</Text>
                                    <Text className="text-white text-base font-bold">
                                        {weather.wind_deg ? `${weather.wind_deg}°` : 'N/A'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {/* forecast of other days */}
                {daily.length > 0 && (
                    <View className="space-y-4 m-4 gap-4">
                        <View className="flex-row items-center gap-4">
                            <CalendarDaysIcon size={20} color="white" />
                            <Text className="text-white text-xl font-bold">Daily Forecast</Text>
                        </View>
                        <FlatList
                            data={daily}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 10 }}
                            renderItem={({ item }) => (
                                <View className="flex-col w-32 items-center border-2 p-2 bg-white/20 rounded-2xl gap-4">
                                    <Image
                                        source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                                        className="w-16 h-16"
                                    />
                                    <Text className="text-gray-300 text-base font-bold">{formatDay(item.dt)}</Text>
                                    <Text className="text-gray-300 text-xl font-bold">
                                        {Math.round(item.temp.max)}° / {Math.round(item.temp.min)}°
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}
