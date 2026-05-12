import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Plus, Gift, Zap } from "lucide-react";

const allPackages = [
  { id: "PKG001", name: "5+1 Premium Facial Package", type: "Facial", category: "Facial", description: "Complete facial treatment package with 1 free session", value: 15000, image: "/images/service-hydra-facial.jpg", sessions: [{ id: 1, serviceId: "SVC001", isFree: false }, { id: 2, serviceId: "SVC003", isFree: false }, { id: 3, serviceId: "SVC001", isFree: false }, { id: 4, serviceId: "SVC006", isFree: false }, { id: 5, serviceId: "SVC001", isFree: false }, { id: 6, serviceId: "SVC003", isFree: true }], status: "active" },
  { id: "PKG002", name: "Anti-Aging Package", type: "Anti-Aging", category: "Anti-Aging", description: "Comprehensive anti-aging treatments", value: 12000, image: "/images/service-botox.jpg", sessions: [{ id: 1, serviceId: "SVC002", isFree: false }, { id: 2, serviceId: "SVC006", isFree: false }, { id: 3, serviceId: "SVC007", isFree: false }, { id: 4, serviceId: "SVC002", isFree: false }], status: "active" },
  { id: "PKG003", name: "Hair Restoration Package", type: "Hair", category: "Hair", description: "Complete hair treatment program", value: 18000, image: "/images/service-prp-hair.jpg", sessions: [{ id: 1, serviceId: "SVC004", isFree: false }, { id: 2, serviceId: "SVC004", isFree: false }, { id: 3, serviceId: "SVC004", isFree: false }, { id: 4, serviceId: "SVC004", isFree: false }, { id: 5, serviceId: "SVC004", isFree: false }, { id: 6, serviceId: "SVC005", isFree: false }], status: "active" },
  { id: "PKG004", name: "Acne Clear Package", type: "Acne", category: "Acne", description: "Targeted acne treatment program", value: 8500, image: "/images/service-chemical-peel.jpg", sessions: [{ id: 1, serviceId: "SVC005", isFree: false }, { id: 2, serviceId: "SVC008", isFree: false }, { id: 3, serviceId: "SVC008", isFree: false }], status: "inactive" },
  { id: "PKG005", name: "Wellness Plus Package", type: "Wellness", category: "Wellness", description: "Full wellness and beauty treatment", value: 20000, image: "/images/service-hydra-facial.jpg", sessions: [{ id: 1, serviceId: "SVC005", isFree: false }, { id: 2, serviceId: "SVC010", isFree: false }, { id: 3, serviceId: "SVC001", isFree: false }, { id: 4, serviceId: "SVC010", isFree: true }], status: "active" },
  { id: "PKG006", name: "Starter Package", type: "Facial", category: "Facial", description: "Perfect for first-time clients", value: 5000, image: "/images/service-chemical-peel.jpg", sessions: [{ id: 1, serviceId: "SVC001", isFree: false }, { id: 2, serviceId: "SVC005", isFree: false }], status: "inactive" },
];

const typeOptions = ["Facial", "Anti-Aging", "Hair", "Acne", "Wellness"];

export default function PackagesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "active";
  const [typeSort, setTypeSort] = useState<string>("All");

  const filteredPackages = allPackages.filter((pkg) => {
    const matchStatus = pkg.status === statusFilter;
    const matchType = typeSort === "All" || pkg.type === typeSort;
    return matchStatus && matchType;
  });

  const hasFreeSession = (pkg: any) => pkg.sessions.some((s: any) => s.isFree);

  const pageTitle = statusFilter === "active" ? "Active Packages" : "Inactive Packages";

  return (
    <PageWrapper title={pageTitle} subtitle="Manage your service packages">
      <div style={{ marginBottom: "24px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96" }}>
          Sort by Type:
        </label>
        <select
          value={typeSort}
          onChange={(e) => setTypeSort(e.target.value)}
          style={{
            height: "36px",
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
          <option value="All">All Types</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => navigate("/admin/packages/add")}
          style={{
            height: "36px",
            padding: "0 16px",
            background: "#2D6A9F",
            border: "none",
            borderRadius: "8px",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Plus size={16} /> Add Package
        </button>
        <button
          onClick={() => navigate("/admin/packages/all")}
          style={{
            height: "36px",
            padding: "0 16px",
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
            gap: "6px",
          }}
        >
          View All
        </button>
      </div>

      {/* Card Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => navigate(`/admin/packages/${pkg.id}`)}
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #D0E8F5",
              boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
              cursor: "pointer",
              transition: "all 200ms",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,58,92,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(26,58,92,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Image */}
            <div style={{ width: "100%", height: "160px", background: "#F0F6FC", overflow: "hidden", borderBottom: "1px solid #D0E8F5" }}>
              {pkg.image ? (
                <img src={pkg.image} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9BBAD4" }}>
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40", flex: 1 }}>
                    {pkg.name}
                  </div>
                  {hasFreeSession(pkg) && (
                    <div style={{ display: "flex", alignItems: "center", gap: "2px", background: "#FEF3C7", color: "#B45309", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, whiteSpace: "nowrap" }}>
                      <Gift size={10} /> Free
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "10px" }}>
                  {pkg.type}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #E5EFF5" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: "#2D6A9F" }}>
                    {pkg.sessions.length}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#5A7A96" }}>
                    Sessions
                  </div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: "#2D6A9F" }}>
                    ₱{(pkg.value / 1000).toFixed(0)}K
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#5A7A96" }}>
                    Price
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: "auto" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/packages/${pkg.id}`);
                  }}
                  style={{
                    width: "100%",
                    height: "36px",
                    background: "#F0F6FC",
                    border: "1.5px solid #D0E8F5",
                    borderRadius: "8px",
                    color: "#2D6A9F",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 200ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E0EEF9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#F0F6FC";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#5A7A96" }}>
          <Zap size={32} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500 }}>
            No packages found for the selected filters.
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
