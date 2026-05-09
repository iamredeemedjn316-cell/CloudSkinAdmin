import React from "react";

export type StatusType =
  | "confirmed"
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show"
  | "rejected"
  | "low-stock"
  | "out-of-stock"
  | "active"
  | "inactive"
  | "draft"
  | "published"
  | "cash"
  | "gcash"
  | "card"
  | "transfer"
  | "paid"
  | "unpaid";

const statusConfig: Record<
  StatusType,
  { bg: string; text: string; label: string }
> = {
  confirmed: { bg: "#DCFCE7", text: "#15803D", label: "Confirmed" },
  pending: { bg: "#FEF9C3", text: "#A16207", label: "Pending" },
  "in-progress": { bg: "#DBEAFE", text: "#1D4ED8", label: "In Progress" },
  completed: { bg: "#F0F6FC", text: "#475569", label: "Completed" },
  cancelled: { bg: "#FEE2E2", text: "#B91C1C", label: "Cancelled" },
  "no-show": { bg: "#FEF3C7", text: "#92400E", label: "No Show" },
  rejected: { bg: "#FEE2E2", text: "#B91C1C", label: "Rejected" },
  "low-stock": { bg: "#FEF3C7", text: "#92400E", label: "Low Stock" },
  "out-of-stock": { bg: "#FEE2E2", text: "#B91C1C", label: "Out of Stock" },
  active: { bg: "#DCFCE7", text: "#15803D", label: "Active" },
  inactive: { bg: "#F1F5F9", text: "#64748B", label: "Inactive" },
  draft: { bg: "#F1F5F9", text: "#64748B", label: "Draft" },
  published: { bg: "#DCFCE7", text: "#15803D", label: "Published" },
  cash: { bg: "#F0FDF4", text: "#166534", label: "Cash" },
  gcash: { bg: "#EFF6FF", text: "#1D4ED8", label: "GCash" },
  card: { bg: "#F5F3FF", text: "#6D28D9", label: "Card" },
  transfer: { bg: "#FFF7ED", text: "#C2410C", label: "Transfer" },
  paid: { bg: "#DCFCE7", text: "#15803D", label: "Paid" },
  unpaid: { bg: "#FEF9C3", text: "#A16207", label: "Unpaid" },
};

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    bg: "#F1F5F9",
    text: "#64748B",
    label: status,
  };
  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.text,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: "9999px",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      {label || config.label}
    </span>
  );
}
