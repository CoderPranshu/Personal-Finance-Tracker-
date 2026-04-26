/**
 * app.js
 * ------
 * Creates and configures the Express application.
 *
 * What we configure here:
 * - Security middleware (helmet, xss-clean, cors)
 * - JSON parsing
 * - Rate limiting (different limits per route group)
 * - API routes (auth, transactions, analytics)
 * - Swagger docs
 * - Central error handler
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { env } = require("./utils/env");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const { errorHandler } = require("./middleware/errorHandler");
const { authLimiter, transactionsLimiter, analyticsLimiter } = require("./middleware/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const userRoutes = require("./routes/userRoutes");
const { mountSwagger } = require("./swagger");

function createApp() {
  const app = express();

  // Trust proxy is helpful when deployed behind Render / Nginx.
  // It also lets rate-limit use the correct client IP.
  app.set("trust proxy", 1);

  app.use(helmet());
  // Removed xss-clean because it is incompatible with Express 5 (req.query is a getter).
  // React and parameterized queries already provide significant XSS protection.

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.json({ limit: "100kb" }));

  // Debug logging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Simple health endpoint (no auth).
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
  });

  // Swagger docs (no auth for learning/demo purposes).
  mountSwagger(app);

  // Rate-limiters applied per route group.
  app.use("/api/auth", authLimiter, authRoutes);
  app.use("/api/transactions", transactionsLimiter, transactionRoutes);
  app.use("/api/analytics", analyticsLimiter, analyticsRoutes);
  app.use("/api/users", userRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

