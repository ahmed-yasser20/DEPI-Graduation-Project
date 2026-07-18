import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import type { Category } from "@/services/productService";

export interface FilterState {
  category: number | null;
  price: [number, number];
  inStockOnly: boolean;
  minRating: number;
  sort: "featured" | "price-asc" | "price-desc" | "rating-desc";
}

export function Filters({ value, onChange, categories, maxPrice = 300 }: { value: FilterState; onChange: (f: FilterState) => void; categories: Category[]; maxPrice?: number }) {
  return (
    <aside className="sticky top-24 space-y-8 text-sm">
      <div>
        <h4 className="mb-3 font-semibold uppercase tracking-widest text-xs">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => onChange({ ...value, category: null })}
            className={`block w-full text-left py-1.5 px-2 rounded-md hover:bg-muted transition-colors ${!value.category ? "bg-muted font-medium" : "text-muted-foreground"}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onChange({ ...value, category: c.categoryId })}
              className={`block w-full text-left py-1.5 px-2 rounded-md hover:bg-muted transition-colors ${value.category === c.categoryId ? "bg-muted font-medium" : "text-muted-foreground"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-semibold uppercase tracking-widest text-xs">Price</h4>
        <Slider
          min={0}
          max={maxPrice}
          step={Math.max(1, Math.round(maxPrice / 60))}
          value={value.price}
          onValueChange={(v) => onChange({ ...value, price: [v[0], v[1]] as [number, number] })}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>${value.price[0]}</span>
          <span>${value.price[1]}</span>
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-semibold uppercase tracking-widest text-xs">Availability</h4>
        <label className="flex items-center gap-2">
          <Checkbox checked={value.inStockOnly} onCheckedChange={(v) => onChange({ ...value, inStockOnly: !!v })} />
          <span>In stock only</span>
        </label>
      </div>

      <div>
        <h4 className="mb-3 font-semibold uppercase tracking-widest text-xs">Minimum rating</h4>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((n) =>
            n === 0 ? (
              <button
                key="any"
                onClick={() => onChange({ ...value, minRating: 0 })}
                className={`rounded-md px-2 py-1 text-xs transition-colors ${value.minRating === 0 ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"}`}
              >
                Any
              </button>
            ) : (
              <button
                key={n}
                onClick={() => onChange({ ...value, minRating: n })}
                aria-label={`${n} stars & up`}
                className={`rounded-md p-1 transition-colors hover:bg-muted ${value.minRating >= n ? "text-amber-500" : "text-muted-foreground"}`}
              >
                <Star className="h-4 w-4" fill={value.minRating >= n ? "currentColor" : "none"} />
              </button>
            ),
          )}
        </div>
        {value.minRating > 0 && (
          <p className="mt-1.5 text-xs text-muted-foreground">{value.minRating}+ stars</p>
        )}
      </div>

      <div>
        <h4 className="mb-3 font-semibold uppercase tracking-widest text-xs">Sort</h4>
        <div className="space-y-1">
          {[
            { v: "featured", l: "Featured" },
            { v: "price-asc", l: "Price: Low to High" },
            { v: "price-desc", l: "Price: High to Low" },
            { v: "rating-desc", l: "Top Rated" },
          ].map((o) => (
            <label key={o.v} className="flex items-center gap-2 py-1">
              <input
                type="radio"
                name="sort"
                checked={value.sort === o.v}
                onChange={() => onChange({ ...value, sort: o.v as FilterState["sort"] })}
                className="accent-foreground"
              />
              <span className="text-muted-foreground">{o.l}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
