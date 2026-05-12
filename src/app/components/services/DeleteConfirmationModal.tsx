import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  serviceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({ serviceName, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(26, 46, 64, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1001,
    }}>
      <div style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "90%",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px",
          borderBottom: "1px solid #D0E8F5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            Delete Service
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <AlertTriangle size={24} style={{ color: "#DC2626", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96", margin: "0 0 4px 0" }}>
                Are you sure you want to delete this service?
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                {serviceName}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", margin: "8px 0 0 0" }}>
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              onClick={onCancel}
              style={{
                padding: "10px 18px",
                background: "#F0F6FC",
                border: "1px solid #D0E8F5",
                borderRadius: "6px",
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
              onClick={onConfirm}
              style={{
                padding: "10px 18px",
                background: "#DC2626",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              Delete Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
