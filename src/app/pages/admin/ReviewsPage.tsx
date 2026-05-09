import React, { useState } from "react";
import { Search, Star, ThumbsUp, ThumbsDown, Eye, X, CheckCircle, XCircle } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";

interface Review {
  id: string;
  patientName: string;
  patientEmail: string;
  service: string;
  practitioner: string;
  rating: number;
  review: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  appointmentDate: string;
}

const initialReviews: Review[] = [
  { id: "1", patientName: "Maria Santos", patientEmail: "maria.santos@email.com", service: "Hydra Facial", practitioner: "Dr. Sarah Chen", rating: 5, review: "Amazing experience! My skin feels so refreshed and glowing. Dr. Chen was very professional and explained every step of the procedure. Will definitely come back!", date: "2025-04-28", status: "pending", appointmentDate: "2025-04-25" },
  { id: "2", patientName: "Ana Reyes", patientEmail: "ana.reyes@email.com", service: "Botox Treatment", practitioner: "Dr. Michael Santos", rating: 5, review: "Very satisfied with the results. The clinic is clean and the staff is friendly. Dr. Santos took his time to understand my concerns.", date: "2025-04-27", status: "approved", appointmentDate: "2025-04-24" },
  { id: "3", patientName: "Sofia Cruz", patientEmail: "sofia.cruz@email.com", service: "Chemical Peel", practitioner: "Dr. Sarah Chen", rating: 4, review: "Good results overall. There was a bit of redness after but it subsided quickly. The staff provided good aftercare instructions.", date: "2025-04-26", status: "approved", appointmentDate: "2025-04-22" },
  { id: "4", patientName: "Carlos Garcia", patientEmail: "carlos.garcia@email.com", service: "Laser Resurfacing", practitioner: "Dr. Michael Santos", rating: 3, review: "The procedure was okay but the waiting time was longer than expected. Results are still showing after a few weeks.", date: "2025-04-25", status: "pending", appointmentDate: "2025-04-20" },
  { id: "5", patientName: "Isabella Santos", patientEmail: "isabella.santos@email.com", service: "Dermal Fillers", practitioner: "Dr. Sarah Chen", rating: 5, review: "Absolutely love my results! Very natural looking. Dr. Chen is truly skilled at what she does. Highly recommend this clinic!", date: "2025-04-24", status: "approved", appointmentDate: "2025-04-18" },
  { id: "6", patientName: "Juan Dela Cruz", patientEmail: "juan.delacruz@email.com", service: "Acne Treatment", practitioner: "Dr. Michael Santos", rating: 2, review: "Did not see much improvement after 3 sessions. Expected better results based on the consultation.", date: "2025-04-23", status: "rejected", appointmentDate: "2025-04-15" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const filtered = reviews.filter((r) => {
    const matchSearch = r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase()) ||
      r.practitioner.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const pendingCount = reviews.filter(r => r.status === "pending").length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const handleApprove = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: "approved" as const } : r));
    if (selectedReview?.id === id) setSelectedReview({ ...selectedReview, status: "approved" });
  };

  const handleReject = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: "rejected" as const } : r));
    if (selectedReview?.id === id) setSelectedReview({ ...selectedReview, status: "rejected" });
  };

  const renderStars = (rating: number, size: number = 14) => (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={size} fill={star <= rating ? "#F59E0B" : "none"} color={star <= rating ? "#F59E0B" : "#D0E8F5"} />
      ))}
    </div>
  );

  const getStatusBadge = (status: Review["status"]) => {
    const styles = {
      pending: { bg: "#FEF3C7", color: "#D97706" },
      approved: { bg: "#D1FAE5", color: "#16A34A" },
      rejected: { bg: "#FEE2E2", color: "#DC2626" },
    };
    return (
      <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: styles[status].bg, color: styles[status].color, textTransform: "capitalize" }}>
        {status}
      </span>
    );
  };

  return (
    <PageWrapper title="Reviews" breadcrumb="Admin / Reviews">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Reviews", value: reviews.length.toString() },
          { label: "Pending Review", value: pendingCount.toString() },
          { label: "Average Rating", value: avgRating },
          { label: "5-Star Reviews", value: reviews.filter(r => r.rating === 5).length.toString() },
        ].map((s) => (
          <div key={s.label} style={{ background: "#FFFFFF", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "24px", color: "#1A2E40" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "#FFFFFF", borderRadius: "8px", padding: "8px 14px", border: "1.5px solid #D0E8F5" }}>
          <Search size={16} color="#5A7A96" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: "none", background: "none", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40" }}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ padding: "8px 16px", background: filter === f ? "#2D6A9F" : "#FFFFFF", border: `1.5px solid ${filter === f ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: filter === f ? "#FFFFFF" : "#5A7A96", textTransform: "capitalize" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F0F6FC" }}>
              {["Patient", "Service", "Practitioner", "Rating", "Date", "Status", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "11px", color: "#5A7A96", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #D0E8F5" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((review, i, arr) => (
              <tr key={review.id} style={{ borderBottom: i < arr.length - 1 ? "1px solid #F0F6FC" : "none" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{review.patientName}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>{review.patientEmail}</div>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A2E40" }}>{review.service}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5A7A96" }}>{review.practitioner}</td>
                <td style={{ padding: "14px 16px" }}>{renderStars(review.rating)}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{review.date}</td>
                <td style={{ padding: "14px 16px" }}>{getStatusBadge(review.status)}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setSelectedReview(review)} style={{ padding: "6px", background: "#F0F6FC", border: "none", borderRadius: "6px", cursor: "pointer" }} title="View">
                      <Eye size={14} color="#5A7A96" />
                    </button>
                    {review.status === "pending" && (
                      <>
                        <button onClick={() => handleApprove(review.id)} style={{ padding: "6px", background: "#D1FAE5", border: "none", borderRadius: "6px", cursor: "pointer" }} title="Approve">
                          <ThumbsUp size={14} color="#16A34A" />
                        </button>
                        <button onClick={() => handleReject(review.id)} style={{ padding: "6px", background: "#FEE2E2", border: "none", borderRadius: "6px", cursor: "pointer" }} title="Reject">
                          <ThumbsDown size={14} color="#DC2626" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#5A7A96", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>No reviews found</div>
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,58,92,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#FFFFFF", borderRadius: "16px", width: "100%", maxWidth: "550px", boxShadow: "0 8px 32px rgba(26,58,92,0.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "18px", color: "#1A2E40" }}>Review Details</h3>
              <button onClick={() => setSelectedReview(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5A7A96" }}><X size={20} /></button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>{selectedReview.patientName}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96" }}>{selectedReview.patientEmail}</div>
                </div>
                {getStatusBadge(selectedReview.status)}
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div style={{ padding: "12px 16px", background: "#F8FBFF", borderRadius: "8px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px" }}>Service</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{selectedReview.service}</div>
                </div>
                <div style={{ padding: "12px 16px", background: "#F8FBFF", borderRadius: "8px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px" }}>Practitioner</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{selectedReview.practitioner}</div>
                </div>
                <div style={{ padding: "12px 16px", background: "#F8FBFF", borderRadius: "8px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px" }}>Appointment Date</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{selectedReview.appointmentDate}</div>
                </div>
                <div style={{ padding: "12px 16px", background: "#F8FBFF", borderRadius: "8px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "4px" }}>Review Date</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A2E40" }}>{selectedReview.date}</div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "8px" }}>Rating</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {renderStars(selectedReview.rating, 20)}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", color: "#F59E0B" }}>{selectedReview.rating}.0</span>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#5A7A96", marginBottom: "8px" }}>Review</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "#1A2E40", background: "#F8FBFF", padding: "16px", borderRadius: "8px" }}>{selectedReview.review}</p>
              </div>
            </div>
            
            {selectedReview.status === "pending" && (
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "16px 24px", borderTop: "1px solid #D0E8F5" }}>
                <button onClick={() => { handleReject(selectedReview.id); }} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "#FEE2E2", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#DC2626" }}>
                  <XCircle size={16} /> Reject
                </button>
                <button onClick={() => { handleApprove(selectedReview.id); }} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "#16A34A", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                  <CheckCircle size={16} /> Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
