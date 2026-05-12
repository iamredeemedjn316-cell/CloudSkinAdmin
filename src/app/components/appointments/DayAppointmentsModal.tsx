import React from "react";
import { X } from "lucide-react";
import { StatusType } from "../../components/StatusBadge";

interface Appointment {
  id: number;
  client: string;
  time: string;
  type: "online" | "f2f";
  status: StatusType;
  service: string;
  practitioner: string;
  duration: string;
}

interface DayAppointmentsModalProps {
  date: string;
  appointments: Appointment[];
  onClose: () => void;
}

export default function DayAppointmentsModal({ date, appointments, onClose }: DayAppointmentsModalProps) {
  // Sort appointments by time
  const sortedAppointments = [...appointments].sort((a, b) => a.time.localeCompare(b.time));

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
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: "#1A2E40", margin: 0 }}>
              Appointments for {date}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", margin: "4px 0 0 0" }}>
              {sortedAppointments.length} appointment{sortedAppointments.length !== 1 ? "s" : ""}
            </p>
          </div>
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
        <div style={{ padding: "24px" }}>
          {sortedAppointments.length === 0 ? (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96", textAlign: "center", padding: "20px 0" }}>
              No appointments on this day.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {sortedAppointments.map((apt) => (
                <div
                  key={apt.id}
                  style={{
                    padding: "16px",
                    background: apt.type === "f2f" ? "#EFF6FF" : "#F0FDF4",
                    borderLeft: `4px solid ${apt.type === "f2f" ? "#1E40AF" : "#16A34A"}`,
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                        {apt.client}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", margin: "2px 0 0 0" }}>
                        {apt.service}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: apt.type === "f2f" ? "#DBEAFE" : "#DCFCE7",
                        color: apt.type === "f2f" ? "#1E40AF" : "#16A34A",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {apt.type === "f2f" ? "F2F" : "Online"}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
                    <div>
                      <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Time: </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.time}</span>
                    </div>
                    <div>
                      <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Duration: </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.duration}</span>
                    </div>
                    <div>
                      <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Practitioner: </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.practitioner}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
