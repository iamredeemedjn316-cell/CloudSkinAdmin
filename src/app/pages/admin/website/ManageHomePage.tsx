import React, { useState } from "react";
import { Save, X, Plus, Upload, Trash2 } from "lucide-react";
import { PageWrapper } from "../../../components/layout/PageWrapper";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface FeaturedService {
  id: string;
  name: string;
  image: string;
  description: string;
  featured: boolean;
}

interface HeroSection {
  title: string;
  description: string;
  heroImage: string;
  features: FeatureItem[];
}

interface SignatureTreatmentSection {
  title: string;
  description: string;
  featuredServices: FeaturedService[];
}

export default function ManageHomePage() {
  const [activeTab, setActiveTab] = useState<"hero" | "treatments">("hero");
  const [heroSection, setHeroSection] = useState<HeroSection>({
    title: "Reveal Your Most Radiant Skin",
    description: "Advanced aesthetic treatments personalized for your skin. Book your consultation today and start your glow journey.",
    heroImage: "",
    features: [
      { id: "1", title: "Board-Certified Practitioners", description: "Expert team with years of experience" },
      { id: "2", title: "Clinical-Grade Treatments", description: "Advanced medical-grade technology" },
      { id: "3", title: "Holistic Wellness Solutions", description: "Comprehensive skincare approach" },
    ]
  });

  const [treatmentSection, setTreatmentSection] = useState<SignatureTreatmentSection>({
    title: "Our Signature Treatments",
    description: "From advanced laser procedures to luxurious skin therapies — each treatment is tailored to your unique skin profile.",
    featuredServices: [
      { id: "1", name: "HydraFacial", image: "", description: "Deep cleansing, exfoliation, and hydration", featured: true },
      { id: "2", name: "Laser Skin Resurfacing", image: "", description: "Advanced fractional laser technology", featured: true },
      { id: "3", name: "Skin Whitening IV Drip", image: "", description: "Premium intravenous glutathione therapy", featured: true },
      { id: "4", name: "Other Service", image: "", description: "Additional treatment option", featured: false },
    ]
  });

  const handleHeroTitleChange = (value: string) => {
    setHeroSection({ ...heroSection, title: value });
  };

  const handleHeroDescriptionChange = (value: string) => {
    setHeroSection({ ...heroSection, description: value });
  };

  const handleFeatureUpdate = (featureId: string, field: string, value: string) => {
    setHeroSection({
      ...heroSection,
      features: heroSection.features.map(f =>
        f.id === featureId ? { ...f, [field]: value } : f
      )
    });
  };

  const handleTreatmentTitleChange = (value: string) => {
    setTreatmentSection({ ...treatmentSection, title: value });
  };

  const handleTreatmentDescriptionChange = (value: string) => {
    setTreatmentSection({ ...treatmentSection, description: value });
  };

  const handleToggleService = (serviceId: string) => {
    setTreatmentSection({
      ...treatmentSection,
      featuredServices: treatmentSection.featuredServices.map(s =>
        s.id === serviceId ? { ...s, featured: !s.featured } : { ...s, featured: s.featured && treatmentSection.featuredServices.filter(x => x.featured && x.id !== serviceId).length < 2 ? true : s.featured }
      )
    });
  };

  const featuredCount = treatmentSection.featuredServices.filter(s => s.featured).length;

  const handleSaveChanges = () => {
    console.log("[v0] Saving homepage changes:", { heroSection, treatmentSection });
    alert("Changes saved successfully!");
  };

  return (
    <PageWrapper>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "28px", fontWeight: 700, color: "#1A2E40", marginBottom: "8px" }}>Manage Home Page</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96" }}>Edit hero section, featured services, and other homepage content</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: "1px solid #D0E8F5", paddingBottom: "0" }}>
        {[
          { id: "hero", label: "Hero Section" },
          { id: "treatments", label: "Signature Treatments" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "hero" | "treatments")}
            style={{
              padding: "12px 20px",
              background: activeTab === tab.id ? "#2D6A9F" : "transparent",
              border: "none",
              borderRadius: "8px 8px 0 0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: activeTab === tab.id ? "#FFFFFF" : "#5A7A96",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Section Tab */}
      {activeTab === "hero" && (
        <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", marginBottom: "24px", border: "1px solid #D0E8F5" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A2E40", marginBottom: "20px" }}>Hero Section</h2>

          <div style={{ display: "grid", gap: "20px" }}>
            {/* Title */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Hero Title</label>
              <input
                type="text"
                value={heroSection.title}
                onChange={(e) => handleHeroTitleChange(e.target.value)}
                style={{
                  width: "100%",
                  height: "44px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#1A2E40",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Hero Description</label>
              <textarea
                value={heroSection.description}
                onChange={(e) => handleHeroDescriptionChange(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#1A2E40",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Hero Image Upload */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Hero Image</label>
              <div style={{
                border: "2px dashed #D0E8F5",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
                cursor: "pointer",
                background: "#F8FBFF",
                transition: "all 0.2s"
              }}>
                <Upload size={24} style={{ color: "#2D6A9F", margin: "0 auto 8px" }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", margin: "0" }}>Click to upload or drag and drop</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", margin: "4px 0 0 0" }}>PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40", marginBottom: "12px" }}>Feature Items (3 items)</h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {heroSection.features.map((feature) => (
                  <div key={feature.id} style={{ border: "1px solid #D0E8F5", borderRadius: "8px", padding: "14px", background: "#F8FBFF" }}>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureUpdate(feature.id, "title", e.target.value)}
                      placeholder="Feature title"
                      style={{
                        width: "100%",
                        height: "36px",
                        border: "1px solid #D0E8F5",
                        borderRadius: "6px",
                        padding: "0 10px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#1A2E40",
                        marginBottom: "8px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleFeatureUpdate(feature.id, "description", e.target.value)}
                      placeholder="Feature description"
                      rows={2}
                      style={{
                        width: "100%",
                        border: "1px solid #D0E8F5",
                        borderRadius: "6px",
                        padding: "8px 10px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#1A2E40",
                        outline: "none",
                        resize: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Treatments Section Tab */}
      {activeTab === "treatments" && (
        <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", marginBottom: "24px", border: "1px solid #D0E8F5" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A2E40", marginBottom: "20px" }}>Signature Treatments Section</h2>

          <div style={{ display: "grid", gap: "20px" }}>
            {/* Title */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Section Title</label>
              <input
                type="text"
                value={treatmentSection.title}
                onChange={(e) => handleTreatmentTitleChange(e.target.value)}
                style={{
                  width: "100%",
                  height: "44px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#1A2E40",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Section Description</label>
              <textarea
                value={treatmentSection.description}
                onChange={(e) => handleTreatmentDescriptionChange(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#1A2E40",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Featured Services Selection */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40", margin: "0" }}>Featured Services</h3>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", background: "#F0F6FC", padding: "4px 12px", borderRadius: "12px" }}>{featuredCount} of 3 Featured</span>
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                {treatmentSection.featuredServices.map((service) => (
                  <label key={service.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    border: `1.5px solid ${service.featured ? "#2D6A9F" : "#D0E8F5"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: service.featured ? "#EBF6FD" : "#FFFFFF",
                    transition: "all 0.2s"
                  }}>
                    <input
                      type="checkbox"
                      checked={service.featured}
                      onChange={() => handleToggleService(service.id)}
                      disabled={!service.featured && featuredCount >= 3}
                      style={{ cursor: "pointer", width: "18px", height: "18px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: service.featured ? "#2D6A9F" : "#1A2E40" }}>{service.name}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4" }}>{service.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginTop: "12px", margin: "12px 0 0 0" }}>Select exactly 3 services to display on the homepage</p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <button style={{
          height: "40px",
          padding: "0 20px",
          background: "#FFFFFF",
          border: "1.5px solid #D0E8F5",
          borderRadius: "8px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "#5A7A96",
          cursor: "pointer",
        }}>
          Cancel
        </button>
        <button
          onClick={handleSaveChanges}
          style={{
            height: "40px",
            padding: "0 20px",
            background: "#2D6A9F",
            border: "none",
            borderRadius: "8px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
          <Save size={14} /> Save Changes
        </button>
      </div>
    </PageWrapper>
  );
}
