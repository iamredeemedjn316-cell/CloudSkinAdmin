import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { Eye, Package, TrendingUp, Archive, Box, Plus, MoreVertical, Trash2 } from "lucide-react";

const allPackages = [
  { id: "PKG001", name: "5+1 Premium Facial Package", type: "Facial", category: "Facial", value: 15000, sessions: 6, status: "active", archived: false, image: "/images/service-hydra-facial.jpg" },
  { id: "PKG002", name: "Anti-Aging Package", type: "Anti-Aging", category: "Anti-Aging", value: 12000, sessions: 4, status: "active", archived: false, image: "/images/service-botox.jpg" },
  { id: "PKG003", name: "Hair Restoration Package", type: "Hair", category: "Hair", value: 18000, sessions: 6, status: "active", archived: false, image: "/images/service-prp-hair.jpg" },
  { id: "PKG004", name: "Acne Clear Package", type: "Acne", category: "Acne", value: 8500, sessions: 3, status: "inactive", archived: false, image: "/images/service-chemical-peel.jpg" },
  { id: "PKG005", name: "Wellness Plus Package", type: "Wellness", category: "Wellness", value: 20000, sessions: 4, status: "active", archived: false, image: "/images/service-hydra-facial.jpg" },
  { id: "PKG006", name: "Starter Package", type: "Facial", category: "Facial", value: 5000, sessions: 2, status: "inactive", archived: false, image: "/images/service-chemical-peel.jpg" },
  { id: "PKG007", name: "Luxury Complete Package", type: "Anti-Aging", category: "Anti-Aging", value: 35000, sessions: 8, status: "active", archived: true, image: "/images/service-botox.jpg" },
];

export default function ViewAllPackagesPage() {
  const navigate = useNavigate();
  const [packagesList, setPackagesList] = useState(allPackages);
  const [searchParams] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const activeCount = packagesList.filter((p) => p.status === "active" && !p.archived).length;
  const inactiveCount = packagesList.filter((p) => p.status === "inactive" && !p.archived).length;
  const archiveCount = packagesList.filter((p) => p.archived).length;
  const totalCount = packagesList.filter((p) => !p.archived).length;

  const handleArchive = (packageId: string) => {
    setPackagesList(packagesList.map(p => 
      p.id === packageId ? { ...p, archived: true } : p
    ));
  };

  const handleDelete = (packageId: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      setPackagesList(packagesList.filter(p => p.id !== packageId));
    }
  };

  return (
    <PageWrapper title="All Packages" subtitle="View analytics and manage all packages">
      {/* Header Actions */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => navigate("/admin/packages/add")}
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
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Plus size={16} /> Add Package
        </button>
      </div>

      {/* Analytics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <StatCard
          title="Active Packages"
          value={activeCount.toString()}
          icon={<TrendingUp size={24} />}
          color="#10B981"
        />
        <StatCard
          title="Inactive Packages"
          value={inactiveCount.toString()}
          icon={<Box size={24} />}
          color="#F59E0B"
        />
        <StatCard
          title="Archive Packages"
          value={archiveCount.toString()}
          icon={<Archive size={24} />}
          color="#6B7280"
        />
        <StatCard
          title="Total Packages"
          value={totalCount.toString()}
          icon={<Package size={24} />}
          color="#2D6A9F"
        />
      </div>

      {/* Packages Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FBFF", borderBottom: "2px solid #D0E8F5" }}>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", width: "80px" }}>Image</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Package Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Sessions</th>
              <th style={{ padding: "12px 24px", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Price</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packagesList.filter((p) => !p.archived).map((pkg) => (
              <tr key={pkg.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  {pkg.image ? (
                    <img src={pkg.image} alt={pkg.name} style={{ width: "50px", height: "50px", borderRadius: "6px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "50px", height: "50px", borderRadius: "6px", background: "#F0F6FC", display: "flex", alignItems: "center", justifyContent: "center", color: "#9BBAD4", fontSize: "11px" }}>
                      No image
                    </div>
                  )}
                </td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>
                  {pkg.name}
                </td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                  {pkg.category}
                </td>
                <td style={{ padding: "16px 24px", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>
                  {pkg.sessions}
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 600 }}>
                  ₱{pkg.value.toLocaleString()}
                </td>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: pkg.status === "active" ? "#DCFCE7" : "#FEF3C7",
                    color: pkg.status === "active" ? "#15803D" : "#B45309",
                    textTransform: "capitalize",
                  }}>
                    {pkg.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "center", display: "flex", gap: "6px", justifyContent: "center", alignItems: "center", position: "relative" }}>
                  <button
                    onClick={() => navigate(`/admin/packages/${pkg.id}`)}
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "#F0F6FC",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#2D6A9F",
                    }}
                    title="View details"
                  >
                    <Eye size={14} />
                  </button>

                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === pkg.id ? null : pkg.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "#F0F6FC",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#2D6A9F",
                      }}
                      title="More actions"
                    >
                      <MoreVertical size={14} />
                    </button>

                    {openMenuId === pkg.id && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          background: "#FFFFFF",
                          border: "1px solid #D0E8F5",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          zIndex: 100,
                          minWidth: "140px",
                        }}
                      >
                        <button
                          onClick={() => {
                            handleArchive(pkg.id);
                            setOpenMenuId(null);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px 16px",
                            background: "none",
                            border: "none",
                            textAlign: "left",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            color: "#F59E0B",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            borderBottom: "1px solid #D0E8F5",
                          }}
                        >
                          <Archive size={14} /> Archive
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(pkg.id);
                            setOpenMenuId(null);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px 16px",
                            background: "none",
                            border: "none",
                            textAlign: "left",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            color: "#DC2626",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
