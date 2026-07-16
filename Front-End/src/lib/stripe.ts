import { loadStripe } from "@stripe/stripe-js";

// Set VITE_STRIPE_PUBLISHABLE_KEY in your .env (see .env.example).
// This must be the publishable key (pk_...) that pairs with the secret key
// your backend's Stripe integration uses - they need to be from the same
// Stripe account/mode (test vs live) or PaymentIntent confirmation will fail.
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");
