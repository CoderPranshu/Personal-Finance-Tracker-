/**
 * errorHandler.js
 * ---------------
 * Central error handler so every endpoint returns consistent JSON.
 *
 * Rule:
 * - If we throw an error anywhere, it should end up here.
 */

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Avoid leaking internal errors in production.
  const safeMessage =
    statusCode >= 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message || "Unknown error";

  res.status(statusCode).json({
    error: err.name || "Error",
    message: safeMessage,
  });
}

module.exports = { errorHandler };

