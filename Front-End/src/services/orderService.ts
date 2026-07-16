import { api } from "./api";
import type { OrderResponse, CreateOrderResponse } from "@/types/api";

export interface FrontendOrder {
  id: string;
  oId: number;
  date: string;
  total: number;
  status: string;
  items: { productId: number; name: string; quantity: number; unitPrice: number }[];
}

function mapOrder(o: OrderResponse): FrontendOrder {
  return {
    id: `ORD-${o.oId}`,
    oId: o.oId,
    date: o.created_At,
    total: o.total_Price,
    status: o.status,
    items: o.items.map((i) => ({ productId: i.pId, name: i.productName, quantity: i.quantity, unitPrice: i.unitPrice })),
  };
}

export const orderService = {
  // Backend GetMyOrders returns everything (no server pagination), so we page client-side
  // to keep the existing orders/profile pages working without a bigger rewrite.
  async list({ page = 1, pageSize = 5 }: { page?: number; pageSize?: number } = {}) {
    const { data } = await api.get<OrderResponse[]>("/orders");
    const mapped = data.map(mapOrder).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const total = mapped.length;
    const start = (page - 1) * pageSize;
    return { orders: mapped.slice(start, start + pageSize), total, page, pageSize };
  },

  async createFromCart(): Promise<CreateOrderResponse> {
    const { data } = await api.post<CreateOrderResponse>("/orders/from-cart");
    return data;
  },

  async create(items: { productId: number; quantity: number }[]): Promise<CreateOrderResponse> {
    const { data } = await api.post<CreateOrderResponse>("/orders", { items });
    return data;
  },

  async getOrder(orderId: number): Promise<FrontendOrder> {
    const { data } = await api.get<OrderResponse>(`/orders/${orderId}`);
    return mapOrder(data);
  },

  async getStatus(orderId: number): Promise<string> {
    const { data } = await api.get(`/orders/${orderId}/status`);
    return typeof data === "string" ? data : (data as any)?.toString?.() ?? String(data);
  },
};
