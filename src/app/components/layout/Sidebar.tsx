import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, Calendar, Users, UserCog, Scissors,
  Package, Tag, CreditCard, BarChart2, FileText, Settings,
  ChevronLeft, ChevronRight, LogOut, Bell
} from "lucide-react";
import { useApp, UserRole } from "../../context/AppContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const adminNavItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
  { label: "Appointments", icon: <Calendar size={20} />, path: "/admin/appointments", badge: 12 },
  { label: "Patients", icon: <Users size={20} />, path: "/admin/patients" },
  { label: "Staff", icon: <UserCog size={20} />, path: "/admin/staff" },
  { label: "Services", icon: <Scissors size={20} />, path: "/admin/services" },
  { label: "Inventory", icon: <Package size={20} />, path: "/admin/inventory", badge: 5 },
  { label: "Vouchers", icon: <Tag size={20} />, path: "/admin/vouchers" },
  { label: "Payments", icon: <CreditCard size={20} />, path: "/admin/payments", badge: 3 },
  { label: "Reports", icon: <BarChart2 size={20} />, path: "/admin/reports" },
  { label: "Blog", icon: <FileText size={20} />, path: "/admin/blog" },
  { label: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
];

const practitionerNavItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/practitioner" },
  { label: "My Schedule", icon: <Calendar size={20} />, path: "/practitioner/schedule" },
  { label: "My Patients", icon: <Users size={20} />, path: "/practitioner/patients" },
];

const receptionNavItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/reception" },
  { label: "Appointments", icon: <Calendar size={20} />, path: "/reception/appointments", badge: 8 },
  { label: "Patients", icon: <Users size={20} />, path: "/reception/patients" },
  { label: "Payments", icon: <CreditCard size={20} />, path: "/reception/payments", badge: 2 },
  { label: "Inventory", icon: <Package size={20} />, path: "/reception/inventory" },
];

function getNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case "admin": return adminNavItems;
    case "practitioner": return practitionerNavItems;
    case "receptionist": return receptionNavItems;
  }
}

export function Sidebar() {
  const { currentUser, sidebarCollapsed, setSidebarCollapsed, setIsLoggedIn } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = getNavItems(currentUser.role);
  const width = sidebarCollapsed ? 64 : 240;

  const isActive = (path: string) => {
    if (path === "/admin" || path === "/practitioner" || path === "/reception") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        background: "#152F4A",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 50,
        transition: "width 200ms ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          padding: sidebarCollapsed ? "0 12px" : "0 20px",
          borderBottom: "1px solid rgba(184,212,236,0.1)",
          flexShrink: 0,
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2D6A9F 0%, #5BC0EB 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "16px",
            }}
          >
            ☁️
          </div>
          {!sidebarCollapsed && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
              >
                Cloud Skin
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  color: "#B8D4EC",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
              >
                Clinic + Wellness
              </div>
            </div>
          )}
        </div>
        
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          const hovered = hoveredItem === item.path;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: "flex",
                alignItems: "center",
                height: "44px",
                padding: sidebarCollapsed ? "0 22px" : "0 16px",
                cursor: "pointer",
                background: active
                  ? "#2D6A9F"
                  : hovered
                  ? "#1E3F61"
                  : "transparent",
                borderLeft: active ? "3px solid #5BC0EB" : "3px solid transparent",
                gap: "12px",
                position: "relative",
                transition: "background 100ms",
              }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span
                style={{
                  color: active || hovered ? "#FFFFFF" : "#B8D4EC",
                  flexShrink: 0,
                  display: "flex",
                  transition: "color 100ms",
                }}
              >
                {item.icon}
              </span>
              {!sidebarCollapsed && (
                <>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: active || hovered ? "#FFFFFF" : "#B8D4EC",
                      flex: 1,
                      whiteSpace: "nowrap",
                      transition: "color 100ms",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge != null && item.badge > 0 && (
                    <span
                      style={{
                        background: "#EF4444",
                        color: "#FFFFFF",
                        fontSize: "11px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        padding: "1px 7px",
                        borderRadius: "9999px",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {sidebarCollapsed && item.badge != null && item.badge > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "8px",
                    height: "8px",
                    background: "#EF4444",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        style={{
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarCollapsed ? "center" : "flex-end",
          padding: sidebarCollapsed ? "0" : "0 16px",
          cursor: "pointer",
          borderTop: "1px solid rgba(184,212,236,0.1)",
          color: "#B8D4EC",
        }}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? <ChevronRight size={18} /> : (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#B8D4EC" }}>
              Collapse
            </span>
            <ChevronLeft size={18} />
          </div>
        )}
      </div>

      {/* User Profile */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: sidebarCollapsed ? "0 12px" : "0 16px",
          borderTop: "1px solid rgba(184,212,236,0.1)",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#2D6A9F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            color: "#FFFFFF",
          }}
        >
          {currentUser.initials}
        </div>
        {!sidebarCollapsed && (
          <>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentUser.name}
              </div>
              <span
                style={{
                  background: "rgba(91,192,235,0.2)",
                  color: "#5BC0EB",
                  fontSize: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  padding: "1px 6px",
                  borderRadius: "9999px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {currentUser.roleLabel}
              </span>
            </div>
            <button
              onClick={() => { setIsLoggedIn(false); navigate("/login"); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#B8D4EC",
                display: "flex",
                alignItems: "center",
                padding: "4px",
                borderRadius: "4px",
              }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
