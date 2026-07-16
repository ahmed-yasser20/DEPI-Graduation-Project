import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck } from "lucide-react";

export function StripeCheckoutForm({
  onSuccess,
  onFailure,
}: {
  onSuccess: () => void;
  onFailure: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Please check your payment details.");
      setBusy(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    setBusy(false);

    if (confirmError) {
      onFailure(confirmError.message || "Payment failed.");
      return;
    }

    if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
      onSuccess();
    } else {
      onFailure("Payment was not completed.");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <PaymentElement />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" size="lg" disabled={!stripe || busy}>
        {busy ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
            Processing…
          </span>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />
            Pay now
          </>
        )}
      </Button>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground justify-center">
        <ShieldCheck className="h-3.5 w-3.5" /> Secure Stripe checkout
      </p>
    </form>
  );
}
