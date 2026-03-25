import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function ChildReservations() {
  const { id } = useLocalSearchParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    const token = await SecureStore.getItemAsync("token");

    const response = await axios.get(
      `http://10.0.2.2:3000/api/reservations/meals/child/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setReservations(response.data);
  }

  async function cancelReservation(reservationId) {
    const token = await SecureStore.getItemAsync("token");

    await axios.delete(
      `http://10.0.2.2:3000/api/reservations/meals/${reservationId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Réservation annulée");
    loadReservations();
  }

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.push(`/child/${id}`)}>
        <Text style={{ fontSize: 18, color: "#4A90E2" }}>← Retour</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 20 }}>
        🧾 Ses réservations
      </Text>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id_reservation.toString()}
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
              📅 {item.meal.date}
            </Text>

            <Text>🍛 {item.meal.description}</Text>
            <Text>Type : {item.type_repas}</Text>

            {item.absence === true && (
              <Text style={{ color: "red" }}>❌ Enfant absent</Text>
            )}

            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: "red",
                padding: 10,
                borderRadius: 8,
              }}
              onPress={() => cancelReservation(item.id_reservation)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Annuler la réservation
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
