import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", () => setOpen(false));
    return unsub;
  }, [router]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/#categories", label: "Categories" },
    { to: "/orders", label: "My Orders" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-md border-border" : "bg-background border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">M</span>
          <span>MONO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              onClick={(e) => {
                if (!l.to.includes("#")) {
                  e.preventDefault();
                  navigate({ to: l.to });
                }
              }}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/cart" className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-muted text-sm font-semibold hover:bg-secondary transition-colors">
                  {user?.firstName?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/orders" })}>Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/" }); }}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm"><Link to="/login">Login</Link></Button>
              <Button asChild size="sm"><Link to="/register">Register</Link></Button>
            </div>
          )}

          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="container-page py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => {
                  if (!l.to.includes("#")) { e.preventDefault(); navigate({ to: l.to }); }
                }}
                className="py-2.5 text-sm font-medium hover:text-foreground text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 border-t pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" onClick={() => navigate({ to: "/profile" })}>Profile</Button>
                  <Button variant="ghost" onClick={() => { logout(); navigate({ to: "/" }); }}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild><Link to="/login">Login</Link></Button>
                  <Button asChild><Link to="/register">Register</Link></Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
