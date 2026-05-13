import React from "react";
import { CheckCircle, AlertTriangle, AlertCircle, Ban, Info } from "lucide-react";

interface StockStatusInfoProps {
  status: "full" | "ok" | "low" | "veryLow" | "noStock";
  itemCount: number;
}

export function StockStatusInfo({ status, itemCount }: StockStatusInfoProps) {
  const configs = {
    full: {
      icon: <CheckCircle size={20} color="#15803D" />,
      title: "Full Stock",
      description: "Items in optimal quantity — sufficient inventory for operations.",
      borderColor: "#15803D",
      bgColor: "#F0FDF4",
    },
    ok: {
      icon: <CheckCircle size={20} color="#059669" />,
      title: "OK Stock",
      description: "Items within the safe range — at or near the reorder threshold.",
      borderColor: "#059669",
      bgColor: "#ECFDF5",
    },
    low: {
      icon: <AlertTriangle size={20} color="#D97706" />,
      title: "Low Stock",
      description: "Items below recommended levels — consider placing a reorder soon.",
      borderColor: "#D97706",
      bgColor: "#FFFBEB",
    },
    veryLow: {
      icon: <AlertCircle size={20} color="#DC2626" />,
      title: "Very Low Stock",
      description: "Items critically low — immediate reorder recommended to avoid stockouts.",
      borderColor: "#DC2626",
      bgColor: "#FEF2F2",
    },
    noStock: {
      icon: <Ban size={20} color="#7C3AED" />,
      title: "No Stock",
      description: "Items out of stock — unavailable for use until replenished.",
      borderColor: "#7C3AED",
      bgColor: "#F5F3FF",
    },
  };

  const config = configs[status];

  return (
    <div
      style={{
        background: config.bgColor,
        border: `1.5px solid ${config.borderColor}`,
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderLeft: `4px solid ${config.borderColor}`, paddingLeft: "12px" }}>
        {config.icon}
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40", margin: "0 0 4px 0" }}>{config.title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", margin: "0" }}>{config.description}</p>
      </div>

      <div style={{ flexShrink: 0, textAlign: "right" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: config.borderColor }}>{itemCount}</span>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", margin: "0", marginTop: "2px" }}>items</p>
      </div>
    </div>
  );
}
