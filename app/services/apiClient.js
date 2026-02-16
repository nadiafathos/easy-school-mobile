import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

// Vérifie si le token est valide
export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = jwtDecode(token);
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch (error) {
    console.warn("Token invalide :", error);
    return false;
  }
};

// Supprime le token
export const cleanToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

// Création du client axios
const apiClient = axios.create({
  baseURL: "http://192.168.129.21:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de requêtes
apiClient.interceptors.request.use(
  async (request) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      if (isTokenValid(token)) {
        request.headers.Authorization = `Bearer ${token}`;
      } else {
        await cleanToken();
        router.replace("/auth/login");   // ✔ corrigé
        return Promise.reject(new Error("Token expiré"));
      }
    }

    return request;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    await cleanToken();
    router.replace("/auth/login");   // ✔ corrigé
    return Promise.reject(error);
  }
);

export default apiClient;