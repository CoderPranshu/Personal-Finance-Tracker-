/**
 * env.js
 * ------
 * Central place to read and validate environment variables.
 *
 * Keeping env access in one file makes the rest of the code cleaner
 * and avoids "process.env" scattered everywhere.
 */

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  PORT: Number(process.env.PORT || 5000),
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  REDIS_URL: process.env.REDIS_URL || "",
  // In dev we allow any origin; in prod set this to your frontend URL.
  CORS_ORIGIN: process.env.CORS_ORIGIN || true,
  NODE_ENV: process.env.NODE_ENV || "development",
};

// We only hard-require secrets/URLs when we actually need them.
// This helps beginners start the server and hit /health immediately.
function assertRuntimeEnv() {
  requireEnv("DATABASE_URL");
  requireEnv("JWT_SECRET");
  requireEnv("REDIS_URL");
}

module.exports = { env, assertRuntimeEnv };

