import React, { useState } from "react";
import { Search, Bell, ChevronDown, X, Clock, Package, CreditCard, Calendar } from "lucide-react";
import { useApp } from "../../context/AppContext";

interface TopBarProps {
  title: string;
  breadcrumb?: string;
}

const notifications = [
  {
    id: 1,
    icon: <Package size={16} />,
    title: "Low Stock Alert",
    message: "Retinol Cream is running low (85 units left)",
    time: "5 min ago",
    unread: true,
    color: "#F59E0B",
  },
  {
    id: 2,
    icon: <CreditCard size={16} />,
    title: "Payment Pending",
    message: "3 proof-of-payment uploads await review",
    time: "12 min ago",
    unread: true,
    color: "#2D6A9F",
  },
  {
    id: 3,
    icon: <Calendar size={16} />,
    title: "New Booking",
    message: "Sarah Johnson booked Hydra Facial for Apr 26",
    time: "1 hr ago",
    unread: true,
    color: "#16A34A",
  },
  {
    id: 4,
    icon: <Package size={16} />,
    title: "Out of Stock",
    message: "Chemical Peel Solution is out of stock",
    time: "2 hr ago",
    unread: false,
    color: "#DC2626",
  },
  {
    id: 5,
    icon: <CreditCard size={16} />,
    title: "Payment Confirmed",
    message: "Miguel Cruz's payment of ₱8,000 confirmed",
    time: "3 hr ago",
    unread: false,
    color: "#16A34A",
  },
];

export function TopBar({ title, breadcrumb }: TopBarProps) {
  const { currentUser, sidebarCollapsed, notificationCount } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: `${sidebarWidth}px`,
          right: 0,
          height: "60px",
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(26,58,92,0.08)",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: "16px",
          zIndex: 40,
          transition: "left 200ms ease",
        }}
      >
        {/* Title & Breadcrumb */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#1A2E40",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {breadcrumb && (
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#5A7A96",
                lineHeight: 1.2,
              }}
            >
              {breadcrumb}
            </div>
          )}
        </div>

        {/* Search */}
        {showSearch ? (
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={15} style={{ position: "absolute", left: "10px", color: "#9BBAD4" }} />
            <input
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search anything..."
              style={{
                width: "240px",
                height: "36px",
                border: "1.5px solid #2D6A9F",
                borderRadius: "8px",
                padding: "0 32px 0 32px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#1A2E40",
                outline: "none",
                background: "#FFFFFF",
              }}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                style={{
                  position: "absolute",
                  right: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9BBAD4",
                  display: "flex",
                }}
              >
                <X size={14} />
              </button>
            )}
            {!searchValue && (
              <button
                onClick={() => setShowSearch(false)}
                style={{
                  position: "absolute",
                  right: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9BBAD4",
                  display: "flex",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            style={{
              width: "36px",
              height: "36px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <Search size={18} />
          </button>
        )}

        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: "36px",
              height: "36px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "16px",
                  height: "16px",
                  background: "#EF4444",
                  borderRadius: "50%",
                  fontSize: "9px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 45,
                }}
                onClick={() => setShowNotifications(false)}
              />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  width: "360px",
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(26,58,92,0.12)",
                  border: "1px solid #D0E8F5",
                  zIndex: 50,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px 12px",
                    borderBottom: "1px solid #D0E8F5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>
                    Notifications
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#2D6A9F", cursor: "pointer" }}>
                    Mark all read
                  </span>
                </div>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px 20px",
                      borderBottom: "1px solid #F0F6FC",
                      background: n.unread ? "#F8FBFF" : "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: n.color + "20",
                        color: n.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {n.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
                          {n.title}
                        </span>
                        {n.unread && (
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2D6A9F", flexShrink: 0 }} />
                        )}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginTop: "2px" }}>
                        {n.message}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                        <Clock size={11} color="#9BBAD4" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    padding: "12px 20px",
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#2D6A9F",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  View All Notifications
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "24px", background: "#D0E8F5" }} />

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#2D6A9F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            {currentUser.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40" }}>
              {currentUser.name}
            </span>
            <span
              style={{
                background: "#EBF6FD",
                color: "#2D6A9F",
                fontSize: "10px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: "9999px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              {currentUser.roleLabel}
            </span>
          </div>
          <ChevronDown size={15} color="#5A7A96" />
        </div>
      </header>
    </>
  );
}
