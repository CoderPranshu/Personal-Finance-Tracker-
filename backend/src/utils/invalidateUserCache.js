/**
 * invalidateUserCache.js
 * ----------------------
 * Cache invalidation after CRUD.
 *
 * Whenever transactions change, analytics and category caches become stale.
 */

const { del } = require("../db/redis");
const { cacheKeys } = require("./cacheKeys");

async function invalidateUserCaches(userId) {
  await Promise.all([
    del(cacheKeys.analyticsSummary(userId)),
    del(cacheKeys.analyticsCategoryBreakdown(userId)),
    del(cacheKeys.analyticsMonthlyTrend(userId)),
    del(cacheKeys.analyticsIncomeVsExpense(userId)),
    del(cacheKeys.categories(userId)),
  ]);
}

module.exports = { invalidateUserCaches };

