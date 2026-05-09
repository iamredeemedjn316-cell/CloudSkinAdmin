import React, { useState } from "react";
import { Search, RotateCcw, Trash2 } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";

const archivedPatients = [
  { 
    id: "P100", 
    initials: "JP", 
    color: "#6B21A8", 
    name: "Juan Perez", 
    phone: "+63 917-900-0001",
    email: "juan.perez@email.com",
    lastVisit: "Dec 15, 2024", 
    totalVisits: 15,
    archived: true,
    archivedDate: "Jan 20, 2025"
  },
  { 
    id: "P101", 
    initials: "RC", 
    color: "#0C4A6E", 
    name: "Rosa Campos", 
    phone: "+63 918-900-0002",
    email: "rosa.campos@email.com",
    lastVisit: "Nov 28, 2024", 
    totalVisits: 8,
    archived: true,
    archivedDate: "Feb 1, 2025"
  },
];

export default function PatientsArchivePage() {
  const [search, setSearch] = useState("");
  const [patientArchive, setPatientArchive] = useState(archivedPatients);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "restore" | "delete"; patientId: string } | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const filtered = patientArchive.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handleRestorePatient = (patientId: string) => {
    setConfirmAction({ type: "restore", patientId });
    setShowConfirmModal(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setConfirmAction({ type: "delete", patientId });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;

    if (confirmAction.type === "delete") {
      setPatientArchive(patientArchive.filter((p) => p.id !== confirmAction.patientId));
    }

    setShowConfirmModal(false);
    setConfirmAction(null);
    setActionMenuOpen(null);
  };

  return (
    <PageWrapper title="Patients Archive" breadcrumb="Admin / Patients Archive">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "280px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search archived patients..."
            style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Grid View */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", padding: "20px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", flexShrink: 0 }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{p.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>ID: {p.id}</div>
                </div>
              </div>

              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #D0E8F5" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Phone:</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", fontWeight: 500 }}>{p.phone}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Email:</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", fontWeight: 500 }}>{p.email}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Visits:</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", fontWeight: 500 }}>{p.totalVisits}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Archived:</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40", fontWeight: 500 }}>{p.archivedDate}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", position: "relative" }}>
                <button 
                  onClick={() => handleRestorePatient(p.id)}
                  style={{ flex: 1, height: "36px", background: "#EFF6FF", border: "1px solid #BAD4EC", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0284C7", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500 }}>
                  <RotateCcw size={14} style={{ marginRight: "4px" }} /> Restore
                </button>
                <div style={{ position: "relative" }}>
                  <button 
                    onClick={() => setActionMenuOpen(actionMenuOpen === p.id ? null : p.id)}
                    style={{ height: "36px", width: "36px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }}>
                    <Trash2 size={14} />
                  </button>
                  {actionMenuOpen === p.id && (
                    <div style={{ position: "absolute", top: "100%", right: 0, background: "#FFFFFF", border: "1px solid #D0E8F5", borderRadius: "8px", boxShadow: "0 4px 12px rgba(26,58,92,0.15)", zIndex: 50, minWidth: "140px", marginTop: "4px" }}>
                      <button onClick={() => { handleDeletePatient(p.id); }} style={{ width: "100%", padding: "10px 16px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#EF4444" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                        Delete Permanently
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", padding: "60px 24px", textAlign: "center", color: "#5A7A96", fontFamily: "'Inter', sans-serif" }}>
            <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>No archived patients</div>
            <div style={{ fontSize: "13px" }}>Archived patients will appear here</div>
          </div>
        )}
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
                {confirmAction.type === "delete" ? "Delete Patient Permanently?" : "Restore Patient?"}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
                {confirmAction.type === "delete" 
                  ? "This action cannot be undone. The patient record will be permanently deleted." 
                  : "This patient will be restored to the active patients list."}
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
