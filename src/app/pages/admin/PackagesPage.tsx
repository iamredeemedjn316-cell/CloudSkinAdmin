import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { Plus, Pencil, Trash2, X, ChevronDown } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

const initialPackages = [
  { id: "PKG001", name: "Premium Facial Package", description: "Complete facial treatment package", value: 15000, sessions: 5, includedServices: ["SVC001", "SVC003", "SVC006"], status: "active" },
  { id: "PKG002", name: "Anti-Aging Package", description: "Comprehensive anti-aging treatments", value: 12000, sessions: 4, includedServices: ["SVC002", "SVC006", "SVC007"], status: "active" },
  { id: "PKG003", name: "Hair Restoration Package", description: "Complete hair treatment program", value: 18000, sessions: 6, includedServices: ["SVC004"], status: "active" },
  { id: "PKG004", name: "Acne Clear Package", description: "Targeted acne treatment program", value: 8500, sessions: 3, includedServices: ["SVC005", "SVC008"], status: "inactive" },
];

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

export default function PackagesPage() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  const [packagesList, setPackagesList] = useState(initialPackages);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<any>(null);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: "",
    sessions: "",
    includedServices: [] as string[],
    status: "active" as "active" | "inactive",
  });

  const handleOpenModal = (pkg: any = null) => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        description: pkg.description,
        value: pkg.value.toString(),
        sessions: pkg.sessions.toString(),
        includedServices: pkg.includedServices,
        status: pkg.status,
      });
      setEditingPackage(pkg);
    } else {
      setFormData({
        name: "",
        description: "",
        value: "",
        sessions: "",
        includedServices: [],
        status: "active",
      });
      setEditingPackage(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPackage(null);
    setFormData({
      name: "",
      description: "",
      value: "",
      sessions: "",
      includedServices: [],
      status: "active",
    });
  };

  const handleSavePackage = () => {
    if (!formData.name || !formData.value || !formData.sessions || formData.includedServices.length === 0) {
      return;
    }

    if (editingPackage) {
      setPackagesList(
        packagesList.map((p) =>
          p.id === editingPackage.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                value: parseInt(formData.value),
                sessions: parseInt(formData.sessions),
                includedServices: formData.includedServices,
                status: formData.status,
              }
            : p
        )
      );
    } else {
      const newId = `PKG${String(packagesList.length + 1).padStart(3, "0")}`;
      setPackagesList([
        ...packagesList,
        {
          id: newId,
          name: formData.name,
          description: formData.description,
          value: parseInt(formData.value),
          sessions: parseInt(formData.sessions),
          includedServices: formData.includedServices,
          status: formData.status,
        },
      ]);
    }
    handleCloseModal();
  };

  const handleDeletePackage = (pkg: any) => {
    setPackageToDelete(pkg);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      setPackagesList(packagesList.filter((p) => p.id !== packageToDelete.id));
      setShowConfirmModal(false);
      setPackageToDelete(null);
    }
  };

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      includedServices: prev.includedServices.includes(serviceId)
        ? prev.includedServices.filter((s) => s !== serviceId)
        : [...prev.includedServices, serviceId],
    }));
  };
  
  // Filter packages based on URL status
  const filteredPackages = packagesList.filter((pkg) => {
    if (statusFilter === "all") return true;
    return pkg.status === statusFilter;
  });
  
  // Get page title based on status filter
  const getPageTitle = () => {
    switch (statusFilter) {
      case "active": return "Active Packages";
      case "inactive": return "Inactive Packages";
      default: return "Packages";
    }
  };

  return (
    <PageWrapper title={getPageTitle()} breadcrumb={`Admin / ${getPageTitle()}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "18px", color: "#1A2E40" }}>{statusFilter === "all" ? "All Packages" : getPageTitle()}</h2>
        <button
          onClick={() => handleOpenModal()}
          style={{ height: "40px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}
        >
          <Plus size={14} /> Add Package
        </button>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              border: "1px solid #D0E8F5",
              borderRadius: "12px",
              background: "#FFFFFF",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                borderBottom: expandedPackage === pkg.id ? "1px solid #D0E8F5" : "none",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "4px" }}>
                  {pkg.name}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                  ₱{pkg.value.toLocaleString()} • {pkg.sessions} sessions
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <StatusBadge status={pkg.status as any} />
                <ChevronDown size={16} style={{ color: "#5A7A96", transform: expandedPackage === pkg.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }} />
              </div>
            </button>

            {expandedPackage === pkg.id && (
              <div style={{ padding: "16px 20px", background: "#F8FBFF" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                    Description
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40" }}>
                    {pkg.description}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                    Included Services
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {pkg.includedServices.map((serviceId) => (
                      <div
                        key={serviceId}
                        style={{
                          background: "#E0EEF9",
                          color: "#2D6A9F",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {serviceMap[serviceId] || serviceId}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", paddingTop: "16px", borderTop: "1px solid #D0E8F5" }}>
                  <button
                    onClick={() => handleOpenModal(pkg)}
                    style={{
                      height: "36px",
                      padding: "0 16px",
                      background: "#F0F6FC",
                      border: "1.5px solid #D0E8F5",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#5A7A96",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg)}
                    style={{
                      height: "36px",
                      padding: "0 16px",
                      background: "#FEE2E2",
                      border: "1.5px solid #FCA5A5",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#DC2626",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Package Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26, 46, 64, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "560px",
              boxShadow: "0 8px 32px rgba(26, 58, 92, 0.18)",
              overflow: "hidden",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>
                {editingPackage ? "Edit Package" : "Add Package"}
              </span>
              <button onClick={handleCloseModal} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                  Package Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium Facial Package"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                  Description *
                </label>
                <textarea
                  placeholder="Package description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  style={{ width: "100%", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "10px 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                    Package Value (PHP) *
                  </label>
                  <input
                    type="number"
                    placeholder="15000"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                    Number of Sessions *
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    value={formData.sessions}
                    onChange={(e) => setFormData({ ...formData, sessions: e.target.value })}
                    style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "10px" }}>
                  Included Services *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxHeight: "200px", overflowY: "auto", padding: "8px", border: "1px solid #D0E8F5", borderRadius: "8px" }}>
                  {Object.entries(serviceMap).map(([serviceId, serviceName]) => (
                    <label key={serviceId} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={formData.includedServices.includes(serviceId)}
                        onChange={() => toggleService(serviceId)}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                      />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#1A2E40" }}>
                        {serviceName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                  style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={handleCloseModal}
                style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePackage}
                style={{
                  height: "38px",
                  padding: "0 20px",
                  background: "#2D6A9F",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                {editingPackage ? "Save Changes" : "Create Package"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmModal && packageToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26, 58, 92, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 8px 32px rgba(26, 58, 92, 0.18)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div style={{ background: "#FEE2E2", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Trash2 size={28} color="#EF4444" />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40", marginBottom: "8px" }}>
                Delete Package?
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
                Are you sure you want to delete <strong>"{packageToDelete.name}"</strong>? This action cannot be undone.
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  height: "38px",
                  padding: "0 20px",
                  background: "#EF4444",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
