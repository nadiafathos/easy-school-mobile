/**
 * ---------------------------------------------------------
 * Fichier : app/child/index.js
 * ---------------------------------------------------------
 * Rôle :
 *  - Afficher la liste des enfants du parent connecté
 *  - Permettre d'accéder aux détails d’un enfant (/child/[id])
 *
 * Fonctionnement :
 *  - Récupère le token dans SecureStore
 *  - Appelle l’API /api/children pour obtenir les enfants
 *  - Affiche chaque enfant sous forme de carte interactive
 *
 * UI :
 *  - Titre "Mes enfants"
 *  - Icônes funs pour chaque enfant
 *  - Cartes cliquables
 *
 * Navigation :
 *  - router.push("/child/[id]") → détails d’un enfant
 * ---------------------------------------------------------
 */

import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function ChildrenList() {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    async function loadChildren() {
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get("http://10.0.2.2:3000/api/children", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChildren(response.data);
    }

    loadChildren();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F9FAFB" }}>

      {/* Titre principal */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        👨‍👩‍👧 Mes enfants
      </Text>

      {/* Liste des enfants */}
      <FlatList
        data={children}
        keyExtractor={(item) => item.id_child.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginVertical: 10,
              padding: 15,
              backgroundColor: "white",
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              elevation: 2,
            }}
            onPress={() =>
              router.push({
                pathname: "/child/[id]",
                params: { id: item.id_child },
              })
            }
          >
            {/* Image fun */}
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
              }}
              style={{
                width: 60,
                height: 60,
                marginRight: 15,
              }}
            />

            {/* Infos enfant */}
            <View>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {item.nom}
              </Text>
              <Text style={{ color: "#555", marginTop: 4 }}>
                Classe : {item.classe_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
