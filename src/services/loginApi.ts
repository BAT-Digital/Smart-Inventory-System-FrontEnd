// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export const login = async (username: string, password: string) => {
  const payload = {
    username,
    password,
  };

  try {
    const response = await axios.post("/api/auth/login", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};
