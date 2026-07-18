import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useAuth } from "./CartContext-Cz5mJ62N.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProtected-CEQd-vqh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useProtected() {
	const { isAuthenticated, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && !isAuthenticated) navigate({ to: "/login" });
	}, [
		isAuthenticated,
		loading,
		navigate
	]);
	return {
		isAuthenticated,
		loading
	};
}
//#endregion
export { useProtected as t };
