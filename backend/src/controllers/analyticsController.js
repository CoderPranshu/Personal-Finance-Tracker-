/**
 * analyticsController.js
 * ----------------------
 * Analytics endpoints used by the dashboard charts.
 *
 * Caching requirements:
 * - analytics endpoints cached for 15 minutes
 * - categories endpoint cached for 1 hour
 */

const { query } = require("../db/pg");
const { getJson, setJson } = require("../db/redis");
const { cacheKeys } = require("../utils/cacheKeys");

function userId(req) {
  return req.user.userId;
}

const TTL_ANALYTICS_SECONDS = 15 * 60;
const TTL_CATEGORIES_SECONDS = 60 * 60;

const analyticsController = {
  async summary(req, res) {
    const uid = userId(req);
    const key = cacheKeys.analyticsSummary(uid);

    const cached = await getJson(key);
    if (cached) return res.status(200).json({ source: "cache", ...cached });

    const totals = await query(
      `
      SELECT
        COALESCE(SUM(CASE WHEN type='income'  THEN amount END), 0)::numeric(12,2) AS total_income,
        COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0)::numeric(12,2) AS total_expenses
      FROM transactions
      WHERE user_id = $1
      `,
      [uid]
    );

    const totalIncome = Number(totals.rows[0].total_income);
    const totalExpenses = Number(totals.rows[0].total_expenses);
    const balance = Number((totalIncome - totalExpenses).toFixed(2));

    const payload = { totalIncome, totalExpenses, balance };
    await setJson(key, payload, TTL_ANALYTICS_SECONDS);

    return res.status(200).json({ source: "db", ...payload });
  },

  async categories(req, res) {
    const uid = userId(req);
    const key = cacheKeys.categories(uid);

    const cached = await getJson(key);
    if (cached) return res.status(200).json({ source: "cache", categories: cached });

    const result = await query(
      `
      SELECT DISTINCT category
      FROM transactions
      WHERE user_id = $1
      ORDER BY category ASC
      `,
      [uid]
    );

    const categories = result.rows.map((r) => r.category);
    await setJson(key, categories, TTL_CATEGORIES_SECONDS);

    return res.status(200).json({ source: "db", categories });
  },

  async monthlyTrend(req, res) {
    const uid = userId(req);
    const key = cacheKeys.analyticsMonthlyTrend(uid);

    const cached = await getJson(key);
    if (cached) return res.status(200).json({ source: "cache", points: cached });

    const result = await query(
      `
      SELECT
        TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') AS month,
        COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0)::numeric(12,2) AS income,
        COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0)::numeric(12,2) AS expense
      FROM transactions
      WHERE user_id = $1
      GROUP BY 1
      ORDER BY 1 ASC
      `,
      [uid]
    );

    const points = result.rows.map((r) => ({
      month: r.month,
      income: Number(r.income),
      expense: Number(r.expense),
    }));

    await setJson(key, points, TTL_ANALYTICS_SECONDS);

    return res.status(200).json({ source: "db", points });
  },

  async incomeVsExpense(req, res) {
    const uid = userId(req);
    const key = cacheKeys.analyticsIncomeVsExpense(uid);

    const cached = await getJson(key);
    if (cached) return res.status(200).json({ source: "cache", bars: cached });

    const result = await query(
      `
      SELECT
        type,
        COALESCE(SUM(amount), 0)::numeric(12,2) AS total
      FROM transactions
      WHERE user_id = $1
      GROUP BY type
      ORDER BY type ASC
      `,
      [uid]
    );

    // Bar chart expects consistent keys.
    const map = new Map(result.rows.map((r) => [r.type, Number(r.total)]));
    const bars = [
      { name: "Income", value: map.get("income") || 0 },
      { name: "Expense", value: map.get("expense") || 0 },
    ];

    await setJson(key, bars, TTL_ANALYTICS_SECONDS);

    return res.status(200).json({ source: "db", bars });
  },

  async categoryBreakdown(req, res) {
    const uid = userId(req);
    const key = cacheKeys.analyticsCategoryBreakdown(uid);

    const cached = await getJson(key);
    if (cached) return res.status(200).json({ source: "cache", slices: cached });

    // Category breakdown typically uses expenses only.
    const result = await query(
      `
      SELECT category, COALESCE(SUM(amount), 0)::numeric(12,2) AS total
      FROM transactions
      WHERE user_id = $1 AND type = 'expense'
      GROUP BY category
      ORDER BY total DESC
      `,
      [uid]
    );

    const slices = result.rows.map((r) => ({
      category: r.category,
      value: Number(r.total),
    }));

    await setJson(key, slices, TTL_ANALYTICS_SECONDS);

    return res.status(200).json({ source: "db", slices });
  },
};

module.exports = { analyticsController };

