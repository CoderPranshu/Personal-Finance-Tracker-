/**
 * rateLimiters.js
 * ---------------
 * Route-group specific rate limiting.
 *
 * Requirements:
 * - Auth routes: 5 requests / 15 min
 * - Transactions: 100 / hour
 * - Analytics: 50 / hour
 */

const rateLimit = require("express-rate-limit");

function buildLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too Many Requests", message },
  });
}

const authLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many auth attempts. Try again in 15 minutes.",
});

const transactionsLimiter = buildLimiter({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many transaction requests. Try again later.",
});

const analyticsLimiter = buildLimiter({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: "Too many analytics requests. Try again later.",
});

module.exports = { authLimiter, transactionsLimiter, analyticsLimiter };

