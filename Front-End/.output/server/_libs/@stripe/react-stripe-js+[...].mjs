import { o as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { u as require_react } from "../@floating-ui/react-dom+[...].mjs";
//#region node_modules/prop-types/lib/ReactPropTypesSecret.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_ReactPropTypesSecret = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}));
//#endregion
//#region node_modules/prop-types/factoryWithThrowingShims.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_factoryWithThrowingShims = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ReactPropTypesSecret = require_ReactPropTypesSecret();
	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;
	module.exports = function() {
		function shim(props, propName, componentName, location, propFullName, secret) {
			if (secret === ReactPropTypesSecret) return;
			var err = /* @__PURE__ */ new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
			err.name = "Invariant Violation";
			throw err;
		}
		shim.isRequired = shim;
		function getShim() {
			return shim;
		}
		var ReactPropTypes = {
			array: shim,
			bigint: shim,
			bool: shim,
			func: shim,
			number: shim,
			object: shim,
			string: shim,
			symbol: shim,
			any: shim,
			arrayOf: getShim,
			element: shim,
			elementType: shim,
			instanceOf: getShim,
			node: shim,
			objectOf: getShim,
			oneOf: getShim,
			oneOfType: getShim,
			shape: getShim,
			exact: getShim,
			checkPropTypes: emptyFunctionWithReset,
			resetWarningCache: emptyFunction
		};
		ReactPropTypes.PropTypes = ReactPropTypes;
		return ReactPropTypes;
	};
}));
//#endregion
//#region node_modules/prop-types/index.js
var require_prop_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_factoryWithThrowingShims()();
}));
//#endregion
//#region node_modules/@stripe/react-stripe-js/dist/react-stripe.esm.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly) symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		});
		keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread2(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) ownKeys(Object(source), true).forEach(function(key) {
			_defineProperty(target, key, source[key]);
		});
		else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
		else ownKeys(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _typeof(obj) {
	"@babel/helpers - typeof";
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
		return typeof obj;
	};
	else _typeof = function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	return _typeof(obj);
}
function _defineProperty(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _slicedToArray(arr, i) {
	return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
	var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
	if (_i == null) return;
	var _arr = [];
	var _n = true;
	var _d = false;
	var _s, _e;
	try {
		for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i["return"] != null) _i["return"]();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var useAttachEvent = function useAttachEvent(element, event, cb) {
	var cbDefined = !!cb;
	var cbRef = import_react.useRef(cb);
	import_react.useEffect(function() {
		cbRef.current = cb;
	}, [cb]);
	import_react.useEffect(function() {
		if (!cbDefined || !element) return function() {};
		var decoratedCb = function decoratedCb() {
			if (cbRef.current) cbRef.current.apply(cbRef, arguments);
		};
		element.on(event, decoratedCb);
		return function() {
			element.off(event, decoratedCb);
		};
	}, [
		cbDefined,
		event,
		element,
		cbRef
	]);
};
var usePrevious = function usePrevious(value) {
	var ref = import_react.useRef(value);
	import_react.useEffect(function() {
		ref.current = value;
	}, [value]);
	return ref.current;
};
var isUnknownObject = function isUnknownObject(raw) {
	return raw !== null && _typeof(raw) === "object";
};
var isPromise = function isPromise(raw) {
	return isUnknownObject(raw) && typeof raw.then === "function";
};
var isStripe = function isStripe(raw) {
	return isUnknownObject(raw) && typeof raw.elements === "function" && typeof raw.createToken === "function" && typeof raw.createPaymentMethod === "function" && typeof raw.confirmCardPayment === "function";
};
var PLAIN_OBJECT_STR = "[object Object]";
var isEqual = function isEqual(left, right) {
	if (!isUnknownObject(left) || !isUnknownObject(right)) return left === right;
	var leftArray = Array.isArray(left);
	if (leftArray !== Array.isArray(right)) return false;
	var leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
	if (leftPlainObject !== (Object.prototype.toString.call(right) === PLAIN_OBJECT_STR)) return false;
	if (!leftPlainObject && !leftArray) return left === right;
	var leftKeys = Object.keys(left);
	var rightKeys = Object.keys(right);
	if (leftKeys.length !== rightKeys.length) return false;
	var keySet = {};
	for (var i = 0; i < leftKeys.length; i += 1) keySet[leftKeys[i]] = true;
	for (var _i = 0; _i < rightKeys.length; _i += 1) keySet[rightKeys[_i]] = true;
	var allKeys = Object.keys(keySet);
	if (allKeys.length !== leftKeys.length) return false;
	var l = left;
	var r = right;
	return allKeys.every(function pred(key) {
		return isEqual(l[key], r[key]);
	});
};
var extractAllowedOptionsUpdates = function extractAllowedOptionsUpdates(options, prevOptions, immutableKeys) {
	if (!isUnknownObject(options)) return null;
	return Object.keys(options).reduce(function(newOptions, key) {
		var isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
		if (immutableKeys.includes(key)) {
			if (isUpdated) console.warn("Unsupported prop change: options.".concat(key, " is not a mutable property."));
			return newOptions;
		}
		if (!isUpdated) return newOptions;
		return _objectSpread2(_objectSpread2({}, newOptions || {}), {}, _defineProperty({}, key, options[key]));
	}, null);
};
var INVALID_STRIPE_ERROR$2 = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";
var validateStripe = function validateStripe(maybeStripe) {
	var errorMsg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : INVALID_STRIPE_ERROR$2;
	if (maybeStripe === null || isStripe(maybeStripe)) return maybeStripe;
	throw new Error(errorMsg);
};
var parseStripeProp = function parseStripeProp(raw) {
	var errorMsg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : INVALID_STRIPE_ERROR$2;
	if (isPromise(raw)) return {
		tag: "async",
		stripePromise: Promise.resolve(raw).then(function(result) {
			return validateStripe(result, errorMsg);
		})
	};
	var stripe = validateStripe(raw, errorMsg);
	if (stripe === null) return { tag: "empty" };
	return {
		tag: "sync",
		stripe
	};
};
var registerWithStripeJs = function registerWithStripeJs(stripe) {
	if (!stripe || !stripe._registerWrapper || !stripe.registerAppInfo) return;
	stripe._registerWrapper({
		name: "react-stripe-js",
		version: "3.10.0"
	});
	stripe.registerAppInfo({
		name: "react-stripe-js",
		version: "3.10.0",
		url: "https://stripe.com/docs/stripe-js/react"
	});
};
var ElementsContext = /*#__PURE__*/ import_react.createContext(null);
ElementsContext.displayName = "ElementsContext";
var parseElementsContext = function parseElementsContext(ctx, useCase) {
	if (!ctx) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
	return ctx;
};
/**
* The `Elements` provider allows you to use [Element components](https://stripe.com/docs/stripe-js/react#element-components) and access the [Stripe object](https://stripe.com/docs/js/initializing) in any nested component.
* Render an `Elements` provider at the root of your React app so that it is available everywhere you need it.
*
* To use the `Elements` provider, call `loadStripe` from `@stripe/stripe-js` with your publishable key.
* The `loadStripe` function will asynchronously load the Stripe.js script and initialize a `Stripe` object.
* Pass the returned `Promise` to `Elements`.
*
* @docs https://docs.stripe.com/sdks/stripejs-react?ui=elements#elements-provider
*/
var Elements = function Elements(_ref) {
	var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
	var parsed = import_react.useMemo(function() {
		return parseStripeProp(rawStripeProp);
	}, [rawStripeProp]);
	var _React$useState2 = _slicedToArray(import_react.useState(function() {
		return {
			stripe: parsed.tag === "sync" ? parsed.stripe : null,
			elements: parsed.tag === "sync" ? parsed.stripe.elements(options) : null
		};
	}), 2), ctx = _React$useState2[0], setContext = _React$useState2[1];
	import_react.useEffect(function() {
		var isMounted = true;
		var safeSetContext = function safeSetContext(stripe) {
			setContext(function(ctx) {
				if (ctx.stripe) return ctx;
				return {
					stripe,
					elements: stripe.elements(options)
				};
			});
		};
		if (parsed.tag === "async" && !ctx.stripe) parsed.stripePromise.then(function(stripe) {
			if (stripe && isMounted) safeSetContext(stripe);
		});
		else if (parsed.tag === "sync" && !ctx.stripe) safeSetContext(parsed.stripe);
		return function() {
			isMounted = false;
		};
	}, [
		parsed,
		ctx,
		options
	]);
	var prevStripe = usePrevious(rawStripeProp);
	import_react.useEffect(function() {
		if (prevStripe !== null && prevStripe !== rawStripeProp) console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
	}, [prevStripe, rawStripeProp]);
	var prevOptions = usePrevious(options);
	import_react.useEffect(function() {
		if (!ctx.elements) return;
		var updates = extractAllowedOptionsUpdates(options, prevOptions, ["clientSecret", "fonts"]);
		if (updates) ctx.elements.update(updates);
	}, [
		options,
		prevOptions,
		ctx.elements
	]);
	import_react.useEffect(function() {
		registerWithStripeJs(ctx.stripe);
	}, [ctx.stripe]);
	return /*#__PURE__*/ import_react.createElement(ElementsContext.Provider, { value: ctx }, children);
};
Elements.propTypes = {
	stripe: import_prop_types.default.any,
	options: import_prop_types.default.object
};
var useElementsContextWithUseCase = function useElementsContextWithUseCase(useCaseMessage) {
	return parseElementsContext(import_react.useContext(ElementsContext), useCaseMessage);
};
/**
* @docs https://stripe.com/docs/stripe-js/react#useelements-hook
*/
var useElements = function useElements() {
	return useElementsContextWithUseCase("calls useElements()").elements;
};
/**
* @docs https://stripe.com/docs/stripe-js/react#elements-consumer
*/
var ElementsConsumer = function ElementsConsumer(_ref2) {
	var children = _ref2.children;
	return children(useElementsContextWithUseCase("mounts <ElementsConsumer>"));
};
ElementsConsumer.propTypes = { children: import_prop_types.default.func.isRequired };
var _excluded$1 = ["on", "session"];
var CheckoutSdkContext = /*#__PURE__*/ import_react.createContext(null);
CheckoutSdkContext.displayName = "CheckoutSdkContext";
var parseCheckoutSdkContext = function parseCheckoutSdkContext(ctx, useCase) {
	if (!ctx) throw new Error("Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(useCase, " in an <CheckoutProvider> provider."));
	return ctx;
};
var CheckoutContext = /*#__PURE__*/ import_react.createContext(null);
CheckoutContext.displayName = "CheckoutContext";
var extractCheckoutContextValue = function extractCheckoutContextValue(checkoutSdk, sessionState) {
	if (!checkoutSdk) return null;
	checkoutSdk.on;
	checkoutSdk.session;
	var actions = _objectWithoutProperties(checkoutSdk, _excluded$1);
	if (!sessionState) return Object.assign(checkoutSdk.session(), actions);
	return Object.assign(sessionState, actions);
};
var INVALID_STRIPE_ERROR$1 = "Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";
var CheckoutProvider = function CheckoutProvider(_ref) {
	var rawStripeProp = _ref.stripe, options = _ref.options, children = _ref.children;
	var parsed = import_react.useMemo(function() {
		return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR$1);
	}, [rawStripeProp]);
	var _React$useState2 = _slicedToArray(import_react.useState(null), 2), session = _React$useState2[0], setSession = _React$useState2[1];
	var _React$useState4 = _slicedToArray(import_react.useState(function() {
		return {
			stripe: parsed.tag === "sync" ? parsed.stripe : null,
			checkoutSdk: null
		};
	}), 2), ctx = _React$useState4[0], setContext = _React$useState4[1];
	var safeSetContext = function safeSetContext(stripe, checkoutSdk) {
		setContext(function(ctx) {
			if (ctx.stripe && ctx.checkoutSdk) return ctx;
			return {
				stripe,
				checkoutSdk
			};
		});
	};
	var initCheckoutCalledRef = import_react.useRef(false);
	import_react.useEffect(function() {
		var isMounted = true;
		if (parsed.tag === "async" && !ctx.stripe) parsed.stripePromise.then(function(stripe) {
			if (stripe && isMounted && !initCheckoutCalledRef.current) {
				initCheckoutCalledRef.current = true;
				stripe.initCheckout(options).then(function(checkoutSdk) {
					if (checkoutSdk) {
						safeSetContext(stripe, checkoutSdk);
						checkoutSdk.on("change", setSession);
					}
				});
			}
		});
		else if (parsed.tag === "sync" && parsed.stripe && !initCheckoutCalledRef.current) {
			initCheckoutCalledRef.current = true;
			parsed.stripe.initCheckout(options).then(function(checkoutSdk) {
				if (checkoutSdk) {
					safeSetContext(parsed.stripe, checkoutSdk);
					checkoutSdk.on("change", setSession);
				}
			});
		}
		return function() {
			isMounted = false;
		};
	}, [
		parsed,
		ctx,
		options,
		setSession
	]);
	var prevStripe = usePrevious(rawStripeProp);
	import_react.useEffect(function() {
		if (prevStripe !== null && prevStripe !== rawStripeProp) console.warn("Unsupported prop change on CheckoutProvider: You cannot change the `stripe` prop after setting it.");
	}, [prevStripe, rawStripeProp]);
	var prevOptions = usePrevious(options);
	var prevCheckoutSdk = usePrevious(ctx.checkoutSdk);
	import_react.useEffect(function() {
		var _prevOptions$elements, _options$elementsOpti, _prevOptions$elements2, _options$elementsOpti2;
		if (!ctx.checkoutSdk) return;
		var hasSdkLoaded = Boolean(!prevCheckoutSdk && ctx.checkoutSdk);
		var previousAppearance = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements = prevOptions.elementsOptions) === null || _prevOptions$elements === void 0 ? void 0 : _prevOptions$elements.appearance;
		var currentAppearance = options === null || options === void 0 ? void 0 : (_options$elementsOpti = options.elementsOptions) === null || _options$elementsOpti === void 0 ? void 0 : _options$elementsOpti.appearance;
		var hasAppearanceChanged = !isEqual(currentAppearance, previousAppearance);
		if (currentAppearance && (hasAppearanceChanged || hasSdkLoaded)) ctx.checkoutSdk.changeAppearance(currentAppearance);
		var previousFonts = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements2 = prevOptions.elementsOptions) === null || _prevOptions$elements2 === void 0 ? void 0 : _prevOptions$elements2.fonts;
		var currentFonts = options === null || options === void 0 ? void 0 : (_options$elementsOpti2 = options.elementsOptions) === null || _options$elementsOpti2 === void 0 ? void 0 : _options$elementsOpti2.fonts;
		var hasFontsChanged = !isEqual(previousFonts, currentFonts);
		if (currentFonts && (hasFontsChanged || hasSdkLoaded)) ctx.checkoutSdk.loadFonts(currentFonts);
	}, [
		options,
		prevOptions,
		ctx.checkoutSdk,
		prevCheckoutSdk
	]);
	import_react.useEffect(function() {
		registerWithStripeJs(ctx.stripe);
	}, [ctx.stripe]);
	var checkoutContextValue = import_react.useMemo(function() {
		return extractCheckoutContextValue(ctx.checkoutSdk, session);
	}, [ctx.checkoutSdk, session]);
	if (!ctx.checkoutSdk) return null;
	return /*#__PURE__*/ import_react.createElement(CheckoutSdkContext.Provider, { value: ctx }, /*#__PURE__*/ import_react.createElement(CheckoutContext.Provider, { value: checkoutContextValue }, children));
};
CheckoutProvider.propTypes = {
	stripe: import_prop_types.default.any,
	options: import_prop_types.default.shape({
		fetchClientSecret: import_prop_types.default.func.isRequired,
		elementsOptions: import_prop_types.default.object
	}).isRequired
};
var useElementsOrCheckoutSdkContextWithUseCase = function useElementsOrCheckoutSdkContextWithUseCase(useCaseString) {
	var checkoutSdkContext = import_react.useContext(CheckoutSdkContext);
	var elementsContext = import_react.useContext(ElementsContext);
	if (checkoutSdkContext && elementsContext) throw new Error("You cannot wrap the part of your app that ".concat(useCaseString, " in both <CheckoutProvider> and <Elements> providers."));
	if (checkoutSdkContext) return parseCheckoutSdkContext(checkoutSdkContext, useCaseString);
	return parseElementsContext(elementsContext, useCaseString);
};
var _excluded = ["mode"];
var capitalized = function capitalized(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
var createElementComponent = function createElementComponent(type, isServer) {
	var displayName = "".concat(capitalized(type), "Element");
	var Element = isServer ? function ServerElement(props) {
		useElementsOrCheckoutSdkContextWithUseCase("mounts <".concat(displayName, ">"));
		var id = props.id, className = props.className;
		return /*#__PURE__*/ import_react.createElement("div", {
			id,
			className
		});
	} : function ClientElement(_ref) {
		var id = _ref.id, className = _ref.className, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, onBlur = _ref.onBlur, onFocus = _ref.onFocus, onReady = _ref.onReady, onChange = _ref.onChange, onEscape = _ref.onEscape, onClick = _ref.onClick, onLoadError = _ref.onLoadError, onLoaderStart = _ref.onLoaderStart, onNetworksChange = _ref.onNetworksChange, onConfirm = _ref.onConfirm, onCancel = _ref.onCancel, onShippingAddressChange = _ref.onShippingAddressChange, onShippingRateChange = _ref.onShippingRateChange, onSavedPaymentMethodRemove = _ref.onSavedPaymentMethodRemove, onSavedPaymentMethodUpdate = _ref.onSavedPaymentMethodUpdate;
		var ctx = useElementsOrCheckoutSdkContextWithUseCase("mounts <".concat(displayName, ">"));
		var elements = "elements" in ctx ? ctx.elements : null;
		var checkoutSdk = "checkoutSdk" in ctx ? ctx.checkoutSdk : null;
		var _React$useState2 = _slicedToArray(import_react.useState(null), 2), element = _React$useState2[0], setElement = _React$useState2[1];
		var elementRef = import_react.useRef(null);
		var domNode = import_react.useRef(null);
		useAttachEvent(element, "blur", onBlur);
		useAttachEvent(element, "focus", onFocus);
		useAttachEvent(element, "escape", onEscape);
		useAttachEvent(element, "click", onClick);
		useAttachEvent(element, "loaderror", onLoadError);
		useAttachEvent(element, "loaderstart", onLoaderStart);
		useAttachEvent(element, "networkschange", onNetworksChange);
		useAttachEvent(element, "confirm", onConfirm);
		useAttachEvent(element, "cancel", onCancel);
		useAttachEvent(element, "shippingaddresschange", onShippingAddressChange);
		useAttachEvent(element, "shippingratechange", onShippingRateChange);
		useAttachEvent(element, "savedpaymentmethodremove", onSavedPaymentMethodRemove);
		useAttachEvent(element, "savedpaymentmethodupdate", onSavedPaymentMethodUpdate);
		useAttachEvent(element, "change", onChange);
		var readyCallback;
		if (onReady) if (type === "expressCheckout") readyCallback = onReady;
		else readyCallback = function readyCallback() {
			onReady(element);
		};
		useAttachEvent(element, "ready", readyCallback);
		import_react.useLayoutEffect(function() {
			if (elementRef.current === null && domNode.current !== null && (elements || checkoutSdk)) {
				var newElement = null;
				if (checkoutSdk) switch (type) {
					case "payment":
						newElement = checkoutSdk.createPaymentElement(options);
						break;
					case "address":
						if ("mode" in options) {
							var mode = options.mode, restOptions = _objectWithoutProperties(options, _excluded);
							if (mode === "shipping") newElement = checkoutSdk.createShippingAddressElement(restOptions);
							else if (mode === "billing") newElement = checkoutSdk.createBillingAddressElement(restOptions);
							else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
						} else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
						break;
					case "expressCheckout":
						newElement = checkoutSdk.createExpressCheckoutElement(options);
						break;
					case "currencySelector":
						newElement = checkoutSdk.createCurrencySelectorElement();
						break;
					case "taxId":
						newElement = checkoutSdk.createTaxIdElement(options);
						break;
					default: throw new Error("Invalid Element type ".concat(displayName, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."));
				}
				else if (elements) newElement = elements.create(type, options);
				elementRef.current = newElement;
				setElement(newElement);
				if (newElement) newElement.mount(domNode.current);
			}
		}, [
			elements,
			checkoutSdk,
			options
		]);
		var prevOptions = usePrevious(options);
		import_react.useEffect(function() {
			if (!elementRef.current) return;
			var updates = extractAllowedOptionsUpdates(options, prevOptions, ["paymentRequest"]);
			if (updates && "update" in elementRef.current) elementRef.current.update(updates);
		}, [options, prevOptions]);
		import_react.useLayoutEffect(function() {
			return function() {
				if (elementRef.current && typeof elementRef.current.destroy === "function") try {
					elementRef.current.destroy();
					elementRef.current = null;
				} catch (error) {}
			};
		}, []);
		return /*#__PURE__*/ import_react.createElement("div", {
			id,
			className,
			ref: domNode
		});
	};
	Element.propTypes = {
		id: import_prop_types.default.string,
		className: import_prop_types.default.string,
		onChange: import_prop_types.default.func,
		onBlur: import_prop_types.default.func,
		onFocus: import_prop_types.default.func,
		onReady: import_prop_types.default.func,
		onEscape: import_prop_types.default.func,
		onClick: import_prop_types.default.func,
		onLoadError: import_prop_types.default.func,
		onLoaderStart: import_prop_types.default.func,
		onNetworksChange: import_prop_types.default.func,
		onConfirm: import_prop_types.default.func,
		onCancel: import_prop_types.default.func,
		onShippingAddressChange: import_prop_types.default.func,
		onShippingRateChange: import_prop_types.default.func,
		onSavedPaymentMethodRemove: import_prop_types.default.func,
		onSavedPaymentMethodUpdate: import_prop_types.default.func,
		options: import_prop_types.default.object
	};
	Element.displayName = displayName;
	Element.__elementType = type;
	return Element;
};
var isServer = typeof window === "undefined";
var EmbeddedCheckoutContext = /*#__PURE__*/ import_react.createContext(null);
EmbeddedCheckoutContext.displayName = "EmbeddedCheckoutProviderContext";
/**
* @docs https://stripe.com/docs/stripe-js/react#usestripe-hook
*/
var useStripe = function useStripe() {
	return useElementsOrCheckoutSdkContextWithUseCase("calls useStripe()").stripe;
};
createElementComponent("auBankAccount", isServer);
createElementComponent("card", isServer);
createElementComponent("cardNumber", isServer);
createElementComponent("cardExpiry", isServer);
createElementComponent("cardCvc", isServer);
createElementComponent("fpxBank", isServer);
createElementComponent("iban", isServer);
createElementComponent("idealBank", isServer);
createElementComponent("p24Bank", isServer);
createElementComponent("epsBank", isServer);
var PaymentElement = createElementComponent("payment", isServer);
createElementComponent("expressCheckout", isServer);
createElementComponent("currencySelector", isServer);
createElementComponent("paymentRequestButton", isServer);
createElementComponent("linkAuthentication", isServer);
createElementComponent("address", isServer);
createElementComponent("shippingAddress", isServer);
createElementComponent("paymentMethodMessaging", isServer);
createElementComponent("affirmMessage", isServer);
createElementComponent("afterpayClearpayMessage", isServer);
createElementComponent("taxId", isServer);
//#endregion
export { useStripe as i, PaymentElement as n, useElements as r, Elements as t };
