## 🔐 Étape 2 — Création de l'écran Login

J'ai créé l'écran `LoginScreen` dans `app/(auth)/login.js`.  
Cet écran constitue la base du système d'authentification de l'application Easy School.

### Fonctionnalités implémentées :

- Champ email
- Champ mot de passe
- Vérification des champs vides
- Bouton de connexion
- Fonction `handleLogin()` prête à être connectée à l'API `/auth/login`

### Objectif :

Permettre à l'utilisateur de saisir ses identifiants avant d'envoyer une requête au backend.  
Cette étape prépare l'intégration de l'API d'authentification et la gestion du token.

## 📱 Étape 4 — Mise en place de la navigation interne avec `_layout.js`

J'ai créé un fichier `_layout.js` dans `app/(app)/`.  
Ce fichier contrôle toute la navigation interne de l'application après la connexion.

### Rôle de `_layout.js` :

- Définir la barre d'onglets (Tabs)
- Associer chaque onglet à un écran :
  - `index.js` → Accueil
  - `children.js` → Enfants
  - `meals.js` → Repas
  - `events.js` → Événements
  - `homework.js` → Devoirs

  j'ajouterai les autres ecrans plustard. j'essaie d'avoir un api fonctionnel et simple.

Expo Router utilise la structure des fichiers pour générer automatiquement la navigation.  
`_layout.js` agit comme un "plan" qui organise les écrans internes.

## 🔄 Étape 5 — Gestion de la redirection automatique (app/index.js)

J'ai modifié `app/index.js` pour qu'il devienne un écran de redirection.  
Son rôle est de vérifier si un token JWT est stocké dans `expo-secure-store`.

### Fonctionnement :

- Si un token existe → redirection vers `(app)` (espace connecté)
- Si aucun token → redirection vers `(auth)/login`
- Un loader est affiché pendant la vérification

Cette étape permet de gérer automatiquement l'état de connexion de l'utilisateur.

## 🔐 Mise en place d'un client API centralisé (apiClient)

J'ai créé un fichier `services/apiClient.js` qui contient une instance Axios configurée pour :

- ajouter automatiquement le token JWT dans les requêtes
- vérifier l'expiration du token via jwtDecode
- supprimer le token si expiré (SecureStore)
- rediriger vers `(auth)/login` si nécessaire
- gérer les erreurs API globalement

Toutes les requêtes du front passent désormais par `apiClient`.
