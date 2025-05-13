// src/api/batchArrivalApi.ts
import axios from "../utils/axios";

export const sendBatchArrival = async (supplierId: number, notes: string) => {
  const payload = {
    supplierId,
    notes,
    addedById: 1,
  };

  try {
    const response = await axios.post("/api/batch-arrivals", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending batch arrival:", error);
    throw error;
  }
};

export const deleteBatchArrival = async (id: number) => {
  try {
    const response = await axios.delete(`/api/batch-arrivals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting batch arrival:", error);
    throw error;
  }
};
