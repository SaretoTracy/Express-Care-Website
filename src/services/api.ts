import axios from "axios";
import { emitAuthExpired } from "../utils/authEventBus";

const API_BASE_URL = "https://api.expresscareteam.com/api";

let isRefreshing = false;
let refreshQueue: any[] = [];

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/*
-------------------------------------------------
Request Interceptor
-------------------------------------------------
*/

api.interceptors.request.use((config) => {
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
  refreshQueue.forEach((promise) => {
    if (token) promise.resolve(token);
    else promise.reject();
  });

  refreshQueue = [];
};

/*
-------------------------------------------------
Response Interceptor (God Tier Refresh Logic)
-------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      emitAuthExpired();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token: any) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) throw new Error("No refresh token");

      const response = await axios.post(
        `${API_BASE_URL}/auth/refreshAccessToken`,
        { refreshToken }
      );

      const newAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      processQueue(newAccessToken);

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(null);
      emitAuthExpired();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);