import React, { useState } from "react";
import { Search, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { StatusBadge } from "../../components/StatusBadge";
import { Users, UserCheck, UserX, Archive } from "lucide-react";

const allStaff = [
  { id: "S001", initials: "DS", color: "#2D6A9F", name: "Dr. Maria Santos", email: "maria.santos@clinic.com", phone: "0917-111-2222", role: "Practitioner", joinDate: "Jan 15, 2024", status: "active", archived: false },
  { id: "S002", initials: "JR", color: "#16A34A", name: "Dr. Juan Reyes", email: "juan.reyes@clinic.com", phone: "0918-111-2222", role: "Practitioner", joinDate: "Feb 10, 2024", status: "active", archived: false },
  { id: "S003", initials: "AL", color: "#7C3AED", name: "Dr. Angela Lim", email: "angela.lim@clinic.com", phone: "0919-111-2222", role: "Practitioner", joinDate: "Mar 5, 2024", status: "inactive", archived: false },
  { id: "S004", initials: "RP", color: "#EA580C", name: "Rose Perez", email: "rose.perez@clinic.com", phone: "0920-111-2222", role: "Receptionist", joinDate: "Jan 20, 2024", status: "active", archived: false },
  { id: "S005", initials: "CB", color: "#0891B2", name: "Carlos Bautista", email: "carlos.bautista@clinic.com", phone: "0921-111-2222", role: "Receptionist", joinDate: "Feb 1, 2024", status: "active", archived: false },
  { id: "S006", initials: "MT", color: "#B45309", name: "Maria Torres", email: "maria.torres@clinic.com", phone: "0922-111-2222", role: "Admin", joinDate: "Dec 1, 2023", status: "active", archived: false },
  { id: "S007", initials: "JG", color: "#9D174D", name: "Juan Gomez", email: "juan.gomez@clinic.com", phone: "0923-111-2222", role: "Receptionist", joinDate: "Mar 15, 2024", status: "inactive", archived: true },
  { id: "S008", initials: "AC", color: "#065F46", name: "Ana Cruz", email: "ana.cruz@clinic.com", phone: "0924-111-2222", role: "Practitioner", joinDate: "Apr 1, 2024", status: "active", archived: false },
  { id: "S009", initials: "RP", color: "#6B21A8", name: "Ricardo Paez", email: "ricardo.paez@clinic.com", phone: "0925-111-2222", role: "Receptionist", joinDate: "Jan 10, 2024", status: "inactive", archived: false },
  { id: "S010", initials: "SV", color: "#0C4A6E", name: "Sofia Villarreal", email: "sofia.villarreal@clinic.com", phone: "0926-111-2222", role: "Admin", joinDate: "Nov 15, 2023", status: "active", archived: false },
];

export default function ViewAllStaffPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate analytics
  const activeStaff = allStaff.filter(s => s.status === "active" && !s.archived).length;
  const inactiveStaff = allStaff.filter(s => s.status === "inactive" && !s.archived).length;
  const archivedStaff = allStaff.filter(s => s.archived).length;
  const totalStaff = activeStaff + inactiveStaff;

  // Filter
  const filtered = allStaff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageWrapper title="All Staff" breadcrumb="Admin / Staff / All Staff">
      {/* Analytics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Active Staff" value={activeStaff} icon={<UserCheck size={18} />} variant="primary" />
        <StatCard label="Inactive Staff" value={inactiveStaff} icon={<UserX size={18} />} />
        <StatCard label="Archive Staff" value={archivedStaff} icon={<Archive size={18} />} />
        <StatCard label="Total Staff" value={totalStaff} icon={<Users size={18} />} variant="secondary" />
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
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Staff Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Email</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Role</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Join Date</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((staff) => (
              <tr key={staff.id} style={{ borderBottom: "1px solid #D0E8F5", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: staff.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600 }}>
                    {staff.initials}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{staff.name}</span>
                </td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{staff.email}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", textTransform: "capitalize" }}>{staff.role}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{staff.joinDate}</td>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  <StatusBadge status={staff.archived ? "archived" : staff.status} />
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
