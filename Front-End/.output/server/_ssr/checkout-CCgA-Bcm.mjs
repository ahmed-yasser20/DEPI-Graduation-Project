import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as useCart } from "./CartContext-Cz5mJ62N.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as CreditCard, k as ArrowLeft, l as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as Layout, t as Button } from "./Layout-C3A53Im-.mjs";
import { t as fmt } from "./format-fiqzbY4k.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useProtected } from "./useProtected-CEQd-vqh.mjs";
import { t as orderService } from "./orderService-CHn_Slt1.mjs";
import { i as useStripe, n as PaymentElement, r as useElements, t as Elements } from "../_libs/@stripe/react-stripe-js+[...].mjs";
import { t as loadStripe } from "../_libs/stripe__stripe-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-CCgA-Bcm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var stripePromise = loadStripe("pk_test_51TqNZNJpq8srZ0KlmlMdli1UPVR70Y7R3donvXMKPu2LspINXdHbV5863XT1gAFqNKxWhXf83cIkKClBox8tO2ih0094gYRChQ");
function StripeCheckoutForm({ onSuccess, onFailure }) {
	const stripe = useStripe();
	const elements = useElements();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const submit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setBusy(true);
		setError(null);
		const { error: submitError } = await elements.submit();
		if (submitError) {
			setError(submitError.message || "Please check your payment details.");
			setBusy(false);
			return;
		}
		const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required"
		});
		setBusy(false);
		if (confirmError) {
			onFailure(confirmError.message || "Payment failed.");
			return;
		}
		if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") onSuccess();
		else onFailure("Payment was not completed.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentElement, {}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				size: "lg",
				disabled: !stripe || busy,
				children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }), "Processing…"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }), "Pay now"] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1.5 text-xs text-muted-foreground justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Secure Stripe checkout"]
			})
		]
	});
}
function CheckoutPage() {
	const { isAuthenticated } = useProtected();
	const { items, buyNow, subtotal, clear, setBuyNow } = useCart();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [clientSecret, setClientSecret] = (0, import_react.useState)(null);
	if (!isAuthenticated) return null;
	const lineItems = buyNow ? [buyNow] : items;
	const sub = buyNow ? buyNow.price * buyNow.quantity : subtotal;
	const shipping = sub > 100 ? 0 : 12;
	const tax = Math.round(sub * .08 * 100) / 100;
	const total = sub + shipping + tax;
	if (lineItems.length === 0 && !clientSecret) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Nothing to check out"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-6",
			onClick: () => navigate({ to: "/" }),
			children: "Continue shopping"
		})]
	}) });
	const startPayment = async () => {
		setBusy(true);
		try {
			const result = buyNow ? await orderService.create([{
				productId: Number(buyNow.id),
				quantity: buyNow.quantity
			}]) : await orderService.createFromCart();
			setClientSecret(result.clientSecret);
		} catch (err) {
			toast.error(err.message || "Couldn't start checkout");
		} finally {
			setBusy(false);
		}
	};
	const handleSuccess = async () => {
		if (!buyNow) await clear();
		setBuyNow(null);
		navigate({ to: "/payment-success" });
	};
	const handleFailure = (message) => {
		toast.error(message);
		navigate({ to: "/payment-failed" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => navigate({ to: buyNow ? "/" : "/cart" }),
				className: "text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
					" Back to ",
					buyNow ? "shop" : "cart"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: "Review"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-display font-semibold",
				children: "Checkout Summary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid md:grid-cols-[1fr_360px] gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border bg-card divide-y",
					children: lineItems.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex gap-4 items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-md overflow-hidden bg-muted shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: it.image,
									alt: it.name,
									className: "h-full w-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium truncate",
									children: it.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										"Qty ",
										it.quantity,
										" · ",
										fmt(it.price)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: fmt(it.price * it.quantity)
							})
						]
					}, it.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border bg-card p-6 shadow-card h-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Order total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Subtotal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmt(sub) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Shipping"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: shipping === 0 ? "Free" : fmt(shipping) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Tax"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmt(tax) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t pt-3 flex justify-between text-base font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Grand total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmt(total) })]
								})
							]
						}),
						!clientSecret ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full",
							size: "lg",
							onClick: startPayment,
							disabled: busy,
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }), "Preparing…"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }), "Continue to Payment"] })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Elements, {
								stripe: stripePromise,
								options: { clientSecret },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StripeCheckoutForm, {
									onSuccess: handleSuccess,
									onFailure: handleFailure
								})
							})
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { CheckoutPage as component };
