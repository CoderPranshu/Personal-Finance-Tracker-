/**
 * authRoutes.js
 * ------------
 * Auth endpoints: register, login, me (current user profile).
 *
 * We keep routes thin:
 * - Validation middleware
 * - Controller handles the logic
 */

const express = require("express");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const { validate } = require("../middleware/validate");
const { authController } = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [admin, user, read-only] }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Bad Request }
 */
router.post("/register", registerValidator, validate, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 */
router.post("/login", loginValidator, validate, authController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 *       401: { description: Unauthorized }
 */
router.get("/me", verifyToken, authController.me);

module.exports = router;

