import React from "react";
import { PageWrapper } from "../../../components/layout/PageWrapper";

export default function ManageServicesPage() {
  return (
    <PageWrapper>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "28px", fontWeight: 700, color: "#1A2E40", marginBottom: "8px" }}>Manage Services Page</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Edit your services page content</p>
      </div>
      <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "40px", textAlign: "center", border: "1px solid #D0E8F5" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Services page editor coming soon</p>
      </div>
    </PageWrapper>
  );
}
