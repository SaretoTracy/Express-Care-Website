import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { emitAuthExpired } from "../utils/authEventBus";

const API_BASE_URL = "https://api.expresscareteam.com/api";

// Extend Axios config to track whether we've already retried a request
interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Simple queue entry type for requests waiting on a token refresh
type RefreshQueueEntry = {
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let refreshQueue: RefreshQueueEntry[] = [];

// Single Axios instance used across the app
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/*
-------------------------------------------------
Request Interceptor
- Attaches Authorization header from localStorage
-------------------------------------------------
*/

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*
-------------------------------------------------
Refresh Queue Executor
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
Response Interceptor (401 + Refresh Logic)
-------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    // If we don't have a request config or status isn't 401, just fail as usual
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // If we've already retried once, give up and emit global auth-expired
    if (originalRequest._retry) {
      emitAuthExpired();
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token: string) => {
        // Once we have a new token, retry this request with updated header
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    // Mark this request as having been retried and start a refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(
        `${API_BASE_URL}/auth/refreshAccessToken`,
        { refreshToken },
        { withCredentials: true }
      );

      const newAccessToken = response.data?.accessToken as string;
      if (!newAccessToken) {
        throw new Error("No access token returned from refresh endpoint");
      }

      // Persist new access token
      localStorage.setItem("accessToken", newAccessToken);

      // Resolve all queued requests with the new token
      processQueue(newAccessToken);

      // Retry the original request with updated Authorization header
      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      // Make sure all waiting requests fail and global auth-expired is fired
      processQueue(null);
      emitAuthExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);