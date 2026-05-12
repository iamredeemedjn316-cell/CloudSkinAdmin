import React, { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  price: string | number;
  duration: string | number;
  status: "active" | "inactive";
  image?: string;
  description?: string;
}

interface ServiceDetailsModalProps {
  service: Service;
  onClose: () => void;
  onSave?: (updatedService: Service) => void;
  isEditing?: boolean;
}

export default function ServiceDetailsModal({ service, onClose, onSave, isEditing = false }: ServiceDetailsModalProps) {
  const [formData, setFormData] = useState<Service>(service);
  const [selectedImage, setSelectedImage] = useState<string | null>(service.image || null);
  const [isEditMode, setIsEditMode] = useState(isEditing);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...formData, image: selectedImage || undefined });
    }
    setIsEditMode(false);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(26, 46, 64, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        width: "90%",
        maxHeight: "90vh",
        overflow: "auto",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px",
          borderBottom: "1px solid #D0E8F5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            {isEditMode ? "Edit Service" : "Service Details"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#5A7A96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Image Section */}
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", display: "block", marginBottom: "8px" }}>
              Service Image
            </label>
            {selectedImage && (
              <div style={{
                width: "100%",
                height: "200px",
                borderRadius: "8px",
                background: "#F0F6FC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                border: "1px solid #D0E8F5",
                overflow: "hidden",
              }}>
                <img
                  src={selectedImage}
                  alt="Service"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            {isEditMode && (
              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                border: "2px dashed #D0E8F5",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#5A7A96",
                background: "#F8FBFF",
              }}>
                <Upload size={16} />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>

          {/* Form Fields */}
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", display: "block", marginBottom: "6px" }}>
              Service Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditMode}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D0E8F5",
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                background: isEditMode ? "#FFFFFF" : "#F8FBFF",
                color: "#1A2E40",
                cursor: isEditMode ? "text" : "default",
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", display: "block", marginBottom: "6px" }}>
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={!isEditMode}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D0E8F5",
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                background: isEditMode ? "#FFFFFF" : "#F8FBFF",
                color: "#1A2E40",
                cursor: isEditMode ? "text" : "default",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", display: "block", marginBottom: "6px" }}>
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                disabled={!isEditMode}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #D0E8F5",
                  borderRadius: "6px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  background: isEditMode ? "#FFFFFF" : "#F8FBFF",
                  color: "#1A2E40",
                  cursor: isEditMode ? "text" : "default",
                }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", display: "block", marginBottom: "6px" }}>
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                disabled={!isEditMode}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #D0E8F5",
                  borderRadius: "6px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  background: isEditMode ? "#FFFFFF" : "#F8FBFF",
                  color: "#1A2E40",
                  cursor: isEditMode ? "text" : "default",
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              onClick={onClose}
              style={{
                padding: "10px 18px",
                background: "#F0F6FC",
                border: "1px solid #D0E8F5",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#5A7A96",
              }}
            >
              Close
            </button>
            {!isEditMode ? (
              <button
                onClick={() => setIsEditMode(true)}
                style={{
                  padding: "10px 18px",
                  background: "#2D6A9F",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                Edit Service
              </button>
            ) : (
              <button
                onClick={handleSave}
                style={{
                  padding: "10px 18px",
                  background: "#16A34A",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
