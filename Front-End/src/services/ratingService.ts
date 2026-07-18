import { api } from "./api";
import type { ProductRatingSummaryResponse, RatingResponse } from "@/types/api";

export const ratingService = {
  async getProductRatings(productId: number): Promise<ProductRatingSummaryResponse> {
    const { data } = await api.get<ProductRatingSummaryResponse>(`/Rating/product/${productId}`);
    return data;
  },

  async save({
    productId,
    value,
    comment,
  }: {
    productId: number;
    value: number;
    comment?: string;
  }): Promise<RatingResponse> {
    const { data } = await api.post<RatingResponse>("/Rating", {
      productId,
      value,
      comment: comment?.trim() || null,
    });
    return data;
  },
};
