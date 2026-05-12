import React, { useState } from "react";
import { Search, Download, Eye, Pencil, Archive, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { StatusBadge } from "../../components/StatusBadge";
import ServiceDetailsModal from "../../components/services/ServiceDetailsModal";
import DeleteConfirmationModal from "../../components/services/DeleteConfirmationModal";
import { Scissors, UserCheck, UserX } from "lucide-react";

const allServices = [
  { id: "SRV001", name: "Hydra Facial", category: "Facial", price: "₱2,500", duration: "60 min", status: "active", archived: false, image: "/images/service-hydra-facial.jpg" },
  { id: "SRV002", name: "Botox Treatment", category: "Injectables", price: "₱8,000", duration: "45 min", status: "active", archived: false, image: "/images/service-botox.jpg" },
  { id: "SRV003", name: "Chemical Peel", category: "Facial", price: "₱3,500", duration: "45 min", status: "inactive", archived: false, image: "/images/service-chemical-peel.jpg" },
  { id: "SRV004", name: "PRP Therapy", category: "Hair Treatment", price: "₱12,000", duration: "90 min", status: "active", archived: false, image: "/images/service-prp-hair.jpg" },
  { id: "SRV005", name: "LED Therapy", category: "Light Therapy", price: "₱1,800", duration: "30 min", status: "active", archived: false },
  { id: "SRV006", name: "Microneedling", category: "Facial", price: "₱4,500", duration: "60 min", status: "inactive", archived: false },
  { id: "SRV007", name: "Laser Resurfacing", category: "Laser", price: "₱15,000", duration: "90 min", status: "active", archived: false },
  { id: "SRV008", name: "Acne Treatment", category: "Facial", price: "₱2,800", duration: "45 min", status: "active", archived: false },
  { id: "SRV009", name: "Dermal Fillers", category: "Injectables", price: "₱18,000", duration: "60 min", status: "inactive", archived: true },
  { id: "SRV010", name: "IV Drip Wellness", category: "Wellness", price: "₱3,500", duration: "60 min", status: "active", archived: false },
];

export default function ViewAllServicesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [servicesList, setServicesList] = useState(allServices);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);
  const rowsPerPage = 10;

  // Calculate analytics
  const activeServices = servicesList.filter(s => s.status === "active" && !s.archived).length;
  const inactiveServices = servicesList.filter(s => s.status === "inactive" && !s.archived).length;
  const archivedServices = servicesList.filter(s => s.archived).length;
  const totalServices = activeServices + inactiveServices;

  // Filter
  const filtered = servicesList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayed = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleArchiveService = (serviceId: string) => {
    setServicesList(servicesList.map(s => 
      s.id === serviceId ? { ...s, archived: true } : s
    ));
  };

  const handleStatusChange = (serviceId: string) => {
    setServicesList(servicesList.map(s =>
      s.id === serviceId ? { ...s, archived: true } : s
    ));
  };

  const handleDeleteService = (service: any) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServicesList(servicesList.filter(s => s.id !== serviceToDelete.id));
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const handleSaveService = (updatedService: any) => {
    setServicesList(servicesList.map(s =>
      s.id === updatedService.id ? updatedService : s
    ));
    setShowDetailsModal(false);
  };

  return (
    <PageWrapper title="All Services" breadcrumb="Admin / Services / All Services">
      {/* Analytics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard label="Active Services" value={activeServices} icon={<UserCheck size={18} />} variant="primary" />
        <StatCard label="Inactive Services" value={inactiveServices} icon={<UserX size={18} />} />
        <StatCard label="Archive Services" value={archivedServices} icon={<Archive size={18} />} />
        <StatCard label="Total Services" value={totalServices} icon={<Scissors size={18} />} variant="secondary" />
      </div>

      {/* Table Header with Search */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
            <input
              type="text"
              placeholder="Search by service name or category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{
                width: "100%",
                padding: "8px 12px 8px 36px",
                border: "1px solid #D0E8F5",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
              }}
            />
          </div>
          <button style={{ width: "36px", height: "36px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}>
            <Download size={16} />
          </button>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FBFF", borderBottom: "2px solid #D0E8F5" }}>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase", width: "80px" }}>Image</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Service Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Price</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Duration</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "12px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((service) => (
              <tr key={service.id} style={{ borderBottom: "1px solid #D0E8F5", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  {service.image ? (
                    <img src={service.image} alt={service.name} style={{ width: "50px", height: "50px", borderRadius: "6px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "50px", height: "50px", borderRadius: "6px", background: "#F0F6FC", display: "flex", alignItems: "center", justifyContent: "center", color: "#9BBAD4" }}>
                      No image
                    </div>
                  )}
                </td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{service.name}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{service.category}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>{service.price}</td>
                <td style={{ padding: "16px 24px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{service.duration}</td>
                <td style={{ padding: "16px 24px", textAlign: "center" }}>
                  <StatusBadge status={service.archived ? "archived" : service.status} />
                </td>
                <td style={{ padding: "16px 24px", textAlign: "center", display: "flex", gap: "8px", justifyContent: "center" }}>
                  <button 
                    onClick={() => {
                      setSelectedService(service);
                      setShowDetailsModal(true);
                    }}
                    style={{ width: "32px", height: "32px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#2D6A9F" }}
                    title="View details"
                  >
                    <Eye size={14} />
                  </button>
                  {!service.archived && (
                    <>
                      <button 
                        onClick={() => handleStatusChange(service.id)}
                        style={{ width: "32px", height: "32px", background: "#FEE2E2", border: "none", borderRadius: "6px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#DC2626" }}
                        title="Archive service"
                      >
                        <Archive size={14} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
            Showing {displayed.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={{ width: "32px", height: "32px", background: page === 1 ? "#E5EEF7" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: page === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: page === 1 ? "#9BBAD4" : "#2D6A9F" }}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} style={{ width: "32px", height: "32px", background: p === page ? "#2D6A9F" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: p === page ? "#FFFFFF" : "#5A7A96" }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} style={{ width: "32px", height: "32px", background: page === totalPages ? "#E5EEF7" : "#F0F6FC", border: "none", borderRadius: "6px", cursor: page === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: page === totalPages ? "#9BBAD4" : "#2D6A9F" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedService(null);
          }}
          onSave={handleSaveService}
        />
      )}

      {showDeleteModal && serviceToDelete && (
        <DeleteConfirmationModal
          serviceName={serviceToDelete.name}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setServiceToDelete(null);
          }}
        />
      )}
    </PageWrapper>
  );
}
