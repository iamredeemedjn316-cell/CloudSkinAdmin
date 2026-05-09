import React, { useState } from "react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Info, Save } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("booking");
  const [bookingStart, setBookingStart] = useState("10:00");
  const [bookingEnd, setBookingEnd] = useState("18:00");
  const [slotInterval, setSlotInterval] = useState("60");
  const [operatingDays, setOperatingDays] = useState<Record<string, boolean>>({
    Monday: true, Tuesday: true, Wednesday: true, Thursday: true,
    Friday: true, Saturday: true, Sunday: false,
  });

  const sections = [
    { key: "booking", label: "Appointment Configuration" },
    { key: "clinic", label: "Clinic Information" },
    { key: "notifications", label: "Notification Preferences" },
  ];

  return (
    <PageWrapper title="Settings" breadcrumb="Admin / Settings">
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Sub-nav */}
        <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
          {sections.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              style={{
                width: "100%",
                height: "44px",
                background: activeSection === s.key ? "#EBF6FD" : "transparent",
                border: "none",
                borderLeft: activeSection === s.key ? "3px solid #2D6A9F" : "3px solid transparent",
                borderBottom: i < sections.length - 1 ? "1px solid #F0F6FC" : "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "0 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: activeSection === s.key ? 600 : 400,
                fontSize: "13px",
                color: activeSection === s.key ? "#2D6A9F" : "#5A7A96",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeSection === "booking" && (
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Appointment Configuration</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginTop: "2px" }}>Configure appointment scheduling rules and time intervals</div>
              </div>

              <div style={{ padding: "24px" }}>
                {/* Info Banner */}
                <div style={{ background: "#EBF6FD", border: "1px solid #5BC0EB", borderLeft: "4px solid #2D6A9F", borderRadius: "10px", padding: "12px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Info size={16} color="#2D6A9F" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A3A5C" }}>
                    Changes take effect immediately for all new bookings.
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Booking Start Time</label>
                    <input
                      type="time"
                      value={bookingStart}
                      onChange={(e) => setBookingStart(e.target.value)}
                      style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Booking End Time</label>
                    <input
                      type="time"
                      value={bookingEnd}
                      onChange={(e) => setBookingEnd(e.target.value)}
                      style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "10px" }}>Appointment Slot Interval</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                    {[{ value: "20", label: "20 minutes" }, { value: "30", label: "30 minutes" }, { value: "60", label: "60 minutes" }].map((opt) => (
                      <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "10px 16px", border: `1.5px solid ${slotInterval === opt.value ? "#2D6A9F" : "#D0E8F5"}`, borderRadius: "8px", background: slotInterval === opt.value ? "#EBF6FD" : "#FFFFFF" }}>
                        <input type="radio" checked={slotInterval === opt.value} onChange={() => setSlotInterval(opt.value)} style={{ display: "none" }} />
                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `2px solid ${slotInterval === opt.value ? "#2D6A9F" : "#9BBAD4"}`, background: slotInterval === opt.value ? "#2D6A9F" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {slotInterval === opt.value && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />}
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: slotInterval === opt.value ? "#2D6A9F" : "#5A7A96" }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button style={{ height: "40px", padding: "0 24px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Save size={15} /> Save Appointment Settings
                </button>
              </div>
            </div>
          )}

          {activeSection === "clinic" && (
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #D0E8F5" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40" }}>Clinic Information</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", marginTop: "2px" }}>Update your clinic's public details</div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  {[
                    { label: "Clinic Name", defaultValue: "Cloud Skin Clinic + Wellness", col: "1 / -1" },
                    { label: "Phone Number", defaultValue: "+63 2-8XXX-XXXX" },
                    { label: "Email Address", defaultValue: "hello@cloudskin.com" },
                  ].map((f) => (
                    <div key={f.label} style={{ gridColumn: f.col }}>
                      <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>{f.label}</label>
                      <input defaultValue={f.defaultValue} style={{ width: "100%", height: "40px", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "6px" }}>Address</label>
                    <textarea defaultValue="123 Clinic Street, BGC, Taguig City, Metro Manila, Philippines" rows={2} style={{ width: "100%", border: "1.5px solid #D0E8F5", borderRadius: "8px", padding: "10px 12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1A2E40", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                </div>

                {/* Operating Hours */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "13px", color: "#1A2E40", marginBottom: "12px" }}>Operating Hours</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {days.map((day) => (
                      <div key={day} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "100px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            onClick={() => setOperatingDays((prev) => ({ ...prev, [day]: !prev[day] }))}
                            style={{ width: "36px", height: "20px", borderRadius: "9999px", background: operatingDays[day] ? "#2D6A9F" : "#D0E8F5", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "2px", flexShrink: 0 }}
                          >
                            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#FFFFFF", marginLeft: operatingDays[day] ? "auto" : "0", transition: "margin 150ms" }} />
                          </div>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: operatingDays[day] ? "#1A2E40" : "#9BBAD4" }}>
                            {day.slice(0, 3)}
                          </span>
                        </div>
                        {operatingDays[day] ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <input type="time" defaultValue="10:00" style={{ height: "34px", border: "1.5px solid #D0E8F5", borderRadius: "6px", padding: "0 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#1A2E40", outline: "none" }} />
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9BBAD4" }}>to</span>
                            <input type="time" defaultValue="18:00" style={{ height: "34px", border: "1.5px solid #D0E8F5", borderRadius: "6px", padding: "0 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#1A2E40", outline: "none" }} />
                          </div>
                        ) : (
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>Closed</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button style={{ height: "40px", padding: "0 24px", background: "#2D6A9F", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Save size={15} /> Save Clinic Info
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div style={{ background: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 4px rgba(26,58,92,0.08)", padding: "24px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1A2E40", marginBottom: "4px" }}>Notification Preferences</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9BBAD4" }}>Coming soon — notification management will be available in a future update.</div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
