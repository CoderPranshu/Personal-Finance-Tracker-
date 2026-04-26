/**
 * redis.js
 * --------
 * Redis client used for caching.
 *
 * We keep a single shared connection for the whole backend.
 */

const { createClient } = require("redis");
const { env } = require("../utils/env");

const redis = createClient({ url: env.REDIS_URL });

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

let connected = false;

async function ensureRedisConnected() {
  if (connected) return;
  await redis.connect();
  connected = true;
}

async function getJson(key) {
  await ensureRedisConnected();
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

async function setJson(key, data, ttlSeconds) {
  await ensureRedisConnected();
  await redis.set(key, JSON.stringify(data), { EX: ttlSeconds });
}

async function del(key) {
  await ensureRedisConnected();
  await redis.del(key);
}

module.exports = { redis, getJson, setJson, del };

