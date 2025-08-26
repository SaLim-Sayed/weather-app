import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingView() {
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={1}
        source={require("@repo/assets/images/background.png")}
        className="w-full h-full absolute flex-1 z-0"
      />
      <SafeAreaView className="flex-1 z-10 items-center justify-center">
        <Text className="text-white text-xl">Loading weather data...</Text>
      </SafeAreaView>
    </View>
  );
}
