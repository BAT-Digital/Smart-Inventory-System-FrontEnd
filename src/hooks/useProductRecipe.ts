// src/api/recipeApi.ts
import axios from "../utils/axios";

export type Ingredient = {
  name: string;
  volume: string | number;
  unit: string;
};

export const fetchCompositionByProductId = async (
  productId: number
): Promise<Ingredient[]> => {
  const response = await axios.get(
    `/api/product-recipes/by-final-product-id/${productId}`
  );

  return response.data.map((item: any) => ({
    name: item.ingredient.productName,
    volume: item.quantityRequired,
    unit: item.ingredient.unitOfMeasure,
  }));
};
