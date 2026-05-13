import React, { useState } from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { StatCard } from "../../../components/StatCard";
import { Search, ArrowLeft, Download, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const supplierData = {
  "1": {
    name: "MediCare Supplies Ltd",
    contactPerson: "John Smith",
    email: "john@medicare.com",
    phone: "+1 (555) 123-4567",
    city: "New York",
    country: "USA",
    totalTransactions: 24,
    totalSpent: "$125,430",
    transactions: [
      { id: "T001", date: "2024-05-10", poNumber: "PO-2024-001", totalAmount: "$5,230", items: 12, status: "Delivered" },
      { id: "T002", date: "2024-05-08", poNumber: "PO-2024-002", totalAmount: "$8,950", items: 24, status: "Delivered" },
      { id: "T003", date: "2024-04-28", poNumber: "PO-2024-003", totalAmount: "$3,450", items: 8, status: "Pending" },
      { id: "T004", date: "2024-04-15", poNumber: "PO-2024-004", totalAmount: "$12,100", items: 32, status: "Delivered" },
      { id: "T005", date: "2024-04-01", poNumber: "PO-2024-005", totalAmount: "$6,700", items: 15, status: "Delivered" },
    ],
  },
  "2": {
    name: "Global Health Products",
    contactPerson: "Maria Garcia",
    email: "maria@globalhealth.com",
    phone: "+1 (555) 234-5678",
    city: "Los Angeles",
    country: "USA",
    totalTransactions: 18,
    totalSpent: "$89,200",
    transactions: [
      { id: "T101", date: "2024-05-12", poNumber: "PO-2024-101", totalAmount: "$4,500", items: 10, status: "Delivered" },
      { id: "T102", date: "2024-05-01", poNumber: "PO-2024-102", totalAmount: "$7,200", items: 18, status: "Delivered" },
      { id: "T103", date: "2024-04-20", poNumber: "PO-2024-103", totalAmount: "$5,800", items: 14, status: "Pending" },
    ],
  },
};

export default function SupplierDetailPage() {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const supplier = supplierData[supplierId as keyof typeof supplierData];

  if (!supplier) {
    return (
      <PageWrapper title="Supplier Not Found" subtitle="">
        <button onClick={() => navigate("/admin/inventory/suppliers")} style={{ padding: "8px 16px", background: "#2D6A9F", color: "#FFFFFF", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
          Back to Suppliers
        </button>
      </PageWrapper>
    );
  }

  const filtered = supplier.transactions.filter((t) => t.poNumber.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageWrapper title={supplier.name} subtitle="Purchase transactions and order history">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/admin/inventory/suppliers")} style={{ background: "none", border: "none", cursor: "pointer", color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Supplier Info Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px", background: "#F0F6FC", borderRadius: "12px", padding: "20px", border: "1px solid #D0E8F5" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Contact Person</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40" }}>{supplier.contactPerson}</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Email</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40" }}>{supplier.email}</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Phone</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40" }}>{supplier.phone}</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Location</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40" }}>{supplier.city}, {supplier.country}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Total Transactions" value={supplier.totalTransactions} icon={<Package size={18} />} variant="success" />
        <StatCard label="Total Spent" value={supplier.totalSpent} icon={<Package size={18} />} variant="info" />
      </div>

      {/* Transactions Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search PO number..." style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
        </div>
        <button style={{ height: "40px", padding: "0 16px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px" }}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* Transactions Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F0F6FC" }}>
              {["Transaction ID", "PO Number", "Date", "Items", "Total Amount", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>{transaction.id}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#2D6A9F", fontWeight: 600 }}>{transaction.poNumber}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{transaction.date}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>{transaction.items}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 700 }}>{transaction.totalAmount}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, background: transaction.status === "Delivered" ? "#D1FAE5" : "#FEF3C7", color: transaction.status === "Delivered" ? "#065F46" : "#B45309" }}>
                      {transaction.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button onClick={() => navigate(`/admin/inventory/suppliers/${supplierId}/transactions/${transaction.id}`)} style={{ background: "none", border: "none", color: "#2D6A9F", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, textDecoration: "underline" }}>
                      View Items
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ padding: "24px", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
