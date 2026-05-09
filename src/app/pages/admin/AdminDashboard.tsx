import React from "react";
import { useNavigate } from "react-router";
import {
  Calendar, DollarSign, CreditCard, Package,
  Plus, Eye, PenLine, ArrowRight, Clock
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { StatCard } from "../../components/StatCard";
import { StatusBadge, StatusType } from "../../components/StatusBadge";

const revenueData = [
  { name: "GCash", value: 18500, color: "#2D6A9F" },
  { name: "Cash", value: 14200, color: "#5BC0EB" },
  { name: "Card", value: 10800, color: "#1A3A5C" },
  { name: "Transfer", value: 5000, color: "#A8CCE8" },
];

const upcomingAppointments = [
  { id: 1, client: "Sarah Johnson", service: "Hydra Facial", time: "10:00 AM", practitioner: "Dr. Santos", status: "confirmed" as StatusType },
  { id: 2, client: "Miguel Cruz", service: "Botox Treatment", time: "11:00 AM", practitioner: "Dr. Reyes", status: "in-progress" as StatusType },
  { id: 3, client: "Camille Torres", service: "Chemical Peel", time: "1:00 PM", practitioner: "Dr. Santos", status: "pending" as StatusType },
  { id: 4, client: "Jose Dela Cruz", service: "PRP Therapy", time: "2:30 PM", practitioner: "Dr. Lim", status: "confirmed" as StatusType },
  { id: 5, client: "Angela Park", service: "LED Therapy", time: "3:30 PM", practitioner: "Dr. Reyes", status: "confirmed" as StatusType },
];

const recentActivity = [
  { id: 1, initials: "SJ", name: "Sarah Johnson", action: "Profile updated", time: "5 min ago", color: "#2D6A9F" },
  { id: 2, initials: "MC", name: "Miguel Cruz", action: "Appointment completed", time: "1 hr ago", color: "#16A34A" },
  { id: 3, initials: "CT", name: "Camille Torres", action: "New patient registered", time: "2 hr ago", color: "#7C3AED" },
  { id: 4, initials: "JD", name: "Jose Dela Cruz", action: "Payment confirmed", time: "3 hr ago", color: "#EA580C" },
  { id: 5, initials: "AP", name: "Angela Park", action: "Booking created", time: "4 hr ago", color: "#0891B2" },
];

const lowStockAlerts = [
  { name: "Retinol Cream", current: 85, threshold: 100, sku: "SKIN-002" },
  { name: "Botox (50u)", current: 8, threshold: 10, sku: "INJ-001" },
  { name: "Chemical Peel Solution", current: 0, threshold: 200, sku: "TREAT-001" },
  { name: "Needles (Box 100)", current: 3, threshold: 5, sku: "NEEDLE-001" },
];

const quickActions = [
  { label: "+ New Booking", icon: <Calendar size={22} />, color: "#2D6A9F", bg: "#EBF6FD", path: "/admin/appointments" },
  { label: "+ New Patient", icon: <Plus size={22} />, color: "#16A34A", bg: "#F0FDF4", path: "/admin/patients" },
  { label: "Review Payments", icon: <CreditCard size={22} />, color: "#D97706", bg: "#FFFBEB", badge: 3, path: "/admin/payments" },
  { label: "Write Blog Post", icon: <PenLine size={22} />, color: "#7C3AED", bg: "#F5F3FF", path: "/admin/blog" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <PageWrapper title="Dashboard" breadcrumb="Admin / Dashboard">
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <StatCard
          label="Today's Appointments"
          value="12"
          icon={<Calendar size={18} />}
          delta={{ value: "+3 vs yesterday", positive: true }}
          variant="primary"
        />
        <StatCard
          label="Revenue Today"
          value="₱48,500"
          icon={<DollarSign size={18} />}
          delta={{ value: "+12% this week", positive: true }}
        />
        <StatCard
          label="Pending Payments"
          value="3"
          icon={<CreditCard size={18} />}
          variant="warning"
        />
        <StatCard
          label="Low Stock Items"
          value="5"
          icon={<Package size={18} />}
          variant="warning"
        />
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            style={{
              background: "#FFFFFF",
              border: "1px solid #D0E8F5",
              borderRadius: "12px",
              padding: "16px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow: "0 1px 4px rgba(26,58,92,0.06)",
              transition: "box-shadow 150ms, transform 150ms",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,58,92,0.12)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(26,58,92,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: action.bg,
                color: action.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {action.icon}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#1A2E40",
              }}
            >
              {action.label}
            </span>
            {action.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "14px",
                  background: "#EF4444",
                  color: "#FFFFFF",
                  fontSize: "11px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: "9999px",
                }}
              >
                {action.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Second Row */}
      <div style={{ display: "grid", gridTemplateColumns: "60fr 40fr", gap: "20px", marginBottom: "20px" }}>
        {/* Upcoming Appointments */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #D0E8F5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>
              Today's Appointments
            </span>
            <button
              onClick={() => navigate("/admin/appointments")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#2D6A9F",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                padding: 0,
              }}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F0F6FC" }}>
                {["Client", "Service", "Time", "Practitioner", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "11px",
                      color: "#5A7A96",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #D0E8F5",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((apt, i) => (
                <tr
                  key={apt.id}
                  style={{
                    borderBottom: i < upcomingAppointments.length - 1 ? "1px solid #D0E8F5" : "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", fontWeight: 500 }}>
                      {apt.client}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{apt.service}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#1A2E40" }}>
                      {apt.time}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{apt.practitioner}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={apt.status} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#2D6A9F",
                        display: "flex",
                        padding: "4px",
                      }}
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Revenue Donut */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            padding: "20px",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              color: "#1A2E40",
              marginBottom: "4px",
            }}
          >
            Revenue Breakdown
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "16px" }}>
            Today by payment method
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
                contentStyle={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  borderRadius: "8px",
                  border: "1px solid #D0E8F5",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            {revenueData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: d.color }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{d.name}</span>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                  ₱{d.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Recent Activity */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #D0E8F5" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>
              Recent Patient Activity
            </span>
          </div>
          <div>
            {recentActivity.map((a, i) => (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 20px",
                  borderBottom: i < recentActivity.length - 1 ? "1px solid #F0F6FC" : "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: a.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#FFFFFF",
                    flexShrink: 0,
                  }}
                >
                  {a.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                    {a.name}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>
                    {" "}— {a.action}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} color="#9BBAD4" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(26,58,92,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #D0E8F5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1A2E40" }}>
              Low Stock Alerts
            </span>
            <button
              onClick={() => navigate("/admin/inventory")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#2D6A9F",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                padding: 0,
              }}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div>
            {lowStockAlerts.map((item, i) => (
              <div
                key={item.sku}
                style={{
                  padding: "14px 20px",
                  borderBottom: i < lowStockAlerts.length - 1 ? "1px solid #F0F6FC" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9BBAD4" }}>{item.sku}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: item.current === 0 ? "#DC2626" : "#D97706",
                      }}
                    >
                      {item.current}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>
                      {" "}/{item.threshold}
                    </span>
                  </div>
                </div>
                <div style={{ height: "4px", background: "#F0F6FC", borderRadius: "9999px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min((item.current / item.threshold) * 100, 100)}%`,
                      background: item.current === 0 ? "#DC2626" : item.current <= item.threshold * 0.3 ? "#F59E0B" : "#2D6A9F",
                      borderRadius: "9999px",
                      transition: "width 300ms",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
