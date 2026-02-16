import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import apiClient from "../services/apiClient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      await SecureStore.setItemAsync("token", res.data.token);
      router.replace("/screens/HomeScreen");
    } catch (e) {
      alert("Erreur de connexion");
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Connexion</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}