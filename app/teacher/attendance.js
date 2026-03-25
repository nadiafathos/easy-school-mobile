import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function AttendanceScreen() {
  const { child_id } = useLocalSearchParams();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(
          `http://TON-IP:3000/attendance/child/${child_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setAttendance(data);
      } catch (error) {
        console.log("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        📝 Présences de l’élève
      </Text>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id_attendance.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: "#eee",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text>Date : {item.date}</Text>
            <Text>Présent : {item.present ? "Oui" : "Non"}</Text>
            {item.heure_arrivee && (
              <Text>Arrivée : {item.heure_arrivee}</Text>
            )}
            {item.heure_depart && (
              <Text>Départ : {item.heure_depart}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
