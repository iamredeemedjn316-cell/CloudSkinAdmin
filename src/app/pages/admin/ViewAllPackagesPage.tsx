import React, { useState } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { Eye, Package, TrendingUp, Archive, Box } from "lucide-react";

const allPackages = [
  { id: "PKG001", name: "5+1 Premium Facial Package", type: "Facial", value: 15000, sessions: 6, status: "active", archived: false },
  { id: "PKG002", name: "Anti-Aging Package", type: "Anti-Aging", value: 12000, sessions: 4, status: "active", archived: false },
  { id: "PKG003", name: "Hair Restoration Package", type: "Hair", value: 18000, sessions: 6, status: "active", archived: false },
  { id: "PKG004", name: "Acne Clear Package", type: "Acne", value: 8500, sessions: 3, status: "inactive", archived: false },
  { id: "PKG005", name: "Wellness Plus Package", type: "Wellness", value: 20000, sessions: 4, status: "active", archived: false },
  { id: "PKG006", name: "Starter Package", type: "Facial", value: 5000, sessions: 2, status: "inactive", archived: false },
  { id: "PKG007", name: "Luxury Complete Package", type: "Anti-Aging", value: 35000, sessions: 8, status: "active", archived: true },
];

export default function ViewAllPackagesPage() {
  const [searchParams] = useState("");

  const activeCount = allPackages.filter((p) => p.status === "active" && !p.archived).length;
  const inactiveCount = allPackages.filter((p) => p.status === "inactive" && !p.archived).length;
  const archiveCount = allPackages.filter((p) => p.archived).length;
  const totalCount = allPackages.filter((p) => !p.archived).length;

  return (
    <PageWrapper title="All Packages" subtitle="View analytics and manage all packages">
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
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Package Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Type</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Sessions</th>
              <th style={{ padding: "12px 24px", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Price</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {allPackages.filter((p) => !p.archived).map((pkg) => (
              <tr key={pkg.id} style={{ borderBottom: "1px solid #D0E8F5" }}>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>
                  {pkg.name}
                </td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                  {pkg.type}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
