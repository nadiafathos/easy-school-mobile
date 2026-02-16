# 📘 Documentation du développement de l'application Easy School

## 🎯 Objectif du projet

Développer une application mobile destinée aux parents et enseignants pour gérer :

- les enfants
- les repas
- les événements
- les devoirs
- l’authentification sécurisée

L’application est construite avec **React Native**, **Expo**, et **Expo Router**.

---

# 🧱 1. Mise en place de la base technique

- Initialisation du projet Expo
- Configuration d’Expo Router
- Création de la structure du dossier `app/`
- Mise en place du fichier `App.js`
- Création du fichier `app/index.js`
- Test du backend via `API_URL`

---

# 🔐 2. Authentification (Login)

- Création de l’écran `LoginScreen`
- Appel API `/auth/login`
- Gestion des erreurs
- Stockage du token avec `expo-secure-store`
- Redirection vers l’espace connecté

---

# 🧭 3. Navigation interne (layout + tabs)

- Création du layout `(app)/_layout.js`
- Mise en place d’une navigation par onglets :
  - Accueil
  - Enfants
  - Repas
  - Événements
  - Devoirs

---

# 🏠 4. Dashboard (Accueil interne)

- Affichage du message de bienvenue
- Récupération des informations utilisateur
- Aperçu des repas / événements du jour

---

# 👶 5. Module Enfants (Children)

- Liste des enfants
- Détails d’un enfant
- Appel API `/children`
- Gestion des erreurs

---

# 🍽️ 6. Module Repas (Meals)

- Liste des repas
- Réservation / annulation
- Appel API `/meals` et `/reservationMeal`

---

# 🎉 7. Module Événements (Events)

- Liste des événements
- Participation
- Appel API `/events` et `/participationEvent`

---

# 📚 8. Module Devoirs (Homework)

- Liste des devoirs
- Détails
- Appel API `/homework`

---

# 🎨 9. Finitions & UX

- Harmonisation des couleurs
- Icônes
- Messages d’erreur clairs
- Écrans de chargement
- Nettoyage du code

---

# 🧪 10. Tests & Préparation jury

- Tests sur Android
- Tests sur Web
- Vérification API
- Documentation complète
- Préparation de la soutenance
