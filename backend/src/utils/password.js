/**
 * password.js
 * -----------
 * Utilities for hashing and checking passwords using bcrypt.
 */

const bcrypt = require("bcrypt");

/**
 * Hashes a plain-text password.
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a plain-text password with a hashed password.
 */
async function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

module.exports = {
  hashPassword,
  comparePassword,
};
