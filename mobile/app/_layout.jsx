import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Stack } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";

// Enable native screens for react-navigation (improves performance and avoids
// some native view issues that can surface as 'default' undefined errors)
enableScreens();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeScreen>
          <Slot />
        </SafeScreen>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
