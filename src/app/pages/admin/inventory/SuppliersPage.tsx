import React, { useState } from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { StatCard } from "../../../components/StatCard";
import { Search, Plus, Building2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const suppliers = [
  { id: "1", name: "MediCare Supplies Ltd", contactPerson: "John Smith", email: "john@medicare.com", phone: "+1 (555) 123-4567", city: "New York", country: "USA", totalTransactions: 24, lastOrder: "2024-05-10", status: "Active" },
  { id: "2", name: "Global Health Products", contactPerson: "Maria Garcia", email: "maria@globalhealth.com", phone: "+1 (555) 234-5678", city: "Los Angeles", country: "USA", totalTransactions: 18, lastOrder: "2024-05-12", status: "Active" },
  { id: "3", name: "Premier Medical Distributor", contactPerson: "Robert Chen", email: "robert@premier.com", phone: "+1 (555) 345-6789", city: "Chicago", country: "USA", totalTransactions: 31, lastOrder: "2024-05-08", status: "Active" },
  { id: "4", name: "Elite Pharmaceutical Inc", contactPerson: "Sarah Johnson", email: "sarah@elite.com", phone: "+1 (555) 456-7890", city: "Houston", country: "USA", totalTransactions: 12, lastOrder: "2024-04-28", status: "Inactive" },
  { id: "5", name: "Express Medical Solutions", contactPerson: "David Martinez", email: "david@express.com", phone: "+1 (555) 567-8901", city: "Phoenix", country: "USA", totalTransactions: 15, lastOrder: "2024-05-11", status: "Active" },
];

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = suppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.contactPerson.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageWrapper title="Suppliers" subtitle="Manage all your suppliers and purchase orders">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search suppliers..." style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          <button style={{ height: "40px", padding: "0 16px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px" }}>
            <Download size={14} /> Export
          </button>
          <button style={{ height: "40px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
            <Plus size={14} /> Add Supplier
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Total Suppliers" value={suppliers.length} icon={<Building2 size={18} />} variant="success" />
        <StatCard label="Active Suppliers" value={suppliers.filter((s) => s.status === "Active").length} icon={<Building2 size={18} />} variant="info" />
      </div>

      {/* Suppliers Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F0F6FC" }}>
              {["Supplier Name", "Contact Person", "Email", "Phone", "City", "Transactions", "Last Order", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((supplier) => (
                <tr key={supplier.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{supplier.name}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{supplier.contactPerson}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{supplier.email}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{supplier.phone}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{supplier.city}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>{supplier.totalTransactions}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{supplier.lastOrder}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, background: supplier.status === "Active" ? "#D1FAE5" : "#F3F4F6", color: supplier.status === "Active" ? "#065F46" : "#374151" }}>
                      {supplier.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button onClick={() => navigate(`/admin/inventory/suppliers/${supplier.id}`)} style={{ background: "none", border: "none", color: "#2D6A9F", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, textDecoration: "underline" }}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ padding: "24px", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
