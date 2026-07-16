import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useProtected } from "@/hooks/useProtected";
import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { fmt, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Loader, EmptyState } from "@/components/Loader";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const STAGES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

function StatusBar({ status }: { status: string }) {
  if (status === "Cancelled") {
    return <span className="inline-flex items-center gap-1.5 text-xs text-destructive"><span className="h-2 w-2 rounded-full bg-destructive" />Cancelled</span>;
  }
  const idx = STAGES.indexOf(status);
  return (
    <div className="mt-3">
      <div className="flex gap-1">
        {STAGES.map((s, i) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${i <= idx ? "bg-foreground" : "bg-muted"}`} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        {STAGES.map((s) => <span key={s} className={s === status ? "text-foreground font-semibold" : ""}>{s}</span>)}
      </div>
    </div>
  );
}

function OrdersPage() {
  const { isAuthenticated } = useProtected();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ orders: any[]; total: number } | null>(null);
  const pageSize = 5;

  useEffect(() => {
    if (!isAuthenticated) return;
    setData(null);
    orderService.list({ page, pageSize }).then(setData);
  }, [page, isAuthenticated]);

  if (!isAuthenticated) return null;

  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;

  return (
    <Layout>
      <div className="container-page py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">History</p>
        <h1 className="mt-2 text-4xl font-display font-semibold">My Orders</h1>

        <div className="mt-10">
          {!data ? (
            <Loader label="Loading orders..." />
          ) : data.orders.length === 0 ? (
            <EmptyState title="No orders yet" description="Your future orders will show up here." />
          ) : (
            <div className="space-y-4">
              {data.orders.map((o) => (
                <div key={o.id} className="rounded-xl border bg-card p-5 shadow-card">
                  <div className="flex flex-wrap gap-3 justify-between items-start">
                    <div>
                      <p className="text-xs text-muted-foreground">{o.id}</p>
                      <p className="mt-1 font-display text-lg font-semibold">{formatDate(o.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold">{fmt(o.total)}</p>
                    </div>
                  </div>
                  <StatusBar status={o.status} />
                </div>
              ))}
            </div>
          )}

          {data && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
