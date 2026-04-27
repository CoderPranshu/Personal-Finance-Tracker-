/**
 * tailwind.config.js
 * ------------------
 * Tailwind v4 config (ESM).
 *
 * Important:
 * - Tailwind scans these files to find class names like `bg-white`, `p-4`, etc.
 * - If scanning fails, your UI will look "unstyled".
 */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

