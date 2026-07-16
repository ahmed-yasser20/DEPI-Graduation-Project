import axios, { AxiosError } from "axios";

// Set VITE_API_BASE_URL in your .env file (see .env.example).
const baseURL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7000/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalizes ASP.NET Core error responses (ModelState dict, { message }, or plain text)
// into a single readable string, and logs the user out on 401.
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const isAuthEndpoint = error.config?.url?.includes("/Auth/");
      if (!isAuthEndpoint) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(new Error(extractErrorMessage(error)));
  }
);

export function extractErrorMessage(error: AxiosError<any>): string {
  const data = error.response?.data as any;
  if (!data) return error.message || "Something went wrong. Please try again.";
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  if (data.title) return data.title; // ASP.NET ProblemDetails
  if (data.errors && typeof data.errors === "object") {
    // ModelState validation errors: { errors: { Field: ["msg1", "msg2"] } }
    const firstKey = Object.keys(data.errors)[0];
    const firstMsg = data.errors[firstKey]?.[0];
    if (firstMsg) return firstMsg;
  }
  return "Something went wrong. Please try again.";
}
