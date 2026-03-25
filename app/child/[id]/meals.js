/**
 * ---------------------------------------------------------
 * Écran : Menu de la semaine pour un enfant
 * Fichier : app/child/[id]/meals.js
 * ---------------------------------------------------------
 */

import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function ChildMeals() {
  const { id } = useLocalSearchParams(); // id de l’enfant
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    loadMeals();
  }, []);

  async function loadMeals() {
    const token = await SecureStore.getItemAsync("token");

    const response = await axios.get(
      "http://10.0.2.2:3000/api/meals/week",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMeals(response.data);
  }

  async function reserveMeal(meal_id, type_repas) {
    const token = await SecureStore.getItemAsync("token");

    await axios.post(
      "http://10.0.2.2:3000/api/reservations/meals",
      {
        child_id: id,
        meal_id,
        type_repas,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Repas réservé !");
  }

  return (
    <View style={{ padding: 20, flex: 1 }}>
      
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

      {/* Image */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        🍽️ Menu de la semaine
      </Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id_meal.toString()}
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
              📅 {item.date}
            </Text>

            <Text style={{ marginTop: 5 }}>
              🍛 {item.description}
            </Text>

            {item.allergenes && (
              <Text style={{ marginTop: 5, color: "red" }}>
                ⚠️ Allergènes : {item.allergenes}
              </Text>
            )}

            {/* Choix du type de repas */}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {["porc", "sans porc", "poisson"].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => reserveMeal(item.id_meal, type)}
                  style={{
                    backgroundColor: "#4A90E2",
                    padding: 8,
                    borderRadius: 6,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}
