
# Project Name

## Overview

This repository contains a full-stack application composed of a backend API, a frontend client, and a database.

The backend exposes a REST API responsible for authentication, business logic, and data persistence.

The frontend consumes this API and provides a user-facing interface.

All services are containerized for a consistent and reproducible development environment.

## Tech Stack

### Backend

- Node.js

- NestJS

- TypeScript

- MikroORM

- PostgreSQL

- Passport.js

- Docker

### Frontend

- React

- TypeScript

- Vue 3

- Pinia

### Database

- PostgreSQL

### Tooling

- Docker & Docker Compose

## Development Environment Setup

### Prerequisites

- Docker (\>= 24)

- Docker Compose

- Node.js (\>= 18)

### Running the Project

docker-compose up


## Accessing the Services

### Frontend

http://localhost:5173

### Backend API

http://localhost:3000

### Database

Host: localhost

Port: 5432

Database: app_db

Username: app_user

Password: app_pwd

## Authentication

Authentication is handled using Passport.js with JWT strategy. The account to access the frontend is the following :
username : aled2
password : travail

## Author

Anthony Cuttivet

Gameplay / Real time Systems / Fullstack Developer

Portfolio: https://anthonycuttivet.github.io\

LinkedIn: https://linkedin.com/in/anthonycuttivet

## License

This project is provided for technical demonstration purposes only. Some security choices made here were due to a tight time limit and a risk-free production environment along with zero sensitive data. Do note that these choices do not represent how I would have handled them in a professionnal production environment.
