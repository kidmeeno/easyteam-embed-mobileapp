import { AppStateProvider } from "./context/AppStateContext";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <AppStateProvider>
      <MainNavigator />
    </AppStateProvider>
  );
}
