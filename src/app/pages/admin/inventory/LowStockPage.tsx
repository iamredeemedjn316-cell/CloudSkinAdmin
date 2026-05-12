import React, { useState } from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { StatCard } from "../../../components/StatCard";
import { Search, Plus, Pencil, History, X, AlertTriangle, Package, CheckCircle } from "lucide-react";

const allInventory = [
  { id: "INV001", name: "Hyaluronic Acid Serum", sku: "SKIN-001", category: "Serum", unit: "mL", stock: 450, threshold: 200, maxCapacity: 500, purchasePrice: 120, sellingPrice: 350, expiryDate: "2026-08-15", lastUpdated: "Apr 22, 2026" },
  { id: "INV002", name: "Retinol Cream", sku: "SKIN-002", category: "Cream", unit: "units", stock: 85, threshold: 100, maxCapacity: 150, purchasePrice: 200, sellingPrice: 550, expiryDate: "2026-07-20", lastUpdated: "Apr 20, 2026" },
  { id: "INV003", name: "Vitamin C Serum", sku: "SKIN-003", category: "Serum", unit: "mL", stock: 320, threshold: 150, maxCapacity: 400, purchasePrice: 100, sellingPrice: 320, expiryDate: "2026-09-10", lastUpdated: "Apr 18, 2026" },
  { id: "INV004", name: "SPF 50 Sunscreen", sku: "SKIN-004", category: "Sunscreen", unit: "units", stock: 62, threshold: 50, maxCapacity: 100, purchasePrice: 150, sellingPrice: 450, expiryDate: "2026-12-01", lastUpdated: "Apr 15, 2026" },
  { id: "INV005", name: "Botox (50u)", sku: "INJ-001", category: "Injectable", unit: "vial", stock: 8, threshold: 10, maxCapacity: 20, purchasePrice: 250, sellingPrice: 750, expiryDate: "2026-06-30", lastUpdated: "Apr 21, 2026" },
  { id: "INV006", name: "Filler (1mL)", sku: "INJ-002", category: "Injectable", unit: "syringe", stock: 15, threshold: 10, maxCapacity: 30, purchasePrice: 180, sellingPrice: 600, expiryDate: "2026-08-15", lastUpdated: "Apr 19, 2026" },
  { id: "INV007", name: "Chemical Peel Solution", sku: "TREAT-001", category: "Treatment", unit: "mL", stock: 0, threshold: 200, maxCapacity: 300, purchasePrice: 300, sellingPrice: 800, expiryDate: "2026-05-01", lastUpdated: "Apr 10, 2026" },
  { id: "INV008", name: "Needles (Box 100)", sku: "NEEDLE-001", category: "Supplies", unit: "box", stock: 3, threshold: 5, maxCapacity: 50, purchasePrice: 50, sellingPrice: 120, expiryDate: "2027-12-31", lastUpdated: "Apr 23, 2026" },
  { id: "INV009", name: "Gauze Pads", sku: "SUPPLY-001", category: "Supplies", unit: "pack", stock: 24, threshold: 10, maxCapacity: 100, purchasePrice: 80, sellingPrice: 200, expiryDate: "2027-03-15", lastUpdated: "Apr 17, 2026" },
  { id: "INV010", name: "IV Bag (Normal Saline)", sku: "IV-001", category: "IV", unit: "bag", stock: 45, threshold: 20, maxCapacity: 80, purchasePrice: 60, sellingPrice: 180, expiryDate: "2026-07-20", lastUpdated: "Apr 20, 2026" },
];

function getStockStatus(stock: number, threshold: number) {
  if (stock === 0) return { label: "Out of Stock", color: "#DC2626", bg: "#FEE2E2" };
  if (stock < threshold * 0.3) return { label: "Very Low Stock", color: "#DC2626", bg: "#FEE2E2" };
  if (stock <= threshold) return { label: "Low Stock", color: "#D97706", bg: "#FEF3C7" };
  return { label: "OK Stock", color: "#15803D", bg: "#DCFCE7" };
}

export default function LowStockPage() {
  const [search, setSearch] = useState("");
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [adjustType, setAdjustType] = useState<"add" | "writeoff">("add");

  const lowStockItems = allInventory.filter((i) => i.stock > 0 && i.stock <= i.threshold);
  const veryLowStockCount = lowStockItems.filter((i) => i.stock < i.threshold * 0.3).length;

  const filtered = lowStockItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <PageWrapper title="Low Stock Items" subtitle="Items that need to be restocked soon">
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Low Stock Items" value={filtered.length} icon={<AlertTriangle size={18} />} variant="warning" />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items or SKU..." style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
        </div>
        <button style={{ height: "40px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
          <Plus size={14} /> Restock
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Item Name", "SKU", "Category", "Unit", "Stock", "Threshold", "Purchase Price", "Selling Price", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.threshold);
                const pct = Math.min((item.stock / item.threshold) * 100, 100);
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
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "120px" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: stockStatus.color }}>
                            {item.stock}
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>/ {item.threshold}</span>
                        </div>
                        <div style={{ height: "4px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: item.stock === 0 ? "#EF4444" : item.stock <= item.threshold ? "#F59E0B" : "#2D6A9F", borderRadius: "9999px" }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>{item.threshold}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>₱{item.purchasePrice.toLocaleString()}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>₱{item.sellingPrice.toLocaleString()}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ background: stockStatus.bg, color: stockStatus.color, fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "9999px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button style={{ width: "28px", height: "28px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }} title="Edit">
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => { setSelectedItem(item); setShowAdjustModal(true); }}
                          style={{ height: "28px", padding: "0 10px", background: "#EBF6FD", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#2D6A9F" }}
                          title="Adjust Stock"
                        >
                          Adjust
                        </button>
                        <button style={{ width: "28px", height: "28px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }} title="View History">
                          <History size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {showAdjustModal && selectedItem && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowAdjustModal(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "480px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Adjust Stock</span>
              <button onClick={() => setShowAdjustModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96", display: "flex" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ background: "#F0F6FC", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{selectedItem.name}</div>
                <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>Current Stock</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: "#1A2E40" }}>{selectedItem.stock} {selectedItem.unit}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>SKU</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#5A7A96" }}>{selectedItem.sku}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "10px" }}>Adjustment Type</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {([{ key: "add", label: "+ Add Stock" }, { key: "writeoff", label: "− Write Off" }] as const).map((t) => (
                    <label key={t.key} style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "10px 14px", border: `1.5px solid ${adjustType === t.key ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", background: adjustType === t.key ? "#EBF6FD" : "#FFFFFF" }}>
                      <input type="radio" checked={adjustType === t.key} onChange={() => setAdjustType(t.key)} style={{ display: "none" }} />
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: `2px solid ${adjustType === t.key ? "#2D6A9F" : "#9BBAD4"}`, background: adjustType === t.key ? "#2D6A9F" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {adjustType === t.key && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />}
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: adjustType === t.key ? "#2D6A9F" : "#5A7A96" }}>{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Quantity</label>
                  <input type="number" placeholder="0" min="1" style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Reason</label>
                  <select style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}>
                    {["Restock", "Damaged", "Expired", "Used in session", "Other"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Notes (optional)</label>
                <textarea placeholder="Any additional notes..." rows={3} style={{ width: "100%", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "10px 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", resize: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowAdjustModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Confirm Adjustment</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
