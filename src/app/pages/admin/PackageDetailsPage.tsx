import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { ArrowLeft, Edit, Trash2, Archive, Gift, X, Upload, Plus } from "lucide-react";

const allPackages = [
  { id: "PKG001", name: "5+1 Premium Facial Package", type: "Facial", category: "Facial", description: "Complete facial treatment package with 1 free session", value: 15000, image: "/images/service-hydra-facial.jpg", sessions: [{ id: 1, serviceId: "SVC001", serviceName: "Hydra Facial", isFree: false }, { id: 2, serviceId: "SVC003", serviceName: "Chemical Peel", isFree: false }, { id: 3, serviceId: "SVC001", serviceName: "Hydra Facial", isFree: false }, { id: 4, serviceId: "SVC006", serviceName: "Microneedling", isFree: false }, { id: 5, serviceId: "SVC001", serviceName: "Hydra Facial", isFree: false }, { id: 6, serviceId: "SVC003", serviceName: "Chemical Peel", isFree: true }], status: "active" },
  { id: "PKG002", name: "Anti-Aging Package", type: "Anti-Aging", category: "Anti-Aging", description: "Comprehensive anti-aging treatments", value: 12000, image: "/images/service-botox.jpg", sessions: [{ id: 1, serviceId: "SVC002", serviceName: "Botox Treatment", isFree: false }, { id: 2, serviceId: "SVC006", serviceName: "Microneedling", isFree: false }, { id: 3, serviceId: "SVC007", serviceName: "Laser Resurfacing", isFree: false }, { id: 4, serviceId: "SVC002", serviceName: "Botox Treatment", isFree: false }], status: "active" },
  { id: "PKG003", name: "Hair Restoration Package", type: "Hair", category: "Hair", description: "Complete hair treatment program", value: 18000, image: "/images/service-prp-hair.jpg", sessions: [{ id: 1, serviceId: "SVC004", serviceName: "PRP Hair Therapy", isFree: false }, { id: 2, serviceId: "SVC004", serviceName: "PRP Hair Therapy", isFree: false }, { id: 3, serviceId: "SVC004", serviceName: "PRP Hair Therapy", isFree: false }, { id: 4, serviceId: "SVC004", serviceName: "PRP Hair Therapy", isFree: false }, { id: 5, serviceId: "SVC004", serviceName: "PRP Hair Therapy", isFree: false }, { id: 6, serviceId: "SVC005", serviceName: "LED Light Therapy", isFree: false }], status: "active" },
  { id: "PKG004", name: "Acne Clear Package", type: "Acne", category: "Acne", description: "Targeted acne treatment program", value: 8500, image: "/images/service-chemical-peel.jpg", sessions: [{ id: 1, serviceId: "SVC005", serviceName: "LED Light Therapy", isFree: false }, { id: 2, serviceId: "SVC008", serviceName: "Acne Treatment", isFree: false }, { id: 3, serviceId: "SVC008", serviceName: "Acne Treatment", isFree: false }], status: "inactive" },
  { id: "PKG005", name: "Wellness Plus Package", type: "Wellness", category: "Wellness", description: "Full wellness and beauty treatment", value: 20000, image: "/images/service-hydra-facial.jpg", sessions: [{ id: 1, serviceId: "SVC005", serviceName: "LED Light Therapy", isFree: false }, { id: 2, serviceId: "SVC010", serviceName: "IV Drip Wellness", isFree: false }, { id: 3, serviceId: "SVC001", serviceName: "Hydra Facial", isFree: false }, { id: 4, serviceId: "SVC010", serviceName: "IV Drip Wellness", isFree: true }], status: "active" },
];

export default function PackageDetailsPage() {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState("");

  const pkg = allPackages.find((p) => p.id === packageId);

  if (!pkg) {
    return (
      <PageWrapper title="Package Not Found">
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#5A7A96", marginBottom: "20px" }}>
            This package could not be found.
          </div>
          <button
            onClick={() => navigate("/admin/packages/all")}
            style={{
              height: "40px",
              padding: "0 18px",
              background: "#2D6A9F",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to Packages
          </button>
        </div>
      </PageWrapper>
    );
  }

  const freeSessionCount = pkg.sessions.filter((s) => s.isFree).length;
  const paidSessionCount = pkg.sessions.filter((s) => !s.isFree).length;
  
  const categoryOptions = ["Facial", "Anti-Aging", "Hair", "Acne", "Wellness"];

  const handleEditModeChange = () => {
    if (isEditMode) {
      setEditCategory("");
    } else {
      setEditCategory(pkg.category || pkg.type);
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <PageWrapper title={pkg.name} subtitle={pkg.type}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
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
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left: Image & Basic Info */}
        <div>
          {/* Image */}
          <div style={{ marginBottom: "20px" }}>
            {pkg.image ? (
              <img
                src={pkg.image}
                alt={pkg.name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "1px solid #D0E8F5",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#F0F6FC",
                  borderRadius: "12px",
                  border: "1px solid #D0E8F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9BBAD4",
                }}
              >
                No Image
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #D0E8F5", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "24px", fontWeight: 700, color: "#2D6A9F", marginBottom: "4px" }}>
                ₱{pkg.value.toLocaleString()}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                Package Value
              </div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #D0E8F5", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "24px", fontWeight: 700, color: "#2D6A9F", marginBottom: "4px" }}>
                {pkg.sessions.length}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                Total Sessions
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "8px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            background: pkg.status === "active" ? "#DCFCE7" : "#FEF3C7",
            color: pkg.status === "active" ? "#15803D" : "#B45309",
            textTransform: "capitalize",
            marginBottom: "20px",
          }}>
            {pkg.status}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", marginBottom: "8px" }}>
              Description
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", lineHeight: 1.6 }}>
              {pkg.description}
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", marginBottom: "8px" }}>
              Category
            </div>
            {isEditMode ? (
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "0 12px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  background: "#FFFFFF",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>
                {pkg.category || pkg.type}
              </div>
            )}
          </div>

          {/* Sessions Summary */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", marginBottom: "12px" }}>
              Sessions Summary
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ background: "#E0EEF9", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#2D6A9F" }}>
                  {paidSessionCount}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96" }}>
                  Paid Sessions
                </div>
              </div>
              <div style={{ background: "#ECFDF5", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#047857" }}>
                  {freeSessionCount}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#047857" }}>
                  Free Sessions
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleEditModeChange}
              style={{
                flex: 1,
                height: "40px",
                background: "#F0F6FC",
                border: "1.5px solid #D0E8F5",
                borderRadius: "8px",
                color: "#2D6A9F",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Edit size={14} /> {isEditMode ? "Done" : "Edit"}
            </button>
            <button
              style={{
                flex: 1,
                height: "40px",
                background: "#FEE2E2",
                border: "1.5px solid #FCA5A5",
                borderRadius: "8px",
                color: "#DC2626",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", marginBottom: "16px" }}>
          Package Sessions
        </h3>
        <div style={{ display: "grid", gap: "12px" }}>
          {pkg.sessions.map((session, idx) => (
            <div
              key={session.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #D0E8F5",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: session.isFree ? "#ECFDF5" : "#E0EEF9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: session.isFree ? "#047857" : "#2D6A9F",
                }}
              >
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>
                  {session.serviceName}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96" }}>
                  Session {idx + 1}
                </div>
              </div>
              {session.isFree && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "#FEF3C7",
                    color: "#B45309",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  <Gift size={12} /> Free
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
