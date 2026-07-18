import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useAuth } from "./CartContext-Cz5mJ62N.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Layout, t as Button } from "./Layout-C3A53Im-.mjs";
import { t as Input } from "./input-D7kBNgzb.mjs";
import { t as Label } from "./label-BHubOzCU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-CYGsb0ss.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	firstName: stringType().trim().min(1, "First name is required").max(50),
	lastName: stringType().trim().min(1, "Last name is required").max(50),
	email: stringType().trim().email("Enter a valid email"),
	phone: stringType().trim().regex(/^\+20(10|11|12|15)\d{8}$/, "Use +20 followed by a valid 10-digit mobile number"),
	city: stringType().trim().min(1, "City is required").max(100),
	street: stringType().trim().min(1, "Street is required").max(200),
	building: stringType().trim().min(1, "Building is required").max(100),
	password: stringType().min(6, "At least 6 characters"),
	confirm: stringType()
}).refine((d) => d.password === d.confirm, {
	message: "Passwords don't match",
	path: ["confirm"]
});
function RegisterPage() {
	const [form, setForm] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		email: "",
		phone: "+20",
		city: "",
		street: "",
		building: "",
		password: "",
		confirm: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { register } = useAuth();
	const navigate = useNavigate();
	const submit = async (e) => {
		e.preventDefault();
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			const errs = {};
			parsed.error.issues.forEach((i) => errs[i.path[0]] = i.message);
			setErrors(errs);
			return;
		}
		setErrors({});
		setBusy(true);
		try {
			await register(form);
			toast.success("Account created");
			navigate({ to: "/" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Registration failed");
		} finally {
			setBusy(false);
		}
	};
	const field = (key, label, type = "text") => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: key,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: key,
			type,
			value: form[key],
			onChange: (e) => setForm({
				...form,
				[key]: e.target.value
			}),
			className: "mt-1.5"
		}),
		errors[key] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-destructive",
			children: errors[key]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-16 max-w-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border bg-card p-8 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Create account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Start with a curated experience built around you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [field("firstName", "First name"), field("lastName", "Last name")]
						}),
						field("email", "Email", "email"),
						field("phone", "Phone number (e.g. +201012345678)", "tel"),
						field("city", "City"),
						field("street", "Street"),
						field("building", "Building"),
						field("password", "Password", "password"),
						field("confirm", "Confirm password", "password"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: busy,
							children: busy ? "Creating..." : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-center text-muted-foreground",
					children: [
						"Have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-foreground font-medium hover:underline",
							children: "Sign in"
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { RegisterPage as component };
