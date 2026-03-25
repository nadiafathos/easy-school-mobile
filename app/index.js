/**
 * ---------------------------------------------------------
 * Fichier : app/index.js
 * ---------------------------------------------------------
 * Accueil général avec image + lien d'inscription en bas
 * ---------------------------------------------------------
 */

import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* IMAGE EN HAUT */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
        }}
        style={styles.logo}
      />

      {/* CONTENU CENTRAL */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>Bienvenue sur Easy‑School 👋</Text>

        <Text style={styles.subtitle}>
          Connectez-vous pour accéder à votre espace.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER EN BAS */}
      <TouchableOpacity
        onPress={() => router.push("/auth/register")}
        style={styles.footer}
      >
        <Text style={styles.footerText}>
          Pas encore de compte ? Enregistrez-vous
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: -20,
  },

  centerContent: {
    marginTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  footer: {
    marginBottom: 20,
  },

  footerText: {
    textAlign: "center",
    color: "#4A90E2",
    fontSize: 14,
  },
});
