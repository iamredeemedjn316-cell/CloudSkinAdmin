import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { ArrowLeft, Copy, Check, Search } from "lucide-react";

interface VoucherCode {
  code: string;
  status: "unused" | "used";
  usedBy?: string;
  usedDate?: string;
  processedBy?: string;
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
      usedBy: i < 45 ? `Patient ${String(i + 1).padStart(3, "0")}` : undefined,
      usedDate: i < 45 ? "Apr 1, 2026" : undefined,
      processedBy: i < 45 ? "Receptionist 01" : undefined,
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
      usedBy: i < 8 ? `Patient ${String(i + 1).padStart(3, "0")}` : undefined,
      usedDate: i < 8 ? "Apr 10, 2026" : undefined,
      processedBy: i < 8 ? "Receptionist 02" : undefined,
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
      usedBy: i < 12 ? `Patient ${String(i + 1).padStart(3, "0")}` : undefined,
      usedDate: i < 12 ? "Apr 5, 2026" : undefined,
      processedBy: i < 12 ? "Receptionist 01" : undefined,
    })),
    status: "active",
  },
];

export default function VoucherDetailsPage() {
  const { voucherId } = useParams<{ voucherId: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "used" | "unused">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const batch = voucherBatches.find((v) => v.id === voucherId);

  if (!batch) {
    return (
      <PageWrapper title="Voucher Not Found">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#9BBAD4" }}>Voucher campaign not found</p>
          <button onClick={() => navigate("/admin/vouchers")} style={{ marginTop: "20px", height: "40px", padding: "0 20px", background: "#2D6A9F", border: "none", borderRadius: "8px", color: "#FFFFFF", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600 }}>Back to Vouchers</button>
        </div>
      </PageWrapper>
    );
  }

  const usedCount = batch.codes.filter((c) => c.status === "used").length;
  const unusedCount = batch.codes.filter((c) => c.status === "unused").length;

  let filtered = batch.codes;
  if (statusFilter === "used") {
    filtered = filtered.filter((c) => c.status === "used");
  } else if (statusFilter === "unused") {
    filtered = filtered.filter((c) => c.status === "unused");
  }

  if (search) {
    filtered = filtered.filter((c) => c.code.toLowerCase().includes(search.toLowerCase()));
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <PageWrapper title={batch.name} breadcrumb="Admin / Vouchers / Details">
      {/* Header with Back Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/admin/vouchers")} style={{ background: "none", border: "none", cursor: "pointer", padding: "0", display: "flex", alignItems: "center", color: "#2D6A9F" }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "24px", color: "#1A2E40", margin: 0 }}>{batch.name}</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4", margin: "4px 0 0 0" }}>ID: {batch.id}</p>
        </div>
      </div>

      {/* Campaign Details Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", padding: "16px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", textTransform: "uppercase", fontWeight: 500, marginBottom: "8px" }}>Discount Value</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: "#1A2E40" }}>{batch.type === "percentage" ? `${batch.value}%` : `₱${batch.value}`}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", marginTop: "4px" }}>{batch.type === "percentage" ? "Percentage Discount" : "Fixed Amount"}</div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", padding: "16px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", textTransform: "uppercase", fontWeight: 500, marginBottom: "8px" }}>Services</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{batch.services}</div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", padding: "16px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", textTransform: "uppercase", fontWeight: 500, marginBottom: "8px" }}>Expiry Date</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{batch.expiry}</div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", padding: "16px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", textTransform: "uppercase", fontWeight: 500, marginBottom: "8px" }}>Total Codes</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "20px", color: "#1A2E40" }}>{batch.quantity}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4", marginTop: "4px" }}>voucher codes</div>
        </div>
      </div>

      {/* Usage Summary */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40", marginBottom: "16px" }}>Usage Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginBottom: "8px" }}>Used Vouchers</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "28px", color: "#10B981" }}>{usedCount}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>out of {batch.quantity}</span>
            </div>
            <div style={{ height: "6px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(usedCount / batch.quantity) * 100}%`, background: "#10B981", borderRadius: "9999px" }} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginBottom: "8px" }}>Unused Vouchers</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "28px", color: "#F59E0B" }}>{unusedCount}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>available</span>
            </div>
            <div style={{ height: "6px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(unusedCount / batch.quantity) * 100}%`, background: "#F59E0B", borderRadius: "9999px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        {(["all", "used", "unused"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              height: "36px",
              padding: "0 14px",
              background: statusFilter === status ? "#2D6A9F" : "#FFFFFF",
              border: `1.5px solid ${statusFilter === status ? "#2D6A9F" : "#D0E8F5"}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: statusFilter === status ? "#FFFFFF" : "#5A7A96",
              textTransform: "capitalize",
            }}
          >
            {status === "all" ? "All Codes" : status === "used" ? `Used (${usedCount})` : `Unused (${unusedCount})`}
          </button>
        ))}
        <div style={{ marginLeft: "auto", position: "relative", width: "250px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search voucher codes..."
            style={{
              width: "100%",
              height: "36px",
              border: "1.5px solid #D0E8F5",
              borderRadius: "8px",
              padding: "0 12px 0 32px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#1A2E40",
              outline: "none",
              background: "#FFFFFF",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Codes Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #D0E8F5", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Voucher Code", "Status", "Used By", "Date Redeemed", "Processed By"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((code) => (
                <tr key={code.code} style={{ borderBottom: "1px solid #D0E8F5" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>{code.code}</code>
                    <button
                      onClick={() => handleCopyCode(code.code)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        alignItems: "center",
                        color: copiedCode === code.code ? "#10B981" : "#9BBAD4",
                      }}
                      title="Copy code"
                    >
                      {copiedCode === code.code ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background: code.status === "used" ? "#DCFCE7" : "#FEF3C7",
                        color: code.status === "used" ? "#15803D" : "#B45309",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        textTransform: "uppercase",
                      }}
                    >
                      {code.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: code.status === "used" ? "#1A2E40" : "#9BBAD4" }}>
                    {code.usedBy || "—"}
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: code.status === "used" ? "#1A2E40" : "#9BBAD4" }}>
                    {code.usedDate || "—"}
                  </td>
                  <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: code.status === "used" ? "#1A2E40" : "#9BBAD4" }}>
                    {code.processedBy || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center", background: "#F8FBFF", borderRadius: "12px", marginTop: "20px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#9BBAD4" }}>No voucher codes found</p>
        </div>
      )}
    </PageWrapper>
  );
}
