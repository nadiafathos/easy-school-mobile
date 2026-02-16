# 📘 Documentation Technique — Easy School

## 🧩 Introduction

Easy School est une application mobile développée avec **React Native**, **Expo**, et **Expo Router**.  
Elle permet aux parents et enseignants de gérer les repas, les événements, les devoirs et les informations des enfants.

Cette documentation décrit les choix techniques, l’architecture, les modèles de données et les interactions avec le backend.

---

# 🏗️ 1. Architecture générale

## 📁 Structure du projet

EASY-SCHOOL/ App.js app/ index.js (auth)/ login.js (app)/ \_layout.js index.js children.js meals.js events.js homework.js screens/ HomeScreen.js config/ api.js components/ hooks/ assets/

### 🔍 Explication

- **app/** : contient toutes les routes Expo Router
- **(auth)** : routes publiques (connexion)
- **(app)** : routes internes après connexion
- **screens/** : composants d’écran réutilisables
- **config/** : configuration globale (API_URL, thèmes, etc.)

---

# 🔐 2. Authentification

## 🔑 Login

L’utilisateur se connecte via l’endpoint :

### 🔍 Explication

- **app/** : contient toutes les routes Expo Router
- **(auth)** : routes publiques (connexion)
- **(app)** : routes internes après connexion
- **screens/** : composants d’écran réutilisables
- **config/** : configuration globale (API_URL, thèmes, etc.)

---

# 🔐 2. Authentification

## 🔑 Login

L’utilisateur se connecte via l’endpoint :
POST /auth/login

🎨 7. UI / UX
🎯 Objectifs
• Interface simple et intuitive
• Navigation fluide
• Couleurs cohérentes
• Icônes explicites
• Messages d’erreur clairs
🎨 Style global
• Couleur primaire : #4A90E2
• Couleur secondaire : #F5F5F5
• Typographie : Inter / System

🧪 8. Tests & Débogage
✔ Tests effectués
• Android Emulator (API 33/34)
• Expo Web
• Tests API Postman
• Vérification des erreurs réseau
• Tests de navigation
🐞 Outils de debug
• Expo DevTools
• Console JS
• Network Inspector

📦 9. Déploiement
📱 Android
• Build via
• APK / AAB généré pour installation
🌐 Web
• Build via

## 📁 Navigation interne — `_layout.js`

Le fichier `_layout.js` placé dans `app/(app)/` configure la navigation par onglets via `Tabs` de `expo-router`.

Chaque `<Tabs.Screen>` correspond à un fichier du même nom dans le dossier `(app)`.

Exemple :

- `<Tabs.Screen name="children" />` → `children.js`

Cette architecture permet une navigation claire, modulaire et évolutive.

### 🔐 Client API (axios + SecureStore)

Le client API utilise deux intercepteurs :

#### Intercepteur de requêtes

- Récupère le token via SecureStore
- Vérifie son expiration
- Ajoute `Authorization: Bearer <token>`
- Redirige vers login si expiré

#### Intercepteur de réponses

- Supprime le token en cas d'erreur 401/403
- Redirige vers login

Ce système centralise toute la logique d'authentification et sécurise les appels API.
