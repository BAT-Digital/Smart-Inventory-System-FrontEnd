// src/api/batchArrivalApi.ts
import { WriteOffDTO } from "../types/WriteOff";
import axios from "../utils/axios";

export const sendWriteOff = async (writeOffDto: WriteOffDTO) => {
  try {
    const response = await axios.post("/api/write-offs/by-dto", writeOffDto);
    return response.data;
  } catch (error) {
    console.error("Error sending write off:", error);
    throw error;
  }
};
