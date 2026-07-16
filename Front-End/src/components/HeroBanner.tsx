import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { ArrowRight } from "lucide-react";

export function HeroBanner({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
        <div className="fade-in">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            New Season · 2026
          </span>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
            Considered<br />things,<br />
            <span className="italic font-normal text-muted-foreground">everyday.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
            A tightly edited collection of objects, apparel, and tools — chosen for how they look,
            how they feel, and how they age.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={onShopNow} className="group">
              Shop Now
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#categories">Browse Categories</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-8 text-xs uppercase tracking-widest text-muted-foreground">
            <div><div className="text-2xl font-display text-foreground">240+</div>products</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="text-2xl font-display text-foreground">30k</div>customers</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="text-2xl font-display text-foreground">4.9</div>rating</div>
          </div>
        </div>
        <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-2xl overflow-hidden bg-muted shadow-elevated">
          <img src={hero} alt="Featured products" className="h-full w-full object-cover" width={1600} height={900} />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-background/90 backdrop-blur p-5 border shadow-card">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Editor's Pick</p>
            <p className="mt-1 font-display text-xl">The Winter Edit</p>
          </div>
        </div>
      </div>
    </section>
  );
}
