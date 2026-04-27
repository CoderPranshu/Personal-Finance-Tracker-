/**
 * notFoundHandler.js
 * ------------------
 * Handles unknown routes with a clean JSON message.
 */

function notFoundHandler(req, res) {
  res.status(404).json({
    error: "Not Found",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

module.exports = { notFoundHandler };

