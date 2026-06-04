import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { emitAuthExpired } from "../utils/authEventBus";

import {
  fetchCsrfToken,
  clearCsrfToken,
} from "./csrf";

interface RetriableRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _csrfRetry?: boolean;
}

type RefreshQueueEntry = {
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let refreshQueue: RefreshQueueEntry[] = [];

export const api = axios.create({
  baseURL: "https://api.expresscareteam.com",
  withCredentials: true,
});

/*
-------------------------------------------------
REQUEST INTERCEPTOR
- Adds Authorization
- Adds CSRF token to mutating requests
-------------------------------------------------
*/

const MUTATING_METHODS = new Set([
  "post",
  "put",
  "patch",
  "delete",
]);

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const method = config.method?.toLowerCase();

    if (
      method &&
      MUTATING_METHODS.has(method) &&
      config.headers
    ) {
      const csrfToken = await fetchCsrfToken();
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  }
);

/*
-------------------------------------------------
HELPER: Resolve queued refresh requests
-------------------------------------------------
*/

const processQueue = (token: string | null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(new Error("Unable to refresh access token"));
    }
  });

  refreshQueue = [];
};

/*
-------------------------------------------------
RESPONSE INTERCEPTOR
Handles:
- CSRF retry
- 401 refresh token flow
-------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as RetriableRequestConfig;

    const status = error.response?.status;

    const errorMessage = String(
      (error.response?.data as any)?.message ??
        (error.response?.data as any)?.error ??
        (error.response?.data as any)?.errorMsg ??
        ""
    ).toLowerCase();

    /*
    -------------------------------------------------
    CSRF TOKEN EXPIRED / INVALID
    -------------------------------------------------
    */

    if (
      originalRequest &&
      status === 403 &&
      errorMessage.includes("csrf") &&
      !originalRequest._csrfRetry
    ) {
      originalRequest._csrfRetry = true;

      try {
        clearCsrfToken();

        const newCsrfToken = await fetchCsrfToken();

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }

        originalRequest.headers["X-CSRF-Token"] = newCsrfToken;

        return api(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    /*
    -------------------------------------------------
    NON-401 ERRORS
    -------------------------------------------------
    */

    if (!originalRequest || status !== 401) {
      return Promise.reject(error);
    }

    /*
    -------------------------------------------------
    ALREADY RETRIED
    -------------------------------------------------
    */

    if (originalRequest._retry) {
      emitAuthExpired();
      return Promise.reject(error);
    }

    /*
    -------------------------------------------------
    TOKEN REFRESH ALREADY RUNNING
    -------------------------------------------------
    */

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token: string) => {
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      });
    }

 

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      
      const csrfToken = await fetchCsrfToken();

     const response = await api.post(
  "/api/auth/refreshAccessToken",
  {},
  {
    headers: { "X-CSRF-Token": csrfToken },
    _retry: true, 
  } as any
);

      const newAccessToken = response.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("No access token returned");
      }

      // Save new token
      localStorage.setItem("accessToken", newAccessToken);

      // Resolve queued requests
      processQueue(newAccessToken);

      // Retry original request with new token
      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(null);
      clearCsrfToken();
      emitAuthExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);