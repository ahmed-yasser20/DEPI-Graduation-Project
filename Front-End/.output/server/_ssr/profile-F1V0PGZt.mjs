import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useAuth, o as useCart } from "./CartContext-Cz5mJ62N.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Layout, t as Button } from "./Layout-C3A53Im-.mjs";
import { t as Input } from "./input-D7kBNgzb.mjs";
import { t as Label } from "./label-BHubOzCU.mjs";
import { t as StatusBadge } from "./StatusBadge-Dl6EQhz9.mjs";
import { n as formatDate, t as fmt } from "./format-fiqzbY4k.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useProtected } from "./useProtected-CEQd-vqh.mjs";
import { t as orderService } from "./orderService-CHn_Slt1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-F1V0PGZt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { isAuthenticated } = useProtected();
	const { user, updateProfile } = useAuth();
	const { items, subtotal } = useCart();
	const [form, setForm] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		phone: "",
		city: "",
		street: "",
		building: ""
	});
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [orders, setOrders] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (user) setForm({
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone || "",
			city: user.city || "",
			street: user.street || "",
			building: user.building || ""
		});
	}, [user]);
	(0, import_react.useEffect)(() => {
		orderService.list({
			page: 1,
			pageSize: 3
		}).then((r) => setOrders(r.orders)).catch(() => {});
	}, []);
	if (!isAuthenticated || !user) return null;
	const save = async () => {
		setSaving(true);
		try {
			await updateProfile(form);
			toast.success("Profile updated");
			setEditing(false);
		} catch (err) {
			toast.error(err.message || "Couldn't update profile");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-display font-semibold",
				children: "Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "lg:col-span-2 rounded-xl border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: "Personal Information"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: editing ? "default" : "outline",
								size: "sm",
								onClick: editing ? save : () => setEditing(true),
								disabled: saving,
								children: saving ? "Saving..." : editing ? "Save" : "Edit"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "First name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.firstName,
									disabled: !editing,
									onChange: (e) => setForm({
										...form,
										firstName: e.target.value
									}),
									className: "mt-1.5"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Last name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.lastName,
									disabled: !editing,
									onChange: (e) => setForm({
										...form,
										lastName: e.target.value
									}),
									className: "mt-1.5"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: user.email,
										disabled: true,
										className: "mt-1.5"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.phone,
									disabled: !editing,
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									}),
									className: "mt-1.5"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "City" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.city,
									disabled: !editing,
									onChange: (e) => setForm({
										...form,
										city: e.target.value
									}),
									className: "mt-1.5"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Street" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.street,
									disabled: !editing,
									onChange: (e) => setForm({
										...form,
										street: e.target.value
									}),
									className: "mt-1.5"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Building" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.building,
									disabled: !editing,
									onChange: (e) => setForm({
										...form,
										building: e.target.value
									}),
									className: "mt-1.5"
								})] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Current cart"
						}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "No items yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted-foreground",
								children: [
									items.length,
									" item",
									items.length > 1 ? "s" : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-2xl font-semibold",
								children: fmt(subtotal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-4 w-full",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cart",
									children: "View cart"
								})
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "lg:col-span-3 rounded-xl border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: "Recent orders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/orders",
								className: "text-sm text-muted-foreground hover:text-foreground",
								children: "View all →"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-3 gap-3",
							children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: o.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-medium",
										children: fmt(o.total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: formatDate(o.date)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status })
									})
								]
							}, o.id))
						})]
					})
				]
			})
		]
	}) });
}
//#endregion
export { ProfilePage as component };
