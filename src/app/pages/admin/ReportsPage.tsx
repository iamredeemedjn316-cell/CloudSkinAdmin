import React, { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Download, X } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { DollarSign, Calendar, BarChart2, Tag } from "lucide-react";

const revenueData = [
  { day: "Apr 19", revenue: 28400 },
  { day: "Apr 20", revenue: 35200 },
  { day: "Apr 21", revenue: 22100 },
  { day: "Apr 22", revenue: 41800 },
  { day: "Apr 23", revenue: 38600 },
  { day: "Apr 24", revenue: 29900 },
  { day: "Apr 25", revenue: 48500 },
];

const revenueByService = [
  { service: "Laser Resurfacing", revenue: 45000 },
  { service: "Dermal Fillers", revenue: 36000 },
  { service: "Botox Treatment", revenue: 32000 },
  { service: "PRP Therapy", revenue: 24000 },
  { service: "Microneedling", revenue: 18000 },
  { service: "Hydra Facial", revenue: 15000 },
  { service: "Chemical Peel", revenue: 10500 },
  { service: "LED Therapy", revenue: 5400 },
];

const appointmentsByDay = [
  { day: "Apr 19", total: 8 },
  { day: "Apr 20", total: 11 },
  { day: "Apr 21", total: 7 },
  { day: "Apr 22", total: 13 },
  { day: "Apr 23", total: 10 },
  { day: "Apr 24", total: 9 },
  { day: "Apr 25", total: 12 },
];

const appointmentsByStatus = [
  { name: "Completed", value: 52, color: "#2D6A9F" },
  { name: "Confirmed", value: 18, color: "#5BC0EB" },
  { name: "Cancelled", value: 8, color: "#EF4444" },
  { name: "No Show", value: 4, color: "#F59E0B" },
  { name: "Pending", value: 6, color: "#A16207" },
];

const practitioners = [
  { initials: "MS", color: "#16A34A", name: "Dr. Maria Santos", specialty: "Dermatology", sessions: 28, revenue: 89500, clients: 22, topService: "Hydra Facial" },
  { initials: "AR", color: "#7C3AED", name: "Dr. Ana Reyes", specialty: "Aesthetic Medicine", sessions: 24, revenue: 112000, clients: 19, topService: "Botox Treatment" },
  { initials: "JL", color: "#EA580C", name: "Dr. James Lim", specialty: "Laser Specialist", sessions: 18, revenue: 135000, clients: 16, topService: "Laser Resurfacing" },
];

const inventoryUsage = [
  { item: "Hyaluronic Acid Serum", used: 120 },
  { item: "Botox (50u)", used: 42 },
  { item: "Filler (1mL)", used: 38 },
  { item: "Vitamin C Serum", used: 95 },
  { item: "Chemical Peel Solution", used: 88 },
];

const tabs = ["Revenue", "Appointments", "Inventory", "Vouchers", "Practitioner"];
const dateRanges = ["Today", "This Week", "This Month", "Custom"];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Revenue");
  const [dateRange, setDateRange] = useState("This Week");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customRangeType, setCustomRangeType] = useState<"day" | "days" | "month" | "months" | "year" | "years">("days");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [customSingleDate, setCustomSingleDate] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [customStartMonth, setCustomStartMonth] = useState("");
  const [customEndMonth, setCustomEndMonth] = useState("");
  const [customYear, setCustomYear] = useState("");
  const [customStartYear, setCustomStartYear] = useState("");
  const [customEndYear, setCustomEndYear] = useState("");
  const [customRangeLabel, setCustomRangeLabel] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatMonth = (monthString: string) => {
    const date = new Date(monthString + "-01");
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handleCustomApply = () => {
    let label = "";

    switch (customRangeType) {
      case "day":
        if (customSingleDate) {
          label = formatDate(customSingleDate);
        }
        break;
      case "days":
        if (customStartDate && customEndDate) {
          label = `${formatDate(customStartDate)} - ${formatDate(customEndDate)}`;
        }
        break;
      case "month":
        if (customMonth) {
          label = formatMonth(customMonth);
        }
        break;
      case "months":
        if (customStartMonth && customEndMonth) {
          label = `${formatMonth(customStartMonth)} - ${formatMonth(customEndMonth)}`;
        }
        break;
      case "year":
        if (customYear) {
          label = customYear;
        }
        break;
      case "years":
        if (customStartYear && customEndYear) {
          label = `${customStartYear} - ${customEndYear}`;
        }
        break;
    }

    if (label) {
      setCustomRangeLabel(label);
      setDateRange("Custom");
      setShowCustomModal(false);
    }
  };

  const handleDateRangeClick = (range: string) => {
    if (range === "Custom") {
      setShowCustomModal(true);
    } else {
      setDateRange(range);
      setCustomRangeLabel("");
    }
  };

  return (
    <PageWrapper title="Reports" breadcrumb="Admin / Reports">
      {/* Sub-tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #D0E8F5", marginBottom: "24px" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid #2D6A9F" : "2px solid transparent", padding: "12px 18px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: activeTab === tab ? 600 : 400, fontSize: "14px", color: activeTab === tab ? "#2D6A9F" : "#5A7A96", marginBottom: "-1px" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Shared Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        {dateRanges.map((d) => (
          <button
            key={d}
            onClick={() => handleDateRangeClick(d)}
            style={{ height: "36px", padding: "0 14px", background: dateRange === d ? "#2D6A9F" : "#FFFFFF", border: `1.5px solid ${dateRange === d ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: dateRange === d ? "#FFFFFF" : "#5A7A96" }}
          >
            {d === "Custom" && customRangeLabel ? customRangeLabel : d}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <button style={{ height: "36px", padding: "0 16px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", color: "#5A7A96", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500 }}>
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {activeTab === "Revenue" && (
        <div>
          {/* Stat Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
            <StatCard label="Total Revenue" value="₱244,500" icon={<DollarSign size={18} />} delta={{ value: "+18% vs last week", positive: true }} variant="primary" />
            <StatCard label="Avg per Appointment" value="₱4,082" icon={<BarChart2 size={18} />} delta={{ value: "+5% vs last week", positive: true }} />
            <StatCard label="Top Service" value="Laser" icon={<BarChart2 size={18} />} delta={{ value: "₱45,000 this week", positive: true }} />
            <StatCard label="Top Practitioner" value="Dr. Lim" icon={<BarChart2 size={18} />} delta={{ value: "₱135,000 revenue", positive: true }} />
          </div>

          {/* Charts Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {/* Line Chart */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "4px" }}>Revenue Over Time</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "20px" }}>Daily revenue for the selected period</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F6FC" />
                  <XAxis dataKey="day" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#9BBAD4" }} />
                  <YAxis tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#9BBAD4" }} />
                  <Tooltip formatter={(v: number) => [`₱${v.toLocaleString()}`, "Revenue"]} contentStyle={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }} />
                  <Line type="monotone" dataKey="revenue" stroke="#2D6A9F" strokeWidth={2.5} dot={{ fill: "#2D6A9F", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Revenue by Service */}
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "4px" }}>Revenue by Service</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "20px" }}>Sorted by highest revenue</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueByService} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F6FC" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} tick={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fill: "#9BBAD4" }} />
                  <YAxis type="category" dataKey="service" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fill: "#5A7A96" }} width={80} />
                  <Tooltip formatter={(v: number) => [`₱${v.toLocaleString()}`, "Revenue"]} contentStyle={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }} />
                  <Bar dataKey="revenue" fill="#5BC0EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Appointments" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total", value: "70", icon: <Calendar size={16} /> },
              { label: "Completed", value: "52", icon: <Calendar size={16} /> },
              { label: "Cancelled", value: "8", icon: <Calendar size={16} /> },
              { label: "No Shows", value: "4", icon: <Calendar size={16} /> },
              { label: "No-Show Rate", value: "5.7%", icon: <Calendar size={16} /> },
            ].map((s) => (
              <div key={s.label} style={{ background: "#FFFFFF", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{s.label}</span>
                  <div style={{ color: "#5BC0EB" }}>{s.icon}</div>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "24px", color: "#1A2E40" }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "20px" }}>Appointments Per Day</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={appointmentsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F6FC" />
                  <XAxis dataKey="day" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#9BBAD4" }} />
                  <YAxis tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#9BBAD4" }} />
                  <Tooltip contentStyle={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }} />
                  <Bar dataKey="total" fill="#2D6A9F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "20px" }}>By Status</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={appointmentsByStatus} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value">
                    {appointmentsByStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {appointmentsByStatus.map((s) => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "3px", background: s.color }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{s.name}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Practitioner" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {practitioners.map((p) => (
            <div key={p.name} style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "#FFFFFF" }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>{p.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{p.specialty}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                {[
                  { label: "Sessions", value: p.sessions },
                  { label: "Revenue", value: `₱${p.revenue.toLocaleString()}` },
                  { label: "Clients Seen", value: p.clients },
                  { label: "Top Service", value: p.topService },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "#F0F6FC", borderRadius: "8px", padding: "10px 12px" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{stat.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: "#1A2E40", marginTop: "2px" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Inventory" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Items Restocked", value: "12" },
              { label: "Items Written Off", value: "3" },
              { label: "Total Used (Sessions)", value: "383 units" },
              { label: "Most Used Item", value: "HA Serum" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#FFFFFF", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "8px" }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "22px", color: "#1A2E40" }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "20px" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40", marginBottom: "20px" }}>Top Items Used This Period</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={inventoryUsage} layout="vertical" margin={{ left: 140 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F6FC" horizontal={false} />
                <XAxis type="number" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#9BBAD4" }} />
                <YAxis type="category" dataKey="item" tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "#5A7A96" }} width={140} />
                <Tooltip contentStyle={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", borderRadius: "8px", border: "1px solid #D0E8F5" }} />
                <Bar dataKey="used" fill="#2D6A9F" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "Vouchers" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Vouchers Redeemed", value: "88" },
              { label: "Total Discount Given", value: "₱41,200" },
              { label: "Top Voucher Code", value: "WELCOME20" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#FFFFFF", borderRadius: "12px", padding: "20px 24px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "8px" }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "28px", color: "#1A2E40" }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>Voucher Breakdown</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F0F6FC" }}>
                  {["Code", "Discount Type", "Value", "Total Redeemed", "Discount Given"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "WELCOME20", type: "Percentage", value: "20%", redeemed: 45, discount: "₱22,500" },
                  { code: "SKIN50", type: "Fixed", value: "₱500", redeemed: 20, discount: "₱10,000" },
                  { code: "SUMMER25", type: "Percentage", value: "25%", redeemed: 15, discount: "₱6,200" },
                  { code: "BOTOX500", type: "Fixed", value: "₱500", redeemed: 8, discount: "₱4,000" },
                ].map((v, i, arr) => (
                  <tr key={v.code} style={{ borderBottom: i < arr.length - 1 ? "1px solid #D0E8F5" : "none" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", background: "#EBF6FD", color: "#2D6A9F", padding: "2px 8px", borderRadius: "6px" }}>{v.code}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{v.type}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{v.value}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{v.redeemed}</span></td>
                    <td style={{ padding: "12px 16px" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "14px", color: "#DC2626" }}>{v.discount}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Date Range Modal */}
      {showCustomModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={() => setShowCustomModal(false)}
        >
          <div
            style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "500px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Custom Date Range</span>
              <button onClick={() => setShowCustomModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96", display: "flex" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              {/* Range Type Selector */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>
                  Select Type
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {[
                    { key: "day", label: "Specific Day" },
                    { key: "days", label: "Specific Days" },
                    { key: "month", label: "Specific Month" },
                    { key: "months", label: "Specific Months" },
                    { key: "year", label: "Specific Year" },
                    { key: "years", label: "Specific Years" },
                  ].map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setCustomRangeType(type.key as any)}
                      style={{
                        height: "38px",
                        padding: "0 10px",
                        background: customRangeType === type.key ? "#2D6A9F" : "#FFFFFF",
                        border: `1.5px solid ${customRangeType === type.key ? "#2D6A9F" : "#D0E8F5"}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: customRangeType === type.key ? "#FFFFFF" : "#5A7A96",
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Day */}
              {customRangeType === "day" && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={customSingleDate}
                    onChange={(e) => setCustomSingleDate(e.target.value)}
                    style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              )}

              {/* Specific Days (Date Range) */}
              {customRangeType === "days" && (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                      End Date
                    </label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      min={customStartDate}
                      style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </>
              )}

              {/* Specific Month */}
              {customRangeType === "month" && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                    Select Month
                  </label>
                  <input
                    type="month"
                    value={customMonth}
                    onChange={(e) => setCustomMonth(e.target.value)}
                    style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              )}

              {/* Specific Months (Month Range) */}
              {customRangeType === "months" && (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                      Start Month
                    </label>
                    <input
                      type="month"
                      value={customStartMonth}
                      onChange={(e) => setCustomStartMonth(e.target.value)}
                      style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                      End Month
                    </label>
                    <input
                      type="month"
                      value={customEndMonth}
                      onChange={(e) => setCustomEndMonth(e.target.value)}
                      min={customStartMonth}
                      style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </>
              )}

              {/* Specific Year */}
              {customRangeType === "year" && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                    Select Year
                  </label>
                  <input
                    type="number"
                    value={customYear}
                    onChange={(e) => setCustomYear(e.target.value)}
                    min="2000"
                    max="2100"
                    placeholder="e.g. 2026"
                    style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              )}

              {/* Specific Years (Year Range) */}
              {customRangeType === "years" && (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                      Start Year
                    </label>
                    <input
                      type="number"
                      value={customStartYear}
                      onChange={(e) => setCustomStartYear(e.target.value)}
                      min="2000"
                      max="2100"
                      placeholder="e.g. 2024"
                      style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>
                      End Year
                    </label>
                    <input
                      type="number"
                      value={customEndYear}
                      onChange={(e) => setCustomEndYear(e.target.value)}
                      min={customStartYear || "2000"}
                      max="2100"
                      placeholder="e.g. 2026"
                      style={{ width: "100%", height: "44px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </>
              )}

              {/* Preview */}
              {((customRangeType === "day" && customSingleDate) ||
                (customRangeType === "days" && customStartDate && customEndDate) ||
                (customRangeType === "month" && customMonth) ||
                (customRangeType === "months" && customStartMonth && customEndMonth) ||
                (customRangeType === "year" && customYear) ||
                (customRangeType === "years" && customStartYear && customEndYear)) && (
                <div style={{ background: "#F8FBFF", border: "1px solid #D0E8F5", borderRadius: "10px", padding: "14px 16px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px" }}>
                    Selected range:
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2D6A9F" }}>
                    {customRangeType === "day" && customSingleDate && formatDate(customSingleDate)}
                    {customRangeType === "days" && customStartDate && customEndDate && `${formatDate(customStartDate)} - ${formatDate(customEndDate)}`}
                    {customRangeType === "month" && customMonth && formatMonth(customMonth)}
                    {customRangeType === "months" && customStartMonth && customEndMonth && `${formatMonth(customStartMonth)} - ${formatMonth(customEndMonth)}`}
                    {customRangeType === "year" && customYear && customYear}
                    {customRangeType === "years" && customStartYear && customEndYear && `${customStartYear} - ${customEndYear}`}
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #D0E8F5", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setShowCustomModal(false)}
                style={{ height: "38px", padding: "0 20px", background: "none", border: "1.5px solid #D0E8F5", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5A7A96" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCustomApply}
                disabled={
                  (customRangeType === "day" && !customSingleDate) ||
                  (customRangeType === "days" && (!customStartDate || !customEndDate)) ||
                  (customRangeType === "month" && !customMonth) ||
                  (customRangeType === "months" && (!customStartMonth || !customEndMonth)) ||
                  (customRangeType === "year" && !customYear) ||
                  (customRangeType === "years" && (!customStartYear || !customEndYear))
                }
                style={{
                  height: "38px",
                  padding: "0 20px",
                  background:
                    (customRangeType === "day" && !customSingleDate) ||
                    (customRangeType === "days" && (!customStartDate || !customEndDate)) ||
                    (customRangeType === "month" && !customMonth) ||
                    (customRangeType === "months" && (!customStartMonth || !customEndMonth)) ||
                    (customRangeType === "year" && !customYear) ||
                    (customRangeType === "years" && (!customStartYear || !customEndYear))
                      ? "#D0E8F5"
                      : "#2D6A9F",
                  border: "none",
                  borderRadius: "8px",
                  cursor:
                    (customRangeType === "day" && !customSingleDate) ||
                    (customRangeType === "days" && (!customStartDate || !customEndDate)) ||
                    (customRangeType === "month" && !customMonth) ||
                    (customRangeType === "months" && (!customStartMonth || !customEndMonth)) ||
                    (customRangeType === "year" && !customYear) ||
                    (customRangeType === "years" && (!customStartYear || !customEndYear))
                      ? "not-allowed"
                      : "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  opacity:
                    (customRangeType === "day" && !customSingleDate) ||
                    (customRangeType === "days" && (!customStartDate || !customEndDate)) ||
                    (customRangeType === "month" && !customMonth) ||
                    (customRangeType === "months" && (!customStartMonth || !customEndMonth)) ||
                    (customRangeType === "year" && !customYear) ||
                    (customRangeType === "years" && (!customStartYear || !customEndYear))
                      ? 0.6
                      : 1,
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
