import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-Dl6EQhz9.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS_MAP = {
	Pending: {
		label: "Pending",
		color: "grey"
	},
	AwaitingPayment: {
		label: "Waiting Payment",
		color: "yellow"
	},
	Paid: {
		label: "Paid",
		color: "green"
	},
	Failed: {
		label: "Failed",
		color: "red"
	},
	Processing: {
		label: "Processing",
		color: "blue"
	},
	Shipped: {
		label: "Shipped",
		color: "blue"
	},
	Delivered: {
		label: "Delivered",
		color: "green"
	},
	Cancelled: {
		label: "Cancelled",
		color: "red"
	}
};
function getStatusMeta(status) {
	return STATUS_MAP[status] || {
		label: status,
		color: "grey"
	};
}
var STATUS_COLOR_CLASSES = {
	grey: {
		dot: "bg-muted-foreground",
		text: "text-muted-foreground",
		bg: "bg-muted"
	},
	yellow: {
		dot: "bg-yellow-500",
		text: "text-yellow-700 dark:text-yellow-400",
		bg: "bg-yellow-500/10"
	},
	green: {
		dot: "bg-green-500",
		text: "text-green-700 dark:text-green-400",
		bg: "bg-green-500/10"
	},
	red: {
		dot: "bg-destructive",
		text: "text-destructive",
		bg: "bg-destructive/10"
	},
	blue: {
		dot: "bg-blue-500",
		text: "text-blue-700 dark:text-blue-400",
		bg: "bg-blue-500/10"
	}
};
function StatusBadge({ status }) {
	const meta = getStatusMeta(status);
	const classes = STATUS_COLOR_CLASSES[meta.color];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${classes.bg} ${classes.text}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${classes.dot}` }), meta.label]
	});
}
//#endregion
export { StatusBadge as t };
