import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="screens/HomeScreen" options={{ title: "Accueil" }} />
      <Tabs.Screen name="screens/ChildrenScreen" options={{ title: "Enfants" }} />
      <Tabs.Screen name="screens/MealsScreen" options={{ title: "Repas" }} />
      <Tabs.Screen name="screens/EventsScreen" options={{ title: "Événements" }} />
      <Tabs.Screen name="screens/HomeworkScreen" options={{ title: "Devoirs" }} />
    </Tabs>
  );
}