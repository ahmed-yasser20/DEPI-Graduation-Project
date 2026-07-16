import { api } from "./api";
import type { AuthResponse } from "@/types/api";
import { decodeJwt } from "@/lib/jwt";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string;
  street?: string;
  building?: string;
}

// Builds a minimal frontend User from whatever the JWT's claims give us.
// Your AuthController only returns { token }, not a user object, so the
// user's identity comes entirely from decoding the token client-side.
function userFromToken(token: string, fallback?: { firstName?: string; lastName?: string; email?: string }) {
  const decoded = decodeJwt(token);
  return {
    id: decoded?.nameIdentifier || decoded?.sub || "",
    email: decoded?.email || fallback?.email || "",
    firstName: decoded?.firstName || fallback?.firstName || "",
    lastName: decoded?.lastName || fallback?.lastName || "",
    address: "",
  };
}

export const authService = {
  async login({ email, password }: { email: string; password: string }) {
    const { data } = await api.post<AuthResponse>("/Auth/Login", { email, password });
    return { token: data.token, user: userFromToken(data.token, { email }) };
  },

  async register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>("/Auth/Register", {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      city: payload.city || "",
      street: payload.street || "",
      building: payload.building || "",
    });
    return {
      token: data.token,
      user: userFromToken(data.token, { firstName: payload.firstName, lastName: payload.lastName, email: payload.email }),
    };
  },
};
