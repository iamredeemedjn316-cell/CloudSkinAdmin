import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const staffMembers = [
  { id: "S001", initials: "AU", color: "#2D6A9F", name: "Admin User", role: "admin", roleLabel: "Admin", email: "admin@cloudskin.com", phone: "+63 917-000-0001", specialty: "—", status: "active", dateAdded: "Jan 1, 2023", dob: "May 15, 1985", archived: false },
  { id: "S002", initials: "MS", color: "#16A34A", name: "Dr. Maria Santos", role: "practitioner", roleLabel: "Practitioner", email: "m.santos@cloudskin.com", phone: "+63 917-100-0001", specialty: "Dermatology", status: "active", dateAdded: "Mar 1, 2024", dob: "Aug 22, 1988", archived: false },
  { id: "S003", initials: "AR", color: "#7C3AED", name: "Dr. Ana Reyes", role: "practitioner", roleLabel: "Practitioner", email: "a.reyes@cloudskin.com", phone: "+63 918-200-0002", specialty: "Aesthetic Medicine", status: "active", dateAdded: "Jan 15, 2024", dob: "Nov 10, 1990", archived: false },
  { id: "S004", initials: "JL", color: "#EA580C", name: "Dr. James Lim", role: "practitioner", roleLabel: "Practitioner", email: "j.lim@cloudskin.com", phone: "+63 919-300-0003", specialty: "Laser Specialist", status: "active", dateAdded: "Jun 1, 2023", dob: "Feb 28, 1987", archived: false },
  { id: "S005", initials: "MG", color: "#0891B2", name: "Maria Gonzales", role: "receptionist", roleLabel: "Receptionist", email: "m.gonzales@cloudskin.com", phone: "+63 920-400-0004", specialty: "—", status: "active", dateAdded: "Feb 1, 2025", dob: "Jul 5, 1995", archived: false },
  { id: "S006", initials: "JR", color: "#B45309", name: "Juan Rodriguez", role: "receptionist", roleLabel: "Receptionist", email: "j.rodriguez@cloudskin.com", phone: "+63 921-500-0005", specialty: "—", status: "inactive", dateAdded: "May 15, 2024", dob: "Sep 18, 1992", archived: false },
];

const roleColors: Record<string, { bg: string; text: string }> = {
  admin: { bg: "#EBF6FD", text: "#2D6A9F" },
  practitioner: { bg: "#DCFCE7", text: "#15803D" },
  receptionist: { bg: "#F5F3FF", text: "#6D28D9" },
};

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<"admin" | "practitioner" | "receptionist">("practitioner");
  const [staffList, setStaffList] = useState(staffMembers);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "archive" | "delete"; staffId: string } | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const filtered = staffList.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || s.role === roleFilter.toLowerCase();
    return !s.archived && matchSearch && matchRole;
  });

  const handleArchiveStaff = (staffId: string) => {
    setConfirmAction({ type: "archive", staffId });
    setShowConfirmModal(true);
  };

  const handleDeleteStaff = (staffId: string) => {
    setConfirmAction({ type: "delete", staffId });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;

    if (confirmAction.type === "archive") {
      setStaffList(staffList.map((s) => (s.id === confirmAction.staffId ? { ...s, archived: true } : s)));
    } else if (confirmAction.type === "delete") {
      setStaffList(staffList.filter((s) => s.id !== confirmAction.staffId));
    }

    setShowConfirmModal(false);
    setConfirmAction(null);
    setActionMenuOpen(null);
  };

  return (
    <PageWrapper title="Staff Management" breadcrumb="Admin / Staff">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "280px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff..."
            style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["All", "Practitioner", "Receptionist"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{
                height: "38px",
                padding: "0 14px",
                background: roleFilter === r ? "#2D6A9F" : "#FFFFFF",
                border: `1.5px solid ${roleFilter === r ? "#2D6A9F" : "#D0E8F5"}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: roleFilter === r ? "#FFFFFF" : "#5A7A96",
              }}
            >
              {r}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => { setEditingStaff(null); setShowModal(true); }}
            style={{ height: "40px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}
          >
            <Plus size={14} /> Add Staff
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Staff Member", "Role", "Email", "Phone", "Specialty", "Status", "Date Added", "Actions"].map((h) => (
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
                  <td style={{ padding: "12px 16px" }}><StatusBadge status={s.status as any} /></td>
                  <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{s.dateAdded}</span></td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "6px", position: "relative" }}>
                      <button onClick={() => { setEditingStaff(s); setShowModal(true); }} style={{ width: "28px", height: "28px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A7A96" }} title="Edit">
                        <Pencil size={13} />
                      </button>
                      <div style={{ position: "relative" }}>
                        <button 
                          onClick={() => setActionMenuOpen(actionMenuOpen === s.id ? null : s.id)}
                          style={{ width: "28px", height: "28px", background: "#FEF2F2", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }} 
                          title="More">
                          <Trash2 size={13} />
                        </button>
                        {actionMenuOpen === s.id && (
                          <div style={{ position: "absolute", top: "100%", right: 0, background: "#FFFFFF", border: "1px solid #D0E8F5", borderRadius: "8px", boxShadow: "0 4px 12px rgba(26,58,92,0.15)", zIndex: 50, minWidth: "140px", marginTop: "4px" }}>
                            <button onClick={() => { handleArchiveStaff(s.id); }} style={{ width: "100%", padding: "10px 16px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#F97316", borderBottom: "1px solid #F0F6FC" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                              Archive
                            </button>
                            <button onClick={() => { handleDeleteStaff(s.id); }} style={{ width: "100%", padding: "10px 16px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#EF4444" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                              Delete
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
        </div>
      </div>

      {/* Add/Edit Staff Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowModal(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "540px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>
                {editingStaff ? "Edit Staff Account" : "Add Staff Account"}
              </span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96", display: "flex" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                {[
                  { label: "Full Name", placeholder: editingStaff?.name || "e.g. Dr. Maria Santos" },
                  { label: "Email Address", placeholder: editingStaff?.email || "staff@cloudskin.com" },
                  { label: "Phone Number", placeholder: editingStaff?.phone || "+63 9XX-XXX-XXXX" },
                  { label: "Date of Birth", placeholder: editingStaff?.dob || "Jan 1, 1990", type: "text" },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>{f.label}</label>
                    <input type={f.type || "text"} placeholder={f.placeholder} style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "10px" }}>Role</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {(["practitioner", "receptionist"] as const).map((r) => (
                    <label key={r} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flex: 1, padding: "10px 12px", border: `1.5px solid ${selectedRole === r ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", background: selectedRole === r ? "#EBF6FD" : "#FFFFFF" }}>
                      <input type="radio" name="role" checked={selectedRole === r} onChange={() => setSelectedRole(r as any)} style={{ display: "none" }} />
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: `2px solid ${selectedRole === r ? "#2D6A9F" : "#9BBAD4"}`, background: selectedRole === r ? "#2D6A9F" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selectedRole === r && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />}
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: selectedRole === r ? "#2D6A9F" : "#5A7A96", textTransform: "capitalize" }}>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedRole === "practitioner" && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Specialty</label>
                  <input placeholder="e.g. Dermatology" style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                </div>
              )}

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40" }}>Account Status</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Active</span>
                    <div style={{ width: "40px", height: "22px", borderRadius: "9999px", background: "#2D6A9F", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "2px" }}>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#FFFFFF", marginLeft: "auto" }} />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                {editingStaff ? "Save Changes" : "Save Staff Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowConfirmModal(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div style={{ background: confirmAction.type === "delete" ? "#FEE2E2" : "#FEF3C7", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Trash2 size={28} color={confirmAction.type === "delete" ? "#EF4444" : "#F97316"} />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40", marginBottom: "8px" }}>
                {confirmAction.type === "delete" ? "Delete Staff Member?" : "Archive Staff Member?"}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
                {confirmAction.type === "delete" 
                  ? "This action cannot be undone. The staff member will be permanently deleted." 
                  : "This staff member will be moved to the archive. You can restore them later."}
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowConfirmModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button onClick={confirmActionHandler} style={{ height: "38px", padding: "0 20px", background: confirmAction.type === "delete" ? "#EF4444" : "#F97316", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                {confirmAction.type === "delete" ? "Delete" : "Archive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
