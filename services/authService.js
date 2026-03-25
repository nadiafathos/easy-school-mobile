/**
 * ---------------------------------------------------------
 * Service : authService.js
 * ---------------------------------------------------------
 * Rôle :
 *  - Gérer la connexion utilisateur (parent / professeur / admin)
 *  - Stocker le token, le rôle et l'école dans SecureStore
 *  - Fournir des helpers pour récupérer ces infos
 * ---------------------------------------------------------
 */

import * as SecureStore from "expo-secure-store";
import apiClient from "./apiClient";

const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const SCHOOL_KEY = "schoolId";

const authService = {
  /**
   * Connexion utilisateur
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} user
   */
  async login(email, password) {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    // Stockage sécurisé
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(ROLE_KEY, user.role);
    await SecureStore.setItemAsync(SCHOOL_KEY, String(user.id_school));

    return user;
  },

  /** Récupère le rôle */
  async getRole() {
    return await SecureStore.getItemAsync(ROLE_KEY);
  },

  /** Récupère l'école */
  async getSchoolId() {
    return await SecureStore.getItemAsync(SCHOOL_KEY);
  },

  /** Déconnexion */
  async logout() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(ROLE_KEY);
    await SecureStore.deleteItemAsync(SCHOOL_KEY);
  },
};

export default authService;
