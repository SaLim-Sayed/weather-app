// eslint-disable-next-line import/no-unresolved
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailPage from "components/DetailPage";
import SearchPage from "components/SearchPage";
import { ImageBackground } from "react-native";
 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SearchPage">

        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
