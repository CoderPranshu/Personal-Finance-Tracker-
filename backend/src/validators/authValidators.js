/**
 * authValidators.js
 * -----------------
 * Request body validation rules for auth endpoints.
 */

const { body } = require("express-validator");

const registerValidator = [
  body("name").trim().isLength({ min: 2, max: 60 }).withMessage("Name must be 2-60 characters"),
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("password")
    .isLength({ min: 6, max: 72 })
    .withMessage("Password must be 6-72 characters"),
  // Optional; default is "user"
  body("role")
    .optional()
    .isIn(["admin", "user", "read-only"])
    .withMessage("Role must be admin, user, or read-only"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("password").isString().withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator };

