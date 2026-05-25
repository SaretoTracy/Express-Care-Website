/**
 * API base URL.
 * - Dev (Vite): `/api` → proxied in vite.config.ts (same-origin cookies + CSRF).
 * - Prod: full API host, or override with VITE_API_BASE_URL.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV
    ? "/api"
    : "https://api.expresscareteam.com/api");
