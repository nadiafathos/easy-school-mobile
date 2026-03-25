/**
 * apiClient.js
 * ------------
 * Client Axios centralisé pour toute l'application.
 * - Ajoute automatiquement le token JWT
 * - Définit l'URL de base de l'API
 */

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const apiClient = axios.create({
  baseURL: "http://10.0.2.2:3000/api"
});

// Ajout automatique du token JWT
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
