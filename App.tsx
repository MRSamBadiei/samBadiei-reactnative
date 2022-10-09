import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store from "./store/store";
import { Platform } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="auto" />
        </SafeAreaProvider>
        <FlashMessage
          position="top"
          style={{ marginTop: Platform.OS === "android" ? 45 : 0 }}
        />
      </Provider>
    );
  }
}
