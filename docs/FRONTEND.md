# Frontend Documentation - Nexus Finance

## 🚀 Overview
The frontend of **Nexus Finance** is a modern, high-performance web application built with **React** and **Vite**. It focuses on providing a premium user experience with fluid animations, a clean "fintech" aesthetic, and real-time data visualization.

---

## 🛠️ Tech Stack
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Lightning-fast HMR and bundling)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) (Modern utility-first CSS)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Charts:** [Recharts](https://recharts.org/) (Composable charting library)
- **Icons:** Lucide React (Clean, consistent iconography)

---

## 🎨 Design System
We've implemented a custom design system focused on **Visual Excellence**:
- **Typography:** 
  - Headings: `Outfit` (Modern, geometric)
  - Body: `Inter` (Highly readable, professional)
- **Visual Styles:**
  - **Glassmorphism:** Frosted glass effects on cards and sidebars using `backdrop-blur`.
  - **Gradients:** Deep mesh gradients for backgrounds and brand accents.
  - **Micro-animations:** Subtle hover transitions and layout shifts using CSS transitions.

---

## 🏗️ Architecture
The app follows a modular component-based architecture:

### 1. Pages (`/src/pages`)
- **Dashboard:** The central hub featuring the financial overview and key analytics charts.
- **Transactions:** A data-heavy page for managing, filtering, and searching financial records.
- **Users:** Management interface for viewing and handling user accounts (Admin only).
- **Auth (Login/Register):** Secure, focused entry points for user authentication.

### 2. Components (`/src/components`)
- **Layout:** High-level wrappers providing the Sidebar and Header consistency.
- **UI Kit:** Reusable buttons, inputs, and card components styled with the project's design tokens.
- **Modals:** Contextual popups for adding or editing transactions.

---

## 📡 API Integration
The frontend communicates with the backend via the standard `fetch` API.
- **Authentication:** Tokens are stored in `localStorage` and sent in the `Authorization` header as a Bearer token.
- **Proxy:** During development, Vite proxies `/api` requests to `localhost:5000` to avoid CORS issues.

---

## 🚀 Deployment
The frontend is optimized for deployment on platforms like **Vercel** or **Netlify**.
- **Build Command:** `npm run build`
- **Output:** The `dist/` folder contains the production-ready static assets.
