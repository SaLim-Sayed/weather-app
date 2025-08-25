import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {   CalendarDaysIcon, MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline"
import { useState } from 'react'
import { cn } from "@weather-app/core/src/cn";
export default function Home() {
    const [showSearch, setShowSearch] = useState(false)
    const city = [
        { id: "1", name: "Cairo" },
        { id: "2", name: "Alexandria" },
        { id: "3", name: "Giza" },
        { id: "4", name: "Sharm El Sheikh" },
        { id: "5", name: "Hurghada" },

    ]
    const [location, setLocation] = useState(city)
    const handleLocation = (item: any) => {
        console.log({ item })
    }
    return (
        <View className="flex-1 relative">
            <StatusBar barStyle="light-content" />
            <Image blurRadius={1} source={require("@repo/assets/images/background.png")}
                className="  w-full h-full absolute flex-1    z-0" />
            <SafeAreaView className="flex-1 z-10">
                {/* Search */}
                <View style={{ height: "10%" }} className="mx-4 relative mt-2   z-10">
                    <View style={{ borderRadius: 50, borderWidth: showSearch ? 1 : 0, borderColor: "transparent" }} className={showSearch ? "flex-row items-center justify-end border-white border-px rounded-full bg-cyan-100/20" : "flex-row items-center justify-end rounded-full  "}>
                        {showSearch ? (
                            <TextInput placeholderTextColor="lightgray" placeholder="Search" className="text-white pl-6 h-10 flex-1 text-base" />
                        ) : (
                            null
                        )}
                        <TouchableOpacity onPress={() => setShowSearch(!showSearch)} className='h-16 w-16 rounded-full items-center justify-center bg-cyan-200/30'>
                            <MagnifyingGlassIcon size={20} color="white" />
                        </TouchableOpacity>

                    </View>  {(location.length > 0 && showSearch) && (
                        <View className=" w-full absolute top-20 bg-gray-200  p-4 rounded-2xl">
                            <FlatList

                                data={location}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleLocation(item)} className={cn("flex-row items-center  gap-4  p-2 text-blue-950", item.id !== location[location.length - 1].id ? "border-b-2 border-gray-300 " : "")}>
                                        <MapPinIcon size={20} color="darkgray" />
                                        <Text className="text-gray-600 text-base font-medium">{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}


                </View>


                {/* forecast */}
                <View className="flex-1 items-center justify-around mx-4 mb-4">
                    <Text className="text-white text-center text-4xl font-[700]">London,
                        <Text className="  text-lg text-gray-300 font-medium">United Kingdom</Text>
                    </Text>
                    <View className="flex-row items-center justify-center gap-4">
                        <Image source={require("@repo/assets/images/partlycloudy.png")} className="w-40  h-40 " />
                    </View>
                    <View className="flex-col items-center justify-center gap-4">
                        <Text className="text-white text-center text-6xl font-bold">26&#8451;</Text>
                        <Text className="text-white text-center text-lg  tracking-widest" >Partly Cloudy</Text>
                    </View>

                </View>


                {/* other states */}
                <View className="flex-row items-center justify-between m-4 gap-4">
                    <TouchableOpacity className="flex-row items-center justify-center gap-2">
                        <Image source={require("@repo/assets/images/wind.png")} className="w-8 h-8" />
                        <Text className="text-white text-center text-lg font-medium">26km</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-center gap-2">
                        <Image source={require("@repo/assets/images/drop.png")} className="w-8 h-8" />
                        <Text className="text-white text-center text-lg font-medium">26%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center justify-center gap-2">
                        <Image source={require("@repo/assets/images/suns.png")} className="w-8 h-8" />
                        <Text className="text-white text-center text-lg font-medium">6:00 AM</Text>
                    </TouchableOpacity>
                </View>

                {/* forecast  of other days*/}
                <View className="space-y-4 m-4 gap-4">
                    <View className="flex-row items-center gap-4  ">
                        <CalendarDaysIcon size={20} color="white" />
                        <Text className="text-white text-xl  font-bold">Daily Forecast</Text>

                    </View>
                    <FlatList
                        data={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                        renderItem={({ item }) => (
                            <View className="flex-col w-32 items-center border-2  p-2 bg-white/20 rounded-2xl gap-4">
                                <Image source={require("@repo/assets/images/heavyrain.png")} className="w-16  h-16 " />
                                <Text className="text-gray-300 text-base  font-bold">{item}</Text>
                                <Text className="text-gray-300 text-xl  font-bold">26&#8451;</Text>
                            </View>
                        )}
                    />
                </View>

            </SafeAreaView>
        </View>
    )
}