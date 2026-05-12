import React, { useState } from "react";
import { X, Plus, Minus, Download, Upload } from "lucide-react";

interface StockAdjustmentModalProps {
  isOpen: boolean;
  item: any;
  onClose: () => void;
  onSave: (adjustment: any) => void;
}

const adjustmentReasons = [
  "Manual Correction",
  "Damaged Goods",
  "Expired",
  "Return to Vendor",
  "Shrinkage/Theft",
  "Miscount",
  "Quality Issue",
];

export default function StockAdjustmentModal({ isOpen, item, onClose, onSave }: StockAdjustmentModalProps) {
  const [adjustmentType, setAdjustmentType] = useState<"add" | "subtract">("add");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("Manual Correction");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!quantity || isNaN(Number(quantity))) {
      alert("Please enter a valid quantity");
      return;
    }

    const adjustment = {
      itemId: item.id,
      type: adjustmentType,
      quantity: parseInt(quantity),
      reason,
      notes,
      timestamp: new Date().toISOString(),
      newStock: adjustmentType === "add" ? item.stock + parseInt(quantity) : item.stock - parseInt(quantity),
    };

    onSave(adjustment);
    setQuantity("");
    setReason("Manual Correction");
    setNotes("");
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#FFFFFF", borderRadius: "12px", width: "90%", maxWidth: "500px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            Adjust Stock: {item.name}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Current Stock Display */}
          <div style={{ background: "#F8FBFF", padding: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "4px" }}>
              Current Stock
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "24px", fontWeight: 700, color: "#2D6A9F" }}>
              {item.stock} {item.unit}
            </div>
          </div>

          {/* Adjustment Type */}
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "8px" }}>
              Adjustment Type
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setAdjustmentType("add")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: adjustmentType === "add" ? "#E0EEF9" : "#F0F6FC",
                  border: `1.5px solid ${adjustmentType === "add" ? "#2D6A9F" : "#D0E8F5"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: adjustmentType === "add" ? "#2D6A9F" : "#5A7A96",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Plus size={14} /> Add Stock
              </button>
              <button
                onClick={() => setAdjustmentType("subtract")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: adjustmentType === "subtract" ? "#FEE2E2" : "#F0F6FC",
                  border: `1.5px solid ${adjustmentType === "subtract" ? "#DC2626" : "#D0E8F5"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: adjustmentType === "subtract" ? "#DC2626" : "#5A7A96",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Minus size={14} /> Write Off
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "6px" }}>
              Quantity *
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              style={{
                width: "100%",
                height: "40px",
                padding: "0 12px",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#1A2E40",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Reason */}
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "6px" }}>
              Adjustment Reason *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                padding: "0 12px",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#1A2E40",
                background: "#FFFFFF",
                cursor: "pointer",
                outline: "none",
                boxSizing: "border-box",
              }}
            >
              {adjustmentReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "6px" }}>
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#1A2E40",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Preview */}
          <div style={{ background: "#F8FBFF", padding: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "4px" }}>
              New Stock After Adjustment
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: "#2D6A9F" }}>
              {quantity ? (adjustmentType === "add" ? item.stock + parseInt(quantity) : Math.max(0, item.stock - parseInt(quantity))) : item.stock} {item.unit}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: "12px", padding: "16px 24px", borderTop: "1px solid #D0E8F5", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              height: "40px",
              padding: "0 18px",
              background: "#F0F6FC",
              border: "1.5px solid #D0E8F5",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#5A7A96",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              height: "40px",
              padding: "0 18px",
              background: "#2D6A9F",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Confirm Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}
