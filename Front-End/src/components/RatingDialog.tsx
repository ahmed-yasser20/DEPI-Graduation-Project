import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ratingService } from "@/services/ratingService";

export function RatingDialog({
  product,
  onOpenChange,
  onSaved,
}: {
  product: { id: number; name: string } | null;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}) {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValue(0);
    setComment("");
  }, [product?.id]);

  if (!product) return null;

  const save = async () => {
    if (!value) {
      toast.error("Choose a star rating first");
      return;
    }
    setSaving(true);
    try {
      await ratingService.save({ productId: product.id, value, comment });
      toast.success("Thank you for your rating!");
      onSaved?.();
      onOpenChange(false);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't save your rating");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate {product.name}</DialogTitle>
          <DialogDescription>
            Your rating can be updated later by selecting Rate product again.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1" aria-label="Choose a rating from one to five stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue(star)}
              className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
            >
              <Star
                className={`h-8 w-8 ${star <= value ? "fill-warning text-warning" : "text-muted-foreground"}`}
              />
            </button>
          ))}
        </div>
        <Textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          maxLength={1000}
          placeholder="Share your experience (optional)"
        />
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Submit rating"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
