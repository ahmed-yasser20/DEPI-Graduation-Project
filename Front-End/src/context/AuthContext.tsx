import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService, type RegisterPayload } from "@/services/authService";
import { customerService } from "@/services/customerService";
import { decodeJwt, isTokenExpired } from "@/lib/jwt";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  street?: string;
  building?: string;
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: { firstName?: string; lastName?: string; phone?: string; city?: string; street?: string; building?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On load, restore the token and try to refresh the profile from the server.
  // If the token is missing/expired, fall back to whatever was cached.
  useEffect(() => {
    (async () => {
      try {
        const t = localStorage.getItem("token");
        const cachedUser = localStorage.getItem("user");
        if (t && !isTokenExpired(decodeJwt(t))) {
          setToken(t);
          if (cachedUser) setUser(JSON.parse(cachedUser));
          try {
            const profile = await customerService.getProfile();
            setUser((prev) => {
              const merged: User = {
                id: prev?.id || "",
                email: profile.email,
                firstName: profile.first_Name,
                lastName: profile.last_Name,
                phone: profile.phone,
                city: profile.city,
                street: profile.street,
                building: profile.building,
              };
              localStorage.setItem("user", JSON.stringify(merged));
              return merged;
            });
          } catch {
            // Profile endpoint may not exist yet or failed - keep the cached/decoded user.
          }
        } else if (t) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const persist = (t: string, u: User) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const value: AuthCtx = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login: async (email, password) => {
      const { token, user } = await authService.login({ email, password });
      persist(token, user);
    },
    register: async (data) => {
      const { token, user } = await authService.register(data);
      persist(token, user);
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    },
    updateProfile: async (patch) => {
      const updated = await customerService.updateProfile({
        first_Name: patch.firstName,
        last_Name: patch.lastName,
        phoneNumber: patch.phone,
        city: patch.city,
        street: patch.street,
        building: patch.building,
      });
      setUser((prev) => {
        if (!prev) return prev;
        const next: User = {
          ...prev,
          firstName: updated.first_Name,
          lastName: updated.last_Name,
          phone: updated.phone,
          city: updated.city,
          street: updated.street,
          building: updated.building,
        };
        localStorage.setItem("user", JSON.stringify(next));
        return next;
      });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
