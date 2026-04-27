/**
 * authController.js
 * -----------------
 * Auth logic (register, login, me).
 *
 * Implementation notes:
 * - Passwords are hashed with bcrypt (never store plain text).
 * - JWT payload keeps only minimal info (userId, role).
 * - DB access is done with PostgreSQL using parameterized queries.
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { env } = require("../utils/env");
const { query } = require("../db/pg");

function signToken({ userId, role }) {
  return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: "7d" });
}

const authController = {
  async register(req, res) {
    const { name, email, password, role } = req.body;

    const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Conflict", message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const insert = await query(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
      `,
      [name, email, passwordHash, role || "user"]
    );

    const user = insert.rows[0];

    const token = signToken({ userId: user.id, role: user.role });

    return res.status(201).json({
      token,
      user,
    });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const result = await query(
      "SELECT id, name, email, role, password_hash FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });
    }

    const userRow = result.rows[0];
    const ok = await bcrypt.compare(password, userRow.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });
    }

    const token = signToken({ userId: userRow.id, role: userRow.role });

    return res.status(200).json({
      token,
      user: { id: userRow.id, name: userRow.name, email: userRow.email, role: userRow.role },
    });
  },

  async me(req, res) {
    const userId = req.user.userId;
    const result = await query("SELECT id, name, email, role FROM users WHERE id = $1", [userId]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: "Not Found", message: "User not found" });

    return res.status(200).json({ user });
  },
};

module.exports = { authController };

