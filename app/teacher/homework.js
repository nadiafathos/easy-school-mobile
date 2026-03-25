import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeworkScreen() {
  const { classId } = useLocalSearchParams();

  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formulaire
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Charger les devoirs
  const loadHomework = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `http://TON-IP:3000/classes/${classId}/homework`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setHomework(data);
    } catch (error) {
      console.log("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomework();
  }, []);

  // Ajouter ou modifier un devoir
  const handleSubmit = async () => {
    if (!title || !description || !dueDate) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://TON-IP:3000/homework/${editingId}`
        : `http://TON-IP:3000/classes/${classId}/homework`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          due_date: dueDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      Alert.alert(
        "Succès",
        editingId ? "Le devoir a été modifié !" : "Le devoir a été ajouté !"
      );

      // Reset
      setShowForm(false);
      setEditingId(null);
      setTitle("");
      setDescription("");
      setDueDate("");

      loadHomework();
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur", "Impossible d'enregistrer le devoir.");
    }
  };

  // Pré-remplir pour édition
  const startEdit = (item) => {
    setEditingId(item.id_homework);
    setTitle(item.title);
    setDescription(item.description);
    setDueDate(item.due_date);
    setShowForm(true);
  };

  // Supprimer un devoir
  const deleteHomework = async (id) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce devoir ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              const response = await fetch(
                `http://TON-IP:3000/homework/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Erreur suppression");
              }

              Alert.alert("Supprimé", "Le devoir a été supprimé.");
              loadHomework();
            } catch (error) {
              console.log(error);
              Alert.alert("Erreur", "Impossible de supprimer.");
            }
          },
        },
      ]
    );
  };

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
        📘 Devoirs de la classe
      </Text>

      {/* Bouton afficher/masquer formulaire */}
      <TouchableOpacity
        onPress={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setTitle("");
          setDescription("");
          setDueDate("");
        }}
        style={{
          backgroundColor: "#4A90E2",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          {showForm ? "Fermer le formulaire" : "➕ Ajouter un devoir"}
        </Text>
      </TouchableOpacity>

      {/* Formulaire */}
      {showForm && (
        <View
          style={{
            backgroundColor: "#f5f5f5",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ marginBottom: 5 }}>
            {editingId ? "Modifier le devoir" : "Nouveau devoir"}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titre"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
            }}
          />

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
              height: 100,
              marginBottom: 15,
            }}
          />

          <TextInput
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="AAAA-MM-JJ"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
            }}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#4A90E2",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {editingId ? "Modifier" : "Enregistrer"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Liste des devoirs */}
      <FlatList
        data={homework}
        keyExtractor={(item) => item.id_homework.toString()}
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

            <Text style={{ marginTop: 5, color: "#555" }}>
              📅 À rendre le : {item.due_date}
            </Text>

            <Text style={{ marginTop: 10 }}>{item.description}</Text>

            {/* Boutons actions */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => startEdit(item)}
                style={{
                  backgroundColor: "#4A90E2",
                  padding: 10,
                  borderRadius: 8,
                  flex: 1,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  ✏️ Modifier
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteHomework(item.id_homework)}
                style={{
                  backgroundColor: "#E74C3C",
                  padding: 10,
                  borderRadius: 8,
                  flex: 1,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  🗑️ Supprimer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
