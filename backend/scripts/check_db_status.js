require("dotenv").config();
const { Pool } = require("pg");

async function checkDb() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const txCount = await pool.query("SELECT COUNT(*) FROM transactions");
    console.log(`Users: ${userCount.rows[0].count}`);
    console.log(`Transactions: ${txCount.rows[0].count}`);
  } catch (err) {
    console.error("Error checking DB:", err.message);
  } finally {
    await pool.end();
  }
}

checkDb();
