import React from "react";
import { X } from "lucide-react";

interface Appointment {
  id: number;
  client: string;
  clientPhone: string;
  date: string;
  time: string;
  type: "online" | "f2f";
  status: "confirmed" | "in-progress" | "pending" | "cancelled" | "completed";
  service: string;
  practitioner: string;
  duration: string;
  paymentMethod: string;
  amount: string;
  paymentStatus: string;
}

interface AppointmentDetailsModalProps {
  appointment: Appointment | null;
  onClose: () => void;
}

export default function AppointmentDetailsModal({ appointment, onClose }: AppointmentDetailsModalProps) {
  if (!appointment) return null;

  const statusColors: Record<string, string> = {
    confirmed: "#16A34A",
    "in-progress": "#F59E0B",
    pending: "#3B82F6",
    cancelled: "#DC2626",
    completed: "#8B5CF6",
  };

  const paymentStatusColors: Record<string, string> = {
    paid: "#16A34A",
    unpaid: "#DC2626",
    pending: "#F59E0B",
  };

  const paymentMethodIcons: Record<string, string> = {
    cash: "💵",
    gcash: "📱",
    card: "💳",
    transfer: "🏦",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(26, 46, 64, 0.5)",
          zIndex: 40,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 20px 25px rgba(26, 46, 64, 0.15)",
          zIndex: 50,
          maxWidth: "600px",
          width: "90%",
          maxHeight: "85vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#FFFFFF", zIndex: 51 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: "#1A2E40", margin: 0 }}>
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Client Information */}
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", margin: "0 0 12px 0" }}>
              Client Information
            </h3>
            <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Name</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                  {appointment.client}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Phone</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                  {appointment.clientPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", margin: "0 0 12px 0" }}>
              Appointment Details
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Service</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                  {appointment.service}
                </p>
              </div>
              <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Practitioner</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                  {appointment.practitioner}
                </p>
              </div>
              <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Date & Time</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Duration</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                  {appointment.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Status & Type */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 8px 0", textTransform: "uppercase" }}>Status</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: statusColors[appointment.status] || "#3B82F6", color: "#FFFFFF", padding: "8px 12px", borderRadius: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.6)" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, textTransform: "capitalize" }}>
                  {appointment.status.replace("-", " ")}
                </span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 8px 0", textTransform: "uppercase" }}>Type</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: appointment.type === "f2f" ? "#DBEAFE" : "#DCFCE7", color: appointment.type === "f2f" ? "#1E40AF" : "#16A34A", padding: "8px 12px", borderRadius: "6px" }}>
                <span style={{ fontSize: "14px" }}>{appointment.type === "f2f" ? "👤" : "💻"}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
                  {appointment.type === "f2f" ? "Face to Face" : "Online"}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", margin: "0 0 12px 0" }}>
              Payment Information
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Amount</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#2D6A9F", margin: 0 }}>
                  {appointment.amount}
                </p>
              </div>
              <div style={{ background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Payment Status</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: paymentStatusColors[appointment.paymentStatus] || "#5A7A96", color: "#FFFFFF", padding: "4px 8px", borderRadius: "4px" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, textTransform: "capitalize" }}>
                    {appointment.paymentStatus}
                  </span>
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1", background: "#F0F6FC", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "0 0 4px 0" }}>Payment Method</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{paymentMethodIcons[appointment.paymentMethod] || "💰"}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", textTransform: "capitalize" }}>
                    {appointment.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              background: "#F0F6FC",
              color: "#2D6A9F",
              border: "1px solid #D0E8F5",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
