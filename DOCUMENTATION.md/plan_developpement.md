1. Introduction du projet
   Easy School est une application mobile destinée aux écoles primaires.
   Elle permet aux parents et aux enseignants de gérer facilement :
   • les enfants
   • les repas et les réservations
   • les devoirs
   • les événements scolaires
   • la participation des enfants
   L’objectif principal est de centraliser les informations scolaires dans une interface simple, moderne et intuitive.
   En tant que développeuse junior, j’ai structuré mon travail en plusieurs étapes afin d’assurer une progression claire et cohérente.

🧩 2. Objectifs du projet
🎯 Objectif général
Développer une application mobile fonctionnelle, connectée à une API sécurisée, permettant aux utilisateurs de consulter et gérer les informations scolaires.
🎯 Objectifs spécifiques
• Mettre en place une authentification sécurisée (JWT + SecureStore)
• Créer une architecture frontend propre avec Expo Router
• Développer un backend complet (Node.js, Express, PostgreSQL)
• Gérer les rôles utilisateurs (admin, parent, enseignant)
• Implémenter les écrans principaux : enfants, repas, devoirs, événements
• Assurer la cohérence entre frontend et backend
• Rédiger une documentation technique complète

🏗️ 3. Architecture globale
🔹 Frontend
• React Native (Expo)
• Expo Router
• Axios
• SecureStore
• Structure modulaire par écrans
🔹 Backend
• Node.js + Express
• Sequelize ORM
• PostgreSQL
• JWT + Bcrypt
• Middlewares d’authentification et d’autorisation

📅 4. Découpage en phases (Sprints)
🟦 Phase 1 – Analyse & Conception
• Analyse des besoins
• Définition des rôles utilisateurs
• Conception du MCD / MLD
-elaborations des diagrammes (sequences,)
• Conception des modèles Sequelize
• Définition des routes API
• Structure du projet frontend
Livrables :
• MCD / MLD
• Liste des routes
• Structure initiale du projet

🟩 Phase 2 – Backend
• Mise en place du serveur Express
• Connexion PostgreSQL
• Création des modèles Sequelize
• Associations entre les tables
• Création des routes CRUD
• Authentification JWT
• Gestion des rôles (admin, parent, enseignant)
Livrables :
• API fonctionnelle
• Authentification opérationnelle
• Documentation API

🟧 Phase 3 – Frontend
• Mise en place d’Expo Router
• Création des écrans :
• Login
• Home
• Children
• Meals
• Homeworks
• Events
• Mise en place d’apiClient.js
• Gestion du token (SecureStore)
• Navigation conditionnelle (si token → Home)
Livrables :
• Application mobile fonctionnelle
• Navigation fluide
• Appels API opérationnels

🟪 Phase 4 – Intégration & Tests
• Tests manuels des écrans
• Vérification des appels API
• Vérification des rôles utilisateurs
• Correction des bugs
• Amélioration de l’UX
Livrables :
• Version stable de l’application
• Tests validés

🟫 Phase 5 – Documentation & Présentation
• Rédaction du README
• Documentation technique backend
• Documentation frontend
• Plan de développement
• Préparation de la présentation finale
Livrables :
• Documentation complète
• Projet prêt pour le jury

🧠 5. Gestion des rôles et responsabilités (RACI)

🧪 6. Tests réalisés
• Connexion / déconnexion
• Stockage du token
• Redirection automatique
• Appels API (CRUD)
• Navigation Expo Router
• Réservation repas
• Participation événements
• Affichage des devoirs
• Gestion des erreurs (401, 404)

📦 7. Technologies utilisées
Frontend
• React Native (Expo)
• Expo Router
• Axios
• SecureStore
Backend
• Node.js
• Express
• Sequelize
• PostgreSQL
• JWT
• Bcrypt

📝 8. Conclusion
Ce projet m’a permis de :
• comprendre la structure d’une application mobile complète
• mettre en place une API sécurisée
• gérer des rôles utilisateurs
• organiser un projet de manière professionnelle
• rédiger une documentation technique complète
• améliorer mes compétences en React Native et Node.js
En tant que développeuse junior, ce projet a été une expérience très formatrice et m’a permis de renforcer ma logique, ma rigueur et ma capacité à structurer un projet de A à Z.

─────────────────────────────────────────────┐
│ UI Layer │
│ (Screens React Native + Expo Router) │
│ │
│ - HomeScreen │
│ - ChildrenScreen

                      │

│ - MealScreen │
│ - HomeworkScreen │
│ - EventScreen │
│ - SchoolScreen │
│ - AttendanceScreen │
│ - NotificationScreen │
└──────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ Services Layer │
│ (Appels API centralisés + logique métier) │
│ │
│ - apiClient.js │
│ - childrenService.js │
│ - mealService.js │
│ - homeworkService.js │
│ - eventService.js │
│ - schoolService.js │
│ - attendanceService.js │
│ - notificationService.js │
└──────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ Secure Storage Layer │
│ │
│ - SecureStore (token JWT) │
└──────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ Backend API │
│ (Node.js + Express + PostgreSQL) │
└──────────────────────────────────────────────┘

┌──────────────┐
│ index.js │
│ (check token) │
└───────┬──────┘
│
┌──────────────────┴──────────────────┐
▼ ▼
┌──────────────┐ ┌────────────────┐
│ auth/login │ │ HomeScreen │
└───────┬──────┘ └───────┬────────┘
│ │
│ │
│ │
▼ ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│ ChildrenScreen │ │ MealScreen │
└──────────────────────────────┘ └──────────────────────────────┘

┌──────────────────────────────┐ ┌──────────────────────────────┐
│ HomeworkScreen │ │ EventScreen │
└──────────────────────────────┘ └──────────────────────────────┘

┌──────────────────────────────┐ ┌──────────────────────────────┐
│ SchoolScreen │ │ AttendanceScreen │
└──────────────────────────────┘ └──────────────────────────────┘

┌──────────────────────────────┐
│ NotificationScreen │
└──────────────────────────────┘
🧑‍🏫 Ajout de l’Espace Professeur
(Section prête à intégrer dans ton README)
🎯 Rôle de l’espace professeur
L’espace professeur permet aux enseignants de :

- consulter la liste de leurs classes
- accéder aux élèves d’une classe
- encoder les présences
- publier des devoirs
- créer des événements
- envoyer des notifications aux parents
- consulter les informations scolaires essentielles
  Cet espace est totalement séparé de l’espace parent, grâce à la gestion des rôles (JWT + middleware).
