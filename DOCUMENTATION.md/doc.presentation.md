L’application Easy School permet aux parents et enseignants de :
• consulter les enfants associés à leur compte
• consulter les repas et réserver
• consulter les devoirs
• consulter les événements et gérer la participation
• se connecter via un système sécurisé JWT
• naviguer facilement grâce à Expo Router.
J’ai utilisé Expo Router pour la navigation, Axios pour les appels API, et SecureStore pour stocker le token JWT de manière sécurisée.

voici l'architecture minimale du projet:

app/
│
├── index.js

            → Vérification du token + redirection

├── \_layout.js
→ Layout global Expo Router
│
├── auth/
│ └── login.js

                      → Écran de connexion

│
├── screens/
│ ├── HomeScreen.js
│ ├── ChildrenScreen.js
│ ├── ChildDetailsScreen.js
│ ├── MealScreen.js
│ ├── HomeworkScreen.js
│ ├── EventScreen.js
│ ├── SchoolScreen.js  
 ← Nouveau
│ ├── AttendanceScreen.js ← Nouveau
│ └── NotificationScreen.js ← Nouveau
│
└── services/
├── apiClient.js
├── schoolService.js
├── attendanceService.js
└── notificationService.js

    5. 📱 Description des écrans

🏠 HomeScreen
Affiche les sections principales :
• Enfants
• Repas
• Devoirs
• Événements
• ecole
•Presence
•Notifications

Navigation via Expo Router :

ChildrenScreen
Fonctionnalités :
• Récupère les enfants du parent connecté
• Affiche la liste
• Permet d’aller vers les détails d’un enfant (optionnel)
API utilisée :
GET /children

🍽️ MealScreen
Fonctionnalités :
• Liste des repas
• Réservation d’un repas
• Indication des allergènes
API :
GET /meals
POST /reservation-meals

📚 HomeworkScreen
Fonctionnalités :
• Liste des devoirs par classe
• Affichage des détails
• Téléchargement éventuel d’un fichier
API :GET /homeworks

EventScreen

- Liste des événements
- Participation
- API :
- GET /events
- POST /events/:id/participation

🏫 SchoolScreen (NOUVEAU)

- Liste des écoles
- API : GET /schools
  🧍 AttendanceScreen (NOUVEAU)
- Marquer présence / absence / retard
- Historique
- API :
- POST /attendance
- GET /attendance/:childId

🔔 NotificationScreen (NOUVEAU)

- Liste des notifications
- API :
- GET /notifications
- POST /notifications

GESTIO DES ROLES:

Admin/administration :
gère école,classes,utilisateurs, enseignants
Enseignant:
gère devoir,évenements,notifications et présence
Parent:
consulte enfants,repas,devoirs evenements et notifications

🛠️ Services – apiClient.js
J’ai centralisé toute la logique API dans un seul fichier.
Fonctionnalités :
• baseURL
• ajout automatique du token
• gestion des erreurs
• redirection automatique en cas de token expiré

🧪 Tests manuels
J’ai testé :
• la connexion
• la redirection automatique
• les appels API
• la navigation
• les réservations
• les participations
• l’affichage des listes

📦 Conclusion
En tant que développeuse junior, ce projet m’a permis de :
• comprendre la structure d’une application mobile
• gérer une authentification sécurisée
• consommer une API REST
• organiser un projet React Native proprement
• utiliser Expo Router
• gérer des rôles utilisateurs
• structurer une documentation technique complète
