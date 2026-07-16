import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/payment-success")({ component: Success });

function Success() {
  return (
    <Layout>
      <div className="container-page py-24 text-center max-w-lg">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold">Payment successful</h1>
        <p className="mt-3 text-muted-foreground">
          Your order has been confirmed. A receipt is on its way to your inbox.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild><Link to="/orders">View orders</Link></Button>
          <Button asChild variant="outline"><Link to="/">Continue shopping</Link></Button>
        </div>
      </div>
    </Layout>
  );
}
