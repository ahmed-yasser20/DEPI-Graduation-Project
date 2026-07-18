globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/admin-DvKDOx2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f82-YswjiOZGG7EGenKOdOym9bBzh6E\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 36738,
		"path": "../public/assets/admin-DvKDOx2o.js"
	},
	"/assets/dist-B-rKOHfM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-ZqhsfZkTYMC+SnLbzq5KtCSIihQ\"",
		"mtime": "2026-07-18T00:43:24.720Z",
		"size": 306,
		"path": "../public/assets/dist-B-rKOHfM.js"
	},
	"/assets/contact-Z_B59x8G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2625-/p8FksWQoaRFS4nGvl87s0L23+E\"",
		"mtime": "2026-07-18T00:43:24.717Z",
		"size": 9765,
		"path": "../public/assets/contact-Z_B59x8G.js"
	},
	"/assets/checkout-O8Dx65jp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"626d-qVoXuNVNyKr7Wyi64ydITByH/VU\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 25197,
		"path": "../public/assets/checkout-O8Dx65jp.js"
	},
	"/assets/cart-yd1VdqJN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4d-Emod7do+Ai3sr+Jk0pafGCgptdQ\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 3917,
		"path": "../public/assets/cart-yd1VdqJN.js"
	},
	"/assets/dialog-CPgQFlMV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17c1-smyvyMPmlXl5kQPqhlzA27jtJbw\"",
		"mtime": "2026-07-18T00:43:24.719Z",
		"size": 6081,
		"path": "../public/assets/dialog-CPgQFlMV.js"
	},
	"/assets/chevron-down-Dntnanar.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-aP1GL9T4JledB3dzEMGFE5piPS8\"",
		"mtime": "2026-07-18T00:43:24.717Z",
		"size": 118,
		"path": "../public/assets/chevron-down-Dntnanar.js"
	},
	"/assets/format-BZfAUL9i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-BQhaAlXa2aJQYcl384MMJbengz8\"",
		"mtime": "2026-07-18T00:43:24.720Z",
		"size": 196,
		"path": "../public/assets/format-BZfAUL9i.js"
	},
	"/assets/input-BPLDMy_1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"268-g5nHJthlWMR53s3m1eGXbP3WfBQ\"",
		"mtime": "2026-07-18T00:43:24.720Z",
		"size": 616,
		"path": "../public/assets/input-BPLDMy_1.js"
	},
	"/assets/hero-DwbcyS9f.jpg": {
		"type": "image/jpeg",
		"etag": "\"b7d3-JbmbbokdPs1stjkLdwMbxfh+ZEA\"",
		"mtime": "2026-07-18T00:43:24.727Z",
		"size": 47059,
		"path": "../public/assets/hero-DwbcyS9f.jpg"
	},
	"/assets/label-kz3XM7Cv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24c-U2fvQiToSM0/T8SGp19mHkoOHik\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 588,
		"path": "../public/assets/label-kz3XM7Cv.js"
	},
	"/assets/login-Ciw8-0tZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac5-e15cOJqun7dH8AVeNIz5Jp0yi3g\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 2757,
		"path": "../public/assets/login-Ciw8-0tZ.js"
	},
	"/assets/orders-CBq4TfH9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12af-eVV2IsWNI8/4wHOY8TlKKK6cta4\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 4783,
		"path": "../public/assets/orders-CBq4TfH9.js"
	},
	"/assets/Layout-ChG8owSh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d59d-sSofT5lYRJRRRUVpcdRodZfFT7M\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 120221,
		"path": "../public/assets/Layout-ChG8owSh.js"
	},
	"/assets/orderService-BZXITIg-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34c-BHF8OXPEk33UqcA9mWgTqZNREu8\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 844,
		"path": "../public/assets/orderService-BZXITIg-.js"
	},
	"/assets/plus-DrcrZmo9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-SiueATBwzD/iJ55b2MglUycs/bE\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 143,
		"path": "../public/assets/plus-DrcrZmo9.js"
	},
	"/assets/Loader-DwFqg5rT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"536-7Pis2sEnnnejK5nedrsMW0355IY\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 1334,
		"path": "../public/assets/Loader-DwFqg5rT.js"
	},
	"/assets/minus-TwtOaZVp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b-wilmNxdhjemi9In2de1yE/CFo90\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 107,
		"path": "../public/assets/minus-TwtOaZVp.js"
	},
	"/assets/payment-failed-BaLw3tni.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"427-sm2KA4KK3qlwvA+eYS/BVvJg0qA\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 1063,
		"path": "../public/assets/payment-failed-BaLw3tni.js"
	},
	"/assets/register-E1-4sYCF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad8-/aYpwF3nyxH+iVsO4Li9t+dK1M8\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 2776,
		"path": "../public/assets/register-E1-4sYCF.js"
	},
	"/assets/profile-B15qu7hA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a8-RF86xS3ydvhSmgvmNPYv1AYXOIE\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 4520,
		"path": "../public/assets/profile-B15qu7hA.js"
	},
	"/assets/star-ClM_zMy_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-xpgi3C+QpAWaHkjZb0EQIGrm9KY\"",
		"mtime": "2026-07-18T00:43:24.726Z",
		"size": 462,
		"path": "../public/assets/star-ClM_zMy_.js"
	},
	"/assets/payment-success-COLoJwsg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40b-Krz0jrFpikR281Kly20kSe8/5jM\"",
		"mtime": "2026-07-18T00:43:24.721Z",
		"size": 1035,
		"path": "../public/assets/payment-success-COLoJwsg.js"
	},
	"/assets/routes-DOf65zNb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"780e-yHE0TV+kPJtRUR5879M+4uWtel4\"",
		"mtime": "2026-07-18T00:43:24.724Z",
		"size": 30734,
		"path": "../public/assets/routes-DOf65zNb.js"
	},
	"/assets/index-CooI6wqA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"699d4-fU+f1CYuPJRpSNvu+obP0823LrA\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 432596,
		"path": "../public/assets/index-CooI6wqA.js"
	},
	"/assets/StatusBadge-CKlasdV6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47e-NjtqjFzhxGsFjkLJwQ0yF8pMZVs\"",
		"mtime": "2026-07-18T00:43:24.713Z",
		"size": 1150,
		"path": "../public/assets/StatusBadge-CKlasdV6.js"
	},
	"/assets/trash-2-DUcoRGnV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-yCv/3gpMRb+l0i7qcRfo0FZCdR8\"",
		"mtime": "2026-07-18T00:43:24.726Z",
		"size": 318,
		"path": "../public/assets/trash-2-DUcoRGnV.js"
	},
	"/assets/textarea-oZB50Z1n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"202-4LQq4iy1fjlhZrLoTw2zOugjBPk\"",
		"mtime": "2026-07-18T00:43:24.726Z",
		"size": 514,
		"path": "../public/assets/textarea-oZB50Z1n.js"
	},
	"/assets/useProtected-aLVC1UhM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-eg06qmNAqNaDDXEnmr2DqJQpKv0\"",
		"mtime": "2026-07-18T00:43:24.727Z",
		"size": 239,
		"path": "../public/assets/useProtected-aLVC1UhM.js"
	},
	"/assets/types-CHwUWPSh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc45-bMgn5gfFsG5tXMsQN9o+gVMGRP4\"",
		"mtime": "2026-07-18T00:43:24.727Z",
		"size": 56389,
		"path": "../public/assets/types-CHwUWPSh.js"
	},
	"/assets/styles-COccDHUO.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"149a4-OJcE2QZpwkS/CnoH37c8l/m4GyY\"",
		"mtime": "2026-07-18T00:43:24.728Z",
		"size": 84388,
		"path": "../public/assets/styles-COccDHUO.css"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_kEfZx9 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_kEfZx9
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
