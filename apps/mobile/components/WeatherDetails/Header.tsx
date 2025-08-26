import { Text, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function Header({ onBack }: { onBack: () => void }) {
  return (
    <View className="flex-row items-center mx-4 mt-4 mb-6">
      <TouchableOpacity
        onPress={onBack}
        className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mr-4"
      >
        <ArrowLeftIcon size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold">Weather Details</Text>
    </View>
  );
}
