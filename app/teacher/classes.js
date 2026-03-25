import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function ClassesScreen() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(`http://TON-IP:3000/teacher/classes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.log("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
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
        📚 Mes classes
      </Text>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id_class.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/teacher/children?classId=${item.id_class}`)}
            style={{
              padding: 15,
              backgroundColor: "#eee",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.class_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
