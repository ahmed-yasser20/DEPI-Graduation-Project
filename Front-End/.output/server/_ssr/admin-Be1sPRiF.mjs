import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useAuth, r as api } from "./CartContext-Cz5mJ62N.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Check, E as ChevronDown, d as Plus, i as Trash2, o as SquarePen, w as ChevronUp } from "../_libs/lucide-react.mjs";
import { n as Layout, r as cn, t as Button } from "./Layout-C3A53Im-.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-DFHGMijv.mjs";
import { t as Input } from "./input-D7kBNgzb.mjs";
import { t as Label } from "./label-BHubOzCU.mjs";
import { t as Textarea } from "./textarea-qR-vHCiQ.mjs";
import { n as Loader } from "./Loader-D_A2IhVE.mjs";
import { t as StatusBadge } from "./StatusBadge-Dl6EQhz9.mjs";
import { n as formatDate, t as fmt } from "./format-fiqzbY4k.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Be1sPRiF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var adminService = {
	async listProducts() {
		const { data } = await api.get("/Product");
		return data;
	},
	async saveProduct(product, id) {
		const { data } = id ? await api.put(`/Product/${id}`, product) : await api.post("/Product", product);
		return data;
	},
	async deleteProduct(id) {
		await api.delete(`/Product/${id}`);
	},
	async listCategories() {
		const { data } = await api.get("/Category");
		return data;
	},
	async saveCategory(name, id) {
		const body = { category_Name: name };
		const { data } = id ? await api.put(`/Category/${id}`, body) : await api.post("/Category", body);
		return data;
	},
	async deleteCategory(id) {
		await api.delete(`/Category/${id}`);
	},
	async listOrders() {
		const { data } = await api.get("/orders/all");
		return data;
	}
};
var emptyProduct = {
	pName: "",
	price: 0,
	description: "",
	stock: 0,
	categoryId: null
};
function AdminPage() {
	const { isAuthenticated, isAdmin, loading } = useAuth();
	const navigate = useNavigate();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [productForm, setProductForm] = (0, import_react.useState)(emptyProduct);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [productDialog, setProductDialog] = (0, import_react.useState)(false);
	const [categoryName, setCategoryName] = (0, import_react.useState)("");
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const pageSize = 8;
	const load = async () => {
		setBusy(true);
		try {
			const [nextProducts, nextCategories, nextOrders] = await Promise.all([
				adminService.listProducts(),
				adminService.listCategories(),
				adminService.listOrders()
			]);
			setProducts(nextProducts);
			setCategories(nextCategories);
			setOrders(nextOrders);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Couldn't load the dashboard");
		} finally {
			setBusy(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!loading && (!isAuthenticated || !isAdmin)) navigate({ to: "/" });
	}, [
		isAuthenticated,
		isAdmin,
		loading,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (isAdmin) load();
	}, [isAdmin]);
	const salesByProduct = (0, import_react.useMemo)(() => {
		const sales = /* @__PURE__ */ new Map();
		orders.filter((order) => order.status === "Paid" || order.payment?.status === "Succeeded").forEach((order) => {
			order.items.forEach((item) => sales.set(item.pId, (sales.get(item.pId) || 0) + item.quantity));
		});
		return sales;
	}, [orders]);
	const revenueByProduct = (0, import_react.useMemo)(() => {
		const revenue = /* @__PURE__ */ new Map();
		orders.filter((order) => order.status === "Paid" || order.payment?.status === "Succeeded").forEach((order) => {
			order.items.forEach((item) => revenue.set(item.pId, (revenue.get(item.pId) || 0) + item.quantity * item.unitPrice));
		});
		return revenue;
	}, [orders]);
	const salesByCategory = (0, import_react.useMemo)(() => {
		const sales = /* @__PURE__ */ new Map();
		products.forEach((product) => {
			if (product.categoryId == null) return;
			sales.set(product.categoryId, (sales.get(product.categoryId) || 0) + (salesByProduct.get(product.pId) || 0));
		});
		return sales;
	}, [products, salesByProduct]);
	const revenueByCategory = (0, import_react.useMemo)(() => {
		const revenue = /* @__PURE__ */ new Map();
		products.forEach((product) => {
			if (product.categoryId == null) return;
			revenue.set(product.categoryId, (revenue.get(product.categoryId) || 0) + (revenueByProduct.get(product.pId) || 0));
		});
		return revenue;
	}, [products, revenueByProduct]);
	const productPages = Math.max(1, Math.ceil(products.length / pageSize));
	const pagedProducts = products.slice((page - 1) * pageSize, page * pageSize);
	const openProduct = (product) => {
		setEditingProduct(product?.pId ?? null);
		setProductForm(product ? {
			pName: product.pName,
			price: product.price,
			description: product.description,
			stock: product.stock,
			categoryId: product.categoryId ?? null
		} : emptyProduct);
		setProductDialog(true);
	};
	const saveProduct = async () => {
		if (!productForm.pName.trim() || productForm.price < 0 || productForm.stock < 0) {
			toast.error("Enter a product name, price, and valid stock amount");
			return;
		}
		try {
			await adminService.saveProduct(productForm, editingProduct ?? void 0);
			toast.success(editingProduct ? "Product updated" : "Product created");
			setProductDialog(false);
			await load();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Couldn't save product");
		}
	};
	const saveCategory = async () => {
		if (!categoryName.trim()) return toast.error("Category name is required");
		try {
			await adminService.saveCategory(categoryName.trim(), editingCategory ?? void 0);
			toast.success(editingCategory ? "Category updated" : "Category created");
			setCategoryName("");
			setEditingCategory(null);
			await load();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Couldn't save category");
		}
	};
	const remove = async (kind, id) => {
		if (!window.confirm(`Delete this ${kind}? This cannot be undone.`)) return;
		try {
			if (kind === "product") await adminService.deleteProduct(id);
			else await adminService.deleteCategory(id);
			toast.success(`${kind === "product" ? "Product" : "Category"} deleted`);
			await load();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : `Couldn't delete ${kind}`);
		}
	};
	if (loading || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading dashboard..." })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container-page py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: "Administration"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-display font-semibold",
				children: "Admin dashboard"
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading data..." })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "products",
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "h-auto flex-wrap justify-start gap-1 bg-muted p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "products",
								children: "Products & sales"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "categories",
								children: "Categories"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "orders",
								children: "All orders"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "products",
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Sales count includes paid orders only."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => openProduct(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Add product"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto rounded-xl border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-muted/50 text-left text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Product"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Category"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Price"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Stock"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Units sold"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Sales revenue"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pagedProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 font-medium",
												children: product.pName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: product.category_Name || "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: fmt(product.price)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: product.stock
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: salesByProduct.get(product.pId) || 0
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: fmt(revenueByProduct.get(product.pId) || 0)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3 text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													onClick: () => openProduct(product),
													"aria-label": `Edit ${product.pName}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													onClick: () => remove("product", product.pId),
													"aria-label": `Delete ${product.pName}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
												})]
											})
										]
									}, product.pId)) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										disabled: page === 1,
										onClick: () => setPage((value) => value - 1),
										children: "Previous"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "py-2 text-sm text-muted-foreground",
										children: [
											"Page ",
											page,
											" of ",
											productPages
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										disabled: page === productPages,
										onClick: () => setPage((value) => value + 1),
										children: "Next"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "categories",
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: editingCategory ? "Edit category" : "Add category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-col gap-2 sm:flex-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: categoryName,
										onChange: (event) => setCategoryName(event.target.value),
										placeholder: "Category name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: saveCategory,
										children: editingCategory ? "Save changes" : "Add category"
									}),
									editingCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => {
											setEditingCategory(null);
											setCategoryName("");
										},
										children: "Cancel"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 overflow-x-auto rounded-xl border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/50 text-left text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Products"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Units sold"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Sales revenue"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 font-medium",
											children: category.category_Name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: category.productCount ?? 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: salesByCategory.get(category.categoryId) || 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: fmt(revenueByCategory.get(category.categoryId) || 0)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3 text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												onClick: () => {
													setEditingCategory(category.categoryId);
													setCategoryName(category.category_Name);
												},
												"aria-label": `Edit ${category.category_Name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "ghost",
												onClick: () => remove("category", category.categoryId),
												"aria-label": `Delete ${category.category_Name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
											})]
										})
									]
								}, category.categoryId)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "orders",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-xl border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/50 text-left text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Order"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Customer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Date"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Items"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Total"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3",
											children: "Status"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t align-top",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3 font-medium",
											children: ["ORD-", order.oId]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 font-mono text-xs text-muted-foreground",
											children: order.cId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 whitespace-nowrap",
											children: formatDate(order.created_At)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												item.productName,
												" × ",
												item.quantity
											] }, item.pId))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 whitespace-nowrap",
											children: fmt(order.total_Price)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: order.status })
										})
									]
								}, order.oId)) })]
							})
						})
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: productDialog,
		onOpenChange: setProductDialog,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingProduct ? "Edit product" : "Add product" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "product-name",
					children: "Name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "product-name",
					value: productForm.pName,
					onChange: (event) => setProductForm({
						...productForm,
						pName: event.target.value
					}),
					className: "mt-1.5"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "product-price",
						children: "Price"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "product-price",
						type: "number",
						min: "0",
						step: "0.01",
						value: productForm.price,
						onChange: (event) => setProductForm({
							...productForm,
							price: Number(event.target.value)
						}),
						className: "mt-1.5"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "product-stock",
						children: "Stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "product-stock",
						type: "number",
						min: "0",
						value: productForm.stock,
						onChange: (event) => setProductForm({
							...productForm,
							stock: Number(event.target.value)
						}),
						className: "mt-1.5"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: productForm.categoryId?.toString() || "none",
					onValueChange: (value) => setProductForm({
						...productForm,
						categoryId: value === "none" ? null : Number(value)
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "mt-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "No category" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "none",
						children: "No category"
					}), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: String(category.categoryId),
						children: category.category_Name
					}, category.categoryId))] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "product-description",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "product-description",
					value: productForm.description,
					onChange: (event) => setProductForm({
						...productForm,
						description: event.target.value
					}),
					className: "mt-1.5"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: saveProduct,
					children: editingProduct ? "Save changes" : "Create product"
				})
			]
		})] })
	})] });
}
//#endregion
export { AdminPage as component };
