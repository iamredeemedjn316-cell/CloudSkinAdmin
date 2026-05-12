import React, { useState } from "react";
import { Search, Download, Eye, Pencil, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { StatusBadge } from "../../components/StatusBadge";
import { Users, UserCheck, UserX, Archive } from "lucide-react";

const allPatients = [
  { id: "P001", initials: "SJ", color: "#2D6A9F", name: "Sarah Johnson", phone: "0917-123-4567", email: "sarah.j@email.com", lastVisit: "Apr 15, 2026", status: "active", totalVisits: 8, archived: false },
  { id: "P002", initials: "MC", color: "#16A34A", name: "Miguel Cruz", phone: "0918-234-5678", email: "miguel.c@email.com", lastVisit: "Apr 20, 2026", status: "active", totalVisits: 12, archived: false },
  { id: "P003", initials: "CT", color: "#7C3AED", name: "Camille Torres", phone: "0919-345-6789", email: "camille.t@email.com", lastVisit: "Mar 30, 2026", status: "inactive", totalVisits: 4, archived: false },
  { id: "P004", initials: "JD", color: "#EA580C", name: "Jose Dela Cruz", phone: "0920-456-7890", email: "jose.dc@email.com", lastVisit: "Apr 10, 2026", status: "active", totalVisits: 22, archived: false },
  { id: "P005", initials: "AP", color: "#0891B2", name: "Angela Park", phone: "0921-567-8901", email: "angela.p@email.com", lastVisit: "Apr 22, 2026", status: "active", totalVisits: 6, archived: false },
  { id: "P006", initials: "RT", color: "#B45309", name: "Roberto Tan", phone: "0922-678-9012", email: "roberto.t@email.com", lastVisit: "Mar 15, 2026", status: "inactive", totalVisits: 3, archived: true },
  { id: "P007", initials: "LG", color: "#9D174D", name: "Lisa Gomez", phone: "0923-789-0123", email: "lisa.g@email.com", lastVisit: "Apr 18, 2026", status: "active", totalVisits: 15, archived: false },
  { id: "P008", initials: "KB", color: "#065F46", name: "Kevin Bautista", phone: "0924-890-1234", email: "kevin.b@email.com", lastVisit: "Apr 5, 2026", status: "inactive", totalVisits: 2, archived: false },
  { id: "P009", initials: "DR", color: "#6B21A8", name: "Diana Reyes", phone: "0925-901-2345", email: "diana.r@email.com", lastVisit: "Feb 28, 2026", status: "active", totalVisits: 9, archived: false },
  { id: "P010", initials: "MV", color: "#0C4A6E", name: "Marco Villanueva", phone: "0926-012-3456", email: "marco.v@email.com", lastVisit: "Apr 12, 2026", status: "active", totalVisits: 30, archived: false },
  { id: "P011", initials: "ES", color: "#1E40AF", name: "Emma Smith", phone: "0927-123-4567", email: "emma.s@email.com", lastVisit: "Jan 20, 2026", status: "inactive", totalVisits: 1, archived: true },
  { id: "P012", initials: "CF", color: "#DC2626", name: "Carlos Ferreira", phone: "0928-234-5678", email: "carlos.f@email.com", lastVisit: "Apr 3, 2026", status: "active", totalVisits: 7, archived: false },
];

export default function ViewAllPatientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate analytics
  const activePatients = allPatients.filter(p => p.status === "active" && !p.archived).length;
  const inactivePatients = allPatients.filter(p => p.status === "inactive" && !p.archived).length;
  const archivedPatients = allPatients.filter(p => p.archived).length;
  const totalPatients = activePatients + inactivePatients;

  // Filter
  const filtered = allPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageWrapper title="All Patients" breadcrumb="Admin / Patients / All Patients">
      {/* Analytics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Active Patients" value={activePatients} icon={<UserCheck size={18} />} variant="primary" />
        <StatCard label="Inactive Patients" value={inactivePatients} icon={<UserX size={18} />} />
        <StatCard label="Archive Patients" value={archivedPatients} icon={<Archive size={18} />} />
        <StatCard label="Total Patients" value={totalPatients} icon={<Users size={18} />} variant="secondary" />
      </div>

      {/* Table Header with Search */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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
            <Download size={16} />
          </button>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FBFF", borderBottom: "2px solid #D0E8F5" }}>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Patient Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Email</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Last Visit</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Total Visits</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((patient) => (
              <tr key={patient.id} style={{ borderBottom: "1px solid #D0E8F5", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: patient.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600 }}>
                    {patient.initials}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{patient.name}</span>
                </td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{patient.email}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{patient.lastVisit}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", textAlign: "center", fontWeight: 500 }}>{patient.totalVisits}</td>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  <StatusBadge status={patient.archived ? "archived" : patient.status} />
                </td>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  <button style={{ width: "32px", height: "32px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}>
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
            Showing {displayed.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={{ width: "32px", height: "32px", background: page === 1 ? "#E5EEF7" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: page === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: page === 1 ? "#9BBAD4" : "#2D6A9F" }}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} style={{ width: "32px", height: "32px", background: p === page ? "#2D6A9F" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: p === page ? "#FFFFFF" : "#5A7A96" }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} style={{ width: "32px", height: "32px", background: page === totalPages ? "#E5EEF7" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: page === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: page === totalPages ? "#9BBAD4" : "#2D6A9F" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
