import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { fmt } from "@/lib/format";
import { Minus, Plus, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/Loader";
import { useProtected } from "@/hooks/useProtected";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { isAuthenticated } = useProtected();
  const { items, setQty, remove, subtotal, setBuyNow, loading } = useCart();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 12) : 0;

  const handleQty = async (id: string, qty: number) => {
    try {
      await setQty(id, qty);
    } catch (err: any) {
      toast.error(err.message || "Couldn't update quantity");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await remove(id);
    } catch (err: any) {
      toast.error(err.message || "Couldn't remove item");
    }
  };

  return (
    <Layout>
      <div className="container-page py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your bag</p>
        <h1 className="mt-2 text-4xl font-display font-semibold">Cart</h1>

        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title={loading ? "Loading your cart..." : "Your cart is empty"}
              description="Add a few things you love — they'll appear here."
              action={<Button asChild><Link to="/">Continue shopping</Link></Button>}
            />
          </div>
        ) : (
          <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
            <ul className="divide-y rounded-xl border bg-card">
              {items.map((it) => (
                <li key={it.id} className="p-4 sm:p-5 flex gap-4">
                  <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{it.name}</h3>
                        <p className="text-sm text-muted-foreground">{fmt(it.price)} each</p>
                      </div>
                      <button onClick={() => handleRemove(it.id)} className="text-muted-foreground hover:text-destructive p-1" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-md border">
                        <button onClick={() => handleQty(it.id, it.quantity - 1)} className="p-2 hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-10 text-center text-sm font-medium">{it.quantity}</span>
                        <button onClick={() => handleQty(it.id, it.quantity + 1)} className="p-2 hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <p className="font-semibold">{fmt(it.price * it.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-24 h-fit rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold">Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{fmt(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : fmt(shipping)}</dd></div>
                <div className="border-t pt-3 flex justify-between text-base font-semibold"><dt>Total</dt><dd>{fmt(subtotal + shipping)}</dd></div>
              </dl>
              <div className="mt-6">
                <Button className="w-full" size="lg" onClick={() => { setBuyNow(null); navigate({ to: "/checkout" }); }}>
                  Proceed to Checkout
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground text-center">Free shipping on orders over $100</p>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}
