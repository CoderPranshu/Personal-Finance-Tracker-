/**
 * transactionValidators.js
 * ------------------------
 * Validation rules for transaction CRUD.
 */

const { body, param, query } = require("express-validator");

const createTransactionValidator = [
  body("title").trim().isLength({ min: 1, max: 120 }).withMessage("Title is required (1-120 chars)"),
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be a number >= 0"),
  body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category")
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Category is required (1-60 chars)"),
  body("date").isISO8601().withMessage("Date must be a valid ISO date (YYYY-MM-DD)"),
];

const updateTransactionValidator = [
  param("id").isUUID().withMessage("Transaction id must be a UUID"),
  body("title").optional().trim().isLength({ min: 1, max: 120 }).withMessage("Title must be 1-120 chars"),
  body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a number >= 0"),
  body("type").optional().isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").optional().trim().isLength({ min: 1, max: 60 }).withMessage("Category must be 1-60 chars"),
  body("date").optional().isISO8601().withMessage("Date must be a valid ISO date (YYYY-MM-DD)"),
];

const deleteTransactionValidator = [param("id").isUUID().withMessage("Transaction id must be a UUID")];

const listTransactionsValidator = [
  query("page").optional().isInt({ min: 1, max: 100000 }).withMessage("page must be >= 1"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be 1-100"),
  query("type").optional().isIn(["income", "expense"]).withMessage("type must be income or expense"),
  query("category").optional().isString().withMessage("category must be a string"),
  query("startDate").optional().isISO8601().withMessage("startDate must be ISO date"),
  query("endDate").optional().isISO8601().withMessage("endDate must be ISO date"),
];

module.exports = {
  createTransactionValidator,
  updateTransactionValidator,
  deleteTransactionValidator,
  listTransactionsValidator,
};

