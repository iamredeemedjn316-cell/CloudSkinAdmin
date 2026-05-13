import React, { useState } from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { StatCard } from "../../../components/StatCard";
import { Search, Filter, ArrowUp, ArrowDown, Shuffle, Trash2, ShoppingCart } from "lucide-react";

const auditLogs = [
  { id: "AL001", date: "2024-05-12 14:32", item: "HydraFacial Serums", sku: "MED-HYD-001", movementType: "Stock In", quantity: 10, performedBy: "John Supplier", balanceBefore: 45, balanceAfter: 55, notes: "Purchase from MediCare Supplies" },
  { id: "AL002", date: "2024-05-12 11:15", item: "Laser Treatment Pads", sku: "MED-LAC-002", movementType: "Procedure Use", quantity: 2, performedBy: "Dr. Sarah Johnson", balanceBefore: 18, balanceAfter: 16, notes: "Used in facial laser procedure" },
  { id: "AL003", date: "2024-05-12 09:45", item: "Glycolic Acid Peel", sku: "MED-GLY-003", movementType: "Sale", quantity: 1, performedBy: "Reception Team", balanceBefore: 12, balanceAfter: 11, notes: "Sold to customer" },
  { id: "AL004", date: "2024-05-11 16:20", item: "Retinol Night Cream", sku: "MED-RET-004", movementType: "Write-Off", quantity: 2, performedBy: "Admin User", balanceBefore: 8, balanceAfter: 6, notes: "Expired stock - removed from inventory" },
  { id: "AL005", date: "2024-05-11 13:10", item: "Botox Alternative Serum", sku: "MED-BOT-005", movementType: "Transfer", quantity: 3, performedBy: "Manager", balanceBefore: 25, balanceAfter: 22, notes: "Transfer from stockroom to front desk display" },
  { id: "AL006", date: "2024-05-11 10:30", item: "Microdermabrasion Crystals", sku: "MED-MIC-006", movementType: "Stock In", quantity: 5, performedBy: "Supply Officer", balanceBefore: 20, balanceAfter: 25, notes: "Received from Global Health Products" },
  { id: "AL007", date: "2024-05-10 15:45", item: "LED Light Therapy Panel", sku: "MED-LED-007", movementType: "Procedure Use", quantity: 1, performedBy: "Dr. Michael Chen", balanceBefore: 4, balanceAfter: 3, notes: "Used in LED therapy session" },
  { id: "AL008", date: "2024-05-10 12:00", item: "Hydrating Mask", sku: "MED-HYD-008", movementType: "Sale", quantity: 3, performedBy: "Reception Team", balanceBefore: 50, balanceAfter: 47, notes: "Sold to 3 customers" },
];

const getMovementIcon = (type: string) => {
  switch (type) {
    case "Stock In":
      return <ArrowDown size={16} color="#10B981" />;
    case "Procedure Use":
      return <ArrowUp size={16} color="#F59E0B" />;
    case "Sale":
      return <ShoppingCart size={16} color="#EF4444" />;
    case "Write-Off":
      return <Trash2 size={16} color="#6B7280" />;
    case "Transfer":
      return <Shuffle size={16} color="#8B5CF6" />;
    default:
      return null;
  }
};

const getMovementColor = (type: string) => {
  switch (type) {
    case "Stock In":
      return { bg: "#ECFDF5", text: "#065F46", border: "#86EFAC" };
    case "Procedure Use":
      return { bg: "#FFFBEB", text: "#B45309", border: "#FCD34D" };
    case "Sale":
      return { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" };
    case "Write-Off":
      return { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };
    case "Transfer":
      return { bg: "#F3E8FF", text: "#6D28D9", border: "#E9D5FF" };
    default:
      return { bg: "#F0F6FC", text: "#1A2E40", border: "#D0E8F5" };
  }
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [movementFilter, setMovementFilter] = useState<string | null>(null);

  const movementTypes = ["Stock In", "Procedure Use", "Sale", "Write-Off", "Transfer"];

  const filtered = auditLogs.filter((log) => {
    const matchesSearch = log.item.toLowerCase().includes(search.toLowerCase()) || log.sku.toLowerCase().includes(search.toLowerCase()) || log.performedBy.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !movementFilter || log.movementType === movementFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageWrapper title="Stock Audit Logs" subtitle="Track all stock movements and inventory changes">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "350px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search item, SKU, or user..." style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
        </div>

        {/* Movement Type Filter */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <Filter size={16} color="#5A7A96" style={{ marginRight: "4px" }} />
          {movementTypes.map((type) => (
            <button
              key={type}
              onClick={() => setMovementFilter(movementFilter === type ? null : type)}
              style={{
                height: "32px",
                padding: "0 10px",
                background: movementFilter === type ? getMovementColor(type).bg : "#F0F6FC",
                border: `1.5px solid ${movementFilter === type ? getMovementColor(type).border : "#D0E8F5"}`,
                borderRadius: "6px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: movementFilter === type ? getMovementColor(type).text : "#5A7A96",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Total Movements" value={auditLogs.length} icon={<Shuffle size={18} />} variant="success" />
        <StatCard label="Stock In" value={auditLogs.filter((l) => l.movementType === "Stock In").length} icon={<ArrowDown size={18} />} variant="success" />
        <StatCard label="Stock Out" value={auditLogs.filter((l) => ["Procedure Use", "Sale", "Write-Off", "Transfer"].includes(l.movementType)).length} icon={<ArrowUp size={18} />} variant="warning" />
      </div>

      {/* Audit Logs Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F0F6FC" }}>
              {["Date & Time", "Item", "SKU", "Movement Type", "Quantity", "Performed By", "Balance Before", "Balance After", "Notes"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", whiteSpace: "nowrap" }}>{log.date}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{log.item}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#2D6A9F", fontWeight: 600 }}>{log.sku}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {getMovementIcon(log.movementType)}
                      <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, background: getMovementColor(log.movementType).bg, color: getMovementColor(log.movementType).text }}>
                        {log.movementType}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>
                    {log.movementType === "Stock In" ? "+" : "-"}{log.quantity}
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{log.performedBy}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>{log.balanceBefore}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#065F46", fontWeight: 700 }}>{log.balanceAfter}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={log.notes}>
                    {log.notes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ padding: "24px", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>
                  No audit logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
