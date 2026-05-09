import React, { useState } from "react";
import {
  Search, Filter, Download, Plus, Eye, Pencil, MoreVertical,
  ChevronLeft, ChevronRight, CalendarDays, List, X
} from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge, StatusType } from "../../components/StatusBadge";

interface Appointment {
  id: number;
  client: string;
  clientPhone: string;
  clientInitials: string;
  clientColor: string;
  service: string;
  duration: string;
  date: string;
  time: string;
  practitioner: string;
  status: StatusType;
  paymentMethod: StatusType;
  amount: string;
  paymentStatus: StatusType;
}

const appointments: Appointment[] = [
  { id: 1001, client: "Sarah Johnson", clientPhone: "0917-123-4567", clientInitials: "SJ", clientColor: "#2D6A9F", service: "Hydra Facial", duration: "60 min", date: "Apr 25, 2026", time: "10:00 AM", practitioner: "Dr. Santos", status: "confirmed", paymentMethod: "gcash", amount: "₱2,500", paymentStatus: "paid" },
  { id: 1002, client: "Miguel Cruz", clientPhone: "0918-234-5678", clientInitials: "MC", clientColor: "#16A34A", service: "Botox Treatment", duration: "45 min", date: "Apr 25, 2026", time: "11:00 AM", practitioner: "Dr. Reyes", status: "in-progress", paymentMethod: "cash", amount: "₱8,000", paymentStatus: "paid" },
  { id: 1003, client: "Camille Torres", clientPhone: "0919-345-6789", clientInitials: "CT", clientColor: "#7C3AED", service: "Chemical Peel", duration: "45 min", date: "Apr 25, 2026", time: "1:00 PM", practitioner: "Dr. Santos", status: "pending", paymentMethod: "gcash", amount: "₱3,500", paymentStatus: "unpaid" },
  { id: 1004, client: "Jose Dela Cruz", clientPhone: "0920-456-7890", clientInitials: "JD", clientColor: "#EA580C", service: "PRP Therapy", duration: "90 min", date: "Apr 25, 2026", time: "2:30 PM", practitioner: "Dr. Lim", status: "confirmed", paymentMethod: "card", amount: "₱12,000", paymentStatus: "paid" },
  { id: 1005, client: "Angela Park", clientPhone: "0921-567-8901", clientInitials: "AP", clientColor: "#0891B2", service: "LED Therapy", duration: "30 min", date: "Apr 25, 2026", time: "3:30 PM", practitioner: "Dr. Reyes", status: "confirmed", paymentMethod: "cash", amount: "₱1,800", paymentStatus: "paid" },
  { id: 1006, client: "Roberto Tan", clientPhone: "0922-678-9012", clientInitials: "RT", clientColor: "#B45309", service: "Microneedling", duration: "60 min", date: "Apr 26, 2026", time: "9:00 AM", practitioner: "Dr. Santos", status: "pending", paymentMethod: "gcash", amount: "₱4,500", paymentStatus: "unpaid" },
  { id: 1007, client: "Lisa Gomez", clientPhone: "0923-789-0123", clientInitials: "LG", clientColor: "#9D174D", service: "Laser Resurfacing", duration: "90 min", date: "Apr 26, 2026", time: "10:30 AM", practitioner: "Dr. Lim", status: "confirmed", paymentMethod: "card", amount: "₱15,000", paymentStatus: "paid" },
  { id: 1008, client: "Kevin Bautista", clientPhone: "0924-890-1234", clientInitials: "KB", clientColor: "#065F46", service: "Acne Treatment", duration: "45 min", date: "Apr 26, 2026", time: "11:30 AM", practitioner: "Dr. Reyes", status: "confirmed", paymentMethod: "cash", amount: "₱2,800", paymentStatus: "paid" },
  { id: 1009, client: "Diana Reyes", clientPhone: "0925-901-2345", clientInitials: "DR", clientColor: "#6B21A8", service: "Dermal Fillers", duration: "60 min", date: "Apr 27, 2026", time: "10:00 AM", practitioner: "Dr. Santos", status: "cancelled", paymentMethod: "gcash", amount: "₱18,000", paymentStatus: "unpaid" },
  { id: 1010, client: "Marco Villanueva", clientPhone: "0926-012-3456", clientInitials: "MV", clientColor: "#0C4A6E", service: "IV Drip Wellness", duration: "60 min", date: "Apr 27, 2026", time: "2:00 PM", practitioner: "Dr. Lim", status: "completed", paymentMethod: "transfer", amount: "₱3,500", paymentStatus: "paid" },
  { id: 1011, client: "Patricia Santos", clientPhone: "0927-123-4567", clientInitials: "PS", clientColor: "#14532D", service: "Hydra Facial", duration: "60 min", date: "Apr 28, 2026", time: "9:30 AM", practitioner: "Dr. Santos", status: "confirmed", paymentMethod: "cash", amount: "₱2,500", paymentStatus: "paid" },
  { id: 1012, client: "Antonio Garcia", clientPhone: "0928-234-5678", clientInitials: "AG", clientColor: "#7F1D1D", service: "PRP Hair Therapy", duration: "90 min", date: "Apr 28, 2026", time: "11:00 AM", practitioner: "Dr. Lim", status: "pending", paymentMethod: "gcash", amount: "₱12,000", paymentStatus: "unpaid" },
];

const statusOptions = ["All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled", "No Show"];

export default function AppointmentsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNewModal, setShowNewModal] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = appointments.filter((a) => {
    const matchSearch = a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" ||
      a.status.replace("-", " ") === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageWrapper title="Appointments" breadcrumb="Admin / Appointments">
      {/* Tab Bar */}
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "1px solid #D0E8F5",
          marginBottom: "24px",
        }}
      >
        {[
          { key: "list", label: "List View", icon: <List size={15} /> },
          { key: "calendar", label: "Calendar View", icon: <CalendarDays size={15} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key as any)}
            style={{
              background: "none",
              border: "none",
              borderBottom: view === tab.key ? "2px solid #2D6A9F" : "2px solid transparent",
              padding: "12px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: view === tab.key ? 600 : 400,
              fontSize: "14px",
              color: view === tab.key ? "#2D6A9F" : "#5A7A96",
              marginBottom: "-1px",
              transition: "color 150ms",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {view === "list" ? (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Toolbar */}
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderBottom: "1px solid #D0E8F5",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>
                {filtered.length} Appointments
              </span>
              {statusFilter !== "All" && (
                <span
                  style={{
                    background: "#EBF6FD",
                    color: "#2D6A9F",
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    padding: "2px 10px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {statusFilter}
                  <X size={12} style={{ cursor: "pointer" }} onClick={() => setStatusFilter("All")} />
                </span>
              )}
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client or service..."
                style={{
                  width: "220px",
                  height: "36px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px 0 32px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  background: "#FFFFFF",
                }}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                height: "36px",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                padding: "0 12px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#1A2E40",
                outline: "none",
                background: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
            </select>

            <button
              style={{
                height: "36px",
                padding: "0 14px",
                background: "none",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                color: "#5A7A96",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              <Download size={14} /> Export
            </button>

            <button
              onClick={() => setShowNewModal(true)}
              style={{
                height: "36px",
                padding: "0 16px",
                background: "#2D6A9F",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <Plus size={14} /> New Appointment
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead>
                <tr style={{ background: "#F0F6FC" }}>
                  {["#", "Client", "Service", "Date & Time", "Practitioner", "Status", "Payment", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#5A7A96",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #D0E8F5",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((apt, i) => (
                  <tr
                    key={apt.id}
                    style={{ borderBottom: "1px solid #D0E8F5", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#9BBAD4" }}>
                        #{apt.id}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: apt.clientColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "11px",
                            color: "#FFFFFF",
                            flexShrink: 0,
                          }}
                        >
                          {apt.clientInitials}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>
                            {apt.client}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>
                            {apt.clientPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{apt.service}</div>
                      <div
                        style={{
                          display: "inline-block",
                          background: "#F0F6FC",
                          color: "#5A7A96",
                          fontSize: "11px",
                          fontFamily: "'Inter', sans-serif",
                          padding: "1px 8px",
                          borderRadius: "9999px",
                          marginTop: "2px",
                        }}
                      >
                        {apt.duration}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40" }}>{apt.date}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#5A7A96" }}>{apt.time}</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{apt.practitioner}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <StatusBadge status={apt.status} />
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <StatusBadge status={apt.paymentMethod} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                          {apt.amount}
                        </span>
                      </div>
                      <StatusBadge status={apt.paymentStatus} />
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <button
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "#F0F6FC",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#2D6A9F",
                          }}
                          title="View"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "#F0F6FC",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#5A7A96",
                          }}
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "#F0F6FC",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#5A7A96",
                          }}
                          title="More"
                        >
                          <MoreVertical size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #D0E8F5",
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
              Showing {Math.min((page - 1) * rowsPerPage + 1, filtered.length)}–{Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{
                  width: "32px",
                  height: "32px",
                  background: "none",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "6px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: page === 1 ? "#9BBAD4" : "#5A7A96",
                }}
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: "32px",
                    height: "32px",
                    background: page === p ? "#2D6A9F" : "none",
                    border: `1.5px solid ${page === p ? "#2D6A9F" : "#D0E8F5"}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: page === p ? "#FFFFFF" : "#5A7A96",
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                style={{
                  width: "32px",
                  height: "32px",
                  background: "none",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "6px",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: page === totalPages ? "#9BBAD4" : "#5A7A96",
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CalendarView />
      )}

      {/* New Appointment Modal */}
      {showNewModal && (
        <NewAppointmentModal onClose={() => setShowNewModal(false)} />
      )}
    </PageWrapper>
  );
}

function CalendarView() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
  const today = 25;

  const events = [
    { day: 2, hour: 1, client: "Sarah J.", color: "#2D6A9F", status: "confirmed" },
    { day: 2, hour: 2, client: "Miguel C.", color: "#5BC0EB", status: "in-progress" },
    { day: 2, hour: 4, client: "Camille T.", color: "#F59E0B", status: "pending" },
    { day: 3, hour: 1, client: "Roberto T.", color: "#F59E0B", status: "pending" },
    { day: 3, hour: 2, client: "Lisa G.", color: "#2D6A9F", status: "confirmed" },
    { day: 4, hour: 1, client: "Patricia S.", color: "#2D6A9F", status: "confirmed" },
    { day: 5, hour: 3, client: "Diana R.", color: "#EF4444", status: "cancelled" },
  ];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Calendar Toolbar */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #D0E8F5",
        }}
      >
        <button
          style={{
            height: "34px",
            padding: "0 14px",
            background: "none",
            border: "1.5px solid #D0E8F5",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "#5A7A96",
          }}
        >
          <ChevronLeft size={14} />
        </button>
        <button
          style={{
            height: "34px",
            padding: "0 16px",
            background: "#F0F6FC",
            border: "1.5px solid #D0E8F5",
            borderRadius: "8px",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#2D6A9F",
          }}
        >
          Today
        </button>
        <button
          style={{
            height: "34px",
            padding: "0 14px",
            background: "none",
            border: "1.5px solid #D0E8F5",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "#5A7A96",
          }}
        >
          <ChevronRight size={14} />
        </button>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>
          Apr 20 – Apr 26, 2026
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
          {["Week", "Month"].map((v) => (
            <button
              key={v}
              style={{
                height: "34px",
                padding: "0 14px",
                background: v === "Week" ? "#2D6A9F" : "none",
                border: `1.5px solid ${v === "Week" ? "#2D6A9F" : "#D0E8F5"}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: v === "Week" ? "#FFFFFF" : "#5A7A96",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "800px" }}>
          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #D0E8F5" }}>
            <div style={{ height: "44px", borderRight: "1px solid #D0E8F5" }} />
            {days.map((day, i) => {
              const date = 20 + i;
              const isToday = date === today;
              return (
                <div
                  key={day}
                  style={{
                    height: "44px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isToday ? "#EBF6FD" : "transparent",
                    borderRight: i < 6 ? "1px solid #D0E8F5" : "none",
                  }}
                >
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", textTransform: "uppercase" }}>
                    {day}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: isToday ? 700 : 500,
                      fontSize: "14px",
                      color: isToday ? "#2D6A9F" : "#1A2E40",
                    }}
                  >
                    {date}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time rows */}
          {hours.map((hour, hi) => (
            <div key={hour} style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #F0F6FC" }}>
              <div
                style={{
                  padding: "8px 8px 0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "#9BBAD4",
                  borderRight: "1px solid #D0E8F5",
                  height: "60px",
                }}
              >
                {hour}
              </div>
              {days.map((_, di) => {
                const dayEvents = events.filter((e) => e.day === di && e.hour === hi);
                const isToday = di + 20 === today;
                return (
                  <div
                    key={di}
                    style={{
                      height: "60px",
                      background: isToday ? "rgba(91,192,235,0.03)" : "transparent",
                      borderRight: di < 6 ? "1px solid #F0F6FC" : "none",
                      padding: "4px",
                      position: "relative",
                    }}
                  >
                    {dayEvents.map((ev, ei) => (
                      <div
                        key={ei}
                        style={{
                          background: ev.color,
                          borderRadius: "6px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          marginBottom: "2px",
                        }}
                      >
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {ev.client}
                        </div>
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
  );
}

function NewAppointmentModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,58,92,0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "540px",
          boxShadow: "0 8px 32px rgba(26,58,92,0.18)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>New Appointment</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96", display: "flex" }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: "24px" }}>
          {[
            { label: "Client", type: "text", placeholder: "Search client name..." },
            { label: "Service", type: "text", placeholder: "Select service..." },
            { label: "Practitioner", type: "text", placeholder: "Select practitioner..." },
            { label: "Date", type: "date", placeholder: "" },
            { label: "Time", type: "time", placeholder: "" },
            { label: "Notes", type: "textarea", placeholder: "Any notes for this appointment..." },
          ].map((field) => (
            <div key={field.label} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  rows={3}
                  style={{ width: "100%", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "10px 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#5A7A96" }}>
            Cancel
          </button>
          <button style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
