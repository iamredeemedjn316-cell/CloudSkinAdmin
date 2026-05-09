import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge, StatusType } from "../../components/StatusBadge";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 9 }, (_, i) => `${i + 9}:00 ${i + 9 < 12 ? "AM" : "PM"}`).map((h) =>
  h.replace("12:00 PM", "12:00 PM").replace("13:00 PM", "1:00 PM").replace("14:00 PM", "2:00 PM").replace("15:00 PM", "3:00 PM").replace("16:00 PM", "4:00 PM").replace("17:00 PM", "5:00 PM")
);

const weekEvents = [
  { day: 1, hour: 1, client: "Sarah Johnson", initials: "SJ", service: "Hydra Facial", duration: "60 min", phone: "0917-123-4567", status: "in-progress" as StatusType },
  { day: 1, hour: 2, client: "Camille Torres", initials: "CT", service: "Hydra Facial", duration: "60 min", phone: "0919-345-6789", status: "confirmed" as StatusType },
  { day: 1, hour: 4, client: "Angela Park", initials: "AP", service: "LED Therapy", duration: "30 min", phone: "0921-567-8901", status: "confirmed" as StatusType },
  { day: 2, hour: 1, client: "Roberto Tan", initials: "RT", service: "Microneedling", duration: "60 min", phone: "0922-678-9012", status: "pending" as StatusType },
  { day: 3, hour: 2, client: "Patricia Santos", initials: "PS", service: "Hydra Facial", duration: "60 min", phone: "0927-123-4567", status: "confirmed" as StatusType },
  { day: 4, hour: 1, client: "Kevin Bautista", initials: "KB", service: "Acne Treatment", duration: "45 min", phone: "0924-890-1234", status: "confirmed" as StatusType },
  { day: 5, hour: 3, client: "Diana Reyes", initials: "DR", service: "Chemical Peel", duration: "45 min", phone: "0925-901-2345", status: "cancelled" as StatusType },
];

const statusColors: Record<string, string> = {
  "in-progress": "#2D6A9F",
  confirmed: "#16A34A",
  pending: "#D97706",
  cancelled: "#DC2626",
  completed: "#475569",
};

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <PageWrapper title="My Schedule" breadcrumb="Practitioner / Schedule">
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5", display: "flex", alignItems: "center", gap: "10px" }}>
          <button style={{ height: "34px", padding: "0 12px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", color: "#5A7A96" }}><ChevronLeft size={14} /></button>
          <button style={{ height: "34px", padding: "0 14px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F" }}>Today</button>
          <button style={{ height: "34px", padding: "0 12px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", color: "#5A7A96" }}><ChevronRight size={14} /></button>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>Apr 20 – Apr 26, 2026</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
            {(["week", "month"] as const).map((v) => (
              <button key={v} onClick={() => setViewMode(v)} style={{ height: "34px", padding: "0 14px", background: viewMode === v ? "#2D6A9F" : "none", border: `1.5px solid ${viewMode === v ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: viewMode === v ? "#FFFFFF" : "#5A7A96", textTransform: "capitalize" }}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "760px" }}>
            {/* Header Row */}
            <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #D0E8F5" }}>
              <div style={{ height: "44px", borderRight: "1px solid #D0E8F5" }} />
              {days.map((day, i) => {
                const date = 20 + i;
                const isToday = date === 25;
                return (
                  <div key={day} style={{ height: "44px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: isToday ? "#EBF6FD" : "transparent", borderRight: i < 6 ? "1px solid #D0E8F5" : "none" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#9BBAD4", textTransform: "uppercase" }}>{day}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: isToday ? 700 : 500, fontSize: "14px", color: isToday ? "#2D6A9F" : "#1A2E40" }}>{date}</div>
                  </div>
                );
              })}
            </div>

            {/* Time rows */}
            {["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"].map((hour, hi) => (
              <div key={hour} style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #F0F6FC", minHeight: "64px" }}>
                <div style={{ padding: "8px 8px 0", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#9BBAD4", borderRight: "1px solid #D0E8F5", flexShrink: 0 }}>{hour}</div>
                {days.map((_, di) => {
                  const dayEvents = weekEvents.filter((e) => e.day === di && e.hour === hi);
                  const isToday = di + 20 === 25;
                  return (
                    <div key={di} style={{ background: isToday ? "rgba(91,192,235,0.03)" : "transparent", borderRight: di < 6 ? "1px solid #F0F6FC" : "none", padding: "4px", minHeight: "64px" }}>
                      {dayEvents.map((ev, ei) => (
                        <div
                          key={ei}
                          onClick={() => setSelectedEvent(ev)}
                          style={{ background: statusColors[ev.status] || "#2D6A9F", borderRadius: "6px", padding: "6px 8px", cursor: "pointer", marginBottom: "2px" }}
                        >
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.client}</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.service}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Drawer */}
      {selectedEvent && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.3)", zIndex: 90 }} onClick={() => setSelectedEvent(null)} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "400px", background: "#FFFFFF", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", zIndex: 100, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Appointment Detail</span>
              <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "18px", color: "#1A2E40" }}>{selectedEvent.client}</div>
                <StatusBadge status={selectedEvent.status} />
              </div>
              {[
                { label: "Service", value: selectedEvent.service },
                { label: "Duration", value: selectedEvent.duration },
                { label: "Phone", value: selectedEvent.phone },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                  <div style={{ width: "100px", flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96" }}>{f.label}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", gap: "10px" }}>
              {selectedEvent.status === "confirmed" && (
                <button style={{ flex: 1, height: "38px", background: "#EBF6FD", border: "1.5px solid #A8CCE8", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#2D6A9F" }}>Start Session</button>
              )}
              {selectedEvent.status === "in-progress" && (
                <button style={{ flex: 1, height: "38px", background: "#DCFCE7", border: "1.5px solid #86EFAC", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#15803D" }}>Complete Session</button>
              )}
              <button onClick={() => setSelectedEvent(null)} style={{ flex: 1, height: "38px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Close</button>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
}
