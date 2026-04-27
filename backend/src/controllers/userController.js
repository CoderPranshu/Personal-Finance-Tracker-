/**
 * userController.js
 * -----------------
 * Admin-only user management.
 */

const { query } = require("../db/pg");

const userController = {
  async list(req, res) {
    const result = await query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    return res.status(200).json({ users: result.rows });
  },

  async updateRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user", "read-only"].includes(role)) {
      return res.status(400).json({ error: "ValidationError", message: "Invalid role" });
    }

    const result = await query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role",
      [role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not Found", message: "User not found" });
    }

    return res.status(200).json({ user: result.rows[0] });
  },

  async remove(req, res) {
    const { id } = req.params;
    
    // Prevent admin from deleting themselves (basic safety).
    if (id === req.user.userId) {
      return res.status(400).json({ error: "BadRequest", message: "Cannot delete yourself" });
    }

    const result = await query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not Found", message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  },
};

module.exports = { userController };
