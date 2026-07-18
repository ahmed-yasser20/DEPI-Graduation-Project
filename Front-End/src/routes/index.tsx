import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/Layout";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Filters, type FilterState } from "@/components/Filters";
import { EmptyState, ProductSkeleton } from "@/components/Loader";
import { productService, type Category } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({ component: Home });

// Rounds a raw max price up to a clean slider bound (e.g. 289 -> 300, 1450 -> 1500).
function roundUpToNiceMax(n: number) {
  if (n <= 0) return 100;
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)) - 1);
  return Math.ceil(n / magnitude) * magnitude;
}

function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const { add } = useCart();
  const gridRef = useRef<HTMLDivElement>(null);
  const priceRangeInitialized = useRef(false);

  const [filters, setFilters] = useState<FilterState>({
    category: null,
    price: [0, 300],
    inStockOnly: false,
    minRating: 0,
    sort: "featured",
  });

  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 300;
    return roundUpToNiceMax(Math.max(...products.map((p) => p.price)));
  }, [products]);

  useEffect(() => {
    productService.list().then(setProducts).catch(() => {
      toast.error("Couldn't load products");
      setProducts([]);
    });
    productService.categories().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Once we know the real max price, expand the slider's default range to match -
  // but only the first time, so we don't clobber a range the user already adjusted.
  useEffect(() => {
    if (!priceRangeInitialized.current && products && products.length > 0) {
      priceRangeInitialized.current = true;
      setFilters((f) => ({ ...f, price: [0, maxPrice] }));
    }
  }, [products, maxPrice]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = [...products];
    if (filters.category) list = list.filter((p) => p.categoryId === filters.category);
    list = list.filter((p) => p.price >= filters.price[0] && p.price <= filters.price[1]);
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);
    if (filters.minRating > 0) list = list.filter((p) => p.averageRating >= filters.minRating);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating-desc")
      list.sort((a, b) => b.averageRating - a.averageRating || b.ratingCount - a.ratingCount);
    return list;
  }, [products, filters, query]);

  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleAdd = async (prod: Product) => {
    try {
      await add(prod);
      toast.success(`${prod.name} added to cart`);
    } catch (err: any) {
      toast.error(err.message || "Couldn't add to cart");
    }
  };

  return (
    <Layout>
      <HeroBanner onShopNow={scrollToGrid} />

      {/* Categories */}
      <section id="categories" className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop by</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-display font-semibold">Categories</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => {
            const active = filters.category === c.categoryId;
            return (
              <button
                key={c.id}
                onClick={() => { setFilters({ ...filters, category: active ? null : c.categoryId }); scrollToGrid(); }}
                className={`group relative aspect-[4/5] rounded-xl border overflow-hidden text-left transition-all hover:shadow-elevated ${active ? "border-foreground" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary transition-transform duration-500 group-hover:scale-105" />
                <div className="relative h-full p-5 flex flex-col justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.blurb}</span>
                  <span className="font-display text-2xl font-semibold">{c.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section ref={gridRef} className="container-page pb-24 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-display font-semibold">Products</h2>
          </div>
          <div className="sm:ml-auto flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-9"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6">
                <SheetTitle className="mb-6">Filters</SheetTitle>
                <Filters value={filters} onChange={setFilters} categories={categories} maxPrice={maxPrice} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <div className="hidden lg:block">
            <Filters value={filters} onChange={setFilters} categories={categories} maxPrice={maxPrice} />
          </div>

          <div>
            {products === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No products match"
                description="Try changing your filters or clearing the search."
                action={<Button variant="outline" onClick={() => { setQuery(""); setFilters({ category: null, price: [0, maxPrice], inStockOnly: false, minRating: 0, sort: "featured" }); }}>Reset filters</Button>}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onView={setSelected}
                    onAdd={handleAdd}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductModal product={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </Layout>
  );
}
