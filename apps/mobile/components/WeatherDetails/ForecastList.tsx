import { FlatList, Image, Text, View } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";

type ForecastItem = {
  dt: number;
  temp: { min: number; max: number };
  weather: { icon: string }[];
};

type Props = {
  daily: ForecastItem[];
};

export default function ForecastList({ daily }: Props) {
  const formatDay = (dt: number) =>
    new Date(dt * 1000).toLocaleDateString("en-US", { weekday: "short" });

  return (
    <View className="mx-4 mb-6">
      <View className="flex-row items-center gap-4 mb-4">
        <CalendarDaysIcon size={20} color="white" />
        <Text className="text-white text-xl font-bold">5-Day Forecast</Text>
      </View>
      <FlatList
        data={daily.slice(0, 5)}
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
            <Text className="text-gray-300 text-base font-bold mb-2">{formatDay(item.dt)}</Text>
            <Text className="text-white text-lg font-bold">{Math.round(item.temp.max)}°</Text>
            <Text className="text-gray-300 text-sm">{Math.round(item.temp.min)}°</Text>
          </View>
        )}
      />
    </View>
  );
}
