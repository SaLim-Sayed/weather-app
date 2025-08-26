import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onRetry: () => void;
};

export default function ErrorView({ onRetry }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white text-xl">Failed to load weather data</Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-cyan-500 px-6 py-3 rounded-2xl mt-4"
      >
        <Text className="text-white font-bold">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}
