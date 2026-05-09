import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, Eye, Pencil, MoreVertical, X, User, Calendar, CreditCard, Activity } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const patients = [
  { id: "P001", initials: "SJ", color: "#2D6A9F", name: "Sarah Johnson", phone: "0917-123-4567", email: "sarah.j@email.com", dob: "Apr 5, 1990", age: 36, lastVisit: "Apr 15, 2026", practitioner: "Dr. Santos", status: "active", totalVisits: 8, archived: false, address: "12 Mango Street, BGC, Taguig City" },
  { id: "P002", initials: "MC", color: "#16A34A", name: "Miguel Cruz", phone: "0918-234-5678", email: "miguel.c@email.com", dob: "Jul 12, 1988", age: 37, lastVisit: "Apr 20, 2026", practitioner: "Dr. Reyes", status: "active", totalVisits: 12, archived: false, address: "45 Bonifacio Avenue, Makati" },
  { id: "P003", initials: "CT", color: "#7C3AED", name: "Camille Torres", phone: "0919-345-6789", email: "camille.t@email.com", dob: "Jan 22, 1995", age: 31, lastVisit: "Mar 30, 2026", practitioner: "Dr. Santos", status: "active", totalVisits: 4, archived: false, address: "89 Ayala Avenue, Makati" },
  { id: "P004", initials: "JD", color: "#EA580C", name: "Jose Dela Cruz", phone: "0920-456-7890", email: "jose.dc@email.com", dob: "Sep 8, 1982", age: 43, lastVisit: "Apr 10, 2026", practitioner: "Dr. Lim", status: "active", totalVisits: 22, archived: false, address: "23 Paseo de Roxas, Makati" },
  { id: "P005", initials: "AP", color: "#0891B2", name: "Angela Park", phone: "0921-567-8901", email: "angela.p@email.com", dob: "Mar 18, 1993", age: 33, lastVisit: "Apr 22, 2026", practitioner: "Dr. Reyes", status: "active", totalVisits: 6, archived: false, address: "56 Greenbelt Street, Makati" },
  { id: "P006", initials: "RT", color: "#B45309", name: "Roberto Tan", phone: "0922-678-9012", email: "roberto.t@email.com", dob: "Nov 3, 1979", age: 46, lastVisit: "Mar 15, 2026", practitioner: "Dr. Santos", status: "inactive", totalVisits: 3, archived: true, address: "78 Legaspi Street, Makati" },
  { id: "P007", initials: "LG", color: "#9D174D", name: "Lisa Gomez", phone: "0923-789-0123", email: "lisa.g@email.com", dob: "Jun 25, 1991", age: 34, lastVisit: "Apr 18, 2026", practitioner: "Dr. Lim", status: "active", totalVisits: 15, archived: false, address: "34 Dela Rosa Street, Makati" },
  { id: "P008", initials: "KB", color: "#065F46", name: "Kevin Bautista", phone: "0924-890-1234", email: "kevin.b@email.com", dob: "Dec 10, 1997", age: 28, lastVisit: "Apr 5, 2026", practitioner: "Dr. Reyes", status: "active", totalVisits: 2, archived: false, address: "67 Don Antonio Street, Makati" },
  { id: "P009", initials: "DR", color: "#6B21A8", name: "Diana Reyes", phone: "0925-901-2345", email: "diana.r@email.com", dob: "Aug 14, 1986", age: 39, lastVisit: "Feb 28, 2026", practitioner: "Dr. Santos", status: "active", totalVisits: 9, archived: false, address: "90 Montessori Street, BGC" },
  { id: "P010", initials: "MV", color: "#0C4A6E", name: "Marco Villanueva", phone: "0926-012-3456", email: "marco.v@email.com", dob: "Feb 20, 1975", age: 51, lastVisit: "Apr 12, 2026", practitioner: "Dr. Lim", status: "active", totalVisits: 30, archived: false, address: "111 McKinley Road, BGC" },
];

const patientProfile = {
  id: "P001",
  initials: "SJ",
  color: "#2D6A9F",
  name: "Sarah Johnson",
  age: 36,
  phone: "0917-123-4567",
  email: "sarah.j@email.com",
  dob: "April 5, 1990",
  address: "12 Mango Street, BGC, Taguig City",
  skinType: "Combination",
  concerns: ["Hyperpigmentation", "Enlarged pores", "Mild acne"],
  conditions: "None",
  allergies: "None known",
  totalVisits: 8,
  lastVisit: "Apr 15, 2026",
  activePackages: 1,
  vouchers: 2,
  appointments: [
    { date: "Apr 15, 2026", service: "Hydra Facial", practitioner: "Dr. Santos", status: "completed" },
    { date: "Mar 20, 2026", service: "LED Therapy", practitioner: "Dr. Reyes", status: "completed" },
    { date: "Feb 10, 2026", service: "Chemical Peel", practitioner: "Dr. Santos", status: "completed" },
  ],
};

export default function PatientsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [profileTab, setProfileTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [patientList, setPatientList] = useState(patients);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "archive" | "delete" | "toggle"; patientId: string } | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const handleEditPatient = (patient: any) => {
    setEditingPatient({ ...patient });
    setShowEditModal(true);
    setActionMenuOpen(null);
  };

  const handleSavePatient = (updatedPatient: any) => {
    setPatientList(patientList.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)));
    setShowEditModal(false);
    setEditingPatient(null);
  };

  const handleArchivePatient = (patientId: string) => {
    setConfirmAction({ type: "archive", patientId });
    setShowConfirmModal(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setConfirmAction({ type: "delete", patientId });
    setShowConfirmModal(true);
  };

  const handleToggleStatus = (patientId: string) => {
    setConfirmAction({ type: "toggle", patientId });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;

    switch (confirmAction.type) {
      case "archive":
        setPatientList(
          patientList.map((p) =>
            p.id === confirmAction.patientId ? { ...p, archived: true } : p
          )
        );
        break;
      case "delete":
        setPatientList(patientList.filter((p) => p.id !== confirmAction.patientId));
        break;
      case "toggle":
        setPatientList(
          patientList.map((p) =>
            p.id === confirmAction.patientId
              ? { ...p, status: p.status === "active" ? "inactive" : "active" }
              : p
          )
        );
        break;
    }

    setShowConfirmModal(false);
    setConfirmAction(null);
    setActionMenuOpen(null);
  };

  const filtered = patientList.filter(
    (p) =>
      !p.archived &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        p.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageWrapper title="Patients" breadcrumb="Admin / Patients">
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or email..."
            style={{
              width: "100%",
              height: "40px",
              border: "1.5px solid #D0E8F5",
              borderRadius: "8px",
              padding: "0 12px 0 32px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#1A2E40",
              outline: "none",
              background: "#FFFFFF",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          style={{
            height: "40px",
            padding: "0 18px",
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
          <Plus size={14} /> New Patient
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Patient", "Phone", "Date of Birth", "Last Visit", "Practitioner", "Visits", "Status", "Actions"].map((h) => (
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
              {filtered.map((patient) => (
                <tr
                  key={patient.id}
                  style={{ borderBottom: "1px solid #D0E8F5", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: patient.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "12px",
                          color: "#FFFFFF",
                          flexShrink: 0,
                        }}
                      >
                        {patient.initials}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A2E40" }}>
                          {patient.name}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{patient.phone}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{patient.dob}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>Age {patient.age}</div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{patient.lastVisit}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{patient.practitioner}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#2D6A9F",
                      }}
                    >
                      {patient.totalVisits}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={patient.status as any} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => navigate(`/admin/patients/${patient.id}`)}
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
                        title="View Profile"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
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
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() => setActionMenuOpen(actionMenuOpen === patient.id ? null : patient.id)}
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
                        {actionMenuOpen === patient.id && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              background: "#FFFFFF",
                              border: "1px solid #D0E8F5",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(26,58,92,0.15)",
                              zIndex: 50,
                              minWidth: "160px",
                              marginTop: "4px",
                            }}
                          >
                            {[
                              { label: "Toggle Status", action: () => handleToggleStatus(patient.id), color: "#5A7A96" },
                              { label: "Archive", action: () => handleArchivePatient(patient.id), color: "#F97316" },
                              { label: "Delete", action: () => handleDeletePatient(patient.id), color: "#EF4444" },
                            ].map((item) => (
                              <button
                                key={item.label}
                                onClick={item.action}
                                style={{
                                  width: "100%",
                                  padding: "10px 16px",
                                  background: "none",
                                  border: "none",
                                  textAlign: "left",
                                  cursor: "pointer",
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "13px",
                                  color: item.color,
                                  borderBottom: "1px solid #F0F6FC",
                                  transition: "background 150ms",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                              >
                                {item.label}
                              </button>
                            ))}
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

      {/* Patient Profile Drawer */}
      {selectedPatient && (
        <>
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.3)", zIndex: 90 }}
            onClick={() => setSelectedPatient(null)}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "480px",
              background: "#FFFFFF",
              boxShadow: "0 8px 32px rgba(26,58,92,0.18)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Drawer Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>
                Patient Profile
              </span>
              <button onClick={() => setSelectedPatient(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96", display: "flex" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {/* Profile Header */}
              <div style={{ padding: "24px", borderBottom: "1px solid #D0E8F5", background: "#F8FBFF" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: selectedPatient.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      color: "#FFFFFF",
                    }}
                  >
                    {selectedPatient.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: "#1A2E40" }}>
                      {selectedPatient.name}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                      Age {selectedPatient.age} · {selectedPatient.phone}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{selectedPatient.email}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
                  {[
                    { icon: <Calendar size={16} />, value: patientProfile.totalVisits, label: "Visits" },
                    { icon: <Activity size={16} />, value: patientProfile.lastVisit.split(",")[0], label: "Last Visit" },
                    { icon: <User size={16} />, value: 1, label: "Package" },
                    { icon: <CreditCard size={16} />, value: 2, label: "Vouchers" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: "#FFFFFF", borderRadius: "10px", padding: "10px", textAlign: "center", border: "1px solid #D0E8F5" }}>
                      <div style={{ color: "#2D6A9F", display: "flex", justifyContent: "center", marginBottom: "4px" }}>{stat.icon}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: "#1A2E40" }}>{stat.value}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#9BBAD4" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Tabs */}
              <div style={{ borderBottom: "1px solid #D0E8F5", display: "flex", overflowX: "auto" }}>
                {["overview", "appointments", "skin"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setProfileTab(tab)}
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: profileTab === tab ? "2px solid #2D6A9F" : "2px solid transparent",
                      padding: "12px 16px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: profileTab === tab ? 600 : 400,
                      fontSize: "13px",
                      color: profileTab === tab ? "#2D6A9F" : "#5A7A96",
                      whiteSpace: "nowrap",
                      marginBottom: "-1px",
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div style={{ padding: "20px 24px" }}>
                {profileTab === "overview" && (
                  <div>
                    <div style={{ marginBottom: "20px" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "11px", color: "#5A7A96" }}>
                        Personal Information
                      </div>
                      {[
                        { label: "Full Name", value: selectedPatient.name },
                        { label: "Date of Birth", value: selectedPatient.dob },
                        { label: "Phone", value: selectedPatient.phone },
                        { label: "Email", value: selectedPatient.email },
                        { label: "Address", value: patientProfile.address },
                        { label: "Practitioner", value: selectedPatient.practitioner },
                      ].map((field) => (
                        <div key={field.label} style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                          <div style={{ width: "120px", flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96" }}>
                            {field.label}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{field.value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: "1px solid #D0E8F5", paddingTop: "16px" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                        Skin Profile
                      </div>
                      {[
                        { label: "Skin Type", value: patientProfile.skinType },
                        { label: "Concerns", value: patientProfile.concerns.join(", ") },
                        { label: "Conditions", value: patientProfile.conditions },
                        { label: "Allergies", value: patientProfile.allergies },
                      ].map((field) => (
                        <div key={field.label} style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                          <div style={{ width: "120px", flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96" }}>
                            {field.label}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{field.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {profileTab === "appointments" && (
                  <div>
                    {patientProfile.appointments.map((apt, i) => (
                      <div key={i} style={{ padding: "12px", border: "1px solid #D0E8F5", borderRadius: "10px", marginBottom: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>{apt.service}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{apt.practitioner} · {apt.date}</div>
                          </div>
                          <StatusBadge status={apt.status as any} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {profileTab === "skin" && (
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", textAlign: "center", padding: "40px 0" }}>
                    No skin assessment records yet.
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", gap: "10px" }}>
              <button style={{ flex: 1, height: "38px", background: "none", border: "1.5px solid #2D6A9F", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#2D6A9F" }}>
                Edit Profile
              </button>
              <button style={{ flex: 1, height: "38px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                + New Appointment
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Patient Modal */}
      {showEditModal && editingPatient && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={() => setShowEditModal(false)}
        >
          <div
            style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "480px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Edit Patient Profile</span>
              <button onClick={() => setShowEditModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "24px" }}>
              {[
                { label: "Full Name", key: "name", placeholder: "e.g. Maria Santos" },
                { label: "Phone Number", key: "phone", placeholder: "09XX-XXX-XXXX" },
                { label: "Email Address", key: "email", placeholder: "patient@email.com" },
                { label: "Date of Birth", key: "dob", placeholder: "", type: "text" },
                { label: "Address", key: "address", placeholder: "Street address, city", type: "text" },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>{f.label}</label>
                  <input
                    type={f.type || "text"}
                    value={editingPatient[f.key] || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowEditModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button onClick={() => handleSavePatient(editingPatient)} style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "420px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: confirmAction.type === "delete" ? "#FEE2E2" : confirmAction.type === "archive" ? "#FEF3C7" : "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "28px",
                }}
              >
                {confirmAction.type === "delete" ? "⚠️" : confirmAction.type === "archive" ? "📦" : "🔄"}
              </div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "18px", color: "#1A2E40", marginBottom: "8px" }}>
                {confirmAction.type === "delete"
                  ? "Delete Patient?"
                  : confirmAction.type === "archive"
                  ? "Archive Patient?"
                  : "Toggle Patient Status?"}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
                {confirmAction.type === "delete"
                  ? "This action cannot be undone. The patient record will be permanently removed from the system."
                  : confirmAction.type === "archive"
                  ? "The patient will be archived and hidden from the main list. You can restore them later."
                  : `The patient status will be changed to ${patientList.find((p) => p.id === confirmAction.patientId)?.status === "active" ? "inactive" : "active"}.`}
              </p>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowConfirmModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button
                onClick={confirmActionHandler}
                style={{
                  height: "38px",
                  padding: "0 20px",
                  background: confirmAction.type === "delete" ? "#EF4444" : confirmAction.type === "archive" ? "#F97316" : "#2D6A9F",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                {confirmAction.type === "delete" ? "Delete" : confirmAction.type === "archive" ? "Archive" : "Toggle Status"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Patient Modal */}
      {showNewModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={() => setShowNewModal(false)}
        >
          <div
            style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "480px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>New Patient</span>
              <button onClick={() => setShowNewModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "24px" }}>
              {[
                { label: "Full Name", placeholder: "e.g. Maria Santos" },
                { label: "Phone Number", placeholder: "09XX-XXX-XXXX" },
                { label: "Email Address", placeholder: "patient@email.com" },
                { label: "Date of Birth", placeholder: "", type: "date" },
                { label: "Assigned Practitioner", placeholder: "Select practitioner..." },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>{f.label}</label>
                  {f.label === "Assigned Practitioner" ? (
                    <select
                      style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box", background: "#FFFFFF", cursor: "pointer" }}
                    >
                      <option value="" style={{ color: "#9BBAD4" }}>Select practitioner...</option>
                      <option value="Dr. Santos">Dr. Santos</option>
                      <option value="Dr. Reyes">Dr. Reyes</option>
                      <option value="Dr. Lim">Dr. Lim</option>
                    </select>
                  ) : (
                    <input
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowNewModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Save Patient</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
