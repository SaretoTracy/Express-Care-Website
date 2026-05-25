import axios from "axios";

const CSRF_TOKEN_PATH = "/api/auth/csrf-token";

const csrfClient = axios.create({
  baseURL: "/",
  withCredentials: true,
});

let csrfToken: string | null = null;
let fetchPromise: Promise<string> | null = null;

function extractCsrfToken(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  const record = data as Record<string, unknown>;

  const candidates = [
    record.csrfToken,
    record.token,
    record.csrf,
    record.csrf_token,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

function isCsrfForbidden(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  if (error.response?.status !== 403) return false;

  const message = String(
    error.response?.data?.message ??
      error.response?.data?.error ??
      ""
  ).toLowerCase();

  return (
    message.includes("csrf") ||
    message.includes("invalid token") ||
    message.includes("forbidden")
  );
}

/*
-------------------------------------------------
Force-expire the CSRF cookie in the browser so
the next request gets the fresh one from the
server instead of the stale cached value
-------------------------------------------------
*/
function clearCsrfCookie(): void {
  const cookieNames = ["x-csrf-token", "XSRF-TOKEN", "csrf-token"];
  const paths = ["/", "/api"];

  cookieNames.forEach((name) => {
    paths.forEach((path) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=localhost;`;
    });
  });
}

export async function fetchCsrfToken(): Promise<string> {
  if (csrfToken) return csrfToken;

  if (fetchPromise) return fetchPromise;

  fetchPromise = csrfClient
    .get(CSRF_TOKEN_PATH, { withCredentials: true })
    .then((response) => {
      const token = extractCsrfToken(response.data);

      if (!token) {
        throw new Error(
          `CSRF token missing from response. Got: ${JSON.stringify(response.data)}`
        );
      }

      csrfToken = token;
      return token;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

/*
-------------------------------------------------
Clears both the in-memory token AND the browser
cookie so the next fetch gets a truly fresh pair
-------------------------------------------------
*/
export function clearCsrfToken(): void {
  csrfToken = null;
  fetchPromise = null;
  clearCsrfCookie();
}

export function getCsrfToken(): string | null {
  return csrfToken;
}

export async function withCsrfHeaders() {
  const token = await fetchCsrfToken();
  return {
    withCredentials: true,
    headers: { "X-CSRF-Token": token },
  };
}

export async function fetchCsrfTokenAndRetry<T>(
  request: () => Promise<T>
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (!isCsrfForbidden(error)) throw error;
    clearCsrfToken();
    await fetchCsrfToken();
    return request();
  }
}