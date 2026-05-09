import React, { useState } from "react";
import { CheckCircle, Eye, CreditCard, Clock, AlertTriangle } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { StatusBadge, StatusType } from "../../components/StatusBadge";
import { Calendar, Users } from "lucide-react";

const todayQueue = [
  { id: 1, time: "9:00 AM", initials: "SJ", color: "#2D6A9F", client: "Sarah Johnson", service: "Hydra Facial", practitioner: "Dr. Santos", status: "in-progress" as StatusType },
  { id: 2, time: "10:00 AM", initials: "MC", color: "#16A34A", client: "Miguel Cruz", service: "Botox Treatment", practitioner: "Dr. Reyes", status: "confirmed" as StatusType },
  { id: 3, time: "11:00 AM", initials: "CT", color: "#7C3AED", client: "Camille Torres", service: "Chemical Peel", practitioner: "Dr. Santos", status: "pending" as StatusType },
  { id: 4, time: "1:00 PM", initials: "JD", color: "#EA580C", client: "Jose Dela Cruz", service: "PRP Therapy", practitioner: "Dr. Lim", status: "confirmed" as StatusType },
  { id: 5, time: "2:30 PM", initials: "AP", color: "#0891B2", client: "Angela Park", service: "LED Therapy", practitioner: "Dr. Reyes", status: "confirmed" as StatusType },
  { id: 6, time: "3:00 PM", initials: "RT", color: "#B45309", client: "Roberto Tan", service: "Microneedling", practitioner: "Dr. Santos", status: "completed" as StatusType },
];

const pendingPayments = [
  { id: "P001", initials: "CT", color: "#7C3AED", client: "Camille Torres", service: "Chemical Peel", method: "gcash" as StatusType, amount: "₱3,500" },
  { id: "P002", initials: "RT", color: "#B45309", client: "Roberto Tan", service: "Microneedling", method: "transfer" as StatusType, amount: "₱4,500" },
];

const checkoutModal = {
  client: "Roberto Tan",
  service: "Microneedling",
  practitioner: "Dr. Maria Santos",
  date: "Apr 25, 2026",
  time: "3:00 PM",
  servicePrice: 4500,
  discount: 0,
  total: 4500,
};

export default function ReceptionistDashboard() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [queue, setQueue] = useState(todayQueue);

  const handleCheckIn = (id: number) => {
    setQueue((prev) => prev.map((a) => a.id === id ? { ...a, status: "in-progress" as StatusType } : a));
  };

  const handleCheckout = (id: number) => {
    setShowCheckout(true);
  };

  const handleApplyVoucher = () => {
    if (voucherCode.toUpperCase() === "WELCOME20") {
      setVoucherApplied(true);
    }
  };

  const discountAmount = voucherApplied ? Math.round(checkoutModal.servicePrice * 0.2) : 0;
  const total = checkoutModal.servicePrice - discountAmount;

  return (
    <PageWrapper title="Reception Dashboard" breadcrumb="Receptionist / Dashboard">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Today's Appointments" value="8" icon={<Calendar size={18} />} delta={{ value: "+2 vs yesterday", positive: true }} variant="primary" />
        <StatCard label="Checked In" value="3" icon={<Users size={18} />} delta={{ value: "Currently in clinic", positive: true }} />
        <StatCard label="Pending Payments" value={pendingPayments.length} icon={<CreditCard size={18} />} variant="warning" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px" }}>
        {/* Check-in Queue */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>
              Today's Check-In Queue
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr style={{ background: "#F0F6FC" }}>
                  {["Time", "Client", "Service", "Practitioner", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((apt, i) => (
                  <tr key={apt.id} style={{ borderBottom: i < queue.length - 1 ? "1px solid #D0E8F5" : "none" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} color="#9BBAD4" />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#1A2E40" }}>{apt.time}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: apt.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#FFFFFF", flexShrink: 0 }}>
                          {apt.initials}
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}>{apt.client}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{apt.service}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{apt.practitioner}</span></td>
                    <td style={{ padding: "12px 16px" }}><StatusBadge status={apt.status} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {apt.status === "confirmed" && (
                          <button onClick={() => handleCheckIn(apt.id)} style={{ height: "28px", padding: "0 10px", background: "#EBF6FD", border: "1.5px solid #A8CCE8", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#2D6A9F", display: "flex", alignItems: "center", gap: "4px" }}>
                            <CheckCircle size={12} /> Check In
                          </button>
                        )}
                        {apt.status === "completed" && (
                          <button onClick={() => handleCheckout(apt.id)} style={{ height: "28px", padding: "0 10px", background: "#DCFCE7", border: "1.5px solid #86EFAC", borderRadius: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#15803D" }}>
                            Checkout
                          </button>
                        )}
                        <button style={{ width: "28px", height: "28px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }}><Eye size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Payments Widget */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5", display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertTriangle size={16} color="#D97706" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>Pending Payments</span>
          </div>
          <div>
            {pendingPayments.map((p, i) => (
              <div key={p.id} style={{ padding: "14px 20px", borderBottom: i < pendingPayments.length - 1 ? "1px solid #F0F6FC" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", color: "#FFFFFF" }}>
                    {p.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>{p.client}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{p.service}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px", color: "#2D6A9F" }}>{p.amount}</div>
                    <StatusBadge status={p.method} />
                  </div>
                </div>
                <button style={{ width: "100%", height: "34px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>
                  Review Payment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowCheckout(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "640px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Patient Checkout</span>
              <button onClick={() => setShowCheckout(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96", display: "flex" }}>✕</button>
            </div>
            <div style={{ padding: "24px" }}>
              {/* Appointment Summary */}
              <div style={{ background: "#F0F6FC", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#5A7A96", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "11px" }}>Appointment Summary</div>
                {[
                  { label: "Client", value: checkoutModal.client },
                  { label: "Service", value: checkoutModal.service },
                  { label: "Practitioner", value: checkoutModal.practitioner },
                  { label: "Date & Time", value: `${checkoutModal.date} · ${checkoutModal.time}` },
                ].map((f) => (
                  <div key={f.label} style={{ display: "flex", gap: "12px", marginBottom: "6px" }}>
                    <div style={{ width: "110px", flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96" }}>{f.label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{f.value}</div>
                  </div>
                ))}
              </div>

              {/* Voucher */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Voucher Code</label>
                {voucherApplied ? (
                  <div style={{ background: "#DCFCE7", border: "1.5px solid #86EFAC", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle size={16} color="#16A34A" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#15803D" }}>WELCOME20 applied — 20% discount (₱{discountAmount.toLocaleString()} off)</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input value={voucherCode} onChange={(e) => setVoucherCode(e.target.value.toUpperCase())} placeholder="Enter voucher code..." style={{ flex: 1, height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#1A2E40", outline: "none" }} />
                    <button onClick={handleApplyVoucher} style={{ height: "40px", padding: "0 16px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Apply</button>
                  </div>
                )}
              </div>

              {/* Payment Summary */}
              <div style={{ background: "#F8FBFF", borderRadius: "10px", padding: "16px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>Service Price</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>₱{checkoutModal.servicePrice.toLocaleString()}</span>
                </div>
                {voucherApplied && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#16A34A" }}>Voucher Discount</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#16A34A" }}>−₱{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ height: "1px", background: "#D0E8F5", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px", color: "#1A2E40" }}>Total</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "#2D6A9F" }}>₱{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "10px" }}>Payment Method</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {[
                    { key: "cash", label: "Cash", icon: "💵" },
                    { key: "gcash", label: "GCash", icon: "📱" },
                    { key: "card", label: "Card", icon: "💳" },
                    { key: "transfer", label: "Transfer", icon: "🏦" },
                  ].map((method) => (
                    <button
                      key={method.key}
                      onClick={() => setPaymentMethod(method.key)}
                      style={{ padding: "12px 8px", border: `1.5px solid ${paymentMethod === method.key ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", background: paymentMethod === method.key ? "#EBF6FD" : "#FFFFFF", cursor: "pointer", textAlign: "center" }}
                    >
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>{method.icon}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: paymentMethod === method.key ? "#2D6A9F" : "#5A7A96" }}>{method.label}</div>
                    </button>
                  ))}
                </div>
                {paymentMethod !== "cash" && (
                  <div style={{ marginTop: "12px", border: "1.5px dashed #A8CCE8", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>Upload proof of payment</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", marginTop: "4px" }}>Drag & drop or click to browse</div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowCheckout(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button style={{ height: "38px", padding: "0 24px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Confirm Checkout</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
