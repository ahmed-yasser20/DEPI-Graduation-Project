import { api } from "./api";
import type { PaymentResponse } from "@/types/api";

export const paymentService = {
  async getStatus(paymentIntentId: string): Promise<PaymentResponse> {
    const { data } = await api.get<PaymentResponse>(`/payments/${paymentIntentId}/status`);
    return data;
  },
};
