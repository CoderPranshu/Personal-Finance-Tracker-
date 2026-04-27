/**
 * verifyToken.js
 * --------------
 * JWT authentication middleware.
 *
 * How it works:
 * - Reads Authorization: Bearer <token>
 * - Verifies token signature using JWT_SECRET
 * - Attaches decoded payload to req.user
 */

const jwt = require("jsonwebtoken");
const { env } = require("../utils/env");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized", message: "Missing Bearer token" });
  }

  const token = authHeader.substring("Bearer ".length);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { userId, role }
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized", message: "Invalid or expired token" });
  }
}

module.exports = { verifyToken };

