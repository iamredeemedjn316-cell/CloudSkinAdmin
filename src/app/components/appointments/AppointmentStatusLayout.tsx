import React, { useState, useEffect } from "react";
import {
  Search, Filter, Download, Plus, Eye, Pencil, MoreVertical,
  ChevronLeft, ChevronRight, X
} from "lucide-react";
import { StatusBadge, StatusType } from "../../components/StatusBadge";
import AppointmentCalendar from "../../components/appointments/AppointmentCalendar";
import DayAppointmentsModal from "../../components/appointments/DayAppointmentsModal";

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
  type: "online" | "f2f";
  isExistingClient: boolean;
  bookedBy?: "admin" | "receptionist" | "patient";
}

interface AppointmentStatusLayoutProps {
  title: string;
  breadcrumb: string;
  statusFilter: StatusType;
  appointments: Appointment[];
}

export function AppointmentStatusLayout({ title, breadcrumb, statusFilter, appointments }: AppointmentStatusLayoutProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const rowsPerPage = 10;

  const filtered = appointments.filter((a) => {
    const matchSearch = a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const appointmentsOnSelectedDay = selectedDate 
    ? appointments.filter(a => a.date === selectedDate && a.status === statusFilter)
    : [];

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "28px", fontWeight: 700, color: "#1A2E40", marginBottom: "8px" }}>
        {title}
      </h1>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
        {breadcrumb}
      </p>

      {/* Main Layout: List (60%) and Calendar (40%) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: "24px" }}>
        {/* List View */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          {/* Header with Search */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
              <input
                type="text"
                placeholder="Search by client or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 36px",
                  border: "1px solid #D0E8F5",
                  borderRadius: "8px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                }}
              />
            </div>
            <button style={{ width: "36px", height: "36px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}>
              <Filter size={16} />
            </button>
            <button style={{ width: "36px", height: "36px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}>
              <Download size={16} />
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F8FBFF", borderBottom: "1px solid #D0E8F5" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>#ID</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Client</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Service</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Date & Time</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Type</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Practitioner</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Payment</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((apt) => (
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
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          background: apt.type === "f2f" ? "#EFF6FF" : "#F0FDF4",
                          color: apt.type === "f2f" ? "#1E40AF" : "#16A34A",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        <span>{apt.type === "f2f" ? "F2F" : "Online"}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{apt.practitioner}</span>
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
                    color: page === p ? "#FFFFFF" : "#5A7A96",
                    border: page === p ? "none" : "1.5px solid #D0E8F5",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
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

        {/* Calendar View */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden", padding: "20px" }}>
          <AppointmentCalendar 
            appointments={appointments} 
            statusFilter={statusFilter}
            onDayClick={handleDayClick}
          />
        </div>
      </div>

      {/* Day Modal */}
      {showDayModal && selectedDate && (
        <DayAppointmentsModal 
          date={selectedDate}
          appointments={appointmentsOnSelectedDay}
          onClose={() => setShowDayModal(false)}
        />
      )}
    </div>
  );
}
