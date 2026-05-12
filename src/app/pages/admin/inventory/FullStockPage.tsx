import React, { useState } from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { StatCard } from "../../../components/StatCard";
import { Search, Plus, Pencil, Package, CheckCircle, Download } from "lucide-react";

const allInventory = [
  { id: "INV001", name: "Hyaluronic Acid Serum", sku: "SKIN-001", category: "Serum", unit: "mL", stock: 450, threshold: 200, maxCapacity: 500, purchasePrice: 120, sellingPrice: 350, expiryDate: "2026-08-15", primarySupplier: "Premium Beauty Supplies" },
  { id: "INV002", name: "Retinol Cream", sku: "SKIN-002", category: "Cream", unit: "units", stock: 150, threshold: 100, maxCapacity: 150, purchasePrice: 200, sellingPrice: 550, expiryDate: "2026-07-20", primarySupplier: "Premium Beauty Supplies" },
];

function getStockStatus(stock: number, threshold: number) {
  if (stock === 0) return { label: "Out of Stock", color: "#DC2626", bg: "#FEE2E2" };
  if (stock < threshold * 0.3) return { label: "Very Low Stock", color: "#DC2626", bg: "#FEE2E2" };
  if (stock <= threshold) return { label: "Low Stock", color: "#D97706", bg: "#FEF3C7" };
  return { label: "Full Stock", color: "#15803D", bg: "#DCFCE7" };
}

export default function FullStockPage() {
  const [search, setSearch] = useState("");
  const [costingMethod, setCostingMethod] = useState<"latest" | "average">("latest");

  const fullStockItems = allInventory.filter((i) => i.stock >= i.maxCapacity * 0.8);

  const filtered = fullStockItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <PageWrapper title="Full Stock Items" subtitle="Items with optimal inventory levels">
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Full Stock Items" value={filtered.length} icon={<CheckCircle size={18} />} variant="success" />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items or SKU..." style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
        </div>

        {/* Costing Method Toggle */}
        <div style={{ display: "flex", gap: "4px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "4px" }}>
          <button
            onClick={() => setCostingMethod("latest")}
            style={{
              height: "32px",
              padding: "0 12px",
              background: costingMethod === "latest" ? "#2D6A9F" : "transparent",
              border: "none",
              borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: costingMethod === "latest" ? "#FFFFFF" : "#5A7A96",
              cursor: "pointer",
            }}
          >
            Latest Cost
          </button>
          <button
            onClick={() => setCostingMethod("average")}
            style={{
              height: "32px",
              padding: "0 12px",
              background: costingMethod === "average" ? "#2D6A9F" : "transparent",
              border: "none",
              borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: costingMethod === "average" ? "#FFFFFF" : "#5A7A96",
              cursor: "pointer",
            }}
          >
            Average Cost
          </button>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          <button
            style={{ height: "40px", padding: "0 16px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={14} /> New PO
          </button>
          <button
            style={{ height: "40px", padding: "0 16px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Download size={14} /> Import/Export
          </button>
          <button style={{ height: "40px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Item Name", "SKU", "Category", "Unit", "Stock", "Max Capacity", "Purchase Price", "Selling Price", "Primary Supplier", "Status"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.threshold);
                const pct = (item.stock / item.maxCapacity) * 100;
                return (
                  <tr key={item.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}>{item.name}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#9BBAD4" }}>{item.sku}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{item.category}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{item.unit}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "100px" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: stockStatus.color }}>
                            {item.stock}
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>/ {item.maxCapacity}</span>
                        </div>
                        <div style={{ height: "4px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: stockStatus.color, width: `${Math.min(pct, 100)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{item.maxCapacity}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>₱{item.purchasePrice}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F" }}>₱{item.sellingPrice}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{item.primarySupplier}</span>
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "9999px", background: stockStatus.bg, color: stockStatus.color }}>
                        {stockStatus.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}
