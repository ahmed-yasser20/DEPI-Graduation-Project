import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CartContext-Cz5mJ62N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var api = axios.create({
	baseURL: "https://localhost:7000/api",
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
api.interceptors.response.use((res) => res, (error) => {
	if (error.response?.status === 401 && typeof window !== "undefined") {
		if (!error.config?.url?.includes("/Auth/")) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			if (!window.location.pathname.startsWith("/login")) window.location.href = "/login";
		}
	}
	return Promise.reject(new Error(extractErrorMessage(error)));
});
function extractErrorMessage(error) {
	const data = error.response?.data;
	if (!data) return error.message || "Something went wrong. Please try again.";
	if (typeof data === "string") return data;
	if (data.message) return data.message;
	if (data.title) return data.title;
	if (data.errors && typeof data.errors === "object") {
		const firstKey = Object.keys(data.errors)[0];
		const firstMsg = data.errors[firstKey]?.[0];
		if (firstMsg) return firstMsg;
	}
	return "Something went wrong. Please try again.";
}
var CLAIM_NAMEID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
var CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
var CLAIM_GIVENNAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";
var CLAIM_SURNAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";
var CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
function decodeJwt(token) {
	try {
		const payloadPart = token.split(".")[1];
		if (!payloadPart) return null;
		const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64 + "===".slice((base64.length + 3) % 4);
		const json = decodeURIComponent(atob(padded).split("").map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""));
		const raw = JSON.parse(json);
		return {
			sub: raw.sub || raw[CLAIM_NAMEID] || raw.nameid,
			nameIdentifier: raw[CLAIM_NAMEID] || raw.sub || raw.nameid,
			email: raw[CLAIM_EMAIL] || raw.email,
			firstName: raw[CLAIM_GIVENNAME] || raw.given_name || raw.firstName,
			lastName: raw[CLAIM_SURNAME] || raw.family_name || raw.lastName,
			role: raw[CLAIM_ROLE] || raw.role,
			exp: raw.exp,
			raw
		};
	} catch {
		return null;
	}
}
function isTokenExpired(decoded) {
	if (!decoded?.exp) return false;
	return Date.now() >= decoded.exp * 1e3;
}
function userFromToken(token, fallback) {
	const decoded = decodeJwt(token);
	return {
		id: decoded?.nameIdentifier || decoded?.sub || "",
		email: decoded?.email || fallback?.email || "",
		firstName: decoded?.firstName || fallback?.firstName || "",
		lastName: decoded?.lastName || fallback?.lastName || "",
		address: ""
	};
}
var authService = {
	async login({ email, password }) {
		const { data } = await api.post("/Auth/Login", {
			email,
			password
		});
		return {
			token: data.token,
			user: userFromToken(data.token, { email })
		};
	},
	async register(payload) {
		const { data } = await api.post("/Auth/Register", {
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			password: payload.password,
			city: payload.city || "",
			street: payload.street || "",
			building: payload.building || ""
		});
		return {
			token: data.token,
			user: userFromToken(data.token, {
				firstName: payload.firstName,
				lastName: payload.lastName,
				email: payload.email
			})
		};
	}
};
var customerService = {
	async getProfile() {
		const { data } = await api.get("/Customer");
		return data;
	},
	async updateProfile(patch) {
		const { data } = await api.put("/Customer", patch);
		return data;
	}
};
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
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
							const merged = {
								id: prev?.id || "",
								email: profile.email,
								firstName: profile.first_Name,
								lastName: profile.last_Name,
								phone: profile.phone,
								city: profile.city,
								street: profile.street,
								building: profile.building
							};
							localStorage.setItem("user", JSON.stringify(merged));
							return merged;
						});
					} catch {}
				} else if (t) {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
				}
			} catch {}
			setLoading(false);
		})();
	}, []);
	const persist = (t, u) => {
		localStorage.setItem("token", t);
		localStorage.setItem("user", JSON.stringify(u));
		setToken(t);
		setUser(u);
	};
	const value = {
		user,
		token,
		isAuthenticated: !!token,
		loading,
		isAdmin: (() => {
			const roles = decodeJwt(token || "")?.role;
			return (Array.isArray(roles) ? roles : roles ? [roles] : []).some((role) => role.toLowerCase() === "admin");
		})(),
		login: async (email, password) => {
			const { token, user } = await authService.login({
				email,
				password
			});
			persist(token, user);
		},
		register: async (data) => {
			const { token, user } = await authService.register(data);
			persist(token, user);
			const updated = await customerService.updateProfile({
				phoneNumber: data.phone,
				city: data.city,
				street: data.street,
				building: data.building
			});
			setUser((prev) => {
				if (!prev) return prev;
				const next = {
					...prev,
					phone: updated.phone,
					city: updated.city,
					street: updated.street,
					building: updated.building
				};
				localStorage.setItem("user", JSON.stringify(next));
				return next;
			});
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
				building: patch.building
			});
			setUser((prev) => {
				if (!prev) return prev;
				const next = {
					...prev,
					firstName: updated.first_Name,
					lastName: updated.last_Name,
					phone: updated.phone,
					city: updated.city,
					street: updated.street,
					building: updated.building
				};
				localStorage.setItem("user", JSON.stringify(next));
				return next;
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
var cartService = {
	async get() {
		const { data } = await api.get("/Cart");
		return data;
	},
	async add(productId, quantity) {
		const { data } = await api.post("/Cart", {
			productId,
			quantity
		});
		return data;
	},
	async updateItem(cartItemId, quantity) {
		await api.put("/Cart", {
			cartItemId,
			quantity
		});
	},
	async remove(productId) {
		await api.delete(`/Cart/${productId}`);
	},
	async clear() {
		await api.delete("/Cart");
	}
};
var FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
function mapProduct(p) {
	return {
		id: String(p.pId),
		name: p.pName,
		price: p.price,
		category: p.category_Name || "",
		categoryId: p.categoryId ?? void 0,
		stock: p.stock,
		image: p.imageUrl || FALLBACK_IMAGE,
		description: p.description || "",
		averageRating: p.averageRating ?? 0,
		ratingCount: p.ratingCount ?? 0
	};
}
function mapCategory(c) {
	return {
		id: c.category_Name,
		name: c.category_Name,
		categoryId: c.categoryId,
		blurb: c.productCount != null ? `${c.productCount} item${c.productCount === 1 ? "" : "s"}` : ""
	};
}
var productService = {
	async list() {
		const { data } = await api.get("/Product");
		return data.map(mapProduct);
	},
	async getById(id) {
		const { data } = await api.get(`/Product/${id}`);
		return mapProduct(data);
	},
	async search(keyword) {
		const { data } = await api.get("/Product/search", { params: { keyword } });
		return data.map(mapProduct);
	},
	async categories() {
		const { data } = await api.get("/Category");
		return data.map(mapCategory);
	}
};
var CartContext = (0, import_react.createContext)(null);
var LOCAL_KEY = "cart";
function readLocalCart() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
	} catch {
		return [];
	}
}
async function enrichCart(cart) {
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
			stock: product?.stock ?? 9999
		};
	});
}
function CartProvider({ children }) {
	const { isAuthenticated, loading: authLoading } = useAuth();
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [buyNow, setBuyNow] = (0, import_react.useState)(null);
	const hasSyncedGuestCart = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!isAuthenticated) {
			hasSyncedGuestCart.current = false;
			setItems(readLocalCart());
			return;
		}
		if (!hasSyncedGuestCart.current) {
			hasSyncedGuestCart.current = true;
			(async () => {
				const guestItems = readLocalCart();
				setLoading(true);
				try {
					for (const gi of guestItems) await cartService.add(Number(gi.id), gi.quantity).catch(() => {});
					localStorage.removeItem(LOCAL_KEY);
					await refreshFromServer();
				} finally {
					setLoading(false);
				}
			})();
		}
	}, [isAuthenticated, authLoading]);
	const add = async (item, qty = 1) => {
		if (isAuthenticated) {
			await cartService.add(Number(item.id), qty);
			await refreshFromServer();
		} else setItems((prev) => {
			const idx = prev.findIndex((p) => p.id === item.id);
			if (idx >= 0) {
				const next = [...prev];
				next[idx] = {
					...next[idx],
					quantity: Math.min(next[idx].stock, next[idx].quantity + qty)
				};
				return next;
			}
			return [...prev, {
				...item,
				quantity: qty
			}];
		});
	};
	const remove = async (id) => {
		if (isAuthenticated) {
			await cartService.remove(Number(id));
			await refreshFromServer();
		} else setItems((prev) => prev.filter((p) => p.id !== id));
	};
	const setQty = async (id, qty) => {
		const clamped = Math.max(1, qty);
		if (isAuthenticated) {
			const existing = items.find((i) => i.id === id);
			if (!existing?.cartItemId) return;
			await cartService.updateItem(existing.cartItemId, Math.min(existing.stock, clamped));
			await refreshFromServer();
		} else setItems((prev) => prev.map((p) => p.id === id ? {
			...p,
			quantity: Math.min(p.stock, clamped)
		} : p));
	};
	const clear = async () => {
		if (isAuthenticated) {
			await cartService.clear();
			setItems([]);
		} else setItems([]);
	};
	const value = {
		items,
		loading,
		add,
		remove,
		setQty,
		clear,
		subtotal: (0, import_react.useMemo)(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]),
		count: (0, import_react.useMemo)(() => items.reduce((s, i) => s + i.quantity, 0), [items]),
		buyNow,
		setBuyNow
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
//#endregion
export { useAuth as a, productService as i, CartProvider as n, useCart as o, api as r, AuthProvider as t };
