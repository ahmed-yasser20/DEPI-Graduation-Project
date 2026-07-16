import { api } from "./api";
import type { CustomerResponse } from "@/types/api";

// ASSUMPTION - please verify: your CustomerResponseDto / UpdateCustomerDto exist,
// but no CustomerController was shared, so this guesses the route based on the
// convention your other controllers follow ([Route("api/[controller]")] ->
// "api/Customer"). If your actual route differs (e.g. "api/Profile" or
// "api/Users/me"), update the paths below - everything else in the app that
// touches profile data goes through this file.
export const customerService = {
  async getProfile() {
    const { data } = await api.get<CustomerResponse>("/Customer");
    return data;
  },

  async updateProfile(patch: Partial<{ first_Name: string; last_Name: string; phoneNumber: string; city: string; street: string; building: string }>) {
    const { data } = await api.put<CustomerResponse>("/Customer", patch);
    return data;
  },
};
