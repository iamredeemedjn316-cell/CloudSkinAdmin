import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatusType } from "../../components/StatusBadge";

interface Appointment {
  id: number;
  client: string;
  date: string;
  time: string;
  type: "online" | "f2f";
  status: StatusType;
  service: string;
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
  statusFilter: StatusType;
  onDayClick: (date: string) => void;
}

export default function AppointmentCalendar({ appointments, statusFilter, onDayClick }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  // Get appointments for a specific date
  const getAppointmentsForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return appointments.filter(apt => apt.date === dateStr && apt.status === statusFilter);
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
          const hasFaceToFace = dayAppointments.some(a => a.type === "f2f");
          const hasOnline = dayAppointments.some(a => a.type === "online");

          return (
            <button
              key={day}
              onClick={() => {
                const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                onDayClick(dateStr);
              }}
              style={{
                padding: "8px",
                border: "1px solid #D0E8F5",
                borderRadius: "8px",
                background: "#FFFFFF",
                cursor: dayAppointments.length > 0 ? "pointer" : "default",
                transition: "all 150ms ease",
                minHeight: "56px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (dayAppointments.length > 0) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#F0F6FC";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#2D6A9F";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#D0E8F5";
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A2E40", marginBottom: "4px" }}>
                {day}
              </span>
              {dayAppointments.length > 0 && (
                <div style={{ display: "flex", gap: "2px" }}>
                  {hasFaceToFace && (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#1E40AF",
                        title: "Face to Face appointments",
                      }}
                    />
                  )}
                  {hasOnline && (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#16A34A",
                        title: "Online appointments",
                      }}
                    />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ borderTop: "1px solid #D0E8F5", paddingTop: "12px", display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1E40AF" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>F2F</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16A34A" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#5A7A96" }}>Online</span>
        </div>
      </div>
    </div>
  );
}
