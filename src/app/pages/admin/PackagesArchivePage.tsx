import React, { useState } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Eye, Trash2 } from "lucide-react";

const archivedPackages = [
  { id: "PKG007", name: "Luxury Complete Package", type: "Anti-Aging", value: 35000, sessions: 8, archivedDate: "Mar 10, 2026", image: "/images/service-botox.jpg" },
];

export default function PackagesArchivePage() {
  const [packagesList, setPackagesList] = useState(archivedPackages);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<any>(null);

  const handleDeletePackage = (pkg: any) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      setPackagesList(packagesList.filter((p) => p.id !== packageToDelete.id));
      setShowDeleteModal(false);
      setPackageToDelete(null);
    }
  };

  return (
    <PageWrapper title="Archive Packages" subtitle="View archived packages">
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FBFF", borderBottom: "2px solid #D0E8F5" }}>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", width: "80px" }}>Image</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Package Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Type</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Sessions</th>
              <th style={{ padding: "12px 24px", textAlign: "right", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Price</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Archived Date</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packagesList.map((pkg) => (
              <tr key={pkg.id} style={{ borderBottom: "1px solid #D0E8F5" }}>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  {pkg.image ? (
                    <img src={pkg.image} alt={pkg.name} style={{ width: "50px", height: "50px", borderRadius: "6px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "50px", height: "50px", borderRadius: "6px", background: "#F0F6FC", display: "flex", alignItems: "center", justifyContent: "center", color: "#9BBAD4" }}>
                      No image
                    </div>
                  )}
                </td>
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
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                  {pkg.archivedDate}
                </td>
                <td style={{ padding: "16px 24px", textAlign: "center", display: "flex", gap: "8px", justifyContent: "center" }}>
                  <button
                    style={{ width: "32px", height: "32px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}
                    title="View details"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg)}
                    style={{ width: "32px", height: "32px", background: "#FEE2E2", border: "none", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }}
                    title="Delete package"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {packagesList.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#5A7A96" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500 }}>
              No archived packages found.
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && packageToDelete && (
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
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 8px 32px rgba(26, 58, 92, 0.18)",
              padding: "24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40", marginBottom: "8px" }}>
              Delete Package?
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "24px" }}>
              Are you sure you want to permanently delete <strong>{packageToDelete.name}</strong>? This action cannot be undone.
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  flex: 1,
                  height: "40px",
                  background: "#F0F6FC",
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
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  height: "40px",
                  background: "#DC2626",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
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
