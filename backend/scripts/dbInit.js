/**
 * dbInit.js
 * ---------
 * Creates database tables by running `db/schema.sql`.
 *
 * Why a Node script?
 * - Works even when `psql` is not installed.
 */

require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing in backend/.env");
  }

  const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  const pool = new Pool({ connectionString: databaseUrl });

  try {
    await pool.query(schemaSql);
    console.log("✅ DB schema created/updated.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("❌ DB init failed:", err.message);
  process.exit(1);
});

