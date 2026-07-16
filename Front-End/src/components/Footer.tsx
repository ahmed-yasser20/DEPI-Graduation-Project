import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/40 mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">M</span>
            MONO
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Considered objects for everyday life. Curated with restraint, built to last.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/orders" className="hover:text-foreground">My Orders</Link></li>
            <li><Link to="/profile" className="hover:text-foreground">Profile</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Contact</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>hello@mono.shop</li>
            <li>+1 (555) 010-2044</li>
            <li>Mon–Fri, 9am–6pm</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Follow</h4>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border hover:bg-background transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page py-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} MONO. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
