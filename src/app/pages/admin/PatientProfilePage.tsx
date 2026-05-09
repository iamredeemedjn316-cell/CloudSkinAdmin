import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Activity, User, CreditCard, Pencil, Plus, ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

// Sample patient data - would come from API in production
const patientsDatabase = [
  {
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
    servicesAvailed: [
      { id: "S001", name: "Hydra Facial", description: "Deep hydration facial treatment", lastAvailed: "Apr 15, 2026", frequency: "Monthly", status: "active" },
      { id: "S002", name: "LED Therapy", description: "Light therapy for skin rejuvenation", lastAvailed: "Mar 20, 2026", frequency: "Bi-weekly", status: "active" },
      { id: "S003", name: "Chemical Peel", description: "Professional skin exfoliation", lastAvailed: "Feb 10, 2026", frequency: "Quarterly", status: "active" },
    ],
    packages: [
      { id: "PKG001", name: "Premium Facial Package", value: "PHP 15,000", sessionsRemaining: 3, totalSessions: 5, expiryDate: "Dec 31, 2026", status: "active" },
    ],
  },
];

export default function PatientProfilePage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [profileTab, setProfileTab] = useState("overview");
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const patient = patientsDatabase.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <PageWrapper title="Patient Profile" breadcrumb="Admin / Patients / Not Found">
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#5A7A96" }}>
            Patient not found
          </p>
          <button
            onClick={() => navigate("/admin/patients")}
            style={{
              marginTop: "20px",
              padding: "8px 16px",
              background: "#2D6A9F",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Back to Patients
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={`${patient.name} - Patient Profile`} breadcrumb={`Admin / Patients / ${patient.name}`}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/patients")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#2D6A9F",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "20px",
          padding: "0",
        }}
      >
        <ArrowLeft size={16} /> Back to Patients
      </button>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", marginBottom: "20px" }}>
        {/* Left Column - Main Profile Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Profile Header Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "24px", background: "#F8FBFF", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: patient.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "28px",
                    color: "#FFFFFF",
                  }}
                >
                  {patient.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "24px", color: "#1A2E40", marginBottom: "4px" }}>
                    {patient.name}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", display: "flex", gap: "16px", marginBottom: "8px" }}>
                    <span>Age {patient.age}</span>
                    <span>•</span>
                    <span>{patient.dob}</span>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Phone size={13} /> {patient.phone}
                  </div>
                </div>
              </div>
              <button
                style={{
                  padding: "8px 16px",
                  background: "#2D6A9F",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <Pencil size={14} /> Edit Profile
              </button>
            </div>

            {/* Stats Grid */}
            <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {[
                { icon: <Calendar size={18} />, value: patient.totalVisits, label: "Total Visits" },
                { icon: <Activity size={18} />, value: patient.lastVisit, label: "Last Visit" },
                { icon: <User size={18} />, value: patient.activePackages, label: "Packages" },
                { icon: <CreditCard size={18} />, value: patient.vouchers, label: "Vouchers" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#F8FBFF", borderRadius: "10px", padding: "16px", border: "1px solid #D0E8F5", textAlign: "center" }}>
                  <div style={{ color: "#2D6A9F", display: "flex", justifyContent: "center", marginBottom: "8px" }}>{stat.icon}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: "#1A2E40", marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ borderBottom: "1px solid #D0E8F5", display: "flex", overflowX: "auto" }}>
              {["overview", "services", "appointments", "skin"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setProfileTab(tab)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    borderBottom: profileTab === tab ? "3px solid #2D6A9F" : "3px solid transparent",
                    padding: "16px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: profileTab === tab ? 600 : 400,
                    fontSize: "13px",
                    color: profileTab === tab ? "#2D6A9F" : "#5A7A96",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: "24px" }}>
              {/* Overview Tab */}
              {profileTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Personal Information */}
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
                      Personal Information
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      {[
                        { label: "Full Name", value: patient.name },
                        { label: "Date of Birth", value: patient.dob },
                        { label: "Phone", value: patient.phone },
                        { label: "Email", value: patient.email },
                        { label: "Address", value: patient.address, fullWidth: true },
                      ].map((field) => (
                        <div key={field.label} style={{ ...(field.fullWidth ? { gridColumn: "1 / -1" } : {}) }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                            {field.label}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{field.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skin Profile */}
                  <div style={{ borderTop: "1px solid #D0E8F5", paddingTop: "24px" }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
                      Skin Profile
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      {[
                        { label: "Skin Type", value: patient.skinType },
                        { label: "Concerns", value: patient.concerns.join(", ") },
                        { label: "Conditions", value: patient.conditions },
                        { label: "Allergies", value: patient.allergies },
                      ].map((field) => (
                        <div key={field.label}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                            {field.label}
                          </div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{field.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {profileTab === "services" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {patient.servicesAvailed.length > 0 ? (
                    patient.servicesAvailed.map((service) => (
                      <div
                        key={service.id}
                        style={{
                          border: "1px solid #D0E8F5",
                          borderRadius: "10px",
                          overflow: "hidden",
                          background: expandedService === service.id ? "#F8FBFF" : "#FFFFFF",
                        }}
                      >
                        <button
                          onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                          style={{
                            width: "100%",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: expandedService === service.id ? "1px solid #D0E8F5" : "none",
                          }}
                        >
                          <div style={{ textAlign: "left" }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "4px" }}>
                              {service.name}
                            </div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                              Last availed: {service.lastAvailed}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <StatusBadge status={service.status as any} />
                            <ChevronDown size={16} style={{ color: "#5A7A96", transform: expandedService === service.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                          </div>
                        </button>

                        {expandedService === service.id && (
                          <div style={{ padding: "16px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div>
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                Description
                              </div>
                              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{service.description}</div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                              <div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                  Frequency
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>{service.frequency}</div>
                              </div>
                              <div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                  Status
                                </div>
                                <StatusBadge status={service.status as any} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "#5A7A96", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
                      No services availed yet.
                    </div>
                  )}
                </div>
              )}

              {/* Appointments Tab */}
              {profileTab === "appointments" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {patient.appointments.map((apt, i) => (
                    <div key={i} style={{ padding: "16px", border: "1px solid #D0E8F5", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                          {apt.service}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", display: "flex", gap: "8px" }}>
                          <span>{apt.practitioner}</span>
                          <span>•</span>
                          <span>{apt.date}</span>
                        </div>
                      </div>
                      <StatusBadge status={apt.status as any} />
                    </div>
                  ))}
                </div>
              )}

              {/* Skin Tab */}
              {profileTab === "skin" && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#5A7A96", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
                  No skin assessment records yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Active Packages */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px", background: "#F8FBFF", borderBottom: "1px solid #D0E8F5" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", margin: 0 }}>
                Active Packages
              </h3>
            </div>
            <div style={{ padding: "16px" }}>
              {patient.packages.length > 0 ? (
                patient.packages.map((pkg) => (
                  <div key={pkg.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "12px", color: "#1A2E40" }}>
                      {pkg.name}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div>Value: {pkg.value}</div>
                      <div>Sessions: {pkg.sessionsRemaining}/{pkg.totalSessions}</div>
                      <div>Expires: {pkg.expiryDate}</div>
                    </div>
                    <div style={{ marginTop: "8px", width: "100%", height: "6px", background: "#D0E8F5", borderRadius: "3px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          background: "#2D6A9F",
                          width: `${(pkg.sessionsRemaining / pkg.totalSessions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", textAlign: "center", padding: "20px 0" }}>
                  No active packages
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px", background: "#F8FBFF", borderBottom: "1px solid #D0E8F5" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", margin: 0 }}>
                Quick Actions
              </h3>
            </div>
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "New Appointment", icon: <Plus size={14} /> },
                { label: "Assign Package", icon: <CreditCard size={14} /> },
                { label: "Add Voucher", icon: <User size={14} /> },
              ].map((action) => (
                <button
                  key={action.label}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#F8FBFF",
                    border: "1px solid #D0E8F5",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#2D6A9F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E8F2FB";
                    e.currentTarget.style.borderColor = "#9BBAD4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#F8FBFF";
                    e.currentTarget.style.borderColor = "#D0E8F5";
                  }}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
