import React, { useState } from "react";
import { Save, X, Plus, Upload, Trash2, Search, Check } from "lucide-react";
import { PageWrapper } from "../../../components/layout/PageWrapper";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface FeaturedService {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
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

interface WhyCloudSkinItem {
  id: string;
  iconName: string;
  subtitle: string;
  description: string;
}

interface WhyCloudSkinSection {
  title: string;
  description: string;
  image: string;
  items: WhyCloudSkinItem[];
}

export default function ManageHomePage() {
  const [activeTab, setActiveTab] = useState<"hero" | "treatments" | "whyCloudSkin">("hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [showServiceSearch, setShowServiceSearch] = useState(false);
  
  // Sample services list from your services
  const allServices = [
    { id: "1", name: "HydraFacial", category: "Facial", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-md1MqLX2LUGt7awueOBElRDAwdgoaK.png", description: "Deep cleansing, exfoliation, and hydration in one rejuvenating session for all skin types." },
    { id: "2", name: "Laser Skin Resurfacing", category: "Laser", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VYNPtgtlFfqkFBjmd6QYuKyv5u3286.png", description: "Advanced fractional laser to reduce acne scars, wrinkles, and uneven skin tone." },
    { id: "3", name: "Skin Whitening IV Drip", category: "Wellness", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VYNPtgtlFfqkFBjmd6QYuKyv5u3286.png", description: "Premium intravenous glutathione therapy for a brighter, more radiant complexion." },
    { id: "4", name: "Botox Treatment", category: "Injectables", image: "", description: "Minimize fine lines and wrinkles with precision injections." },
    { id: "5", name: "Chemical Peel", category: "Peel", image: "", description: "Advanced peel to rejuvenate and resurface the skin." },
    { id: "6", name: "Microdermabrasion", category: "Exfoliation", image: "", description: "Mechanical exfoliation for smoother, clearer skin." },
  ];

  const [heroSection, setHeroSection] = useState<HeroSection>({
    title: "Reveal Your Most Radiant Skin",
    description: "Advanced aesthetic treatments personalized for your skin. Book your consultation today and start your glow journey.",
    heroImage: "",
    features: [
      { id: "1", title: "Board-Certified Practitioners", description: "Expert team with years of experience", image: "" },
      { id: "2", title: "Clinical-Grade Treatments", description: "Advanced medical-grade technology", image: "" },
      { id: "3", title: "Holistic Wellness Solutions", description: "Comprehensive skincare approach", image: "" },
    ]
  });

  const [treatmentSection, setTreatmentSection] = useState<SignatureTreatmentSection>({
    title: "Our Signature Treatments",
    description: "From advanced laser procedures to luxurious skin therapies — each treatment is tailored to your unique skin profile.",
    featuredServices: [
      { id: "1", name: "HydraFacial", category: "Facial", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-md1MqLX2LUGt7awueOBElRDAwdgoaK.png", description: "Deep cleansing, exfoliation, and hydration", featured: true },
      { id: "2", name: "Laser Skin Resurfacing", category: "Laser", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VYNPtgtlFfqkFBjmd6QYuKyv5u3286.png", description: "Advanced fractional laser technology", featured: true },
      { id: "3", name: "Skin Whitening IV Drip", category: "Wellness", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VYNPtgtlFfqkFBjmd6QYuKyv5u3286.png", description: "Premium intravenous glutathione therapy", featured: true },
    ]
  });

  const [whyCloudSkinSection, setWhyCloudSkinSection] = useState<WhyCloudSkinSection>({
    title: "Why Cloud Skin Clinic",
    description: "At Cloud Skin Clinic, we combine the latest aesthetic technology with genuine care for your wellbeing. Every treatment is backed by science and delivered by licensed professionals.",
    image: "",
    items: [
      { id: "1", iconName: "flask", subtitle: "Evidence-Based Treatments", description: "Every procedure we offer is clinically proven and approved by dermatology standards." },
      { id: "2", iconName: "checkmark", subtitle: "Licensed Aesthetic Practitioners", description: "Our team of doctors and nurses are fully certified in aesthetic medicine." },
      { id: "3", iconName: "arrow", subtitle: "Premium Medical-Grade Products", description: "We use only the highest quality, medical-grade skincare products and equipment." },
      { id: "4", iconName: "clipboard", subtitle: "Personalized Skin Assessments", description: "Every client receives a thorough skin analysis before any treatment begins." },
    ]
  });
  };

  const handleTreatmentTitleChange = (value: string) => {
    setTreatmentSection({ ...treatmentSection, title: value });
  };

  const handleTreatmentDescriptionChange = (value: string) => {
    setTreatmentSection({ ...treatmentSection, description: value });
  };

  const handleToggleService = (serviceId: string) => {
    const currentFeatured = treatmentSection.featuredServices.filter(s => s.featured);
    const isFeatured = currentFeatured.some(s => s.id === serviceId);
    
    if (isFeatured) {
      // Remove from featured
      setTreatmentSection({
        ...treatmentSection,
        featuredServices: treatmentSection.featuredServices.map(s =>
          s.id === serviceId ? { ...s, featured: false } : s
        )
      });
    } else if (currentFeatured.length < 3) {
      // Add to featured
      const selectedService = allServices.find(s => s.id === serviceId);
      if (selectedService) {
        setTreatmentSection({
          ...treatmentSection,
          featuredServices: [
            ...treatmentSection.featuredServices.filter(s => s.id !== serviceId),
            { ...selectedService, featured: true }
          ]
        });
        setShowServiceSearch(false);
      }
    }
  };

  const handleSaveChanges = () => {
    console.log("[v0] Saving homepage changes:", { heroSection, treatmentSection, whyCloudSkinSection });
    alert("Changes saved successfully!");
  };

  const handleWhyCloudSkinItemUpdate = (itemId: string, field: string, value: string) => {
    setWhyCloudSkinSection({
      ...whyCloudSkinSection,
      items: whyCloudSkinSection.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    });
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
          { id: "treatments", label: "Signature Treatments" },
          { id: "whyCloudSkin", label: "Why Cloud Skin" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "hero" | "treatments" | "whyCloudSkin")}
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
              <div style={{ display: "grid", gap: "10px" }}>
                {heroSection.features.map((feature) => (
                  <div key={feature.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "4px", background: "#EBF6FD", border: "2px solid #2D6A9F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={12} color="#2D6A9F" strokeWidth={3} />
                    </div>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureUpdate(feature.id, "title", e.target.value)}
                      placeholder="Enter feature item"
                      style={{
                        flex: 1,
                        height: "40px",
                        border: "1.5px solid #D0E8F5",
                        borderRadius: "8px",
                        padding: "0 12px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#1A2E40",
                        outline: "none",
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40", margin: "0" }}>Featured Services</h3>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", background: "#F0F6FC", padding: "4px 12px", borderRadius: "12px" }}>{treatmentSection.featuredServices.filter(s => s.featured).length} of 3 Featured</span>
              </div>

              {/* Selected Services as Cards */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96", marginBottom: "8px" }}>Selected Services</label>
                {treatmentSection.featuredServices.filter(s => s.featured).length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                    {treatmentSection.featuredServices.filter(s => s.featured).map((service) => (
                      <div key={service.id} style={{ background: "#FFFFFF", borderRadius: "12px", overflow: "hidden", border: "1px solid #D0E8F5", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
                        {/* Image Container */}
                        <div style={{ position: "relative", width: "100%", height: "220px", background: "#F0F6FC", overflow: "hidden" }}>
                          {service.image ? (
                            <img src={service.image} alt={service.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9BBAD4", fontSize: "12px" }}>No image</div>
                          )}
                          {/* Category Badge */}
                          <div style={{ position: "absolute", top: "12px", right: "12px", background: "#FFFFFF", border: "1.5px solid #2D6A9F", borderRadius: "20px", padding: "6px 14px", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#2D6A9F" }}>
                            {service.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: "16px" }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#1A2E40", marginBottom: "8px" }}>{service.name}</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginBottom: "12px", lineHeight: "1.5" }}>{service.description}</div>
                          <button
                            onClick={() => handleToggleService(service.id)}
                            style={{
                              width: "100%",
                              height: "40px",
                              background: "#DC2626",
                              border: "none",
                              borderRadius: "8px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#FFFFFF",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "16px", background: "#F8FBFF", border: "1px solid #D0E8F5", borderRadius: "8px", textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>
                    No services selected yet
                  </div>
                )}
              </div>

              {/* Service Search */}
              {treatmentSection.featuredServices.filter(s => s.featured).length < 3 && (
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#5A7A96", marginBottom: "8px" }}>Add Services</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}>
                      <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9BBAD4" }} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowServiceSearch(true)}
                        placeholder="Search and select services..."
                        style={{
                          width: "100%",
                          height: "40px",
                          border: "1.5px solid #D0E8F5",
                          borderRadius: "8px",
                          padding: "0 12px 0 36px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          color: "#1A2E40",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    {/* Search Results Dropdown */}
                    {showServiceSearch && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#FFFFFF",
                        border: "1px solid #D0E8F5",
                        borderRadius: "8px",
                        marginTop: "4px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        zIndex: 10,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}>
                        {allServices
                          .filter(s => !treatmentSection.featuredServices.find(fs => fs.id === s.id && fs.featured))
                          .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((service) => (
                            <button
                              key={service.id}
                              onClick={() => handleToggleService(service.id)}
                              style={{
                                width: "100%",
                                padding: "12px 14px",
                                background: "none",
                                border: "none",
                                textAlign: "left",
                                borderBottom: "1px solid #D0E8F5",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                transition: "background-color 0.2s"
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FBFF")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                            >
                              <div style={{ flex: 1 }}>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>{service.name}</div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9BBAD4" }}>{service.description}</div>
                              </div>
                              <Plus size={16} color="#2D6A9F" />
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4", marginTop: "12px", margin: "12px 0 0 0" }}>Select exactly 3 services to display on the homepage</p>
            </div>
          </div>
        </div>
      )}

      {/* Why Cloud Skin Tab */}
      {activeTab === "whyCloudSkin" && (
        <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", marginBottom: "24px", border: "1px solid #D0E8F5" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A2E40", marginBottom: "20px" }}>Why Cloud Skin Section</h2>

          <div style={{ display: "grid", gap: "20px" }}>
            {/* Title */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Section Title</label>
              <input
                type="text"
                value={whyCloudSkinSection.title}
                onChange={(e) => setWhyCloudSkinSection({ ...whyCloudSkinSection, title: e.target.value })}
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
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
                value={whyCloudSkinSection.description}
                onChange={(e) => setWhyCloudSkinSection({ ...whyCloudSkinSection, description: e.target.value })}
                rows={3}
                style={{
                  width: "100%",
                  border: "1.5px solid #D0E8F5",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#1A2E40",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#1A2E40", marginBottom: "8px" }}>Section Image</label>
              {whyCloudSkinSection.image ? (
                <div style={{ position: "relative", width: "100%", height: "200px", background: "#F0F6FC", borderRadius: "8px", overflow: "hidden", border: "1px solid #D0E8F5" }}>
                  <img src={whyCloudSkinSection.image} alt="Why Cloud Skin" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button
                    onClick={() => setWhyCloudSkinSection({ ...whyCloudSkinSection, image: "" })}
                    style={{ position: "absolute", top: "8px", right: "8px", width: "32px", height: "32px", background: "#FFFFFF", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <X size={16} color="#DC2626" />
                  </button>
                </div>
              ) : (
                <div style={{ border: "2px dashed #D0E8F5", borderRadius: "8px", padding: "24px", textAlign: "center", background: "#F8FBFF", cursor: "pointer" }}>
                  <Upload size={24} style={{ color: "#2D6A9F", margin: "0 auto 8px", display: "block" }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", margin: "0" }}>Upload section image</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A2E40", marginBottom: "12px" }}>Feature Items (4 items)</h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {whyCloudSkinSection.items.map((item) => (
                  <div key={item.id} style={{ border: "1px solid #D0E8F5", borderRadius: "8px", padding: "14px", background: "#F8FBFF" }}>
                    {/* Icon Name */}
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96", marginBottom: "6px", textTransform: "uppercase" }}>Icon Type</label>
                      <select
                        value={item.iconName}
                        onChange={(e) => handleWhyCloudSkinItemUpdate(item.id, "iconName", e.target.value)}
                        style={{
                          width: "100%",
                          height: "36px",
                          border: "1px solid #D0E8F5",
                          borderRadius: "6px",
                          padding: "0 10px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          color: "#1A2E40",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="flask">Flask (Evidence-Based)</option>
                        <option value="checkmark">Checkmark (Practitioners)</option>
                        <option value="arrow">Arrow (Products)</option>
                        <option value="clipboard">Clipboard (Assessments)</option>
                      </select>
                    </div>

                    {/* Subtitle */}
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleWhyCloudSkinItemUpdate(item.id, "subtitle", e.target.value)}
                      placeholder="Feature subtitle"
                      style={{
                        width: "100%",
                        height: "36px",
                        border: "1px solid #D0E8F5",
                        borderRadius: "6px",
                        padding: "0 10px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1A2E40",
                        marginBottom: "8px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />

                    {/* Description */}
                    <textarea
                      value={item.description}
                      onChange={(e) => handleWhyCloudSkinItemUpdate(item.id, "description", e.target.value)}
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
