/**
 * analyticsRoutes.js
 * ------------------
 * Dashboard analytics endpoints (used by charts).
 *
 * RBAC:
 * - admin, user, read-only: can view analytics for their own data
 */

const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const { analyticsController } = require("../controllers/analyticsController");

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles("admin", "user", "read-only"));

router.get("/summary", analyticsController.summary);

router.get("/categories", analyticsController.categories);

router.get("/monthly-trend", analyticsController.monthlyTrend);

router.get("/income-vs-expense", analyticsController.incomeVsExpense);

router.get("/category-breakdown", analyticsController.categoryBreakdown);

module.exports = router;

