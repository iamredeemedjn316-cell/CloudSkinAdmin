import React, { useState } from "react";
import { X, Download, Upload, AlertCircle } from "lucide-react";

interface BulkImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
  onExport: () => void;
}

export default function BulkImportExportModal({ isOpen, onClose, onImport, onExport }: BulkImportExportModalProps) {
  const [activeTab, setActiveTab] = useState<"import" | "export">("import");
  const [importError, setImportError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;
          const values = lines[i].split(",").map((v) => v.trim());
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index];
          });
          data.push(row);
        }

        if (data.length === 0) {
          setImportError("No data found in CSV file");
          return;
        }

        setImportError("");
        onImport(data);
        onClose();
      } catch (err) {
        setImportError("Error parsing CSV file. Please check format.");
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#FFFFFF", borderRadius: "12px", width: "90%", maxWidth: "600px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            Bulk Import / Export
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #D0E8F5" }}>
          {["import", "export"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "import" | "export")}
              style={{
                flex: 1,
                padding: "16px",
                background: activeTab === tab ? "#F0F6FC" : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: activeTab === tab ? "#2D6A9F" : "#5A7A96",
                borderBottom: activeTab === tab ? "3px solid #2D6A9F" : "none",
                textTransform: "capitalize",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {activeTab === "import" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Instructions */}
              <div style={{ background: "#F0F6FC", padding: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <AlertCircle size={14} style={{ color: "#2D6A9F", marginTop: "2px", flexShrink: 0 }} />
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", lineHeight: 1.5 }}>
                    <strong>CSV Format Required:</strong> Your file must contain these columns: SKU, Item Name, Quantity, Purchase Price, Selling Price, Threshold, Max Capacity, Expiry Date
                  </div>
                </div>
              </div>

              {/* Sample Template */}
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "8px" }}>
                  Sample Template
                </label>
                <div style={{ background: "#F8FBFF", padding: "12px", borderRadius: "8px", border: "1px solid #D0E8F5", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#5A7A96", overflow: "auto", maxHeight: "120px" }}>
                  SKU,Item Name,Quantity,Purchase Price,Selling Price,Threshold,Max Capacity,Expiry Date
                  <br />
                  SKIN-001,Hyaluronic Acid Serum,450,120,350,200,500,2026-08-15
                  <br />
                  INJ-001,Botox (50u),8,250,750,10,20,2026-06-30
                </div>
              </div>

              {/* Error Display */}
              {importError && (
                <div style={{ background: "#FEE2E2", padding: "12px", borderRadius: "8px", border: "1px solid #FCA5A5" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#DC2626" }}>
                    {importError}
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "8px" }}>
                  Upload CSV File
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px",
                    border: "2px dashed #D0E8F5",
                    borderRadius: "8px",
                    background: "#F8FBFF",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2D6A9F";
                    e.currentTarget.style.background = "#F0F6FC";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#D0E8F5";
                    e.currentTarget.style.background = "#F8FBFF";
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Upload size={24} style={{ color: "#2D6A9F", margin: "0 auto 8px" }} />
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F", marginBottom: "4px" }}>
                      Click or drag CSV file here
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                      Maximum 10MB, CSV format only
                    </div>
                  </div>
                  <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: "none" }} />
                </label>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ background: "#F0F6FC", padding: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", lineHeight: 1.5 }}>
                  Export all current inventory items to a CSV file. This file can be edited and imported back to update multiple items at once.
                </div>
              </div>

              <div style={{ background: "#F8FBFF", padding: "16px", borderRadius: "8px", border: "1px solid #D0E8F5", textAlign: "center" }}>
                <button
                  onClick={onExport}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "40px",
                    padding: "0 20px",
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
                  <Download size={16} /> Download CSV
                </button>
              </div>

              <div style={{ background: "#FEF3C7", padding: "12px", borderRadius: "8px", border: "1px solid #FCD34D" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#B45309" }}>
                  <strong>Note:</strong> Exported file includes all inventory columns. Make sure to maintain the header row and correct data format when editing.
                </div>
              </div>
            </div>
          )}
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
