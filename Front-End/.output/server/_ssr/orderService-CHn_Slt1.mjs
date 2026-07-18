import { r as api } from "./CartContext-Cz5mJ62N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orderService-CHn_Slt1.js
function mapOrder(o) {
	return {
		id: `ORD-${o.oId}`,
		oId: o.oId,
		date: o.created_At,
		total: o.total_Price,
		status: o.status,
		items: o.items.map((i) => ({
			productId: i.pId,
			name: i.productName,
			quantity: i.quantity,
			unitPrice: i.unitPrice
		}))
	};
}
var orderService = {
	async list({ page = 1, pageSize = 5 } = {}) {
		const { data } = await api.get("/orders");
		const mapped = data.map(mapOrder).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		const total = mapped.length;
		const start = (page - 1) * pageSize;
		return {
			orders: mapped.slice(start, start + pageSize),
			total,
			page,
			pageSize
		};
	},
	async createFromCart() {
		const { data } = await api.post("/orders/from-cart");
		return data;
	},
	async create(items) {
		const { data } = await api.post("/orders", { items });
		return data;
	},
	async getOrder(orderId) {
		const { data } = await api.get(`/orders/${orderId}`);
		return mapOrder(data);
	},
	async getStatus(orderId) {
		const { data } = await api.get(`/orders/${orderId}/status`);
		return typeof data === "string" ? data : data?.toString?.() ?? String(data);
	}
};
//#endregion
export { orderService as t };
