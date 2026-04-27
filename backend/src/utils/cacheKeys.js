/**
 * cacheKeys.js
 * ------------
 * Central place for Redis cache keys.
 *
 * Keeping keys in one place prevents typos and makes invalidation easier.
 */

const cacheKeys = {
  analyticsSummary: (userId) => `analytics:summary:${userId}`,
  analyticsCategoryBreakdown: (userId) => `analytics:categoryBreakdown:${userId}`,
  analyticsMonthlyTrend: (userId) => `analytics:monthlyTrend:${userId}`,
  analyticsIncomeVsExpense: (userId) => `analytics:incomeVsExpense:${userId}`,
  categories: (userId) => `categories:${userId}`,
};

module.exports = { cacheKeys };

