# I - Introduction à ExpressJS
## Exercice 1:Créer un serveur ExpressJS simple
Créez un serveur ExpressJS qui répond "Hello World" sur la route principale et affiche la date et l'heure actuelles sur la route "/date".


 ### Démarrage et arrêt du serveur:
 ``` bash command 
 node app.js
 ```
### 👉 URL pour tester le projet : http://localhost:3000/basic 

# Screenshots
# Création d’un serveur ExpressJS – Affichage de "Hello World" sur la route principale

![11111111Immagine 2025-04-16 230713](https://github.com/user-attachments/assets/6ee21706-9e0f-48f3-aa5d-62c0dca1f518)



# ✅ Description de l'affichage de la page /date :
La page située à la route "/date" affiche la date et l'heure actuelles

![express2](https://github.com/user-attachments/assets/551887e7-7c7a-4a02-b1e2-7f195e931b43)





# Exercice 2: Configuration d'un projet ExpressJS
Créez un projet ExpressJS complet avec la structure de répertoires recommandée et configurez-le pour servir des fichiers statiques et gérer différentes routes.

 ### Démarrage et arrêt du serveur:
 ``` bash command 
 node app.js
 ```
### 👉 URL pour tester le projet : http://localhost:3000 
# 📘 Création d’un projet ExpressJS structuré avec gestion des routes et fichiers statiques

![image](https://github.com/user-attachments/assets/ff3144c4-ee2d-43d1-a8ea-20f53f63a790)


# II - Routage avec ExpressJS
## Exercice 1: Créer un ensemble de routes pour une API de gestion de tâches
Exercice 1: Créer un ensemble de routes pour une API de gestion de tâches
Créez une API RESTful pour gérer une liste de tâches avec les routes suivantes :

GET /tasks - Récupérer toutes les tâches

GET /tasks/:id - Récupérer une tâche spécifique

POST /tasks - Créer une nouvelle tâche

PUT /tasks/:id - Mettre à jour une tâche existante

DELETE /tasks/:id - Supprimer une tâche

 ### Démarrage et arrêt du serveur:
 ``` bash command 
 node app.js
 ```
### 👉 URL pour tester le projet : http://localhost:3000/tasks-page
# 🟣 Vue de la page de gestion des tâches

![22222222222](https://github.com/user-attachments/assets/080b7cbc-5bec-4f24-82e7-4a4815ba778d)

## 📝Exercice 2: Implémenter des routes paramétrées
Créez une API pour un blog avec des routes paramétrées :

GET /posts/:year/:month? - Récupérer les articles d'une année et optionnellement d'un mois spécifique

GET /categories/:categoryName/posts - Récupérer les articles d'une catégorie spécifique

### 👉 URL pour tester le projet : http://localhost:3000/blog-page

### 🚀 Implémentation d'une API RESTful avec ExpressJS : Routes paramétrées pour un système de blog.
Développement des endpoints GET /posts/:year/:month? et GET /categories/:categoryName/posts avec gestion des paramètres optionnels.

![33333333333Immagine 2025-04-16 232430](https://github.com/user-attachments/assets/30d2262f-724c-4efb-9a33-85506b76e56c)

### 🔍 Résultats de l'Exploration API

Données récupérées via les routes paramétrées /posts/:year/:month? et /categories/:categoryName/posts

![5555555555Immagine 2025-04-16 235024](https://github.com/user-attachments/assets/3288ca52-f5a9-4231-994f-dcbbd7a90593)


## Exercice 3: Organiser une application avec des routeurs modulaires
Réorganisez une application Express existante en utilisant des routeurs modulaires pour différentes ressources (utilisateurs, produits, commandes, etc.).

### 👉 URL pour tester le projet : http://localhost:3000/admin-dashboard

## 🛠️ Interface de gestion des utilisateurs - Routeur modulaire : /utilisateurs :

![8888888Immagine 2025-04-17 000425](https://github.com/user-attachments/assets/f9f7b9b4-9790-484b-b077-508888707fd6)

## 🛠️ Interface de gestion des produits - Routeur modulaire : /produits :
![I09999999999mmagine 2025-04-17 000623](https://github.com/user-attachments/assets/25356182-bfda-4271-9198-009cbd61b8c9)

## 🛠️ Interface de gestion des commandes - Routeur modulaire : /commandes :
![33333333333333333333Immagine 2025-04-17 000829](https://github.com/user-attachments/assets/f542f428-7bac-48af-ba60-d8e4de3da178)









