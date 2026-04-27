# Testing Documentation - Quality Assurance

## 🧪 Overview
Quality assurance in **Nexus Finance** is handled through a combination of manual verification, API testing, and automated security checks.

---

## 🖱️ Manual Testing (UAT)
User Acceptance Testing focuses on the frontend flow:
1. **Authentication Flow:** Verify registration, login, and token persistence.
2. **Transaction CRUD:** Create, read, update, and delete transactions. Verify that charts update in real-time.
3. **Role Enforcement:** Log in as a `read-only` user and verify that "Add Transaction" buttons are disabled or hidden.
4. **Responsive Design:** Verify the UI looks premium on Mobile, Tablet, and Desktop resolutions.

---

## 📡 API Testing
The backend API can be tested using tools like **Postman** or **Thunder Client**:
- **Health Check:** `GET /api/health` should return `200 OK`.
- **Security Check:** Attempting to access `/api/transactions` without a Bearer token should return `401 Unauthorized`.
- **RBAC Check:** Attempting to POST a transaction with a `read-only` token should return `403 Forbidden`.
- **Rate Limit Check:** Rapidly hitting an endpoint (100+ times) should trigger a `429 Too Many Requests`.

---

## ⚡ Performance Testing
- **Caching Verification:** Verify that subsequent calls to analytics endpoints return data significantly faster (headers or Redis logs can confirm hits).
- **Database Latency:** Ensure large transaction fetches are paginated or optimized with indexes.

---

## 🛠️ Future Automated Testing
While the project currently relies on manual and API tool testing, the following roadmap is planned:
- **Unit Testing:** Implementing [Vitest](https://vitest.dev/) for frontend utility logic and [Jest](https://jestjs.io/) for backend controllers.
- **Integration Testing:** [Supertest](https://github.com/ladjs/supertest) for verifying API route logic with a test database.
- **E2E Testing:** [Playwright](https://playwright.dev/) for full browser automation of the user journey.

---

## 📝 Bug Reporting
If you find a bug:
1. Open a GitHub Issue.
2. Provide steps to reproduce.
3. Include screenshots of the UI and console logs if applicable.
