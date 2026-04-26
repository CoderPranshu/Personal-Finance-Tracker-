/**
 * jwt.js
 * ------
 * Utilities for signing and verifying JSON Web Tokens.
 */

const jwt = require("jsonwebtoken");
const { env } = require("./env");

/**
 * Signs a payload to create a JWT.
 */
function signToken(payload, expiresIn = "7d") {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

/**
 * Verifies a JWT and returns the decoded payload.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken,
};
