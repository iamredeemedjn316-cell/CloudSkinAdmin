import React, { useState } from "react";
import { Calendar, CheckCircle, Clock, XCircle, List } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import AppointmentCalendar from "../../components/appointments/AppointmentCalendar";
import DayAppointmentsModal from "../../components/appointments/DayAppointmentsModal";
import { StatusBadge } from "../../components/StatusBadge";
import { Search, Filter, Download, Eye, Pencil, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

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
  status: "confirmed" | "in-progress" | "pending" | "cancelled" | "completed";
  paymentMethod: string;
  amount: string;
  paymentStatus: string;
  type: "online" | "f2f";
  isExistingClient: boolean;
  bookedBy?: "admin" | "receptionist" | "patient";
}

const appointments: Appointment[] = [
  { id: 1001, client: "Sarah Johnson", clientPhone: "0917-123-4567", clientInitials: "SJ", clientColor: "#2D6A9F", service: "Hydra Facial", duration: "60 min", date: "Apr 25, 2026", time: "10:00 AM", practitioner: "Dr. Santos", status: "confirmed", paymentMethod: "gcash", amount: "₱2,500", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "receptionist" },
  { id: 1002, client: "Miguel Cruz", clientPhone: "0918-234-5678", clientInitials: "MC", clientColor: "#16A34A", service: "Botox Treatment", duration: "45 min", date: "Apr 25, 2026", time: "11:00 AM", practitioner: "Dr. Reyes", status: "in-progress", paymentMethod: "cash", amount: "₱8,000", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1003, client: "Camille Torres", clientPhone: "0919-345-6789", clientInitials: "CT", clientColor: "#7C3AED", service: "Chemical Peel", duration: "45 min", date: "Apr 25, 2026", time: "1:00 PM", practitioner: "Dr. Santos", status: "pending", paymentMethod: "gcash", amount: "₱3,500", paymentStatus: "unpaid", type: "online", isExistingClient: false, bookedBy: "patient" },
  { id: 1004, client: "Jose Dela Cruz", clientPhone: "0920-456-7890", clientInitials: "JD", clientColor: "#EA580C", service: "PRP Therapy", duration: "90 min", date: "Apr 25, 2026", time: "2:30 PM", practitioner: "Dr. Lim", status: "confirmed", paymentMethod: "card", amount: "₱12,000", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1005, client: "Angela Park", clientPhone: "0921-567-8901", clientInitials: "AP", clientColor: "#0891B2", service: "LED Therapy", duration: "30 min", date: "Apr 25, 2026", time: "3:30 PM", practitioner: "Dr. Reyes", status: "confirmed", paymentMethod: "cash", amount: "₱1,800", paymentStatus: "paid", type: "online", isExistingClient: true, bookedBy: "patient" },
  { id: 1006, client: "Roberto Tan", clientPhone: "0922-678-9012", clientInitials: "RT", clientColor: "#B45309", service: "Microneedling", duration: "60 min", date: "Apr 26, 2026", time: "9:00 AM", practitioner: "Dr. Santos", status: "pending", paymentMethod: "gcash", amount: "₱4,500", paymentStatus: "unpaid", type: "f2f", isExistingClient: true, bookedBy: "receptionist" },
  { id: 1007, client: "Lisa Gomez", clientPhone: "0923-789-0123", clientInitials: "LG", clientColor: "#9D174D", service: "Laser Resurfacing", duration: "90 min", date: "Apr 26, 2026", time: "10:30 AM", practitioner: "Dr. Lim", status: "confirmed", paymentMethod: "card", amount: "₱15,000", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1008, client: "Kevin Bautista", clientPhone: "0924-890-1234", clientInitials: "KB", clientColor: "#065F46", service: "Acne Treatment", duration: "45 min", date: "Apr 26, 2026", time: "11:30 AM", practitioner: "Dr. Reyes", status: "confirmed", paymentMethod: "cash", amount: "₱2,800", paymentStatus: "paid", type: "online", isExistingClient: false, bookedBy: "patient" },
  { id: 1009, client: "Diana Reyes", clientPhone: "0925-901-2345", clientInitials: "DR", clientColor: "#6B21A8", service: "Dermal Fillers", duration: "60 min", date: "Apr 27, 2026", time: "10:00 AM", practitioner: "Dr. Santos", status: "cancelled", paymentMethod: "gcash", amount: "₱18,000", paymentStatus: "unpaid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1010, client: "Marco Villanueva", clientPhone: "0926-012-3456", clientInitials: "MV", clientColor: "#0C4A6E", service: "IV Drip Wellness", duration: "60 min", date: "Apr 27, 2026", time: "2:00 PM", practitioner: "Dr. Lim", status: "completed", paymentMethod: "transfer", amount: "₱3,500", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "receptionist" },
  { id: 1011, client: "Patricia Santos", clientPhone: "0927-123-4567", clientInitials: "PS", clientColor: "#14532D", service: "Hydra Facial", duration: "60 min", date: "Apr 28, 2026", time: "9:30 AM", practitioner: "Dr. Santos", status: "confirmed", paymentMethod: "cash", amount: "₱2,500", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1012, client: "Antonio Garcia", clientPhone: "0928-234-5678", clientInitials: "AG", clientColor: "#7F1D1D", service: "PRP Hair Therapy", duration: "90 min", date: "Apr 28, 2026", time: "11:00 AM", practitioner: "Dr. Lim", status: "pending", paymentMethod: "gcash", amount: "₱12,000", paymentStatus: "unpaid", type: "online", isExistingClient: false, bookedBy: "patient" },
];

export default function ViewAllAppointmentsPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "list">("calendar");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Calculate stats
  const confirmedCount = appointments.filter(a => a.status === "confirmed").length;
  const inProgressCount = appointments.filter(a => a.status === "in-progress").length;
  const pendingCount = appointments.filter(a => a.status === "pending").length;
  const cancelledCount = appointments.filter(a => a.status === "cancelled").length;
  const completedCount = appointments.filter(a => a.status === "completed").length;

  // Prepare pie chart data
  const chartData = [
    { name: "Confirmed", value: confirmedCount, color: "#16A34A" },
    { name: "In Progress", value: inProgressCount, color: "#F59E0B" },
    { name: "Pending", value: pendingCount, color: "#3B82F6" },
    { name: "Cancelled", value: cancelledCount, color: "#DC2626" },
    { name: "Completed", value: completedCount, color: "#8B5CF6" },
  ];

  // List view pagination
  const rowsPerPage = 10;
  const filtered = appointments.filter((a) => {
    const matchSearch = a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const appointmentsOnSelectedDay = selectedDate 
    ? appointments.filter(a => a.date === selectedDate)
    : [];

  return (
    <PageWrapper title="All Appointments" breadcrumb="Admin / Appointments / All Appointments">
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard
          label="Confirmed"
          value={confirmedCount}
          icon={<CheckCircle size={18} />}
          variant="primary"
        />
        <StatCard
          label="In Progress"
          value={inProgressCount}
          icon={<Clock size={18} />}
        />
        <StatCard
          label="Pending"
          value={pendingCount}
          icon={<Calendar size={18} />}
          variant="warning"
        />
        <StatCard
          label="Cancelled"
          value={cancelledCount}
          icon={<XCircle size={18} />}
        />
      </div>

      {/* Main Layout: Tabs on Left, Analytics on Right */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px", alignItems: "start" }}>
        {/* Tabs Section - Left Side */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        {/* Tab Navigation */}
        <div style={{ display: "flex", borderBottom: "1px solid #D0E8F5", background: "#F8FBFF" }}>
          <button
            onClick={() => setActiveTab("calendar")}
            style={{
              flex: 1,
              padding: "16px 20px",
              background: activeTab === "calendar" ? "#FFFFFF" : "transparent",
              border: "none",
              borderBottom: activeTab === "calendar" ? "3px solid #2D6A9F" : "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: activeTab === "calendar" ? "#2D6A9F" : "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Calendar size={16} />
            Calendar View
          </button>
          <button
            onClick={() => setActiveTab("list")}
            style={{
              flex: 1,
              padding: "16px 20px",
              background: activeTab === "list" ? "#FFFFFF" : "transparent",
              border: "none",
              borderBottom: activeTab === "list" ? "3px solid #2D6A9F" : "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: activeTab === "list" ? "#2D6A9F" : "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <List size={16} />
            List View
          </button>
        </div>

        {/* Calendar Tab */}
        {activeTab === "calendar" && (
          <div style={{ padding: "24px" }}>
            <AppointmentCalendar
              appointments={appointments}
              onDayClick={handleDayClick}
            />
            {showDayModal && (
              <DayAppointmentsModal
                date={selectedDate || ""}
                appointments={appointmentsOnSelectedDay}
                onClose={() => setShowDayModal(false)}
              />
            )}
          </div>
        )}

        {/* List Tab */}
        {activeTab === "list" && (
          <div>
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
                    <th style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>Status</th>
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
                        <StatusBadge status={apt.status} />
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
                    color: page === 1 ? "#D0E8F5" : "#5A7A96",
                    opacity: page === 1 ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      width: "32px",
                      height: "32px",
                      background: p === page ? "#2D6A9F" : "transparent",
                      color: p === page ? "#FFFFFF" : "#5A7A96",
                      border: "1.5px solid #D0E8F5",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
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
                    color: page === totalPages ? "#D0E8F5" : "#5A7A96",
                    opacity: page === totalPages ? 0.5 : 1,
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Analytics Section - Right Side */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Pie Chart */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            }}
          >
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", marginBottom: "20px" }}>
              Appointment Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Breakdown */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            }}
          >
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", marginBottom: "20px" }}>
              Appointment Summary
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {chartData.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96" }}>
                      {item.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40" }}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #D0E8F5", paddingTop: "16px", marginTop: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40" }}>
                    Total Appointments
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#2D6A9F" }}>
                    {appointments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
