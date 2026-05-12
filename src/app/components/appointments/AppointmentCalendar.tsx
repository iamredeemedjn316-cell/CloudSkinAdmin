import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface Appointment {
  id: number;
  client: string;
  clientInitials: string;
  clientColor: string;
  date: string;
  time: string;
  type: "online" | "f2f";
  status: "confirmed" | "in-progress" | "pending" | "cancelled" | "completed";
  service: string;
  practitioner: string;
  duration: string;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onDayClick: (date: string) => void;
  onAppointmentClick?: (appointment: Appointment) => void;
}

export default function AppointmentCalendar({ appointments, onDayClick, onAppointmentClick }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(["confirmed", "in-progress", "pending", "cancelled"])
  );

  // Status colors for visual differentiation
  const statusColors: Record<string, string> = {
    confirmed: "#16A34A",
    "in-progress": "#F59E0B",
    pending: "#3B82F6",
    cancelled: "#DC2626",
    completed: "#8B5CF6",
  };

  const toggleFilter = (status: string) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(status)) {
      newFilters.delete(status);
    } else {
      newFilters.add(status);
    }
    setSelectedFilters(newFilters);
  };

  // Get appointments for a specific date with active filters
  const getAppointmentsForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return appointments.filter(apt => apt.date === dateStr && selectedFilters.has(apt.status));
  };

  // Get first day of month and number of days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Filter Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid #D0E8F5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>
            Filter by Status:
          </span>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["confirmed", "in-progress", "pending", "cancelled"].map((status) => (
              <label key={status} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selectedFilters.has(status)}
                  onChange={() => toggleFilter(status)}
                  style={{ cursor: "pointer", width: "16px", height: "16px" }}
                />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5A7A96", textTransform: "capitalize" }}>
                  {status.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40" }}>
            View Mode:
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["day", "week", "month"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as "day" | "week" | "month")}
                style={{
                  padding: "6px 12px",
                  background: viewMode === mode ? "#2D6A9F" : "#F0F6FC",
                  color: viewMode === mode ? "#FFFFFF" : "#5A7A96",
                  border: "1px solid #D0E8F5",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40" }}>
          {monthName}
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={prevMonth}
            style={{
              width: "28px",
              height: "28px",
              background: "#F0F6FC",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2D6A9F",
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={nextMonth}
            style={{
              width: "28px",
              height: "28px",
              background: "#F0F6FC",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2D6A9F",
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "8px" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#5A7A96",
              padding: "8px 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const dayAppointments = getAppointmentsForDate(day);
          const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

          return (
            <div
              key={day}
              onClick={() => {
                if (dayAppointments.length > 0) {
                  onDayClick(dateStr);
                }
              }}
              style={{
                padding: "8px",
                border: "1px solid #D0E8F5",
                borderRadius: "8px",
                background: "#FFFFFF",
                cursor: dayAppointments.length > 0 ? "pointer" : "default",
                transition: "all 150ms ease",
                minHeight: "72px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (dayAppointments.length > 0) {
                  (e.currentTarget as HTMLDivElement).style.background = "#F0F6FC";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#2D6A9F";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#FFFFFF";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#D0E8F5";
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "6px", width: "100%" }}>
                {day}
              </span>
              {dayAppointments.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "3px", width: "100%", overflow: "hidden" }}>
                  {dayAppointments.slice(0, 2).map((apt) => (
                    <div
                      key={apt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAppointmentClick?.(apt);
                      }}
                      style={{
                        background: statusColors[apt.status] || "#3B82F6",
                        color: "#FFFFFF",
                        padding: "3px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "opacity 150ms ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      title={`${apt.client} - ${apt.service} at ${apt.time}`}
                    >
                      {apt.client.split(" ")[0]} - {apt.time}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div style={{ fontSize: "9px", color: "#5A7A96", fontFamily: "'Inter', sans-serif", paddingLeft: "6px" }}>
                      +{dayAppointments.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ borderTop: "1px solid #D0E8F5", paddingTop: "12px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16A34A" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Confirmed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F59E0B" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>In Progress</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3B82F6" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Pending</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#DC2626" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Cancelled</span>
        </div>
      </div>
    </div>
  );
}
