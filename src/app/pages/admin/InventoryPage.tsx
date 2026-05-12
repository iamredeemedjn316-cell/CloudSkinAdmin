import React, { useState } from "react";
import { Search, Plus, Pencil, History, X, AlertTriangle, Package, MoreVertical, Download, Upload, TrendingUp, TrendingDown, CheckCircle, Ban } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import StockAdjustmentModal from "../../components/inventory/StockAdjustmentModal";
import PurchaseOrderModal from "../../components/inventory/PurchaseOrderModal";
import BulkImportExportModal from "../../components/inventory/BulkImportExportModal";
import BatchHistoryModal from "../../components/inventory/BatchHistoryModal";

const inventory = [
  { id: "INV001", name: "Hyaluronic Acid Serum", sku: "SKIN-001", category: "Serum", unit: "mL", stock: 450, threshold: 200, maxCapacity: 500, purchasePrice: 120, sellingPrice: 350, expiryDate: "2026-08-15", lastUpdated: "Apr 22, 2026", primarySupplier: "Premium Beauty Supplies", batchHistory: [{ date: "Apr 22, 2026", supplier: "Premium Beauty Supplies", cost: 120, avgCost: 115 }, { date: "Apr 10, 2026", supplier: "Medical Distribution Ltd", cost: 110, avgCost: 110 }] },
  { id: "INV002", name: "Retinol Cream", sku: "SKIN-002", category: "Cream", unit: "units", stock: 85, threshold: 100, maxCapacity: 150, purchasePrice: 200, sellingPrice: 550, expiryDate: "2026-07-20", lastUpdated: "Apr 20, 2026", primarySupplier: "Derma Solutions Inc", batchHistory: [{ date: "Apr 20, 2026", supplier: "Derma Solutions Inc", cost: 200, avgCost: 190 }, { date: "Mar 30, 2026", supplier: "Premium Beauty Supplies", cost: 180, avgCost: 180 }] },
  { id: "INV003", name: "Vitamin C Serum", sku: "SKIN-003", category: "Serum", unit: "mL", stock: 320, threshold: 150, maxCapacity: 400, purchasePrice: 100, sellingPrice: 320, expiryDate: "2026-09-10", lastUpdated: "Apr 18, 2026", primarySupplier: "Premium Beauty Supplies", batchHistory: [{ date: "Apr 18, 2026", supplier: "Premium Beauty Supplies", cost: 100, avgCost: 98 }, { date: "Mar 15, 2026", supplier: "Medical Distribution Ltd", cost: 95, avgCost: 95 }] },
  { id: "INV004", name: "SPF 50 Sunscreen", sku: "SKIN-004", category: "Sunscreen", unit: "units", stock: 62, threshold: 50, maxCapacity: 100, purchasePrice: 150, sellingPrice: 450, expiryDate: "2026-12-01", lastUpdated: "Apr 15, 2026", primarySupplier: "Medical Distribution Ltd", batchHistory: [{ date: "Apr 15, 2026", supplier: "Medical Distribution Ltd", cost: 150, avgCost: 145 }] },
  { id: "INV005", name: "Botox (50u)", sku: "INJ-001", category: "Injectable", unit: "vial", stock: 8, threshold: 10, maxCapacity: 20, purchasePrice: 250, sellingPrice: 750, expiryDate: "2026-06-30", lastUpdated: "Apr 21, 2026", primarySupplier: "Derma Solutions Inc", batchHistory: [{ date: "Apr 21, 2026", supplier: "Derma Solutions Inc", cost: 250, avgCost: 240 }] },
  { id: "INV006", name: "Filler (1mL)", sku: "INJ-002", category: "Injectable", unit: "syringe", stock: 15, threshold: 10, maxCapacity: 30, purchasePrice: 180, sellingPrice: 600, expiryDate: "2026-08-15", lastUpdated: "Apr 19, 2026", primarySupplier: "Premium Beauty Supplies", batchHistory: [{ date: "Apr 19, 2026", supplier: "Premium Beauty Supplies", cost: 180, avgCost: 175 }] },
  { id: "INV007", name: "Chemical Peel Solution", sku: "TREAT-001", category: "Treatment", unit: "mL", stock: 0, threshold: 200, maxCapacity: 300, purchasePrice: 300, sellingPrice: 800, expiryDate: "2026-05-01", lastUpdated: "Apr 10, 2026", primarySupplier: "Medical Distribution Ltd", batchHistory: [{ date: "Apr 10, 2026", supplier: "Medical Distribution Ltd", cost: 300, avgCost: 290 }] },
  { id: "INV008", name: "Needles (Box 100)", sku: "NEEDLE-001", category: "Supplies", unit: "box", stock: 3, threshold: 5, maxCapacity: 50, purchasePrice: 50, sellingPrice: 120, expiryDate: "2027-12-31", lastUpdated: "Apr 23, 2026", primarySupplier: "Derma Solutions Inc", batchHistory: [{ date: "Apr 23, 2026", supplier: "Derma Solutions Inc", cost: 50, avgCost: 48 }] },
  { id: "INV009", name: "Gauze Pads", sku: "SUPPLY-001", category: "Supplies", unit: "pack", stock: 24, threshold: 10, maxCapacity: 100, purchasePrice: 80, sellingPrice: 200, expiryDate: "2027-03-15", lastUpdated: "Apr 17, 2026", primarySupplier: "Premium Beauty Supplies", batchHistory: [{ date: "Apr 17, 2026", supplier: "Premium Beauty Supplies", cost: 80, avgCost: 78 }] },
  { id: "INV010", name: "IV Bag (Normal Saline)", sku: "IV-001", category: "IV", unit: "bag", stock: 45, threshold: 20, maxCapacity: 80, purchasePrice: 60, sellingPrice: 180, expiryDate: "2026-07-20", lastUpdated: "Apr 20, 2026", primarySupplier: "Medical Distribution Ltd", batchHistory: [{ date: "Apr 20, 2026", supplier: "Medical Distribution Ltd", cost: 60, avgCost: 58 }] },
];

function getStockStatus(stock: number, threshold: number) {
  if (stock === 0) return { label: "Out of Stock", color: "#DC2626", bg: "#FEE2E2" };
  if (stock <= threshold) return { label: "Low Stock", color: "#D97706", bg: "#FEF3C7" };
  return { label: "OK", color: "#15803D", bg: "#DCFCE7" };
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [showLowOnly, setShowLowOnly] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showBatchHistory, setShowBatchHistory] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [adjustmentLog, setAdjustmentLog] = useState<any[]>([]);
  const [costingMethod, setCostingMethod] = useState<"latest" | "average">("latest");

  const lowCount = inventory.filter((i) => i.stock > 0 && i.stock <= i.threshold).length;
  const outCount = inventory.filter((i) => i.stock === 0).length;
  const fullStockCount = inventory.filter((i) => i.stock > i.threshold * 1.5).length;
  const okStockCount = inventory.filter((i) => i.stock > i.threshold && i.stock <= i.threshold * 1.5).length;
  const veryLowCount = inventory.filter((i) => i.stock > 0 && i.stock < i.threshold * 0.3).length;

  const filtered = inventory.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchLow = !showLowOnly || item.stock <= item.threshold;
    return matchSearch && matchLow;
  });

  const handleAdjustmentSave = (adjustment: any) => {
    console.log("[v0] Stock adjustment:", adjustment);
    setAdjustmentLog([...adjustmentLog, adjustment]);
  };

  const handleBulkImport = (data: any[]) => {
    console.log("[v0] Bulk import data:", data);
    alert(`Successfully imported ${data.length} items`);
  };

  const handleBulkExport = () => {
    const csv = ["SKU,Item Name,Quantity,Purchase Price,Selling Price,Threshold,Max Capacity,Expiry Date"];
    inventory.forEach((item) => {
      csv.push(`${item.sku},${item.name},${item.stock},${item.purchasePrice},${item.sellingPrice},${item.threshold},${item.maxCapacity},${item.expiryDate}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const suppliers = [
    { id: "SUP001", name: "Premium Beauty Supplies" },
    { id: "SUP002", name: "Medical Distribution Ltd" },
    { id: "SUP003", name: "Derma Solutions Inc" },
  ];

  return (
    <PageWrapper title="Inventory" breadcrumb="Admin / Inventory">
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Total Items" value={inventory.length} icon={<Package size={18} />} delta={{ value: "All categories", positive: true }} />
        <StatCard label="Full Stock" value={fullStockCount} icon={<CheckCircle size={18} />} variant="success" />
        <StatCard label="OK Stock" value={okStockCount} icon={<CheckCircle size={18} />} variant="info" />
        <StatCard label="Low Stock" value={lowCount} icon={<AlertTriangle size={18} />} variant="warning" />
        <StatCard label="Very Low Stock" value={veryLowCount} icon={<AlertTriangle size={18} />} variant="warning" />
        <StatCard label="No Stock" value={outCount} icon={<Ban size={18} />} variant="danger" />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items or SKU..." style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
        </div>
        <button
          onClick={() => setShowLowOnly(!showLowOnly)}
          style={{ height: "40px", padding: "0 16px", background: showLowOnly ? "#FEF3C7" : "#FFFFFF", border: `1.5px solid ${showLowOnly ? "#F59E0B" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: showLowOnly ? "#D97706" : "#5A7A96", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <AlertTriangle size={14} /> Low Stock Only
        </button>

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
            onClick={() => setShowPOModal(true)}
            style={{ height: "40px", padding: "0 16px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={14} /> New PO
          </button>
          <button
            onClick={() => setShowBulkModal(true)}
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
                {["Item Name", "SKU", "Category", "Unit", "Stock", "Primary Supplier", "Purchase Price", "Selling Price", "Expiry Date", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.threshold);
                const displayPrice = costingMethod === "latest" ? item.purchasePrice : (item.batchHistory?.[0]?.avgCost || item.purchasePrice);
                const prevPrice = item.batchHistory?.[1]?.cost;
                const priceChange = prevPrice ? ((displayPrice - prevPrice) / prevPrice) * 100 : null;

                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setShowBatchHistory(true);
                    }}
                    style={{
                      borderBottom: "1px solid #D0E8F5",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}>
                      {item.name}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>
                      {item.sku}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                      {item.category}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                      {item.unit}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>
                      {item.stock}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                      {item.primarySupplier}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", display: "flex", alignItems: "center", gap: "4px" }}>
                      ₱{displayPrice.toFixed(2)}
                      {priceChange !== null && (
                        priceChange > 0 ? (
                          <TrendingUp size={12} color="#DC2626" title="Price increased" />
                        ) : (
                          <TrendingDown size={12} color="#15803D" title="Price decreased" />
                        )
                      )}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>
                      ₱{item.sellingPrice.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                      {new Date(item.expiryDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ background: stockStatus.bg, color: stockStatus.color, fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "9999px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowAdjustModal(true);
                        }}
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#F0F6FC",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#2D6A9F",
                        }}
                        title="Adjust stock"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <StockAdjustmentModal
        isOpen={showAdjustModal}
        item={selectedItem}
        onClose={() => setShowAdjustModal(false)}
        onSave={handleAdjustmentSave}
      />
      <PurchaseOrderModal
        isOpen={showPOModal}
        suppliers={suppliers}
        onClose={() => setShowPOModal(false)}
        onSave={(po) => {
          console.log("[v0] Purchase order created:", po);
          setShowPOModal(false);
        }}
      />
      <BulkImportExportModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onImport={handleBulkImport}
        onExport={handleBulkExport}
      />
      <BatchHistoryModal
        isOpen={showBatchHistory}
        item={selectedItem}
        costingMethod={costingMethod}
        onClose={() => setShowBatchHistory(false)}
      />
    </PageWrapper>
  );
}
