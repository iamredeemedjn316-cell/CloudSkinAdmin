import React from "react";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  delta?: { value: string; positive: boolean };
  variant?: "default" | "primary" | "warning";
}

export function StatCard({
  label,
  value,
  icon,
  delta,
  variant = "default",
}: StatCardProps) {
  const isPrimary = variant === "primary";
  const isWarning = variant === "warning";

  return (
    <div
      style={{
        background: isPrimary ? "#2D6A9F" : "#FFFFFF",
        borderRadius: "16px",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(26,58,92,0.08), 0 2px 8px rgba(26,58,92,0.04)",
        borderLeft: isWarning ? "4px solid #F59E0B" : "none",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: isPrimary ? "rgba(255,255,255,0.8)" : "#5A7A96",
            fontWeight: 400,
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: isPrimary ? "rgba(255,255,255,0.2)" : "#EBF6FD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isPrimary ? "#FFFFFF" : "#5BC0EB",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "32px",
          fontWeight: 700,
          color: isPrimary ? "#FFFFFF" : "#1A2E40",
          lineHeight: 1.1,
          marginBottom: "8px",
        }}
      >
        {value}
      </div>
      {delta && (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {delta.positive ? (
            <TrendingUp size={13} color={isPrimary ? "rgba(255,255,255,0.8)" : "#16A34A"} />
          ) : (
            <TrendingDown size={13} color={isPrimary ? "rgba(255,255,255,0.8)" : "#DC2626"} />
          )}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: isPrimary
                ? "rgba(255,255,255,0.8)"
                : delta.positive
                ? "#16A34A"
                : "#DC2626",
            }}
          >
            {delta.value}
          </span>
        </div>
      )}
      {isWarning && !delta && (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <AlertTriangle size={13} color="#F59E0B" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#92400E" }}>
            Requires attention
          </span>
        </div>
      )}
    </div>
  );
}
