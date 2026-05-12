import React from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";

interface BatchHistoryModalProps {
  isOpen: boolean;
  item: any;
  costingMethod: "latest" | "average";
  onClose: () => void;
}

export default function BatchHistoryModal({ isOpen, item, costingMethod, onClose }: BatchHistoryModalProps) {
  if (!isOpen || !item) return null;

  const getPriceChange = (current: number, previous: number) => {
    if (!previous) return null;
    const change = current - previous;
    return {
      amount: Math.abs(change),
      percentage: ((change / previous) * 100).toFixed(1),
      isIncrease: change > 0,
    };
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#FFFFFF", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "80vh", overflow: "auto", boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)" }}>
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#FFFFFF" }}>
          <div>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A2E40", margin: 0 }}>
              Batch History
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "4px 0 0 0" }}>
              {item.name}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#9BBAD4" }}>
            <X size={20} />
          </button>
        </div>

        {/* Costing Method Indicator */}
        <div style={{ padding: "16px 24px", background: "#F8FBFF", borderBottom: "1px solid #D0E8F5" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>
            Displaying: {costingMethod === "latest" ? "Latest Cost" : "Average Cost"}
          </span>
        </div>

        {/* Batch History Table */}
        <div style={{ padding: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #D0E8F5" }}>
                <th style={{ padding: "12px 0", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>
                  Restock Date
                </th>
                <th style={{ padding: "12px 0", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>
                  Supplier
                </th>
                <th style={{ padding: "12px 0", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>
                  Cost/Unit
                </th>
                <th style={{ padding: "12px 0", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {item.batchHistory && item.batchHistory.map((batch: any, idx: number) => {
                const displayCost = costingMethod === "latest" ? batch.cost : batch.avgCost;
                const previousCost = idx < item.batchHistory.length - 1 ? item.batchHistory[idx + 1].cost : null;
                const priceChange = getPriceChange(displayCost, previousCost);

                return (
                  <tr key={idx} style={{ borderBottom: idx < item.batchHistory.length - 1 ? "1px solid #D0E8F5" : "none", background: idx === 0 ? "#F8FBFF" : "#FFFFFF" }}>
                    <td style={{ padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: idx === 0 ? 600 : 400 }}>
                      {batch.date}
                    </td>
                    <td style={{ padding: "14px 0", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                      {batch.supplier}
                    </td>
                    <td style={{ padding: "14px 0", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>
                      ₱{displayCost.toFixed(2)}
                    </td>
                    <td style={{ padding: "14px 0", textAlign: "right" }}>
                      {priceChange ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          {priceChange.isIncrease ? (
                            <>
                              <TrendingUp size={14} color="#DC2626" />
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#DC2626" }}>
                                +{priceChange.percentage}%
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown size={14} color="#15803D" />
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#15803D" }}>
                                {priceChange.percentage}%
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", background: "#F8FBFF", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              height: "36px",
              padding: "0 16px",
              background: "#2D6A9F",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
