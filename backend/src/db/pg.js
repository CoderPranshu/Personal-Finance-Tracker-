/**
 * pg.js
 * -----
 * PostgreSQL connection pool (pg).
 *
 * We use parameterized queries everywhere to avoid SQL injection.
 */

const { Pool } = require("pg");
const { env } = require("../utils/env");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { pool, query };

