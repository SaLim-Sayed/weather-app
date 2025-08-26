import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherDetailsPage from "../screens/DetailPage";
import SearchPage from "../screens/SearchPage";


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={SearchPage} />
        <Stack.Screen name="details" component={WeatherDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
