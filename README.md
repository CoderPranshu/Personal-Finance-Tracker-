# 📊 Nexus Finance: Full-Stack Personal Finance Tracker

## Overview
**Nexus Finance** is a production-ready, full-stack personal finance management application. I built this to help users track their income and expenses with a modern, high-performance interface. It features a robust backend with role-based access control, real-time analytics, and optimized data fetching through Redis caching.

### Key Features
- **Secure Authentication**: JWT-based auth with secure password hashing via Bcrypt.
- **Role-Based Access Control (RBAC)**:
  - `Admin`: Full system oversight.
  - `User`: Manage and track personal transactions.
  - `Read-Only`: View-only access for auditing/tracking.
- **Interactive Dashboard**: Dynamic data visualization using **Recharts** (Pie charts, Line graphs, and Bar charts).
- **Transaction Management**: Full CRUD functionality with advanced filtering, sorting, and server-side pagination.
- **High Performance**: 
  - **Backend**: Redis caching for expensive analytics queries with automatic cache invalidation.
  - **Frontend**: Optimized with lazy loading and React hooks (`useMemo`, `useCallback`).
- **Enterprise-Grade Security**: Helmet, XSS protection, CORS configuration, and request rate-limiting.
- **API Documentation**: Fully documented interactive API using Swagger.

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=flat)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis)

### Dev Tools & DevOps
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens)

---

## Project Structure
```text
├── backend/            # Express server & API routes
│   ├── src/controllers # Business logic
│   ├── src/routes      # API endpoints
│   ├── src/middleware  # Auth & Security
│   └── src/db          # PG & Redis config
├── frontend/           # React + Vite application
│   ├── src/components  # Reusable UI components
│   ├── src/pages       # Dashboard & Auth views
│   └── src/assets      # Global styles & icons
```

---

## Security Implementation
- **Rate Limiting**: Prevents brute-force attacks on sensitive endpoints.
- **Data Validation**: Sanitized inputs via `express-validator`.
- **SQL Injection Prevention**: Parameterized queries with `pg`.
- **Cache Invalidation**: Ensures data consistency between Postgres and Redis.

---
*Created by [CoderPranshu](https://github.com/CoderPranshu)*
