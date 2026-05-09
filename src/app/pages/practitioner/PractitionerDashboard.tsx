import React, { useState } from "react";
import { CheckCircle, PlayCircle, Calendar, Users, CheckSquare, ArrowRight } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { StatusBadge, StatusType } from "../../components/StatusBadge";
import { useNavigate } from "react-router";

const todaySchedule = [
  { id: 1, time: "10:00 AM", client: "Sarah Johnson", initials: "SJ", color: "#2D6A9F", service: "Hydra Facial", duration: "60 min", status: "in-progress" as StatusType },
  { id: 2, time: "11:30 AM", client: "Miguel Cruz", initials: "MC", color: "#16A34A", service: "Chemical Peel", duration: "45 min", status: "confirmed" as StatusType },
  { id: 3, time: "1:00 PM", client: "Camille Torres", initials: "CT", color: "#7C3AED", service: "Hydra Facial", duration: "60 min", status: "confirmed" as StatusType },
  { id: 4, time: "2:30 PM", client: "Angela Park", initials: "AP", color: "#0891B2", service: "LED Therapy", duration: "30 min", status: "confirmed" as StatusType },
  { id: 5, time: "3:30 PM", client: "Kevin Bautista", initials: "KB", color: "#065F46", service: "Acne Treatment", duration: "45 min", status: "pending" as StatusType },
];

export default function PractitionerDashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(todaySchedule);

  const handleAction = (id: number, action: "start" | "complete") => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: action === "start" ? ("in-progress" as StatusType) : ("completed" as StatusType) }
          : s
      )
    );
  };

  return (
    <PageWrapper title="My Dashboard" breadcrumb="Practitioner / Dashboard">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Today's Appointments" value="5" icon={<Calendar size={18} />} delta={{ value: "+1 vs yesterday", positive: true }} variant="primary" />
        <StatCard label="Completed This Week" value="18" icon={<CheckSquare size={18} />} delta={{ value: "+4 vs last week", positive: true }} />
        <StatCard label="Patients Assigned" value="42" icon={<Users size={18} />} delta={{ value: "3 new this month", positive: true }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px" }}>
        {/* Today's Schedule */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>
              Today's Schedule — Apr 25, 2026
            </span>
            <button onClick={() => navigate("/practitioner/schedule")} style={{ background: "none", border: "none", cursor: "pointer", color: "#2D6A9F", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, padding: 0 }}>
              Full Schedule <ArrowRight size={14} />
            </button>
          </div>

          <div>
            {sessions.map((session, i) => (
              <div
                key={session.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  borderBottom: i < sessions.length - 1 ? "1px solid #F0F6FC" : "none",
                  background: session.status === "in-progress" ? "#F0F8FF" : "transparent",
                  borderLeft: session.status === "in-progress" ? "3px solid #2D6A9F" : "3px solid transparent",
                }}
              >
                {/* Time */}
                <div style={{ width: "70px", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}>{session.time}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{session.duration}</div>
                </div>

                {/* Client */}
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: session.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", color: "#FFFFFF", flexShrink: 0 }}>
                  {session.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{session.client}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{session.service}</div>
                </div>

                {/* Status & Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <StatusBadge status={session.status} />
                  {session.status === "confirmed" && (
                    <button
                      onClick={() => handleAction(session.id, "start")}
                      style={{ height: "30px", padding: "0 12px", background: "#EBF6FD", border: "1.5px solid #A8CCE8", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#2D6A9F" }}
                    >
                      <PlayCircle size={13} /> Start
                    </button>
                  )}
                  {session.status === "in-progress" && (
                    <button
                      onClick={() => handleAction(session.id, "complete")}
                      style={{ height: "30px", padding: "0 12px", background: "#DCFCE7", border: "1.5px solid #86EFAC", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#15803D" }}
                    >
                      <CheckCircle size={13} /> Complete
                    </button>
                  )}
                  {session.status === "completed" && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>Done</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Progress Card */}
          <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40", marginBottom: "16px" }}>
              Today's Progress
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Sessions completed</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                  {sessions.filter((s) => s.status === "completed").length}/{sessions.length}
                </span>
              </div>
              <div style={{ height: "6px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${(sessions.filter((s) => s.status === "completed").length / sessions.length) * 100}%`,
                  background: "#2D6A9F",
                  borderRadius: "9999px",
                  transition: "width 300ms",
                }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Pending", value: sessions.filter((s) => s.status === "pending" || s.status === "confirmed").length, color: "#F59E0B" },
                { label: "Completed", value: sessions.filter((s) => s.status === "completed").length, color: "#16A34A" },
                { label: "In Progress", value: sessions.filter((s) => s.status === "in-progress").length, color: "#2D6A9F" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#F0F6FC", borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: stat.color }}>{stat.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40", marginBottom: "12px" }}>Quick Links</div>
            {[
              { label: "View Full Schedule", path: "/practitioner/schedule", icon: <Calendar size={16} color="#2D6A9F" /> },
              { label: "My Patients", path: "/practitioner/patients", icon: <Users size={16} color="#2D6A9F" /> },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                style={{ width: "100%", height: "44px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", padding: "0 14px", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}
              >
                {link.icon}
                {link.label}
                <ArrowRight size={13} color="#9BBAD4" style={{ marginLeft: "auto" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
