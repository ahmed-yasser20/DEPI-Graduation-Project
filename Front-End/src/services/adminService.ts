import { api } from "./api";
import type { CategoryResponse, OrderResponse, ProductResponse } from "@/types/api";

export interface ProductPayload {
  pName: string;
  price: number;
  description: string;
  stock: number;
  categoryId?: number | null;
}

export const adminService = {
  async listProducts() {
    const { data } = await api.get<ProductResponse[]>("/Product");
    return data;
  },
  async saveProduct(product: ProductPayload, id?: number) {
    const { data } = id
      ? await api.put<ProductResponse>(`/Product/${id}`, product)
      : await api.post<ProductResponse>("/Product", product);
    return data;
  },
  async deleteProduct(id: number) {
    await api.delete(`/Product/${id}`);
  },
  async listCategories() {
    const { data } = await api.get<CategoryResponse[]>("/Category");
    return data;
  },
  async saveCategory(name: string, id?: number) {
    const body = { category_Name: name };
    const { data } = id
      ? await api.put<CategoryResponse>(`/Category/${id}`, body)
      : await api.post<CategoryResponse>("/Category", body);
    return data;
  },
  async deleteCategory(id: number) {
    await api.delete(`/Category/${id}`);
  },
  async listOrders() {
    const { data } = await api.get<OrderResponse[]>("/orders/all");
    return data;
  },
  // Requires a new backend endpoint - see PATCH /orders/{orderId}/mark-paid in
  // the accompanying OrderController/OrderService changes.
  async markOrderPaid(orderId: number) {
    const { data } = await api.patch<OrderResponse>(`/orders/${orderId}/mark-paid`);
    return data;
  },
};
