import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useAuth, i as productService, o as useCart } from "./CartContext-Cz5mJ62N.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Check, O as ArrowRight, a as Star, d as Plus, p as Minus, s as SlidersHorizontal, t as X, u as Search, y as Eye } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as Layout, r as cn, t as Button } from "./Layout-C3A53Im-.mjs";
import { n as DialogContent$1, t as Dialog$1 } from "./dialog-DFHGMijv.mjs";
import { t as Input } from "./input-D7kBNgzb.mjs";
import { r as ProductSkeleton, t as EmptyState } from "./Loader-D_A2IhVE.mjs";
import { t as fmt } from "./format-fiqzbY4k.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B0s1IBpB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-DwbcyS9f.jpg";
function HeroBanner({ onShopNow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden border-b",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fade-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground",
						children: "New Season · 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]",
						children: [
							"Considered",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"things,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic font-normal text-muted-foreground",
								children: "everyday."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-base text-muted-foreground leading-relaxed",
						children: "A tightly edited collection of objects, apparel, and tools — chosen for how they look, how they feel, and how they age."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: onShopNow,
							className: "group",
							children: ["Shop Now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#categories",
								children: "Browse Categories"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex items-center gap-8 text-xs uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-display text-foreground",
								children: "240+"
							}), "products"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-display text-foreground",
								children: "30k"
							}), "customers"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-display text-foreground",
								children: "4.9"
							}), "rating"] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[4/5] lg:aspect-[5/6] rounded-2xl overflow-hidden bg-muted shadow-elevated",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: "Featured products",
					className: "h-full w-full object-cover",
					width: 1600,
					height: 900
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-6 left-6 right-6 rounded-xl bg-background/90 backdrop-blur p-5 border shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Editor's Pick"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-xl",
						children: "The Winter Edit"
					})]
				})]
			})]
		})
	});
}
function ProductCard({ product, onView, onAdd }) {
	const out = product.stock === 0;
	const low = product.stock > 0 && product.stock <= 5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative flex flex-col rounded-xl border bg-card overflow-hidden shadow-card hover:shadow-hover transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => onView(product),
			className: "relative aspect-square overflow-hidden bg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}),
				out && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-3 left-3 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1",
					children: "Sold out"
				}),
				low && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute top-3 left-3 rounded-full bg-warning text-warning-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1",
					children: [
						"Only ",
						product.stock,
						" left"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 flex flex-col gap-2 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium leading-tight",
						children: product.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold shrink-0",
						children: fmt(product.price)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground line-clamp-2",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs text-muted-foreground",
					"aria-label": `${product.averageRating.toFixed(1)} out of 5 stars from ${product.ratingCount} ratings`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: product.ratingCount ? product.averageRating.toFixed(1) : "New"
						}),
						product.ratingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"(",
							product.ratingCount,
							")"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto pt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "flex-1",
						disabled: out,
						onClick: () => onAdd(product),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => onView(product),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
					})]
				})
			]
		})]
	});
}
function ProductModal({ product, onOpenChange }) {
	const [qty, setQty] = (0, import_react.useState)(1);
	const { add, setBuyNow } = useCart();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => setQty(1), [product?.id]);
	if (!product) return null;
	const out = product.stock === 0;
	const handleAdd = async () => {
		try {
			await add(product, qty);
			toast.success(`${product.name} added to cart`);
			onOpenChange(false);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Couldn't add to cart");
		}
	};
	const handleOrderNow = () => {
		if (!isAuthenticated) {
			toast.info("Please log in to continue");
			navigate({ to: "/login" });
			return;
		}
		setBuyNow({
			...product,
			quantity: qty
		});
		onOpenChange(false);
		navigate({ to: "/checkout" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open: !!product,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
			className: "max-w-3xl p-0 overflow-hidden gap-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-square md:aspect-auto bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.name,
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 md:p-8 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: product.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl font-display font-semibold",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-2xl font-semibold",
							children: fmt(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-1.5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: product.ratingCount ? product.averageRating.toFixed(1) : "New"
								}),
								product.ratingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"from ",
									product.ratingCount,
									" rating",
									product.ratingCount === 1 ? "" : "s"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground leading-relaxed",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${out ? "bg-destructive" : "bg-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: out ? "text-destructive" : "text-muted-foreground",
								children: out ? "Out of stock" : `${product.stock} in stock`
							})]
						}),
						!out && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Quantity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center rounded-md border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										className: "p-2 hover:bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-center text-sm font-medium",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.min(product.stock, q + 1)),
										className: "p-2 hover:bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-8 flex flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								disabled: out,
								onClick: handleAdd,
								children: "Add to Cart"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "flex-1",
								disabled: out,
								onClick: handleOrderNow,
								children: "Order Now"
							})]
						})
					]
				})]
			})
		})
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function Filters({ value, onChange, categories, maxPrice = 300 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "sticky top-24 space-y-8 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-3 font-semibold uppercase tracking-widest text-xs",
				children: "Category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onChange({
						...value,
						category: null
					}),
					className: `block w-full text-left py-1.5 px-2 rounded-md hover:bg-muted transition-colors ${!value.category ? "bg-muted font-medium" : "text-muted-foreground"}`,
					children: "All"
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onChange({
						...value,
						category: c.categoryId
					}),
					className: `block w-full text-left py-1.5 px-2 rounded-md hover:bg-muted transition-colors ${value.category === c.categoryId ? "bg-muted font-medium" : "text-muted-foreground"}`,
					children: c.name
				}, c.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3 font-semibold uppercase tracking-widest text-xs",
					children: "Price"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					min: 0,
					max: maxPrice,
					step: Math.max(1, Math.round(maxPrice / 60)),
					value: value.price,
					onValueChange: (v) => onChange({
						...value,
						price: [v[0], v[1]]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", value.price[0]] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", value.price[1]] })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-3 font-semibold uppercase tracking-widest text-xs",
				children: "Availability"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: value.inStockOnly,
					onCheckedChange: (v) => onChange({
						...value,
						inStockOnly: !!v
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In stock only" })]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-3 font-semibold uppercase tracking-widest text-xs",
				children: "Sort"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: [
					{
						v: "featured",
						l: "Featured"
					},
					{
						v: "price-asc",
						l: "Price: Low to High"
					},
					{
						v: "price-desc",
						l: "Price: High to Low"
					}
				].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: "sort",
						checked: value.sort === o.v,
						onChange: () => onChange({
							...value,
							sort: o.v
						}),
						className: "accent-foreground"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: o.l
					})]
				}, o.v))
			})] })
		]
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function roundUpToNiceMax(n) {
	if (n <= 0) return 100;
	const magnitude = Math.pow(10, Math.floor(Math.log10(n)) - 1);
	return Math.ceil(n / magnitude) * magnitude;
}
function Home() {
	const [products, setProducts] = (0, import_react.useState)(null);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const { add } = useCart();
	const gridRef = (0, import_react.useRef)(null);
	const priceRangeInitialized = (0, import_react.useRef)(false);
	const [filters, setFilters] = (0, import_react.useState)({
		category: null,
		price: [0, 300],
		inStockOnly: false,
		sort: "featured"
	});
	const maxPrice = (0, import_react.useMemo)(() => {
		if (!products || products.length === 0) return 300;
		return roundUpToNiceMax(Math.max(...products.map((p) => p.price)));
	}, [products]);
	(0, import_react.useEffect)(() => {
		productService.list().then(setProducts).catch(() => {
			toast.error("Couldn't load products");
			setProducts([]);
		});
		productService.categories().then(setCategories).catch(() => setCategories([]));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!priceRangeInitialized.current && products && products.length > 0) {
			priceRangeInitialized.current = true;
			setFilters((f) => ({
				...f,
				price: [0, maxPrice]
			}));
		}
	}, [products, maxPrice]);
	const filtered = (0, import_react.useMemo)(() => {
		if (!products) return [];
		let list = [...products];
		if (filters.category) list = list.filter((p) => p.categoryId === filters.category);
		list = list.filter((p) => p.price >= filters.price[0] && p.price <= filters.price[1]);
		if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);
		if (query.trim()) {
			const q = query.toLowerCase();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
		}
		if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
		if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
		return list;
	}, [
		products,
		filters,
		query
	]);
	const scrollToGrid = () => gridRef.current?.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
	const handleAdd = async (prod) => {
		try {
			await add(prod);
			toast.success(`${prod.name} added to cart`);
		} catch (err) {
			toast.error(err.message || "Couldn't add to cart");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroBanner, { onShopNow: scrollToGrid }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "categories",
			className: "container-page py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end justify-between mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
					children: "Shop by"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-3xl sm:text-4xl font-display font-semibold",
					children: "Categories"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
				children: categories.map((c) => {
					const active = filters.category === c.categoryId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setFilters({
								...filters,
								category: active ? null : c.categoryId
							});
							scrollToGrid();
						},
						className: `group relative aspect-[4/5] rounded-xl border overflow-hidden text-left transition-all hover:shadow-elevated ${active ? "border-foreground" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-muted to-secondary transition-transform duration-500 group-hover:scale-105" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-full p-5 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: c.blurb
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-semibold",
								children: c.name
							})]
						})]
					}, c.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			ref: gridRef,
			className: "container-page pb-24 scroll-mt-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center gap-3 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
					children: "Featured"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-3xl sm:text-4xl font-display font-semibold",
					children: "Products"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:ml-auto flex items-center gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search products...",
							className: "pl-9"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							className: "lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "left",
						className: "w-80 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "mb-6",
							children: "Filters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
							value: filters,
							onChange: setFilters,
							categories,
							maxPrice
						})]
					})] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[220px_1fr] gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
						value: filters,
						onChange: setFilters,
						categories,
						maxPrice
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: products === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSkeleton, {}, i))
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No products match",
					description: "Try changing your filters or clearing the search.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							setQuery("");
							setFilters({
								category: null,
								price: [0, maxPrice],
								inStockOnly: false,
								sort: "featured"
							});
						},
						children: "Reset filters"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
					children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						onView: setSelected,
						onAdd: handleAdd
					}, p.id))
				}) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModal, {
			product: selected,
			onOpenChange: (o) => !o && setSelected(null)
		})
	] });
}
//#endregion
export { Home as component };
