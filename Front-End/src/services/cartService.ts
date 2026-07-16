import { api } from "./api";
import type { CartResponse } from "@/types/api";

// All endpoints require an authenticated user ([Authorize] on CartController).
export const cartService = {
  async get(): Promise<CartResponse> {
    const { data } = await api.get<CartResponse>("/Cart");
    return data;
  },

  async add(productId: number, quantity: number): Promise<CartResponse> {
    const { data } = await api.post<CartResponse>("/Cart", { productId, quantity });
    return data;
  },

  async updateItem(cartItemId: number, quantity: number): Promise<void> {
    await api.put("/Cart", { cartItemId, quantity });
  },

  async remove(productId: number): Promise<void> {
    await api.delete(`/Cart/${productId}`);
  },

  async clear(): Promise<void> {
    await api.delete("/Cart");
  },
};
