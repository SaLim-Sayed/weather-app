import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
  
interface Props {
  city: any;
  showDelete?: boolean;
  onSelect: (city: any) => void;
}

const CityCard: FC<Props> = ({ city, showDelete, onSelect }) => (
  <TouchableOpacity
    onPress={() => onSelect(city)}
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
                {" • " + new Date(city.timestamp).toLocaleDateString()}
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
     
      </View>
    </View>

    {city.weather?.[0]?.description && (
      <Text className="text-gray-300 text-sm mt-2 ml-9 capitalize">
        {city.weather[0].description}
      </Text>
    )}
  </TouchableOpacity>
);

export default CityCard;
