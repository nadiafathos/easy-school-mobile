/**
 * ---------------------------------------------------------
 * Fichier : app/teacher/index.js
 * ---------------------------------------------------------
 * Accueil de l'espace professeur
 * ---------------------------------------------------------
 */

import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TeacherHomeScreen() {
  return (
    <View style={styles.container}>

      {/* Titre */}
      <Text style={styles.title}>Espace Enseignant 👨‍🏫</Text>

      <Text style={styles.subtitle}>
        Gérez vos classes, vos élèves et vos présences.
      </Text>

      {/* Bouton : Mes classes */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/teacher/classes")}
      >
        <Text style={styles.buttonText}>📚 Mes classes</Text>
      </TouchableOpacity>

      {/* Bouton : Élèves */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/teacher/children")}
      >
        <Text style={styles.buttonText}>👦 Liste des élèves</Text>
      </TouchableOpacity>

      {/* Bouton : Présences */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/teacher/attendance")}
      >
        <Text style={styles.buttonText}>📝 Présences</Text>
      </TouchableOpacity>

      {/* Bouton : Notifications */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/teacher/notifications")}
      >
        <Text style={styles.buttonText}>🔔 Notifications</Text>
      </TouchableOpacity>

      {/* Bouton : Événements */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/teacher/event")}
      >
        <Text style={styles.buttonText}>📅 Événements</Text>
      </TouchableOpacity>

      {/* Bouton : Devoirs */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/teacher/homework")}
      >
        <Text style={styles.buttonText}>📘 Devoirs</Text>
      </TouchableOpacity>

      {/* Bouton retour accueil */}
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.link}>← Retour à l'accueil</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
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
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  link: {
    color: "#4A90E2",
    fontSize: 16,
  },
});
