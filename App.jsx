import AppStateProvider from "./state";
import MainNavigator from "./navigation/MainNavigator";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AppStateProvider>
      <MainNavigator />
    </AppStateProvider>
  );
}
