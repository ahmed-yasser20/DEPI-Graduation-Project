//#region node_modules/.nitro/vite/services/ssr/assets/format-fiqzbY4k.js
var fmt = (n) => new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
}).format(n);
var formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric"
});
//#endregion
export { formatDate as n, fmt as t };
