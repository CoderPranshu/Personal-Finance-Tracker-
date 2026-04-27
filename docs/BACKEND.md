# Backend Documentation - Nexus Finance API

## ⚙️ Overview
The backend of **Nexus Finance** is a robust, secure, and scalable RESTful API built with **Node.js** and **Express**. It serves as the brain of the application, handling complex financial logic, authentication, and data persistence.

---

## 🛠️ Tech Stack
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Relational data storage)
- **Caching:** [Redis](https://redis.io/) (Performance optimization for analytics)
- **Security:** Helmet, Express-Rate-Limit, Bcrypt
- **API Docs:** Swagger (OpenAPI 3.0)

---

## 🛡️ Security Implementation
Security is baked into the core of the backend:
- **JWT Authentication:** Secure stateless session management.
- **Bcrypt Hashing:** Industry-standard password encryption.
- **RBAC (Role-Based Access Control):** 
  - `admin`: Full system access.
  - `user`: Standard CRUD for personal data.
  - `read-only`: View-only access.
- **Rate Limiting:** Prevents Brute-force and DoS attacks (100 requests per 15 minutes per IP).
- **Helmet:** Sets various HTTP headers to secure the app from common web vulnerabilities.
- **Input Validation:** Strict sanitization using `express-validator`.

---

## ⚡ Performance & Caching
To ensure a snappy experience even with large datasets, we use **Redis Caching**:
- **Strategy:** Cache-aside pattern.
- **Analytics Cache:** Dashboard analytics are cached for 15 minutes.
- **Cache Invalidation:** Any transaction CRUD operation automatically purges relevant cache keys to ensure data integrity.

---

## 📁 Project Structure
- `/src/controllers`: Logic for handling requests and generating responses.
- `/src/routes`: Definition of API endpoints and mapping to controllers.
- `/src/middleware`: Custom logic for auth, validation, and security.
- `/src/db`: Database connection pool and schema definitions.
- `/src/utils`: Helper functions and shared logic.

---

## 📖 API Documentation
The API is fully documented using Swagger. When running locally, you can access the interactive documentation at:
`http://localhost:5000/api-docs`

---

## 🚀 Deployment
Designed for deployment on **Render**, **Railway**, or **Heroku**.
- **Requirement:** PostgreSQL and Redis instances must be reachable via environment variables.
- **Start Command:** `npm start`
