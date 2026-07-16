import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { cartService } from "@/services/cartService";
import { productService } from "@/services/productService";
import type { CartResponse } from "@/types/api";

export interface CartItem {
  id: string; // productId as a string
  cartItemId?: number; // set once the item exists in the server cart; needed for updateItem
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartCtx {
  items: CartItem[];
  loading: boolean;
  add: (item: Omit<CartItem, "quantity" | "cartItemId">, qty?: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  setQty: (id: string, qty: number) => Promise<void>;
  clear: () => Promise<void>;
  subtotal: number;
  count: number;
  buyNow: CartItem | null;
  setBuyNow: (item: CartItem | null) => void;
}

const CartContext = createContext<CartCtx | null>(null);

const LOCAL_KEY = "cart";

function readLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

// The server cart only returns productId/name/price/quantity - no image or stock.
// We enrich each item with product details (for display + stock-based qty limits)
// by fetching the product list once per cart refresh and joining on productId.
async function enrichCart(cart: CartResponse): Promise<CartItem[]> {
  if (cart.items.length === 0) return [];
  const products = await productService.list().catch(() => []);
  const byId = new Map(products.map((p) => [p.id, p]));
  return cart.items.map((i) => {
    const product = byId.get(String(i.productId));
    return {
      id: String(i.productId),
      cartItemId: i.cartItemId,
      name: i.productName,
      price: i.price,
      quantity: i.quantity,
      image: product?.image || "",
      stock: product?.stock ?? 9999,
    };
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [buyNow, setBuyNow] = useState<CartItem | null>(null);
  const hasSyncedGuestCart = useRef(false);

  // Guest mode: persist to localStorage whenever items change and we're not authenticated.
  useEffect(() => {
    if (!isAuthenticated) localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }, [items, isAuthenticated]);

  const refreshFromServer = async () => {
    setLoading(true);
    try {
      const cart = await cartService.get();
      setItems(await enrichCart(cart));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      hasSyncedGuestCart.current = false;
      setItems(readLocalCart());
      return;
    }

    // Just became authenticated: push any local guest-cart items to the server cart once,
    // then clear local storage and switch to the server as the source of truth.
    if (!hasSyncedGuestCart.current) {
      hasSyncedGuestCart.current = true;
      (async () => {
        const guestItems = readLocalCart();
        setLoading(true);
        try {
          for (const gi of guestItems) {
            await cartService.add(Number(gi.id), gi.quantity).catch(() => {});
          }
          localStorage.removeItem(LOCAL_KEY);
          await refreshFromServer();
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isAuthenticated, authLoading]);

  const add: CartCtx["add"] = async (item, qty = 1) => {
    if (isAuthenticated) {
      await cartService.add(Number(item.id), qty);
      await refreshFromServer();
    } else {
      setItems((prev) => {
        const idx = prev.findIndex((p) => p.id === item.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: Math.min(next[idx].stock, next[idx].quantity + qty) };
          return next;
        }
        return [...prev, { ...item, quantity: qty }];
      });
    }
  };

  const remove: CartCtx["remove"] = async (id) => {
    if (isAuthenticated) {
      await cartService.remove(Number(id));
      await refreshFromServer();
    } else {
      setItems((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const setQty: CartCtx["setQty"] = async (id, qty) => {
    const clamped = Math.max(1, qty);
    if (isAuthenticated) {
      const existing = items.find((i) => i.id === id);
      if (!existing?.cartItemId) return;
      await cartService.updateItem(existing.cartItemId, Math.min(existing.stock, clamped));
      await refreshFromServer();
    } else {
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.min(p.stock, clamped) } : p)));
    }
  };

  const clear: CartCtx["clear"] = async () => {
    if (isAuthenticated) {
      await cartService.clear();
      setItems([]);
    } else {
      setItems([]);
    }
  };

  const value: CartCtx = {
    items,
    loading,
    add,
    remove,
    setQty,
    clear,
    subtotal: useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]),
    count: useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]),
    buyNow,
    setBuyNow,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
