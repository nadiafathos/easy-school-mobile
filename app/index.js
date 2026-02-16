import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        router.replace("/screens/HomeScreen");
      } else {
        router.replace("/auth/login");
      }
    }

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}