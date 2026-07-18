import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useProtected } from "@/hooks/useProtected";
import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { fmt, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Loader, EmptyState } from "@/components/Loader";
import { StatusBadge } from "@/components/StatusBadge";
import { RatingDialog } from "@/components/RatingDialog";
import type { FrontendOrder } from "@/services/orderService";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const { isAuthenticated } = useProtected();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ orders: FrontendOrder[]; total: number } | null>(null);
  const [ratingProduct, setRatingProduct] = useState<{ id: number; name: string } | null>(null);
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
                      <p className="mt-1 font-display text-lg font-semibold">
                        {formatDate(o.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold">{fmt(o.total)}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="mt-5 border-t pt-4">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Order items
                    </p>
                    <div className="mt-3 divide-y">
                      {o.items.map((item) => (
                        <div
                          key={`${o.id}-${item.productId}`}
                          className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {item.quantity} × {fmt(item.unitPrice)}
                            </p>
                          </div>
                          <p className="font-medium">{fmt(item.quantity * item.unitPrice)}</p>
                          {o.status === "Paid" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setRatingProduct({ id: item.productId, name: item.name })
                              }
                            >
                              Rate product
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
      <RatingDialog
        product={ratingProduct}
        onOpenChange={(open) => !open && setRatingProduct(null)}
      />
    </Layout>
  );
}
