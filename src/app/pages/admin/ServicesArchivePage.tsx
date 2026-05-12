import React, { useState } from "react";
import { Search, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const archivedServices = [
  { id: "SRV009", name: "Dermal Fillers", category: "Injectables", price: "₱18,000", duration: "60 min", archivedDate: "Mar 10, 2026" },
];

export default function ServicesArchivePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Filter
  const filtered = archivedServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageWrapper title="Archive Services" breadcrumb="Admin / Services / Archive Services">
      {/* Table Header with Search */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
            <input
              type="text"
              placeholder="Search archived services..."
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
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Service Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Price</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Duration</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Archived Date</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((service) => (
              <tr key={service.id} style={{ borderBottom: "1px solid #D0E8F5", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{service.name}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{service.category}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{service.price}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{service.duration}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{service.archivedDate}</td>
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
