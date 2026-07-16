import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export const Route = createFileRoute("/payment-failed")({ component: Failed });

function Failed() {
  return (
    <Layout>
      <div className="container-page py-24 text-center max-w-lg">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-destructive/10 text-destructive">
          <XCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold">Payment failed</h1>
        <p className="mt-3 text-muted-foreground">
          Something went wrong. Your card wasn't charged. Please try again.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild><Link to="/checkout">Try again</Link></Button>
          <Button asChild variant="outline"><Link to="/cart">Back to cart</Link></Button>
        </div>
      </div>
    </Layout>
  );
}
