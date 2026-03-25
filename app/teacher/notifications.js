import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(`http://TON-IP:3000/teacher/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.log("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
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
        🔔 Notifications envoyées
      </Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id_notification.toString()}
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
            <Text style={{ marginTop: 5 }}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}
