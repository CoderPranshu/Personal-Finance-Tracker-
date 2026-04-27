# techstack_used.md
This file explains (in very simple English) how the project works end-to-end.

## 1) How the frontend connects to the backend
- The frontend runs on `http://localhost:5173` (Vite dev server).
- The backend runs on `http://localhost:5000` (Express server).
- In `frontend/vite.config.js`, we added a **proxy**:
  - Any request starting with `/api` is sent to the backend.
  - Example: frontend calls `/api/auth/login` → Vite forwards it to `http://localhost:5000/api/auth/login`.

## 2) How JWT works (step-by-step)
1. User logs in with email + password.
2. Backend checks the password (bcrypt compare).
3. Backend creates a JWT:
   - It signs a payload like `{ userId, role }` using `JWT_SECRET`.
4. Backend returns the JWT to the frontend.
5. Frontend saves it in `localStorage` as `token`.
6. On every API call, frontend sends:
   - `Authorization: Bearer <token>`
7. Backend middleware `verifyToken`:
   - reads the token
   - verifies the signature
   - puts the decoded payload on `req.user`

## 3) How Redis caching works
- Some endpoints are expensive (analytics queries).
- We store their responses in Redis:
  - **analytics** cache: 15 minutes
  - **categories** cache: 1 hour
- When transactions change (create/update/delete), caches become wrong.
- So after CRUD we **invalidate** (delete) the user’s cache keys.

## 4) How PostgreSQL is used
- PostgreSQL stores all real data:
  - `users` table (email, password_hash, role)
  - `transactions` table (title, amount, type, category, date)
- Backend uses the `pg` library and **parameterized queries**:
  - `SELECT ... WHERE email = $1`
  - This prevents SQL injection.

## 5) How RBAC is implemented
RBAC means **Role Based Access Control**.

Roles:
- `admin`: full access
- `user`: can create/update/delete only their own transactions
- `read-only`: can only view their own data

Backend enforcement:
- `verifyToken` makes sure a user is logged in.
- `authorizeRoles(...roles)` allows only certain roles on a route.
  - Example: POST `/api/transactions` allows `admin` and `user`, but NOT `read-only`.

Frontend enforcement:
- UI reads `user.role`
- Buttons are disabled for `read-only` users.

## 6) Request → Response lifecycle (simple)
1. Browser sends request (example: `GET /api/transactions?page=1`).
2. Vite proxy forwards it to backend (in dev).
3. Express receives it.
4. Middleware runs:
   - rate limiting
   - JWT verification
   - RBAC check
   - validation (express-validator)
5. Controller runs database query.
6. Response JSON is returned to frontend.

## 7) How charts get data
- Dashboard page calls backend endpoints:
  - `/api/analytics/summary`
  - `/api/analytics/category-breakdown`
  - `/api/analytics/monthly-trend`
  - `/api/analytics/income-vs-expense`
- The backend returns simple arrays/numbers.
- Frontend uses **Recharts** to draw Pie/Line/Bar charts from those arrays.

## 8) Deployment steps (simple)
Backend (Render / similar):
- Add env vars: `DATABASE_URL`, `JWT_SECRET`, `REDIS_URL`, `CORS_ORIGIN`
- Run:
  - `npm install`
  - `npm run start`

Frontend (Vercel / Netlify):
- Set API base / proxy (in production you call backend URL directly)
- Run:
  - `npm install`
  - `npm run build`

Docker (local):
- Use `docker-compose.yml` to start Postgres + Redis.
- Then run backend scripts:
  - `npm run db:init`
  - `npm run db:seed`

