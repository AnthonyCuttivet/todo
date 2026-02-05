
# Kresus x Anthony CUTTIVET Todo app

## 📦 Installation

> **Prérequis:**
> 
> Docker (\>= 24) - https://docs.docker.com/engine/install/
> 
> Docker Compose - https://docs.docker.com/compose/
> 
> Node.js (\>= 18) - https://nodejs.org/en

1. Téléchargez ou clonez ce repo : https://github.com/AnthonyCuttivet/todo
2. Déplacez vous à la racine

#### 🚀 Démarrage
```bash
 docker compose up
```
#### 🔨 Initialisation
##### Note : L'initialisation n'est nécessaire que pour le premier démarrage
```bash
docker compose exec backend npm run setup
```

Une fois l'initialisation terminée, l'application est accessible à l'adresse suivante : http://localhost:5173/.

## 🗝️ Authentification
Deux comptes utilisateur sont disponibles :

| Identifiant | Mot de passe |
|---------|-------------|
| toto@kresus.eu | test |
| antho@kresus.eu | test |

## 🗿 Auteur

Anthony Cuttivet - Gameplay / Systèmes temps réel / Fullstack - https://anthonycuttivet.github.io

## ✅ License

Ce projet n'est fourni uniquement que pour des raisons de démonstation technique.
