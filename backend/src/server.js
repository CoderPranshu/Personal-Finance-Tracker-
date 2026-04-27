/**
 * server.js
 * ----------
 * App entry point.
 *
 * Responsibilities:
 * - Loads environment variables
 * - Creates the Express app
 * - Starts the HTTP server
 */

require("dotenv").config();

const { createApp } = require("./app");
const { env, assertRuntimeEnv } = require("./utils/env");

// Fail fast if required env vars are missing.
assertRuntimeEnv();

const app = createApp();

app.listen(env.PORT, () => {
  // Intentionally simple log so beginners can read it.
  console.log(`✅ Backend running on http://localhost:${env.PORT}`);
});

