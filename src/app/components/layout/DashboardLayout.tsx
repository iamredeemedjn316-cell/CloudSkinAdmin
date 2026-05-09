import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useApp } from "../../context/AppContext";
import { Outlet, Navigate } from "react-router";

interface DashboardLayoutProps {
  title: string;
  breadcrumb?: string;
  children?: ReactNode;
}

export function DashboardLayout({ title, breadcrumb, children }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useApp();
  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F6FC" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          flex: 1,
          transition: "margin-left 200ms ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <TopBar title={title} breadcrumb={breadcrumb} />
        <main
          style={{
            marginTop: "60px",
            padding: "32px",
            flex: 1,
            minHeight: "calc(100vh - 60px)",
          }}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F6FC" }}>
      <Sidebar />
      <InnerContent />
    </div>
  );
}

export function PractitionerLayout() {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F6FC" }}>
      <Sidebar />
      <InnerContent />
    </div>
  );
}

export function ReceptionLayout() {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F6FC" }}>
      <Sidebar />
      <InnerContent />
    </div>
  );
}

function InnerContent() {
  const { sidebarCollapsed } = useApp();
  const sidebarWidth = sidebarCollapsed ? 64 : 240;
  return (
    <div
      style={{
        marginLeft: `${sidebarWidth}px`,
        flex: 1,
        transition: "margin-left 200ms ease",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
}
