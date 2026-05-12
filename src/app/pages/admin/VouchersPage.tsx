import React, { useState } from "react";
import { Search, Plus, Eye, RefreshCw, X, Copy, Check, MoreVertical, Archive, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatusBadge } from "../../components/StatusBadge";

interface VoucherCode {
  code: string;
  status: "unused" | "used";
  usedBy?: string;
  usedDate?: string;
}

interface VoucherBatch {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  services: string;
  expiry: string;
  quantity: number;
  codes: VoucherCode[];
  status: "active" | "inactive";
}

const voucherBatches: VoucherBatch[] = [
  {
    id: "VB001",
    name: "Welcome Campaign",
    type: "percentage",
    value: 20,
    services: "All Services",
    expiry: "Dec 31, 2026",
    quantity: 100,
    codes: Array.from({ length: 100 }, (_, i) => ({
      code: `WELCOME-${String(i + 1).padStart(4, "0")}`,
      status: i < 45 ? "used" : "unused",
      usedBy: i < 45 ? "P00" + (i % 10 + 1) : undefined,
      usedDate: i < 45 ? "Apr 1, 2026" : undefined,
    })),
    status: "active",
  },
  {
    id: "VB002",
    name: "Summer Promo",
    type: "percentage",
    value: 25,
    services: "Laser, Injectables",
    expiry: "Aug 31, 2026",
    quantity: 50,
    codes: Array.from({ length: 50 }, (_, i) => ({
      code: `SUMMER-${String(i + 1).padStart(4, "0")}`,
      status: i < 8 ? "used" : "unused",
      usedBy: i < 8 ? "P00" + (i % 10 + 1) : undefined,
      usedDate: i < 8 ? "Apr 10, 2026" : undefined,
    })),
    status: "active",
  },
  {
    id: "VB003",
    name: "Anniversary Special",
    type: "fixed",
    value: 500,
    services: "Skin Treatments",
    expiry: "Jun 30, 2026",
    quantity: 20,
    codes: Array.from({ length: 20 }, (_, i) => ({
      code: `ANNIV-${String(i + 1).padStart(4, "0")}`,
      status: i < 12 ? "used" : "unused",
      usedBy: i < 12 ? "P00" + (i % 10 + 1) : undefined,
      usedDate: i < 12 ? "Apr 5, 2026" : undefined,
    })),
    status: "active",
  },
];

function generateUniqueCode(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(4, "0")}`;
}

export default function VouchersPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<VoucherBatch | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [campaignName, setCampaignName] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [discountValue, setDiscountValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [eligibleServices, setEligibleServices] = useState("All Services");
  const [voucherStatus, setVoucherStatus] = useState<"active" | "inactive">("active");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = voucherBatches.filter((v) => {
    const matchStatus = statusFilter === "All" || v.status === statusFilter.toLowerCase();
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateVoucher = () => {
    setEditingVoucher(null);
    setCampaignName("");
    setQuantity(10);
    setDiscountType("percentage");
    setDiscountValue("");
    setExpiryDate("");
    setEligibleServices("All Services");
    setVoucherStatus("active");
    setShowModal(true);
  };

  const handleEditVoucher = (batch: VoucherBatch) => {
    setEditingVoucher(batch);
    setCampaignName(batch.name);
    setQuantity(batch.quantity);
    setDiscountType(batch.type);
    setDiscountValue(String(batch.value));
    setExpiryDate(batch.expiry);
    setEligibleServices(batch.services);
    setVoucherStatus(batch.status);
    setShowModal(true);
  };

  const handleViewDetails = (batch: VoucherBatch) => {
    navigate(`/admin/vouchers/${batch.id}`);
  };

  const handleArchive = (batch: VoucherBatch) => {
    console.log("[v0] Archiving voucher batch:", batch.id);
    setOpenMenuId(null);
  };

  const handleDelete = (batch: VoucherBatch) => {
    if (confirm(`Are you sure you want to delete "${batch.name}" campaign?`)) {
      console.log("[v0] Deleting voucher batch:", batch.id);
      setOpenMenuId(null);
    }
  };

  return (
    <PageWrapper title="Vouchers" breadcrumb="Admin / Vouchers">
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All", "Active", "Inactive"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{ height: "38px", padding: "0 14px", background: statusFilter === s ? "#2D6A9F" : "#FFFFFF", border: `1.5px solid ${statusFilter === s ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: statusFilter === s ? "#FFFFFF" : "#5A7A96" }}
          >
            {s}
          </button>
        ))}
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." style={{ width: "220px", height: "38px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px 0 32px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF" }} />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleCreateVoucher} style={{ height: "38px", padding: "0 18px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>
            <Plus size={14} /> Create Voucher Campaign
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Campaign Name", "Discount", "Eligible Services", "Expiry Date", "Codes Generated", "Used / Total", "Status", "Action"].map((h) => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((batch) => {
                const usedCount = batch.codes.filter((c) => c.status === "used").length;
                const totalCount = batch.codes.length;
                return (
                  <tr key={batch.id} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", marginBottom: "2px" }}>{batch.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>ID: {batch.id}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "15px", color: "#1A2E40" }}>
                        {batch.type === "percentage" ? `${batch.value}%` : `₱${batch.value}`}
                      </span>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>
                        {batch.type === "percentage" ? "Percentage" : "Fixed Amount"}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{batch.services}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{batch.expiry}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#2D6A9F" }}>{totalCount}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginLeft: "4px" }}>codes</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                          {usedCount}
                        </span>
                        <span style={{ color: "#9BBAD4", fontSize: "13px" }}>/</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4" }}>{totalCount}</span>
                      </div>
                      <div style={{ height: "3px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden", width: "80px", marginTop: "6px" }}>
                        <div style={{ height: "100%", width: `${Math.min((usedCount / totalCount) * 100, 100)}%`, background: usedCount >= totalCount ? "#EF4444" : "#2D6A9F", borderRadius: "9999px" }} />
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}><StatusBadge status={batch.status as any} /></td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "6px", position: "relative" }}>
                        <button
                          onClick={() => handleViewDetails(batch)}
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "#F0F6FC",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#2D6A9F",
                          }}
                          title="View Voucher Details"
                        >
                          <Eye size={13} />
                        </button>

                        {/* Dropdown Menu */}
                        <div style={{ position: "relative" }}>
                          <button
                            onClick={() => setOpenMenuId(openMenuId === batch.id ? null : batch.id)}
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "#F0F6FC",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#5A7A96",
                            }}
                            title="More Actions"
                          >
                            <MoreVertical size={13} />
                          </button>

                          {openMenuId === batch.id && (
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
                                marginTop: "4px",
                              }}
                            >
                              <button
                                onClick={() => handleArchive(batch)}
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
                                onClick={() => handleDelete(batch)}
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowModal(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "520px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>
                {editingVoucher ? "Edit Voucher Campaign" : "Create Voucher Campaign"}
              </span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Campaign Name</label>
                <input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Anniversary Promo"
                  style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {!editingVoucher && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Number of Vouchers to Generate</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    max="1000"
                    placeholder="20"
                    style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", marginTop: "4px" }}>
                    {quantity} unique voucher codes will be auto-generated
                  </div>
                </div>
              )}

              {editingVoucher && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Total Codes Generated</label>
                  <div style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4", display: "flex", alignItems: "center", background: "#F8FBFF", boxSizing: "border-box" }}>
                    {quantity} codes (cannot be changed)
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Discount Type</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {([{ key: "percentage", label: "Percentage (%)" }, { key: "fixed", label: "Fixed Amount (₱)" }] as const).map((t) => (
                    <label key={t.key} style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "10px 12px", border: `1.5px solid ${discountType === t.key ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", background: discountType === t.key ? "#EBF6FD" : "#FFFFFF" }}>
                      <input type="radio" checked={discountType === t.key} onChange={() => setDiscountType(t.key)} style={{ display: "none" }} />
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: `2px solid ${discountType === t.key ? "#2D6A9F" : "#9BBAD4"}`, background: discountType === t.key ? "#2D6A9F" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {discountType === t.key && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />}
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: discountType === t.key ? "#2D6A9F" : "#5A7A96" }}>{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                    Discount Value {discountType === "percentage" ? "(%)" : "(₱)"}
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "percentage" ? "20" : "500"}
                    style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Expiry Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Eligible Services</label>
                <select
                  value={eligibleServices}
                  onChange={(e) => setEligibleServices(e.target.value)}
                  style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}
                >
                  <option>All Services</option>
                  <option>Skin Treatments</option>
                  <option>Injectables</option>
                  <option>Laser</option>
                  <option>Hair</option>
                  <option>Wellness</option>
                </select>
              </div>

              {editingVoucher && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40" }}>Campaign Status</span>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>
                        {voucherStatus === "active" ? "Active" : "Inactive"}
                      </span>
                      <div
                        onClick={() => setVoucherStatus(voucherStatus === "active" ? "inactive" : "active")}
                        style={{ width: "40px", height: "22px", borderRadius: "9999px", background: voucherStatus === "active" ? "#2D6A9F" : "#D0E8F5", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "2px" }}
                      >
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#FFFFFF", marginLeft: voucherStatus === "active" ? "auto" : "0", transition: "margin-left 150ms" }} />
                      </div>
                    </label>
                  </label>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", marginTop: "6px" }}>
                    {voucherStatus === "active" ? "Vouchers can be redeemed" : "Vouchers cannot be redeemed"}
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Cancel</button>
              <button style={{ height: "38px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                {editingVoucher ? "Save Changes" : "Generate Vouchers"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - View All Codes */}
      {showDetailModal && selectedBatch && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setShowDetailModal(false)}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "700px", maxHeight: "85vh", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>{selectedBatch.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginTop: "2px" }}>
                    {selectedBatch.type === "percentage" ? `${selectedBatch.value}%` : `₱${selectedBatch.value}`} off · Expires {selectedBatch.expiry}
                  </div>
                </div>
                <button onClick={() => setShowDetailModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { label: "Total Codes", value: selectedBatch.codes.length, color: "#2D6A9F" },
                  { label: "Used", value: selectedBatch.codes.filter((c) => c.status === "used").length, color: "#EF4444" },
                  { label: "Unused", value: selectedBatch.codes.filter((c) => c.status === "unused").length, color: "#16A34A" },
                ].map((stat) => (
                  <div key={stat.label} style={{ flex: 1, background: "#F8FBFF", borderRadius: "8px", padding: "10px 12px", border: "1px solid #D0E8F5" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: stat.color }}>{stat.value}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              <div style={{ display: "grid", gap: "8px" }}>
                {selectedBatch.codes.map((voucherCode) => (
                  <div
                    key={voucherCode.code}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      border: "1.5px solid #D0E8F5",
                      borderRadius: "8px",
                      background: voucherCode.status === "used" ? "#F8F9FA" : "#FFFFFF",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500, color: voucherCode.status === "used" ? "#9BBAD4" : "#1A2E40" }}>
                          {voucherCode.code}
                        </span>
                        <span
                          style={{
                            background: voucherCode.status === "used" ? "#FEF2F2" : "#DCFCE7",
                            color: voucherCode.status === "used" ? "#DC2626" : "#15803D",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "10px",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {voucherCode.status}
                        </span>
                      </div>
                      {voucherCode.status === "used" && voucherCode.usedBy && (
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", marginTop: "4px" }}>
                          Used by {voucherCode.usedBy} on {voucherCode.usedDate}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopyCode(voucherCode.code)}
                      style={{
                        width: "32px",
                        height: "32px",
                        background: copiedCode === voucherCode.code ? "#DCFCE7" : "#F0F6FC",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: copiedCode === voucherCode.code ? "#15803D" : "#5A7A96",
                        transition: "all 150ms",
                      }}
                      title="Copy code"
                    >
                      {copiedCode === voucherCode.code ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
