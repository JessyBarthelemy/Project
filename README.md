# 🍽️ MenuManager

**MenuManager** est une application de gestion de menus pour restaurants, développée avec **NestJS**, **TypeORM**, **Vue.js** et **TypeScript**.  
Elle permet aux restaurateurs de gérer leur établissement, les menus et les cartes, avec une interface simple et moderne.

---

## ✨ Fonctionnalités actuelles

### 🔐 Authentification
- Authentification via Google (OAuth2)
- Authentification par e-mail/mot de passe
- JWT sécurisé (avec expiration configurable)

### 🏪 Gestion des restaurants
- CRUD complet des restaurants
- Téléversement et gestion d’images (logo, photo)
- Sélection d’un restaurant actif

### 🧾 Cartes et menus *(en cours)*
- Préparation du CRUD des cartes
- Affichage prévu via QR code scannable

### 📅 Planning de restaurant *(à venir)*
- Création d’un calendrier/planning des disponibilités du restaurant

---

## 🛠️ Stack technique

| Backend        | Frontend       | Autres outils       |
|----------------|----------------|----------------------|
| NestJS         | Vue 3 + Vite   | TypeScript partout   |
| TypeORM (PostgreSQL) | Vuetify 3      | Axios, JWT, OAuth2    |
| Jest, Passport | Vue Router    | ESLint, Prettier      |

---

## 🚀 Lancer le projet

### 1. Cloner le repo

```bash
git clone https://github.com/ton-user/menu-manager.git
cd menu-manager
