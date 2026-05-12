import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, Plus, X, ChevronLeft } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";

const serviceMap: Record<string, string> = {
  "SVC001": "Hydra Facial",
  "SVC002": "Botox Treatment",
  "SVC003": "Chemical Peel",
  "SVC004": "PRP Hair Therapy",
  "SVC005": "LED Light Therapy",
  "SVC006": "Microneedling",
  "SVC007": "Laser Resurfacing",
  "SVC008": "Acne Treatment",
  "SVC009": "Dermal Fillers",
  "SVC010": "IV Drip Wellness",
};

const categoryOptions = ["Facial", "Anti-Aging", "Hair", "Acne", "Wellness"];

export default function AddPackagePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Facial",
    value: "",
    image: null as string | null,
    sessions: [] as { id: number; serviceId: string; isFree: boolean }[],
    status: "active" as "active" | "inactive",
  });
  const [nextSessionId, setNextSessionId] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSession = () => {
    setFormData({
      ...formData,
      sessions: [...formData.sessions, { id: nextSessionId, serviceId: "SVC001", isFree: false }],
    });
    setNextSessionId(nextSessionId + 1);
  };

  const handleRemoveSession = (idx: number) => {
    setFormData({
      ...formData,
      sessions: formData.sessions.filter((_, i) => i !== idx),
    });
  };

  const handleUpdateSession = (idx: number, serviceId: string, isFree: boolean) => {
    const newSessions = [...formData.sessions];
    newSessions[idx] = { ...newSessions[idx], serviceId, isFree };
    setFormData({ ...formData, sessions: newSessions });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.value || formData.sessions.length === 0) {
      alert("Please fill in all required fields and add at least one session");
      return;
    }
    // Save logic would go here
    alert("Package created successfully!");
    navigate("/admin/packages/all");
  };

  const freeSessionCount = formData.sessions.filter((s) => s.isFree).length;

  return (
    <PageWrapper title="Add New Package">
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #D0E8F5", background: "#F8FBFF" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#2D6A9F",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            <ChevronLeft size={18} /> Back
          </button>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A2E40" }}>
            Create New Package
          </div>
          <div style={{ width: "100px" }}></div>
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", padding: "32px", minHeight: "calc(100vh - 200px)" }}>
          {/* Left Column: Image and Basic Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Image Upload */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "12px" }}>
                Package Image *
              </label>
              <div
                style={{
                  border: "2px dashed #D0E8F5",
                  borderRadius: "12px",
                  padding: "32px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: formData.image ? "#F0F6FC" : "#FFFFFF",
                  transition: "all 200ms",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                {formData.image ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={formData.image} alt="Package" style={{ maxHeight: "160px", borderRadius: "8px", marginBottom: "12px", objectFit: "cover" }} />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Click to change image</div>
                  </div>
                ) : (
                  <div>
                    <Upload size={32} style={{ color: "#2D6A9F", marginBottom: "12px" }} />
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#2D6A9F", marginBottom: "4px" }}>
                      Click to upload
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                      PNG, JPG up to 5MB
                    </div>
                  </div>
                )}
              </div>
              <input id="imageUpload" type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </div>

            {/* Package Name */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>
                Package Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. 5+1 Premium Facial Package"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "44px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the package..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                style={{
                  width: "100%",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Right Column: Package Details and Sessions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Category */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>
                Package Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "44px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  background: "#FFFFFF",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Package Value */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>
                Package Price (PHP) *
              </label>
              <input
                type="number"
                name="value"
                placeholder="15000"
                value={formData.value}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "44px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Status */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "44px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  background: "#FFFFFF",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Sessions Summary */}
            <div style={{ background: "#EBF6FD", padding: "16px", borderRadius: "8px", border: "1px solid #D0E8F5" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "4px" }}>
                Sessions Summary
              </div>
              <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                <div>
                  <span style={{ color: "#5A7A96" }}>Total Sessions: </span>
                  <span style={{ color: "#2D6A9F", fontWeight: 600 }}>{formData.sessions.length}</span>
                </div>
                <div>
                  <span style={{ color: "#5A7A96" }}>Free Sessions: </span>
                  <span style={{ color: "#10B981", fontWeight: 600 }}>{freeSessionCount}</span>
                </div>
              </div>
            </div>

            {/* Sessions Builder */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                  Add Sessions *
                </label>
                <button
                  onClick={handleAddSession}
                  style={{
                    height: "32px",
                    padding: "0 14px",
                    background: "#2D6A9F",
                    border: "none",
                    borderRadius: "6px",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Plus size={14} /> Add Session
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", padding: "8px", border: "1px solid #D0E8F5", borderRadius: "8px", background: "#F8FBFF", maxHeight: "320px" }}>
                {formData.sessions.map((session, idx) => (
                  <div key={session.id} style={{ display: "flex", gap: "8px", alignItems: "center", background: "#FFFFFF", padding: "10px", borderRadius: "6px", border: "1px solid #E0E8F0" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", minWidth: "60px", fontWeight: 500 }}>
                      Session {idx + 1}:
                    </span>
                    <select
                      value={session.serviceId}
                      onChange={(e) => handleUpdateSession(idx, e.target.value, session.isFree)}
                      style={{
                        flex: 1,
                        height: "28px",
                        border: "1px solid #D0E8F5",
                        borderRadius: "4px",
                        padding: "0 6px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        color: "#1A2E40",
                        outline: "none",
                        background: "#FFFFFF",
                      }}
                    >
                      {Object.entries(serviceMap).map(([serviceId, serviceName]) => (
                        <option key={serviceId} value={serviceId}>
                          {serviceName}
                        </option>
                      ))}
                    </select>

                    <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#5A7A96", whiteSpace: "nowrap" }}>
                      <input
                        type="checkbox"
                        checked={session.isFree}
                        onChange={(e) => handleUpdateSession(idx, session.serviceId, e.target.checked)}
                        style={{ width: "12px", height: "12px", cursor: "pointer" }}
                      />
                      Free
                    </label>

                    <button
                      onClick={() => handleRemoveSession(idx)}
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "#FEE2E2",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#DC2626",
                        fontSize: "12px",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "24px 32px", background: "#F8FBFF", borderTop: "1px solid #D0E8F5", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              height: "40px",
              padding: "0 20px",
              background: "#FFFFFF",
              border: "1.5px solid #D0E8F5",
              borderRadius: "8px",
              color: "#5A7A96",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              height: "40px",
              padding: "0 28px",
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
            Create Package
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
