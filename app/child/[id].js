/**
 * ---------------------------------------------------------
 * Écran : Détails d’un enfant (app/child/[id].js)
 * ---------------------------------------------------------
 * Cet écran affiche :
 *  - Les informations d’un enfant (nom, classe, âge, allergies)
 *  - Une image/icône
 *  - 3 boutons : repas, devoirs, événements
 *  - Un bouton retour vers /home
 *
 * Navigation :
 *  - /home
 *  - /child/[id]/meals
 *  - /child/[id]/homework
 *  - /child/[id]/events
 *
 * Fonctionnement :
 *  - Récupère l’ID via useLocalSearchParams()
 *  - Charge les données via /api/children/:id
 *  - Affiche les infos dans une mise en page simple et claire
 * ---------------------------------------------------------
 */

import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ChildDetails() {
  const { id } = useLocalSearchParams();
  const [child, setChild] = useState(null);

  useEffect(() => {
    async function loadChild() {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(
        `http://10.0.2.2:3000/api/children/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setChild(response.data);
    }

    loadChild();
  }, []);

  if (!child) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>

      {/** ---------------------------------------------------------
       * Bouton retour vers /home
       * --------------------------------------------------------- */}
      <TouchableOpacity
        onPress={() => router.push("/children")}
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

      {/** ---------------------------------------------------------
       * Image de l’enfant
       * --------------------------------------------------------- */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      {/** ---------------------------------------------------------
       * Informations principales
       * --------------------------------------------------------- */}
      <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>
        {child.nom}
      </Text>

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 18 }}>Classe : {child.classe_id}</Text>
        <Text style={{ fontSize: 18 }}>Âge : {child.age}</Text>
        <Text style={{ fontSize: 18 }}>
          Allergies : {child.allergies || "Aucune"}
        </Text>
      </View>

      {/** ---------------------------------------------------------
       * Boutons de navigation
       * --------------------------------------------------------- */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 12,
          borderRadius: 8,
          marginTop: 25,
        }}
        onPress={() => router.push(`/child/${id}/meals`)}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Voir ses repas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#28a745",
          padding: 12,
          borderRadius: 8,
          marginTop: 10,
        }}
        onPress={() => router.push(`/child/${id}/homework`)}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Voir ses devoirs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#ff9800",
          padding: 12,
          borderRadius: 8,
          marginTop: 10,
        }}
        onPress={() => router.push(`/child/${id}/events`)}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Voir ses événements
        </Text>
      </TouchableOpacity>
    </View>
  );
}
