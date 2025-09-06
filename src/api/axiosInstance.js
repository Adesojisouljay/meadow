// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mead.ezabay.com/api", // ✅ Your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors for auth tokens later
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
