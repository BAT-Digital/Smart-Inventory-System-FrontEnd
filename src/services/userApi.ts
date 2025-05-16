// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export const sendUser = async (
  username: string,
  passwordHash: string,
  role: string
) => {
  const payload = {
    username,
    passwordHash,
    role,
  };

  try {
    const response = await axios.post("/api/auth/register", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending User:", error);
    throw error;
  }
};
