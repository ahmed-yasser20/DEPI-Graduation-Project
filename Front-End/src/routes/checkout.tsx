import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { fmt } from "@/lib/format";
import { useProtected } from "@/hooks/useProtected";
import { useState } from "react";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { StripeCheckoutForm } from "@/components/StripeCheckoutForm";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const { isAuthenticated } = useProtected();
  const { items, buyNow, subtotal, clear, setBuyNow } = useCart();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  if (!isAuthenticated) return null;

  const lineItems = buyNow ? [buyNow] : items;
  const sub = buyNow ? buyNow.price * buyNow.quantity : subtotal;
  const shipping = sub > 100 ? 0 : 12;
  const tax = Math.round(sub * 0.08 * 100) / 100;
  const total = sub + shipping + tax;
  // Note: shipping/tax are calculated client-side for display only. The amount
  // Stripe actually charges is whatever your backend set on the PaymentIntent
  // when the order was created - make sure that matches, or drop the shipping/tax
  // display if your backend only charges the product subtotal.

  if (lineItems.length === 0 && !clientSecret) {
    return (
      <Layout>
        <div className="container-page py-24 text-center">
          <h1 className="font-display text-3xl">Nothing to check out</h1>
          <Button className="mt-6" onClick={() => navigate({ to: "/" })}>Continue shopping</Button>
        </div>
      </Layout>
    );
  }

  const startPayment = async () => {
    setBusy(true);
    try {
      const result = buyNow
        ? await orderService.create([{ productId: Number(buyNow.id), quantity: buyNow.quantity }])
        : await orderService.createFromCart();
      setClientSecret(result.clientSecret);
    } catch (err: any) {
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

  const handleFailure = (message: string) => {
    toast.error(message);
    navigate({ to: "/payment-failed" });
  };

  return (
    <Layout>
      <div className="container-page py-12 max-w-4xl">
        <button onClick={() => navigate({ to: buyNow ? "/" : "/cart" })} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back to {buyNow ? "shop" : "cart"}
        </button>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Review</p>
        <h1 className="mt-2 text-4xl font-display font-semibold">Checkout Summary</h1>

        <div className="mt-8 grid md:grid-cols-[1fr_360px] gap-8">
          <div className="rounded-xl border bg-card divide-y">
            {lineItems.map((it) => (
              <div key={it.id} className="p-4 flex gap-4 items-center">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-muted shrink-0">
                  <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{it.name}</p>
                  <p className="text-sm text-muted-foreground">Qty {it.quantity} · {fmt(it.price)}</p>
                </div>
                <p className="font-semibold">{fmt(it.price * it.quantity)}</p>
              </div>
            ))}
          </div>

          <aside className="rounded-xl border bg-card p-6 shadow-card h-fit">
            <h2 className="font-display text-xl font-semibold">Order total</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{fmt(sub)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : fmt(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>{fmt(tax)}</dd></div>
              <div className="border-t pt-3 flex justify-between text-base font-semibold"><dt>Grand total</dt><dd>{fmt(total)}</dd></div>
            </dl>

            {!clientSecret ? (
              <Button className="mt-6 w-full" size="lg" onClick={startPayment} disabled={busy}>
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                    Preparing…
                  </span>
                ) : (
                  <><CreditCard className="h-4 w-4" />Continue to Payment</>
                )}
              </Button>
            ) : (
              <div className="mt-6">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeCheckoutForm onSuccess={handleSuccess} onFailure={handleFailure} />
                </Elements>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
}
