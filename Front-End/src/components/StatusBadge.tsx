import { getStatusMeta, STATUS_COLOR_CLASSES } from "@/lib/orderStatus";

export function StatusBadge({ status }: { status: string }) {
  const meta = getStatusMeta(status);
  const classes = STATUS_COLOR_CLASSES[meta.color];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${classes.bg} ${classes.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${classes.dot}`} />
      {meta.label}
    </span>
  );
}
