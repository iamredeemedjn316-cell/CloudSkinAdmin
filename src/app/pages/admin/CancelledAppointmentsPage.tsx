import React from "react";
import { AppointmentListOnly } from "../../components/appointments/AppointmentListOnly";

interface Appointment {
  id: number;
  client: string;
  clientPhone: string;
  clientInitials: string;
  clientColor: string;
  service: string;
  duration: string;
  date: string;
  time: string;
  practitioner: string;
  status: "confirmed" | "in-progress" | "pending" | "cancelled" | "completed";
  paymentMethod: string;
  amount: string;
  paymentStatus: string;
  type: "online" | "f2f";
  isExistingClient: boolean;
  bookedBy?: "admin" | "receptionist" | "patient";
}

const appointments: Appointment[] = [
  { id: 1001, client: "Sarah Johnson", clientPhone: "0917-123-4567", clientInitials: "SJ", clientColor: "#2D6A9F", service: "Hydra Facial", duration: "60 min", date: "Apr 25, 2026", time: "10:00 AM", practitioner: "Dr. Santos", status: "confirmed", paymentMethod: "gcash", amount: "₱2,500", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "receptionist" },
  { id: 1002, client: "Miguel Cruz", clientPhone: "0918-234-5678", clientInitials: "MC", clientColor: "#16A34A", service: "Botox Treatment", duration: "45 min", date: "Apr 25, 2026", time: "11:00 AM", practitioner: "Dr. Reyes", status: "in-progress", paymentMethod: "cash", amount: "₱8,000", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1003, client: "Camille Torres", clientPhone: "0919-345-6789", clientInitials: "CT", clientColor: "#7C3AED", service: "Chemical Peel", duration: "45 min", date: "Apr 25, 2026", time: "1:00 PM", practitioner: "Dr. Santos", status: "pending", paymentMethod: "gcash", amount: "₱3,500", paymentStatus: "unpaid", type: "online", isExistingClient: false, bookedBy: "patient" },
  { id: 1004, client: "Jose Dela Cruz", clientPhone: "0920-456-7890", clientInitials: "JD", clientColor: "#EA580C", service: "PRP Therapy", duration: "90 min", date: "Apr 25, 2026", time: "2:30 PM", practitioner: "Dr. Lim", status: "confirmed", paymentMethod: "card", amount: "₱12,000", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1005, client: "Angela Park", clientPhone: "0921-567-8901", clientInitials: "AP", clientColor: "#0891B2", service: "LED Therapy", duration: "30 min", date: "Apr 25, 2026", time: "3:30 PM", practitioner: "Dr. Reyes", status: "confirmed", paymentMethod: "cash", amount: "₱1,800", paymentStatus: "paid", type: "online", isExistingClient: true, bookedBy: "patient" },
  { id: 1006, client: "Roberto Tan", clientPhone: "0922-678-9012", clientInitials: "RT", clientColor: "#B45309", service: "Microneedling", duration: "60 min", date: "Apr 26, 2026", time: "9:00 AM", practitioner: "Dr. Santos", status: "pending", paymentMethod: "gcash", amount: "₱4,500", paymentStatus: "unpaid", type: "f2f", isExistingClient: true, bookedBy: "receptionist" },
  { id: 1007, client: "Lisa Gomez", clientPhone: "0923-789-0123", clientInitials: "LG", clientColor: "#9D174D", service: "Laser Resurfacing", duration: "90 min", date: "Apr 26, 2026", time: "10:30 AM", practitioner: "Dr. Lim", status: "confirmed", paymentMethod: "card", amount: "₱15,000", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1008, client: "Kevin Bautista", clientPhone: "0924-890-1234", clientInitials: "KB", clientColor: "#065F46", service: "Acne Treatment", duration: "45 min", date: "Apr 26, 2026", time: "11:30 AM", practitioner: "Dr. Reyes", status: "confirmed", paymentMethod: "cash", amount: "₱2,800", paymentStatus: "paid", type: "online", isExistingClient: false, bookedBy: "patient" },
  { id: 1009, client: "Diana Reyes", clientPhone: "0925-901-2345", clientInitials: "DR", clientColor: "#6B21A8", service: "Dermal Fillers", duration: "60 min", date: "Apr 27, 2026", time: "10:00 AM", practitioner: "Dr. Santos", status: "cancelled", paymentMethod: "gcash", amount: "₱18,000", paymentStatus: "unpaid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1010, client: "Marco Villanueva", clientPhone: "0926-012-3456", clientInitials: "MV", clientColor: "#0C4A6E", service: "IV Drip Wellness", duration: "60 min", date: "Apr 27, 2026", time: "2:00 PM", practitioner: "Dr. Lim", status: "completed", paymentMethod: "transfer", amount: "₱3,500", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "receptionist" },
  { id: 1011, client: "Patricia Santos", clientPhone: "0927-123-4567", clientInitials: "PS", clientColor: "#14532D", service: "Hydra Facial", duration: "60 min", date: "Apr 28, 2026", time: "9:30 AM", practitioner: "Dr. Santos", status: "confirmed", paymentMethod: "cash", amount: "₱2,500", paymentStatus: "paid", type: "f2f", isExistingClient: true, bookedBy: "admin" },
  { id: 1012, client: "Antonio Garcia", clientPhone: "0928-234-5678", clientInitials: "AG", clientColor: "#7F1D1D", service: "PRP Hair Therapy", duration: "90 min", date: "Apr 28, 2026", time: "11:00 AM", practitioner: "Dr. Lim", status: "pending", paymentMethod: "gcash", amount: "₱12,000", paymentStatus: "unpaid", type: "online", isExistingClient: false, bookedBy: "patient" },
];

export default function CancelledAppointmentsPage() {
  return (
    <AppointmentListOnly
      title="Cancelled Appointments"
      breadcrumb="Admin / Appointments / Cancelled"
      statusFilter="cancelled"
      appointments={appointments}
    />
  );
}
