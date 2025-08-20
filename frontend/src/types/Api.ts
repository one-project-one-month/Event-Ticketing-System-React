import axios from "axios";
import {
  getAuthToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "@/Admin/utils/authTokenUtils";
import { RefreshToken } from "@/services/AuthServices";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

const processQueue = () => {
  failedQueue.forEach((cb) => cb());
  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  const { token, tokenExpireAt } = getAuthToken();

  if (token && tokenExpireAt && new Date() < tokenExpireAt) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, refreshTokenExpireAt } = getRefreshToken();

      if (
        !refreshToken ||
        (refreshTokenExpireAt && new Date() > refreshTokenExpireAt)
      ) {
        clearTokens();
        window.location.href = "/admin/login";
        return Promise.reject(error);
      }

      try {
        const res = await RefreshToken({ refreshToken });

        if (res.isSuccess && res.data) {
          saveTokens(
            res.data.token,
            res.data.tokenExpiresAt,
            res.data.refreshToken,
            res.data.refreshTokenExpiresAt,
          );

          processQueue();

          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return api(originalRequest);
        } else {
          clearTokens();
          window.location.href = "/admin/login";
          return Promise.reject(error);
        }
      } catch (err) {
        clearTokens();
        window.location.href = "/admin/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const apiGet = <T>(url: string) =>
  api.get<T>(url).then((res) => res.data);
export const apiPost = <T>(url: string, data?: any) =>
  api.post<T>(url, data).then((res) => res.data);

export default api;
