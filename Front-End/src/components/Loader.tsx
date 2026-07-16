export function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
      <div className="h-8 w-8 rounded-full border-2 border-muted border-t-foreground animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-8 w-full bg-muted rounded mt-3" />
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-20 border rounded-xl bg-muted/30">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-background border mb-4">
        <span className="text-2xl">✦</span>
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
