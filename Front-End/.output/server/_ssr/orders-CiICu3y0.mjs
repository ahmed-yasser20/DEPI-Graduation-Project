import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as api } from "./CartContext-Cz5mJ62N.mjs";
import { a as Star } from "../_libs/lucide-react.mjs";
import { n as Layout, t as Button } from "./Layout-C3A53Im-.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-DFHGMijv.mjs";
import { t as Textarea } from "./textarea-qR-vHCiQ.mjs";
import { n as Loader, t as EmptyState } from "./Loader-D_A2IhVE.mjs";
import { t as StatusBadge } from "./StatusBadge-Dl6EQhz9.mjs";
import { n as formatDate, t as fmt } from "./format-fiqzbY4k.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useProtected } from "./useProtected-CEQd-vqh.mjs";
import { t as orderService } from "./orderService-CHn_Slt1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-CiICu3y0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ratingService = {
	async getProductRatings(productId) {
		const { data } = await api.get(`/Rating/product/${productId}`);
		return data;
	},
	async save({ productId, value, comment }) {
		const { data } = await api.post("/Rating", {
			productId,
			value,
			comment: comment?.trim() || null
		});
		return data;
	}
};
function RatingDialog({ product, onOpenChange, onSaved }) {
	const [value, setValue] = (0, import_react.useState)(0);
	const [comment, setComment] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setValue(0);
		setComment("");
	}, [product?.id]);
	if (!product) return null;
	const save = async () => {
		if (!value) {
			toast.error("Choose a star rating first");
			return;
		}
		setSaving(true);
		try {
			await ratingService.save({
				productId: product.id,
				value,
				comment
			});
			toast.success("Thank you for your rating!");
			onSaved?.();
			onOpenChange(false);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Couldn't save your rating");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!product,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Rate ", product.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Your rating can be updated later by selecting Rate product again." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				"aria-label": "Choose a rating from one to five stars",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setValue(star),
					className: "rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					"aria-label": `${star} star${star === 1 ? "" : "s"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-8 w-8 ${star <= value ? "fill-warning text-warning" : "text-muted-foreground"}` })
				}, star))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: comment,
				onChange: (event) => setComment(event.target.value),
				maxLength: 1e3,
				placeholder: "Share your experience (optional)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				disabled: saving,
				children: saving ? "Saving..." : "Submit rating"
			})
		] })
	});
}
function OrdersPage() {
	const { isAuthenticated } = useProtected();
	const [page, setPage] = (0, import_react.useState)(1);
	const [data, setData] = (0, import_react.useState)(null);
	const [ratingProduct, setRatingProduct] = (0, import_react.useState)(null);
	const pageSize = 5;
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated) return;
		setData(null);
		orderService.list({
			page,
			pageSize
		}).then(setData);
	}, [page, isAuthenticated]);
	if (!isAuthenticated) return null;
	const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: "History"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-display font-semibold",
				children: "My Orders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [!data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading orders..." }) : data.orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No orders yet",
					description: "Your future orders will show up here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: data.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-5 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: o.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-lg font-semibold",
									children: formatDate(o.date)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: fmt(o.total)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-t pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
									children: "Order items"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 divide-y",
									children: o.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium",
													children: item.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-0.5 text-sm text-muted-foreground",
													children: [
														item.quantity,
														" × ",
														fmt(item.unitPrice)
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: fmt(item.quantity * item.unitPrice)
											}),
											o.status === "Paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => setRatingProduct({
													id: item.productId,
													name: item.name
												}),
												children: "Rate product"
											})
										]
									}, `${o.id}-${item.productId}`))
								})]
							})
						]
					}, o.id))
				}), data && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page === 1,
							onClick: () => setPage((p) => p - 1),
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: [
								"Page ",
								page,
								" of ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page === totalPages,
							onClick: () => setPage((p) => p + 1),
							children: "Next"
						})
					]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingDialog, {
		product: ratingProduct,
		onOpenChange: (open) => !open && setRatingProduct(null)
	})] });
}
//#endregion
export { OrdersPage as component };
