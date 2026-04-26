/**
 * cache.js
 * --------
 * Helper functions for Redis caching.
 */

const { getJson, setJson, del } = require("../db/redis");

/**
 * Standard wrapper for getting/setting JSON data in Redis.
 * Useful for caching database results.
 */
async function getOrSetCache(key, fetchFn, ttlSeconds = 3600) {
  const cached = await getJson(key);
  if (cached) return cached;

  const fresh = await fetchFn();
  if (fresh) {
    await setJson(key, fresh, ttlSeconds);
  }
  return fresh;
}

module.exports = {
  getJson,
  setJson,
  del,
  getOrSetCache,
};
