import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
  },

  CONTACT: `${API_BASE_URL}/contact`,

  CAMPAIGNS: {
    LIST: `${API_BASE_URL}/campaigns`,
    DETAIL: (id) => `${API_BASE_URL}/campaigns/${id}`,
    CREATE: `${API_BASE_URL}/campaigns`,
    UPDATE: (id) => `${API_BASE_URL}/campaigns/${id}`,
    DELETE: (id) => `${API_BASE_URL}/campaigns/${id}`,
  },

  DONATIONS: {
    CREATE: (id) => `${API_BASE_URL}/campaigns/${id}/donate`,
    VERIFY: (id) => `${API_BASE_URL}/donations/${id}/verify`,
  },

  EVENTS: {
    LIST: `${API_BASE_URL}/events`,
    DETAIL: (id) => `${API_BASE_URL}/events/${id}`,
    JOIN: (id) => `${API_BASE_URL}/events/${id}/join`,
  },

  USERS: {
    PROFILE: `${API_BASE_URL}/users/me`,
    ALL_USERS: `${API_BASE_URL}/users`,
    BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
  },
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post(API_ENDPOINTS.AUTH.REFRESH);

        processQueue(null);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        localStorage.removeItem("token");

        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/register")
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
