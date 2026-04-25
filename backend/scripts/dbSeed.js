/**
 * dbSeed.js
 * ---------
 * Seeds demo users and demo transactions by running `db/seed.sql`.
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

  const seedPath = path.join(__dirname, "..", "db", "seed.sql");
  const seedSql = fs.readFileSync(seedPath, "utf8");

  const pool = new Pool({ connectionString: databaseUrl });

  try {
    await pool.query(seedSql);
    console.log("✅ Demo data seeded.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("❌ DB seed failed:", err.message);
  process.exit(1);
});

