/**
 * ---------------------------------------------------------
 * Écran : Devoirs d’un enfant (app/child/[id]/homework.js)
 * ---------------------------------------------------------
 * Rôle :
 *  - Afficher la liste des devoirs d’un enfant
 *  - Permettre de revenir à la fiche enfant (/child/[id])
 *
 * Fonctionnement :
 *  - Récupère l’ID via useLocalSearchParams()
 *  - Charge les devoirs via /api/children/:id/homework
 *  - Affiche chaque devoir dans une carte moderne
 *
 * UI :
 *  - Image fun
 *  - Bouton retour
 *  - Liste stylée
 * ---------------------------------------------------------
 */

import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function ChildHomework() {
  const { id } = useLocalSearchParams();
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomework() {
      try {
        const token = await SecureStore.getItemAsync("token");

        const response = await axios.get(
          `http://10.0.2.2:3000/api/children/${id}/homework`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setHomework(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des devoirs :", error);
      } finally {
        setLoading(false);
      }
    }

    loadHomework();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F9FAFB" }}>

      {/* Bouton retour */}
      <TouchableOpacity
        onPress={() => router.push(`/child/${id}`)}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: "#e6e6e6",
          borderRadius: 8,
          alignSelf: "flex-start",
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 16 }}>← Retour</Text>
      </TouchableOpacity>

      {/* Image fun */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135692.png",
        }}
        style={{
          width: 110,
          height: 110,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      {/* Titre */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        📚 Devoirs de l’enfant
      </Text>

      {/* Loader */}
      {loading && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Chargement des devoirs...
        </Text>
      )}

      {/* Liste des devoirs */}
      <FlatList
        data={homework}
        keyExtractor={(item) => item.id_homework.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 12,
              marginVertical: 8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {item.titre}
            </Text>

            <Text style={{ marginTop: 6, color: "#444" }}>
              {item.description}
            </Text>

            <Text style={{ marginTop: 6, color: "#777" }}>
              📅 Pour le : {item.date}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
