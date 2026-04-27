# Database Documentation - PostgreSQL Schema

## 🗄️ Overview
**Nexus Finance** utilizes **PostgreSQL**, a powerful object-relational database system. The database is designed for data integrity, supporting complex relationships and financial accuracy.

---

## 📊 Schema Design
The system uses a relational schema optimized for financial tracking.

### 1. `users` Table
Stores user credentials and profile information.
- `id`: Primary Key (UUID/Serial)
- `email`: Unique identifier (Indexed)
- `password_hash`: Securely hashed password
- `full_name`: User's display name
- `role`: User role (`admin`, `user`, `read-only`)
- `created_at`: Timestamp

### 2. `transactions` Table
The core of the financial data.
- `id`: Primary Key
- `user_id`: Foreign Key (References `users.id`)
- `title`: Description of the transaction
- `amount`: Numeric value (Financial precision)
- `type`: `income` or `expense`
- `category`: Classification (e.g., Food, Salary, Rent)
- `date`: Date of occurrence
- `created_at`: Audit timestamp

---

## 🔗 Relationships
- **One-to-Many:** One User can have many Transactions.
- **Cascade Deletes:** Deleting a user account automatically removes all associated transactions to maintain database cleanliness.

---

## 🛠️ DB Management
The project includes automated scripts for database maintenance:
- **Initialization:** `npm run db:init` (Creates tables and indexes)
- **Seeding:** `npm run db:seed` (Populates the database with sample data for testing)
- **Migrations:** SQL files are located in `backend/db/schema.sql`.

---

## 🚀 Optimization
- **Indexing:** B-Tree indexes on `user_id` and `email` for fast lookups.
- **Parameterized Queries:** All queries use `$1, $2` placeholders to prevent SQL Injection.
- **Connection Pooling:** Managed via `pg.Pool` to handle concurrent requests efficiently.
