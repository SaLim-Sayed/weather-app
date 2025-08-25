import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailPage from "components/DetailPage";
import SearchPage from "components/SearchPage";
import Home from "screens/Home";
 

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
