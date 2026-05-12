import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  paymentMethod: string;
  amount: string;
  paymentStatus: string;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onDayClick: (date: string) => void;
  onAppointmentClick?: (appointment: Appointment) => void;
}

export default function AppointmentCalendar({ appointments, onDayClick, onAppointmentClick }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 25)); // April 25, 2026
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(["confirmed", "in-progress", "pending", "cancelled"])
  );

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

  // Get appointments for a specific date
  const getAppointmentsForDate = (day: number, month?: number, year?: number) => {
    const dateToCheck = new Date(year || currentDate.getFullYear(), month !== undefined ? month : currentDate.getMonth(), day);
    const dateStr = dateToCheck.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return appointments.filter(apt => apt.date === dateStr && selectedFilters.has(apt.status));
  };

  // Month view rendering
  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const days = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            {monthName}
          </h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
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
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
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

        {/* Weekday headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "8px" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#5A7A96", padding: "8px 0" }}>
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
                    setViewMode("day");
                    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
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
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A2E40", marginBottom: "6px" }}>
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
      </>
    );
  };

  // Week view rendering
  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      return date;
    });

    const weekRange = `${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            Week of {weekRange}
          </h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
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
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
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

        {/* Week grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
          {weekDays.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date.getDate(), date.getMonth(), date.getFullYear());
            const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #D0E8F5",
                  borderRadius: "8px",
                  background: isToday ? "#F0F6FC" : "#FFFFFF",
                  padding: "8px",
                  minHeight: "140px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #D0E8F5" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#5A7A96" }}>
                    {dayName}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40" }}>
                    {date.getDate()}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflow: "auto" }}>
                  {dayAppointments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => onAppointmentClick?.(apt)}
                      style={{
                        background: statusColors[apt.status] || "#3B82F6",
                        color: "#FFFFFF",
                        padding: "4px 6px",
                        borderRadius: "4px",
                        fontSize: "9px",
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "opacity 150ms ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      title={`${apt.client} - ${apt.time}`}
                    >
                      {apt.time} {apt.client}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div style={{ fontSize: "8px", color: "#5A7A96", fontFamily: "'Inter', sans-serif" }}>
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  // Day view rendering
  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
    const dateStr = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
            {dateStr}
          </h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
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
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}
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

        {/* Day schedule */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {dayAppointments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#5A7A96", fontFamily: "'Inter', sans-serif" }}>
              No appointments for this day
            </div>
          ) : (
            dayAppointments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => onAppointmentClick?.(apt)}
                style={{
                  border: `2px solid ${statusColors[apt.status] || "#3B82F6"}`,
                  background: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#F0F6FC";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#FFFFFF";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", margin: 0 }}>
                      {apt.client}
                    </h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96", margin: "2px 0 0 0" }}>
                      {apt.service}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <span style={{ background: statusColors[apt.status] || "#3B82F6", color: "#FFFFFF", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, textTransform: "capitalize" }}>
                      {apt.status.replace("-", " ")}
                    </span>
                    <span style={{ background: apt.type === "f2f" ? "#DBEAFE" : "#DCFCE7", color: apt.type === "f2f" ? "#1E40AF" : "#16A34A", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                      {apt.type === "f2f" ? "F2F" : "Online"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px" }}>
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Time: </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.time}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Duration: </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.duration}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Practitioner: </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.practitioner}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#5A7A96" }}>Amount: </span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1A2E40" }}>{apt.amount}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

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

      {/* View Rendering */}
      {viewMode === "month" && renderMonthView()}
      {viewMode === "week" && renderWeekView()}
      {viewMode === "day" && renderDayView()}

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
