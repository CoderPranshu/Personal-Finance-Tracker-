# 📊 Nexus Finance: Full-Stack Personal Finance Tracker

![Nexus Finance Banner](./docs/readme_banner.png)

## ✨ Overview
**Nexus Finance** is a production-ready, full-stack personal finance management application. I built this to help users track their income and expenses with a modern, high-performance interface. It features a robust backend with role-based access control, real-time analytics, and optimized data fetching through Redis caching.

### 🚀 Key Features
- **🔐 Secure Authentication**: JWT-based auth with secure password hashing via Bcrypt.
- **🛡️ Role-Based Access Control (RBAC)**:
  - `Admin`: Full system oversight.
  - `User`: Manage and track personal transactions.
  - `Read-Only`: View-only access for auditing/tracking.
- **📈 Interactive Dashboard**: Dynamic data visualization using **Recharts** (Pie charts, Line graphs, and Bar charts).
- **💸 Transaction Management**: Full CRUD functionality with advanced filtering, sorting, and server-side pagination.
- **⚡ High Performance**: 
  - **Backend**: Redis caching for expensive analytics queries with automatic cache invalidation.
  - **Frontend**: Optimized with lazy loading and React hooks (`useMemo`, `useCallback`).
- **🛡️ Enterprise-Grade Security**: Helmet, XSS protection, CORS configuration, and request rate-limiting.
- **📖 API Documentation**: Fully documented interactive API using Swagger.

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=react&logoColor=white)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### Dev Tools & DevOps
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

---

## ⚙️ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/) (Recommended) or local PostgreSQL & Redis.

### 1. Clone & Install
```bash
git clone https://github.com/CoderPranshu/Personal-Finance-Tracker-.git
cd Personal-Finance-Tracker-
```

### 2. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/finance_tracker
JWT_SECRET=your_super_secret_key
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:5173
```

### 3. Spin up Services (Docker)
```bash
docker compose up -d
```

### 4. Initialize Database
In the `backend/` folder:
```bash
npm install
npm run db:init
npm run db:seed
npm run start
```

### 5. Launch Frontend
In the `frontend/` folder:
```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to start tracking!

---

## 🧪 Demo Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@demo.com` | `Password@123` |
| **User** | `user@demo.com` | `Password@123` |
| **Read-Only** | `readonly@demo.com` | `Password@123` |

---

## 📁 Project Structure
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
└── docs/               # Detailed technical documentation
```

---

## 🛡️ Security Implementation
- **Rate Limiting**: Prevents brute-force attacks on sensitive endpoints.
- **Data Validation**: Sanitized inputs via `express-validator`.
- **SQL Injection Prevention**: Parameterized queries with `pg`.
- **Cache Invalidation**: Ensures data consistency between Postgres and Redis.

## 📄 License
This project is licensed under the MIT License.

---
*Created with ❤️ by [CoderPranshu](https://github.com/CoderPranshu)*
