// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export const sendCategory = async (name: string, description: string) => {
  const payload = {
    name,
    description,
  };

  try {
    const response = await axios.post("/api/categories", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};
