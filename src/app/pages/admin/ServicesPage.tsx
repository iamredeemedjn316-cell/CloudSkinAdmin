import React, { useState } from "react";
import { Plus, Pencil, X, Upload, Image as ImageIcon } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const categories = ["All", "Skin Treatments", "Injectables", "Laser", "Hair", "Wellness"];

const services = [
  { id: "SVC001", name: "Hydra Facial", category: "Skin Treatments", duration: 60, price: 2500, status: "active", practitioners: ["MS", "AR"], description: "Deep cleansing and hydration facial treatment using vortex technology." },
  { id: "SVC002", name: "Botox Treatment", category: "Injectables", duration: 45, price: 8000, status: "active", practitioners: ["AR"], description: "Neurotoxin injection for wrinkle reduction and facial contouring." },
  { id: "SVC003", name: "Chemical Peel", category: "Skin Treatments", duration: 45, price: 3500, status: "active", practitioners: ["MS", "AR"], description: "Chemical exfoliation treatment for skin renewal and brightening." },
  { id: "SVC004", name: "PRP Hair Therapy", category: "Hair", duration: 90, price: 12000, status: "active", practitioners: ["JL"], description: "Platelet-rich plasma therapy for hair growth and restoration." },
  { id: "SVC005", name: "LED Light Therapy", category: "Skin Treatments", duration: 30, price: 1800, status: "active", practitioners: ["MS", "AR", "JL"], description: "Non-invasive light therapy for acne, anti-aging, and skin repair." },
  { id: "SVC006", name: "Microneedling", category: "Skin Treatments", duration: 60, price: 4500, status: "active", practitioners: ["MS"], description: "Collagen induction therapy using micro-needles for skin rejuvenation." },
  { id: "SVC007", name: "Laser Resurfacing", category: "Laser", duration: 90, price: 15000, status: "active", practitioners: ["JL"], description: "Advanced laser treatment for scars, wrinkles, and skin texture improvement." },
  { id: "SVC008", name: "Acne Treatment", category: "Skin Treatments", duration: 45, price: 2800, status: "active", practitioners: ["AR"], description: "Targeted treatment for active acne and acne-prone skin." },
  { id: "SVC009", name: "Dermal Fillers", category: "Injectables", duration: 60, price: 18000, status: "active", practitioners: ["AR", "MS"], description: "Hyaluronic acid fillers for volume restoration and contouring." },
  { id: "SVC010", name: "IV Drip Wellness", category: "Wellness", duration: 60, price: 3500, status: "active", practitioners: ["JL"], description: "Intravenous vitamin and nutrient infusion for overall wellness." },
  { id: "SVC011", name: "Skin Tag Removal", category: "Laser", duration: 30, price: 800, status: "inactive", practitioners: ["JL"], description: "Laser or surgical removal of skin tags and benign growths." },
];

const practitionerMap: Record<string, { color: string; name: string }> = {
  MS: { color: "#16A34A", name: "Dr. Santos" },
  AR: { color: "#7C3AED", name: "Dr. Reyes" },
  JL: { color: "#EA580C", name: "Dr. Lim" },
};

export default function ServicesPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = services.filter((s) => categoryFilter === "All" || s.category === categoryFilter);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleModalOpen = (service: any = null) => {
    setEditingService(service);
    setSelectedImage(service?.image || null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage(null);
    setEditingService(null);
  };

  return (
    <PageWrapper title="Services" breadcrumb="Admin / Services">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", flex: 1 }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              style={{ height: "36px", padding: "0 14px", background: categoryFilter === c ? "#2D6A9F" : "#FFFFFF", border: `1.5px solid ${categoryFilter === c ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: categoryFilter === c ? "#FFFFFF" : "#5A7A96" }}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleModalOpen()}
          style={{ height: "40px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, flexShrink: 0 }}
        >
          <Plus size={14} /> Add Service
        </button>
      </div>

      {/* Card Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filtered.map((service) => (
          <div
            key={service.id}
            style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", border: "1px solid #D0E8F5", overflow: "hidden" }}
          >
            {/* Card Header */}
            <div style={{ background: "linear-gradient(135deg, #EBF6FD 0%, #F0F6FC 100%)", padding: "16px 20px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "6px" }}>{service.name}</div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ background: "#EBF6FD", color: "#2D6A9F", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "9999px" }}>
                    {service.category}
                  </span>
                  <span style={{ background: "#F0F6FC", color: "#5A7A96", fontFamily: "'Inter', sans-serif", fontSize: "11px", padding: "2px 8px", borderRadius: "9999px" }}>
                    {service.duration} min
                  </span>
                </div>
              </div>
              <StatusBadge status={service.status as any} />
            </div>

            {/* Card Body */}
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", lineHeight: 1.6, marginBottom: "14px" }}>
                {service.description}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: "#2D6A9F" }}>
                  ₱{service.price.toLocaleString()}
                </div>
                <div style={{ display: "flex", gap: "-4px" }}>
                  {service.practitioners.map((p, i) => (
                    <div
                      key={p}
                      title={practitionerMap[p]?.name}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: practitionerMap[p]?.color || "#2D6A9F",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "10px",
                        color: "#FFFFFF",
                        marginLeft: i > 0 ? "-6px" : "0",
                        border: "2px solid #FFFFFF",
                        zIndex: service.practitioners.length - i,
                        position: "relative",
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                    {service.status === "active" ? "Active" : "Inactive"}
                  </span>
                  <div
                    style={{ width: "36px", height: "20px", borderRadius: "9999px", background: service.status === "active" ? "#2D6A9F" : "#D0E8F5", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "2px" }}
                  >
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#FFFFFF", marginLeft: service.status === "active" ? "auto" : "0" }} />
                  </div>
                </div>
                <button
                  onClick={() => handleModalOpen(service)}
                  style={{ height: "30px", padding: "0 12px", background: "#F0F6FC", border: "1.5px solid #D0E8F5", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96" }}
                >
                  <Pencil size={12} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={handleModalClose}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "560px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>
                {editingService ? "Edit Service" : "Add Service"}
              </span>
              <button onClick={handleModalClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
              {/* Image Upload Section */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Service Image</label>
                {selectedImage ? (
                  <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", border: "2px solid #D0E8F5" }}>
                    <img src={selectedImage} alt="Service preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "6px" }}>
                      <label style={{ width: "32px", height: "32px", borderRadius: "6px", background: "rgba(255,255,255,0.95)", border: "1.5px solid #D0E8F5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}>
                        <Pencil size={14} />
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                      </label>
                      <button onClick={handleRemoveImage} style={{ width: "32px", height: "32px", borderRadius: "6px", background: "rgba(255,255,255,0.95)", border: "1.5px solid #D0E8F5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444" }}>
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "200px", border: "2px dashed #D0E8F5", borderRadius: "12px", cursor: "pointer", background: "#F8FBFF" }}>
                    <ImageIcon size={32} style={{ color: "#9BBAD4", marginBottom: "8px" }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#5A7A96", marginBottom: "4px" }}>Click to upload image</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>PNG, JPG up to 5MB</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  </label>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Service Name</label>
                  <input defaultValue={editingService?.name} placeholder="e.g. Hydra Facial" style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Category</label>
                  <select defaultValue={editingService?.category} style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}>
                    {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Duration (minutes)</label>
                  <input type="number" defaultValue={editingService?.duration} placeholder="60" style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Price (PHP)</label>
                  <input type="number" defaultValue={editingService?.price} placeholder="2500" style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Description</label>
                  <textarea defaultValue={editingService?.description} rows={3} style={{ width: "100%", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "10px 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", resize: "none", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px", flexShrink: 0 }}>
              <button onClick={handleModalClose} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>Save Service</button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
