// Maps your backend's OrderStatus enum (serialized as its exact C# member name,
// e.g. "AwaitingPayment") to a display label and color. If your backend ever
// changes to JSON integers instead of strings, this will need `status: number`
// handling instead - check the actual /orders response if colors don't show up.

export type StatusColor = "grey" | "yellow" | "green" | "red" | "blue";

export interface StatusMeta {
  label: string;
  color: StatusColor;
}

const STATUS_MAP: Record<string, StatusMeta> = {
  Pending: { label: "Pending", color: "grey" },
  AwaitingPayment: { label: "Waiting Payment", color: "yellow" },
  AwaitingDelivery: { label: "Awaiting Delivery", color: "yellow" },
  Paid: { label: "Paid", color: "green" },
  Failed: { label: "Failed", color: "red" },
  Processing: { label: "Processing", color: "blue" },
  Shipped: { label: "Shipped", color: "blue" },
  Delivered: { label: "Delivered", color: "green" },
  Cancelled: { label: "Cancelled", color: "red" },
};

export function getStatusMeta(status: string): StatusMeta {
  return STATUS_MAP[status] || { label: status, color: "grey" };
}

// Pipeline order (Pending -> ... -> Paid/Failed/Cancelled) used for sorting orders by status
// in a way that's more meaningful than plain alphabetical.
export const STATUS_ORDER = Object.keys(STATUS_MAP);

export function getStatusRank(status: string): number {
  const index = STATUS_ORDER.indexOf(status);
  return index === -1 ? STATUS_ORDER.length : index;
}

export const STATUS_COLOR_CLASSES: Record<StatusColor, { dot: string; text: string; bg: string }> = {
  grey: { dot: "bg-muted-foreground", text: "text-muted-foreground", bg: "bg-muted" },
  yellow: { dot: "bg-yellow-500", text: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-500/10" },
  green: { dot: "bg-green-500", text: "text-green-700 dark:text-green-400", bg: "bg-green-500/10" },
  red: { dot: "bg-destructive", text: "text-destructive", bg: "bg-destructive/10" },
  blue: { dot: "bg-blue-500", text: "text-blue-700 dark:text-blue-400", bg: "bg-blue-500/10" },
};
