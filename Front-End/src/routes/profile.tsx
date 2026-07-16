import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProtected } from "@/hooks/useProtected";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { orderService, type FrontendOrder } from "@/services/orderService";
import { fmt, formatDate } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { isAuthenticated } = useProtected();
  const { user, updateProfile } = useAuth();
  const { items, subtotal } = useCart();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", city: "", street: "", building: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<FrontendOrder[]>([]);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || "",
        city: user.city || "",
        street: user.street || "",
        building: user.building || "",
      });
    }
  }, [user]);

  useEffect(() => {
    orderService.list({ page: 1, pageSize: 3 }).then((r) => setOrders(r.orders)).catch(() => {});
  }, []);

  if (!isAuthenticated || !user) return null;

  const save = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success("Profile updated");
      setEditing(false);
    } catch (err: any) {
      toast.error(err.message || "Couldn't update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="container-page py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
        <h1 className="mt-2 text-4xl font-display font-semibold">Profile</h1>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">Personal Information</h2>
              <Button variant={editing ? "default" : "outline"} size="sm" onClick={editing ? save : () => setEditing(true)} disabled={saving}>
                {saving ? "Saving..." : editing ? "Save" : "Edit"}
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>First name</Label>
                <Input value={form.firstName} disabled={!editing} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Last name</Label>
                <Input value={form.lastName} disabled={!editing} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label>Email</Label>
                <Input value={user.email} disabled className="mt-1.5" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={form.phone} disabled={!editing} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>City</Label>
                <Input value={form.city} disabled={!editing} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Street</Label>
                <Input value={form.street} disabled={!editing} onChange={(e) => setForm({ ...form, street: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Building</Label>
                <Input value={form.building} disabled={!editing} onChange={(e) => setForm({ ...form, building: e.target.value })} className="mt-1.5" />
              </div>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-6">
            <h2 className="font-display text-xl font-semibold">Current cart</h2>
            {items.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No items yet.</p>
            ) : (
              <>
                <p className="mt-4 text-sm text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""}</p>
                <p className="mt-1 text-2xl font-semibold">{fmt(subtotal)}</p>
                <Button asChild className="mt-4 w-full" size="sm"><Link to="/cart">View cart</Link></Button>
              </>
            )}
          </section>

          <section className="lg:col-span-3 rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Recent orders</h2>
              <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {orders.map((o) => (
                <div key={o.id} className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">{o.id}</p>
                  <p className="mt-1 font-medium">{fmt(o.total)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(o.date)} · {o.status}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
