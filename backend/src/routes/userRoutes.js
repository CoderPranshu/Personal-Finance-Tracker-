/**
 * userRoutes.js
 * -------------
 * Admin-only endpoints.
 */

const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { authorizeRoles } = require("../middleware/authorizeRoles");
const { userController } = require("../controllers/userController");

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles("admin"));

router.get("/", userController.list);
router.patch("/:id/role", userController.updateRole);
router.delete("/:id", userController.remove);

module.exports = router;
