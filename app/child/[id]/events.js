/**
 * ---------------------------------------------------------
 * Écran : Événements d’un enfant (app/child/[id]/events.js)
 * ---------------------------------------------------------
 * Cet écran affiche :
 *  - La liste des événements liés à l’enfant
 *  - Une image illustrative
 *  - Un bouton retour vers /child/[id]
 *
 * Navigation :
 *  - /child/[id]
 *
 * Fonctionnement :
 *  - Récupère l’ID via useLocalSearchParams()
 *  - Charge les événements via /api/children/:id/events
 * ---------------------------------------------------------
 */

import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function ChildEvents() {
  const { id } = useLocalSearchParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(
        `http://10.0.2.2:3000/api/children/${id}/events`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEvents(response.data);
    }

    loadEvents();
  }, []);

  return (
    <View style={{ padding: 20 }}>

      {/** ---------------------------------------------------------
       * Bouton retour vers /child/[id]
       * --------------------------------------------------------- */}
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

      {/** ---------------------------------------------------------
       * Image illustrative
       * --------------------------------------------------------- */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/747/747310.png" }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      {/** ---------------------------------------------------------
       * Titre
       * --------------------------------------------------------- */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Événements de l’enfant
      </Text>

      {/** ---------------------------------------------------------
       * Liste des événements
       * --------------------------------------------------------- */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id_event.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#f2f2f2",
              padding: 15,
              borderRadius: 10,
              marginVertical: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {item.nom}
            </Text>
            <Text style={{ marginTop: 4 }}>Date : {item.date}</Text>
            <Text style={{ marginTop: 4, color: "#555" }}>
              Description : {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
