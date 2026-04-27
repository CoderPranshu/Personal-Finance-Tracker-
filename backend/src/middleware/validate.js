/**
 * validate.js
 * -----------
 * Converts express-validator errors into a clean 400 response.
 */

const { validationResult } = require("express-validator");

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    error: "ValidationError",
    message: "Request validation failed",
    details: errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    })),
  });
}

module.exports = { validate };

