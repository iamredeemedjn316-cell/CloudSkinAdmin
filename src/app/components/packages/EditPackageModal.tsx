import React, { useState } from "react";
import { X, Upload, Plus } from "lucide-react";

interface EditPackageModalProps {
  pkg: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPackage: any) => void;
}

const serviceMap: Record<string, string> = {
  SVC001: "Hydra Facial",
  SVC002: "Botox Treatment",
  SVC003: "Chemical Peel",
  SVC004: "PRP Hair Therapy",
  SVC005: "LED Light Therapy",
  SVC006: "Microneedling",
  SVC007: "Laser Resurfacing",
  SVC008: "Acne Treatment",
  SVC010: "IV Drip Wellness",
};

export default function EditPackageModal({ pkg, isOpen, onClose, onSave }: EditPackageModalProps) {
  const [formData, setFormData] = useState(pkg ? {
    name: pkg.name,
    description: pkg.description,
    value: pkg.value.toString(),
    category: pkg.category || pkg.type,
    image: pkg.image,
    sessions: pkg.sessions.map((s: any) => ({ ...s })),
    status: pkg.status,
  } : {
    name: "",
    description: "",
    value: "",
    category: "Facial",
    image: null,
    sessions: [],
    status: "active",
  });

  const [nextSessionId, setNextSessionId] = useState(Math.max(...(pkg?.sessions?.map((s: any) => s.id) || [0])) + 1);
  const categoryOptions = ["Facial", "Anti-Aging", "Hair", "Acne", "Wellness"];

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

  const handleAddSession = () => {
    setFormData({
      ...formData,
      sessions: [...formData.sessions, { id: nextSessionId, serviceId: "SVC001", serviceName: "Hydra Facial", isFree: false }],
    });
    setNextSessionId(nextSessionId + 1);
  };

  const handleUpdateSession = (idx: number, field: string, value: any) => {
    const newSessions = [...formData.sessions];
    if (field === "serviceId") {
      newSessions[idx].serviceId = value;
      newSessions[idx].serviceName = serviceMap[value];
    } else {
      (newSessions[idx] as any)[field] = value;
    }
    setFormData({ ...formData, sessions: newSessions });
  };

  const handleRemoveSession = (idx: number) => {
    setFormData({
      ...formData,
      sessions: formData.sessions.filter((_, i) => i !== idx),
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.value || formData.sessions.length === 0) {
      return;
    }
    onSave({
      ...pkg,
      name: formData.name,
      description: formData.description,
      value: parseInt(formData.value),
      category: formData.category,
      image: formData.image,
      sessions: formData.sessions,
      status: formData.status,
      type: formData.category,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px",
            borderBottom: "1px solid #D0E8F5",
            position: "sticky",
            top: 0,
            background: "#FFFFFF",
          }}
        >
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A2E40" }}>
            Edit Package
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A7A96",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left Column */}
          <div>
            {/* Image Upload */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "10px" }}>
                Package Image
              </label>
              <div
                style={{
                  border: "2px dashed #D0E8F5",
                  borderRadius: "8px",
                  padding: "24px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: formData.image ? "#F0F6FC" : "#FFFFFF",
                }}
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                {formData.image ? (
                  <div>
                    <img src={formData.image} alt="Package" style={{ maxHeight: "100px", borderRadius: "6px", marginBottom: "10px" }} />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Click to change</div>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} style={{ color: "#2D6A9F", margin: "0 auto 8px" }} />
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2D6A9F" }}>
                      Click to upload
                    </div>
                  </div>
                )}
              </div>
              <input id="imageUpload" type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </div>

            {/* Package Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                Package Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={{ width: "100%", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "10px 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Category */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", background: "#FFFFFF", outline: "none", boxSizing: "border-box" }}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                Price (PHP) *
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Status */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", background: "#FFFFFF", outline: "none", boxSizing: "border-box" }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div style={{ padding: "24px", borderTop: "1px solid #D0E8F5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40" }}>
              Sessions * ({formData.sessions.length} total)
            </label>
            <button
              onClick={handleAddSession}
              style={{
                height: "28px",
                padding: "0 12px",
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px", maxHeight: "300px", overflowY: "auto" }}>
            {formData.sessions.map((session: any, idx: number) => (
              <div key={session.id} style={{ display: "flex", gap: "8px", alignItems: "center", background: "#F8FBFF", padding: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }}>
                <div style={{ flex: 1, display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", minWidth: "50px" }}>
                    Session {idx + 1}:
                  </span>
                  <select
                    value={session.serviceId}
                    onChange={(e) => handleUpdateSession(idx, "serviceId", e.target.value)}
                    style={{
                      flex: 1,
                      height: "28px",
                      border: "1px solid #D0E8F5",
                      borderRadius: "4px",
                      padding: "0 6px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      outline: "none",
                    }}
                  >
                    {Object.entries(serviceMap).map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", whiteSpace: "nowrap" }}>
                  <input
                    type="checkbox"
                    checked={session.isFree}
                    onChange={(e) => handleUpdateSession(idx, "isFree", e.target.checked)}
                    style={{ width: "14px", height: "14px", cursor: "pointer" }}
                  />
                  Free
                </label>

                <button
                  onClick={() => handleRemoveSession(idx)}
                  style={{
                    width: "24px",
                    height: "24px",
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

        {/* Modal Footer */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "24px",
            borderTop: "1px solid #D0E8F5",
            background: "#F8FBFF",
            justifyContent: "flex-end",
            position: "sticky",
            bottom: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              height: "40px",
              padding: "0 18px",
              background: "#F0F6FC",
              border: "1.5px solid #D0E8F5",
              borderRadius: "8px",
              color: "#2D6A9F",
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
