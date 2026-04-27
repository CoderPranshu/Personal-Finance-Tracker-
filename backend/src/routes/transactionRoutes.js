/**
 * transactionRoutes.js
 * --------------------
 * Transaction CRUD endpoints.
 *
 * RBAC:
 * - admin: full access
 * - user: CRUD only own transactions
 * - read-only: can only read own transactions
 */

const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const { validate } = require("../middleware/validate");
const {
  createTransactionValidator,
  updateTransactionValidator,
  deleteTransactionValidator,
  listTransactionsValidator,
} = require("../validators/transactionValidators");
const { transactionController } = require("../controllers/transactionController");

const router = express.Router();

router.use(verifyToken);

router.get(
  "/",
  authorizeRoles("admin", "user", "read-only"),
  listTransactionsValidator,
  validate,
  transactionController.list
);

router.post(
  "/",
  authorizeRoles("admin", "user"),
  createTransactionValidator,
  validate,
  transactionController.create
);

router.put(
  "/:id",
  authorizeRoles("admin", "user"),
  updateTransactionValidator,
  validate,
  transactionController.update
);

router.delete(
  "/:id",
  authorizeRoles("admin", "user"),
  deleteTransactionValidator,
  validate,
  transactionController.remove
);

module.exports = router;

