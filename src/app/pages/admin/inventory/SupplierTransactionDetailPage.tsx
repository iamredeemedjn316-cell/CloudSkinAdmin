import React, { useState } from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";
import { StatCard } from "../../../components/StatCard";
import { ArrowLeft, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const transactionData = {
  "T001": {
    poNumber: "PO-2024-001",
    supplierName: "MediCare Supplies Ltd",
    date: "2024-05-10",
    totalAmount: "$5,230",
    totalItems: 12,
    status: "Delivered",
    items: [
      { id: "ITEM001", sku: "MED-HYD-001", name: "HydraFacial Serums (12 pack)", quantity: 5, unitPrice: "$45", totalPrice: "$225" },
      { id: "ITEM002", sku: "MED-LAC-002", name: "Laser Treatment Pads", quantity: 3, unitPrice: "$120", totalPrice: "$360" },
      { id: "ITEM003", sku: "MED-GLY-003", name: "Glycolic Acid Peel", quantity: 2, unitPrice: "$85", totalPrice: "$170" },
      { id: "ITEM004", sku: "MED-RET-004", name: "Retinol Night Cream", quantity: 4, unitPrice: "$65", totalPrice: "$260" },
    ],
  },
  "T002": {
    poNumber: "PO-2024-002",
    supplierName: "MediCare Supplies Ltd",
    date: "2024-05-08",
    totalAmount: "$8,950",
    totalItems: 24,
    status: "Delivered",
    items: [
      { id: "ITEM005", sku: "MED-BOT-005", name: "Botox Alternative Serum", quantity: 10, unitPrice: "$150", totalPrice: "$1,500" },
      { id: "ITEM006", sku: "MED-MIC-006", name: "Microdermabrasion Crystals", quantity: 8, unitPrice: "$75", totalPrice: "$600" },
      { id: "ITEM007", sku: "MED-LED-007", name: "LED Light Therapy Panel", quantity: 2, unitPrice: "$450", totalPrice: "$900" },
      { id: "ITEM008", sku: "MED-HYD-008", name: "Hydrating Mask (20 packs)", quantity: 4, unitPrice: "$95", totalPrice: "$380" },
    ],
  },
};

export default function SupplierTransactionDetailPage() {
  const { supplierId, transactionId } = useParams();
  const navigate = useNavigate();

  const transaction = transactionData[transactionId as keyof typeof transactionData];

  if (!transaction) {
    return (
      <PageWrapper title="Transaction Not Found" subtitle="">
        <button onClick={() => navigate(`/admin/inventory/suppliers/${supplierId}`)} style={{ padding: "8px 16px", background: "#2D6A9F", color: "#FFFFFF", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
          Back to Transactions
        </button>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={`Transaction ${transaction.poNumber}`} subtitle="Items purchased in this transaction">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate(`/admin/inventory/suppliers/${supplierId}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "#2D6A9F", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Transaction Info */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px", background: "#F0F6FC", borderRadius: "12px", padding: "20px", border: "1px solid #D0E8F5" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Supplier</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40" }}>{transaction.supplierName}</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Date</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40" }}>{transaction.date}</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Status</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#065F46", background: "#D1FAE5", padding: "4px 10px", borderRadius: "6px", display: "inline-block" }}>
            {transaction.status}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Total Items" value={transaction.totalItems} icon={<Package size={18} />} variant="success" />
        <StatCard label="Total Amount" value={transaction.totalAmount} icon={<Package size={18} />} variant="info" />
      </div>

      {/* Items Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F0F6FC" }}>
              {["Item ID", "SKU", "Item Name", "Quantity", "Unit Price", "Total Price"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transaction.items.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#2D6A9F", fontWeight: 600 }}>{item.sku}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{item.name}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>{item.quantity}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 700 }}>{item.unitPrice}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 700 }}>{item.totalPrice}</td>
              </tr>
            ))}
            <tr style={{ background: "#F0F6FC", fontWeight: 700 }}>
              <td colSpan={5} style={{ padding: "12px 16px", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40" }}>
                Grand Total:
              </td>
              <td style={{ padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#2D6A9F", fontWeight: 700 }}>{transaction.totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
