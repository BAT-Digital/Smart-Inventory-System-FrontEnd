import axios from "../utils/axios";

export interface ForcastProduct {
  productId: number;
  productName: string;
  categoryName: string;
  supplierName: string;
  forecasted_sales: number;
  peak_day: string;
  peak_value: number;
  currentStock: number;
  restockNeeded: number;
}

export interface ForecastResponse {
  topProducts: ForcastProduct[];
}

export const ForecastService = {
  async getLatestForecast(): Promise<ForecastResponse> {
    try {
      const response = await axios.get(`/api/forecast`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch latest forecast");
    }
  },

  async generateNewForecast(): Promise<ForecastResponse> {
    try {
      const response = await axios.post(`/api/forecast`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to generate new forecast");
    }
  },

  // Utility function to extract unique suppliers
  getTopSuppliers(products: ForcastProduct[], count: number = 5): string[] {
    return Array.from(new Set(products.map((p) => p.supplierName))).slice(
      0,
      count
    );
  },

  // Utility function to extract unique categories
  getTopCategories(products: ForcastProduct[], count: number = 5): string[] {
    return Array.from(new Set(products.map((p) => p.categoryName))).slice(
      0,
      count
    );
  },
};
