import AppNavigation from "navigation/AppNavigation";
import { AppProviders } from "@weather-app/core/src/providers/QueryProvider";
import { StatusBar } from "react-native";
export default function App() {
  return (
    <AppProviders>
      <StatusBar barStyle="light-content" hidden={true} />
      <AppNavigation />
    </AppProviders>
  );
}
