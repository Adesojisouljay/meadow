// src/api/index.js
import axiosInstance from "./axiosInstance";

// Example: register for invasion event
export const registerInvasion = async (data) => {
  const response = await axiosInstance.post("/register-invasion", data);
  return response.data;
};

// Example: fetch all registered invasions
export const getRegistrations = async () => {
  const response = await axiosInstance.get("/register-invasion");
  return response.data;
};
