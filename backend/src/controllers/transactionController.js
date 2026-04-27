/**
 * transactionController.js
 * ------------------------
 * CRUD logic for transactions.
 *
 * Key requirements:
 * - Users can only access their own transactions (unless admin)
 * - Pagination + filters
 * - Cache invalidation after create/update/delete
 */

const { query } = require("../db/pg");
const { invalidateUserCaches } = require("../utils/invalidateUserCache");

function getTargetUserId(req) {
  // For now: admin also sees only their own data in this beginner project.
  // (You could expand this to allow admin to query other users.)
  return req.user.userId;
}

const transactionController = {
  async list(req, res) {
    const userId = getTargetUserId(req);

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;

    const filters = [];
    const values = [userId];
    let i = values.length;

    if (req.query.type) {
      values.push(req.query.type);
      i++;
      filters.push(`type = $${i}`);
    }

    if (req.query.category) {
      values.push(req.query.category);
      i++;
      filters.push(`category = $${i}`);
    }

    if (req.query.startDate) {
      values.push(req.query.startDate);
      i++;
      filters.push(`date >= $${i}`);
    }

    if (req.query.endDate) {
      values.push(req.query.endDate);
      i++;
      filters.push(`date <= $${i}`);
    }

    const where = filters.length ? `AND ${filters.join(" AND ")}` : "";

    const countResult = await query(
      `SELECT COUNT(*)::int AS total
       FROM transactions
       WHERE user_id = $1 ${where}`,
      values
    );

    // Add pagination values at the end.
    const listValues = [...values, limit, offset];

    const listResult = await query(
      `
      SELECT id, title, amount, type, category, date, created_at, updated_at
      FROM transactions
      WHERE user_id = $1 ${where}
      ORDER BY date DESC, created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
      `,
      listValues
    );

    return res.status(200).json({
      page,
      limit,
      total: countResult.rows[0].total,
      transactions: listResult.rows,
    });
  },

  async create(req, res) {
    const userId = getTargetUserId(req);
    const { title, amount, type, category, date } = req.body;

    const result = await query(
      `
      INSERT INTO transactions (user_id, title, amount, type, category, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, title, amount, type, category, date, created_at, updated_at
      `,
      [userId, title, amount, type, category, date]
    );

    await invalidateUserCaches(userId);

    return res.status(201).json({ transaction: result.rows[0] });
  },

  async update(req, res) {
    const userId = getTargetUserId(req);
    const { id } = req.params;

    // Only allow updating fields that exist.
    const fields = ["title", "amount", "type", "category", "date"];
    const updates = [];
    const values = [userId, id];

    let idx = values.length;
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        values.push(req.body[field]);
        idx++;
        updates.push(`${field} = $${idx}`);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "ValidationError", message: "No fields to update" });
    }

    const result = await query(
      `
      UPDATE transactions
      SET ${updates.join(", ")}
      WHERE user_id = $1 AND id = $2
      RETURNING id, title, amount, type, category, date, created_at, updated_at
      `,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not Found", message: "Transaction not found" });
    }

    await invalidateUserCaches(userId);

    return res.status(200).json({ transaction: result.rows[0] });
  },

  async remove(req, res) {
    const userId = getTargetUserId(req);
    const { id } = req.params;

    const result = await query(
      `
      DELETE FROM transactions
      WHERE user_id = $1 AND id = $2
      RETURNING id
      `,
      [userId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not Found", message: "Transaction not found" });
    }

    await invalidateUserCaches(userId);

    return res.status(200).json({ message: "Transaction deleted" });
  },
};

module.exports = { transactionController };

