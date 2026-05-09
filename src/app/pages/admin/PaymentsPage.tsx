import React, { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Eye, X, Download } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge, StatusType } from "../../components/StatusBadge";

const pendingPayments = [
  {
    id: "PAY001",
    initials: "CT",
    color: "#7C3AED",
    client: "Camille Torres",
    service: "Chemical Peel",
    date: "Apr 25, 2026",
    time: "1:00 PM",
    method: "gcash" as StatusType,
    amount: "₱3,500",
    uploadedAt: "10 min ago",
  },
  {
    id: "PAY002",
    initials: "RT",
    color: "#B45309",
    client: "Roberto Tan",
    service: "Microneedling",
    date: "Apr 26, 2026",
    time: "9:00 AM",
    method: "transfer" as StatusType,
    amount: "₱4,500",
    uploadedAt: "35 min ago",
  },
  {
    id: "PAY003",
    initials: "AG",
    color: "#7F1D1D",
    client: "Antonio Garcia",
    service: "PRP Hair Therapy",
    date: "Apr 28, 2026",
    time: "11:00 AM",
    method: "gcash" as StatusType,
    amount: "₱12,000",
    uploadedAt: "1 hr ago",
  },
];

const allTransactions = [
  { id: "TXN001", initials: "SJ", color: "#2D6A9F", client: "Sarah Johnson", service: "Hydra Facial", date: "Apr 25, 2026", method: "gcash" as StatusType, amount: "₱2,500", voucher: "—", discount: "—", total: "₱2,500", status: "paid" as StatusType },
  { id: "TXN002", initials: "MC", color: "#16A34A", client: "Miguel Cruz", service: "Botox Treatment", date: "Apr 25, 2026", method: "cash" as StatusType, amount: "₱8,000", voucher: "—", discount: "—", total: "₱8,000", status: "paid" as StatusType },
  { id: "TXN003", initials: "JD", color: "#EA580C", client: "Jose Dela Cruz", service: "PRP Therapy", date: "Apr 25, 2026", method: "card" as StatusType, amount: "₱12,000", voucher: "WELCOME20", discount: "₱2,400", total: "₱9,600", status: "paid" as StatusType },
  { id: "TXN004", initials: "AP", color: "#0891B2", client: "Angela Park", service: "LED Therapy", date: "Apr 25, 2026", method: "cash" as StatusType, amount: "₱1,800", voucher: "—", discount: "—", total: "₱1,800", status: "paid" as StatusType },
  { id: "TXN005", initials: "LG", color: "#9D174D", client: "Lisa Gomez", service: "Laser Resurfacing", date: "Apr 26, 2026", method: "card" as StatusType, amount: "₱15,000", voucher: "—", discount: "—", total: "₱15,000", status: "paid" as StatusType },
  { id: "TXN006", initials: "KB", color: "#065F46", client: "Kevin Bautista", service: "Acne Treatment", date: "Apr 26, 2026", method: "cash" as StatusType, amount: "₱2,800", voucher: "—", discount: "—", total: "₱2,800", status: "paid" as StatusType },
  { id: "TXN007", initials: "MV", color: "#0C4A6E", client: "Marco Villanueva", service: "IV Drip Wellness", date: "Apr 27, 2026", method: "transfer" as StatusType, amount: "₱3,500", voucher: "SKIN50", discount: "₱500", total: "₱3,000", status: "paid" as StatusType },
  { id: "TXN008", initials: "DR", color: "#6B21A8", client: "Diana Reyes", service: "Dermal Fillers", date: "Apr 27, 2026", method: "gcash" as StatusType, amount: "₱18,000", voucher: "—", discount: "—", total: "₱18,000", status: "unpaid" as StatusType },
];

export default function PaymentsPage() {
  const [tab, setTab] = useState<"pending" | "all">("pending");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  return (
    <PageWrapper title="Payments" breadcrumb="Admin / Payments">
      {/* Tab Bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #D0E8F5", marginBottom: "24px" }}>
        {[
          { key: "pending", label: "Pending Review", badge: pendingPayments.length },
          { key: "all", label: "All Transactions" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            style={{ background: "none", border: "none", borderBottom: tab === t.key ? "2px solid #2D6A9F" : "2px solid transparent", padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif", fontWeight: tab === t.key ? 600 : 400, fontSize: "14px", color: tab === t.key ? "#2D6A9F" : "#5A7A96", marginBottom: "-1px" }}
          >
            {t.label}
            {t.badge != null && t.badge > 0 && (
              <span style={{ background: "#EF4444", color: "#FFFFFF", fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, padding: "1px 7px", borderRadius: "9999px" }}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "pending" ? (
        <div>
          {/* Alert Banner */}
          <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderLeft: "4px solid #F59E0B", borderRadius: "10px", padding: "14px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <AlertTriangle size={18} color="#D97706" />
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#92400E" }}>
                {pendingPayments.length} proof-of-payment uploads awaiting review
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#B45309" }}>
                Please review and confirm or reject each payment below.
              </div>
            </div>
          </div>

          {/* Pending Payment Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {pendingPayments.map((payment) => (
              <div
                key={payment.id}
                style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", border: "1px solid #D0E8F5", overflow: "hidden" }}
              >
                <div style={{ padding: "18px 20px", borderBottom: "1px solid #F0F6FC" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: payment.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", flexShrink: 0 }}>
                      {payment.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>{payment.client}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4" }}>Uploaded {payment.uploadedAt}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <StatusBadge status={payment.method} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FBFF", borderRadius: "8px", padding: "12px", marginBottom: "12px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "4px" }}>{payment.service}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{payment.date} · {payment.time}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: "#2D6A9F", marginTop: "8px" }}>{payment.amount}</div>
                  </div>

                  {/* Proof image placeholder */}
                  <div
                    style={{ background: "#F0F6FC", borderRadius: "8px", height: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1.5px dashed #A8CCE8", marginBottom: "4px" }}
                  >
                    <Eye size={20} color="#9BBAD4" />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginTop: "6px" }}>Click to view proof of payment</div>
                  </div>
                </div>

                <div style={{ padding: "14px 20px" }}>
                  {rejectingId === payment.id ? (
                    <div>
                      <input
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter rejection reason..."
                        style={{ width: "100%", height: "36px", border: "1.5px solid #FCA5A5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", marginBottom: "10px", boxSizing: "border-box" }}
                      />
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => setRejectingId(null)} style={{ flex: 1, height: "34px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#5A7A96" }}>Cancel</button>
                        <button style={{ flex: 1, height: "34px", background: "#DC2626", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Confirm Reject</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => setRejectingId(payment.id)}
                        style={{ flex: 1, height: "36px", background: "none", border: "1.5px solid #FCA5A5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        <XCircle size={15} /> Reject
                      </button>
                      <button
                        style={{ flex: 1, height: "36px", background: "#16A34A", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        <CheckCircle size={15} /> Confirm Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>
              {allTransactions.length} Transactions
            </span>
            <button style={{ height: "36px", padding: "0 14px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", color: "#5A7A96", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500 }}>
              <Download size={14} /> Export CSV
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead>
                <tr style={{ background: "#F0F6FC" }}>
                  {["Client", "Service", "Date", "Method", "Amount", "Voucher", "Discount", "Total", "Status"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: tx.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#FFFFFF", flexShrink: 0 }}>{tx.initials}</div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}>{tx.client}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{tx.service}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{tx.date}</span></td>
                    <td style={{ padding: "12px 16px" }}><StatusBadge status={tx.method} /></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>{tx.amount}</span></td>
                    <td style={{ padding: "12px 16px" }}>
                      {tx.voucher !== "—" ? (
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", background: "#EBF6FD", color: "#2D6A9F", padding: "2px 8px", borderRadius: "6px" }}>{tx.voucher}</span>
                      ) : (
                        <span style={{ color: "#9BBAD4", fontSize: "13px" }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: tx.discount !== "—" ? "#DC2626" : "#9BBAD4" }}>{tx.discount}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: "#1A2E40" }}>{tx.total}</span></td>
                    <td style={{ padding: "12px 16px" }}><StatusBadge status={tx.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
