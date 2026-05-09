import React, { useState } from "react";
import { Search, RotateCcw, Trash2, X } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const archivedStaffMembers = [
  { id: "S007", initials: "RC", color: "#9D174D", name: "Rosa Cruz", role: "receptionist", roleLabel: "Receptionist", email: "r.cruz@cloudskin.com", phone: "+63 922-600-0006", specialty: "—", status: "inactive", dateAdded: "Oct 1, 2023", dob: "Dec 3, 1993", archived: true, archivedDate: "Feb 15, 2025" },
  { id: "S008", initials: "CB", color: "#065F46", name: "Carlos Blanco", role: "practitioner", roleLabel: "Practitioner", email: "c.blanco@cloudskin.com", phone: "+63 923-700-0007", specialty: "Cosmetology", status: "inactive", dateAdded: "Apr 10, 2022", dob: "Jun 20, 1986", archived: true, archivedDate: "Jan 10, 2025" },
];

const roleColors: Record<string, { bg: string; text: string }> = {
  admin: { bg: "#EBF6FD", text: "#2D6A9F" },
  practitioner: { bg: "#DCFCE7", text: "#15803D" },
  receptionist: { bg: "#F5F3FF", text: "#6D28D9" },
};

export default function StaffArchivePage() {
  const [search, setSearch] = useState("");
  const [staffArchive, setStaffArchive] = useState(archivedStaffMembers);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "restore" | "delete"; staffId: string } | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const filtered = staffArchive.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handleRestoreStaff = (staffId: string) => {
    setConfirmAction({ type: "restore", staffId });
    setShowConfirmModal(true);
  };

  const handleDeleteStaff = (staffId: string) => {
    setConfirmAction({ type: "delete", staffId });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;

    if (confirmAction.type === "delete") {
      setStaffArchive(staffArchive.filter((s) => s.id !== confirmAction.staffId));
    }

    setShowConfirmModal(false);
    setConfirmAction(null);
    setActionMenuOpen(null);
  };

  return (
    <PageWrapper title="Staff Archive" breadcrumb="Admin / Staff Archive">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "280px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search archived staff..."
            style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {filtered.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ background: "#F0F6FC" }}>
                  {["Staff Member", "Role", "Email", "Phone", "Specialty", "Archived Date", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", color: "#FFFFFF", flexShrink: 0 }}>
                          {s.initials}
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A2E40" }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        background: roleColors[s.role]?.bg || "#F1F5F9",
                        color: roleColors[s.role]?.text || "#64748B",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                      }}>
                        {s.roleLabel}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{s.email}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{s.phone}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{s.specialty}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{s.archivedDate}</span></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "6px", position: "relative" }}>
                        <button 
                          onClick={() => handleRestoreStaff(s.id)}
                          style={{ width: "28px", height: "28px", background: "#EFF6FF", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0284C7" }} 
                          title="Restore">
                          <RotateCcw size={13} />
                        </button>
                        <div style={{ position: "relative" }}>
                          <button 
                            onClick={() => setActionMenuOpen(actionMenuOpen === s.id ? null : s.id)}
                            style={{ width: "28px", height: "28px", background: "#FEF2F2", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }} 
                            title="Delete">
                            <Trash2 size={13} />
                          </button>
                          {actionMenuOpen === s.id && (
                            <div style={{ position: "absolute", top: "100%", right: 0, background: "#FFFFFF", border: "1px solid #D0E8F5", borderRadius: "8px", boxShadow: "0 4px 12px rgba(26,58,92,0.15)", zIndex: 50, minWidth: "120px", marginTop: "4px" }}>
                              <button onClick={() => { handleDeleteStaff(s.id); }} style={{ width: "100%", padding: "10px 16px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#EF4444" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                                Delete Permanently
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: "60px 24px", textAlign: "center", color: "#5A7A96", fontFamily: "'Inter', sans-serif" }}>
              <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>No archived staff members</div>
              <div style={{ fontSize: "13px" }}>Archived staff members will appear here</div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowConfirmModal(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div style={{ background: confirmAction.type === "delete" ? "#FEE2E2" : "#EFF6FF", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                {confirmAction.type === "delete" ? <Trash2 size={28} color="#EF4444" /> : <RotateCcw size={28} color="#0284C7" />}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40", marginBottom: "8px" }}>
                {confirmAction.type === "delete" ? "Delete Staff Member Permanently?" : "Restore Staff Member?"}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
                {confirmAction.type === "delete" 
                  ? "This action cannot be undone. The staff member record will be permanently deleted." 
                  : "This staff member will be restored to the active staff list."}
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowConfirmModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button onClick={confirmActionHandler} style={{ height: "38px", padding: "0 20px", background: confirmAction.type === "delete" ? "#EF4444" : "#0284C7", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                {confirmAction.type === "delete" ? "Delete Permanently" : "Restore"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
