
import API_URL from "../../config/api";


import { useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => console.log("Réponse backend :", data))
    .catch(err => console.log("Erreur API :", err));
}, []);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Easy School 👋</Text>
      <Text style={styles.subtitle}>Ton app scolaire commence ici</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});