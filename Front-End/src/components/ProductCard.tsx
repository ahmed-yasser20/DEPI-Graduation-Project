import { Button } from "@/components/ui/button";
import { fmt } from "@/lib/format";
import { Eye, Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId?: number;
  stock: number;
  image: string;
  description: string;
}

export function ProductCard({
  product,
  onView,
  onAdd,
}: {
  product: Product;
  onView: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const out = product.stock === 0;
  const low = product.stock > 0 && product.stock <= 5;

  return (
    <article className="group relative flex flex-col rounded-xl border bg-card overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
      <button
        onClick={() => onView(product)}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {out && (
          <span className="absolute top-3 left-3 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
            Sold out
          </span>
        )}
        {low && (
          <span className="absolute top-3 left-3 rounded-full bg-warning text-warning-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
            Only {product.stock} left
          </span>
        )}
      </button>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium leading-tight">{product.name}</h3>
          <p className="font-semibold shrink-0">{fmt(product.price)}</p>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-3 flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            disabled={out}
            onClick={() => onAdd(product)}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
          <Button size="sm" variant="outline" onClick={() => onView(product)}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
