// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export const sendSupplier = async (
  name: string,
  address: string,
  contactInfo: string
) => {
  const payload = {
    name,
    address,
    contactInfo,
  };

  try {
    const response = await axios.post("/api/suppliers/create-by-dto", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};
