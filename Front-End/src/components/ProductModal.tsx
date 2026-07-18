import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fmt } from "@/lib/format";
import { Minus, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "./ProductCard";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function ProductModal({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [qty, setQty] = useState(1);
  const { add, setBuyNow } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => setQty(1), [product?.id]);

  if (!product) return null;
  const out = product.stock === 0;

  const handleAdd = async () => {
    try {
      await add(product, qty);
      toast.success(`${product.name} added to cart`);
      onOpenChange(false);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't add to cart");
    }
  };

  const handleOrderNow = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to continue");
      navigate({ to: "/login" });
      return;
    }
    setBuyNow({ ...product, quantity: qty });
    onOpenChange(false);
    navigate({ to: "/checkout" });
  };

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0">
        <div className="grid md:grid-cols-2">
          <div className="aspect-square md:aspect-auto bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {product.category}
            </span>
            <h2 className="mt-2 text-2xl font-display font-semibold">{product.name}</h2>
            <p className="mt-1 text-2xl font-semibold">{fmt(product.price)}</p>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium text-foreground">
                {product.ratingCount ? product.averageRating.toFixed(1) : "New"}
              </span>
              {product.ratingCount > 0 && (
                <span>
                  from {product.ratingCount} rating{product.ratingCount === 1 ? "" : "s"}
                </span>
              )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${out ? "bg-destructive" : "bg-success"}`} />
              <span className={out ? "text-destructive" : "text-muted-foreground"}>
                {out ? "Out of stock" : `${product.stock} in stock`}
              </span>
            </div>

            {!out && (
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <div className="inline-flex items-center rounded-md border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-muted"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" disabled={out} onClick={handleAdd}>
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1" disabled={out} onClick={handleOrderNow}>
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
