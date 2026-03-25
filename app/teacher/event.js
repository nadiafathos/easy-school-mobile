import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function EventScreen() {
  const { classId } = useLocalSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(
          `http://TON-IP:3000/classes/${classId}/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.log("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
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
        📅 Événements de la classe
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id_event.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: "#eee",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text>{item.date}</Text>
            <Text style={{ marginTop: 5 }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
