import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout, PractitionerLayout, ReceptionLayout } from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppointmentsPage from "./pages/admin/AppointmentsPage";
import PatientsPage from "./pages/admin/PatientsPage";
import PatientProfilePage from "./pages/admin/PatientProfilePage";
import PatientsArchivePage from "./pages/admin/PatientsArchivePage";
import StaffPage from "./pages/admin/StaffPage";
import StaffArchivePage from "./pages/admin/StaffArchivePage";
import ServicesPage from "./pages/admin/ServicesPage";
import PackagesPage from "./pages/admin/PackagesPage";
import InventoryPage from "./pages/admin/InventoryPage";
import VouchersPage from "./pages/admin/VouchersPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import BlogPage from "./pages/admin/BlogPage";
import SettingsPage from "./pages/admin/SettingsPage";
import PractitionerDashboard from "./pages/practitioner/PractitionerDashboard";
import SchedulePage from "./pages/practitioner/SchedulePage";
import PractitionerPatientsPage from "./pages/practitioner/PractitionerPatientsPage";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "appointments", element: <AppointmentsPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "patients/:patientId", element: <PatientProfilePage /> },
      { path: "patients-archive", element: <PatientsArchivePage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "staff-archive", element: <StaffArchivePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "packages", element: <PackagesPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "vouchers", element: <VouchersPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/practitioner",
    Component: PractitionerLayout,
    children: [
      { index: true, element: <PractitionerDashboard /> },
      { path: "schedule", element: <SchedulePage /> },
      { path: "patients", element: <PractitionerPatientsPage /> },
    ],
  },
  {
    path: "/reception",
    Component: ReceptionLayout,
    children: [
      { index: true, element: <ReceptionistDashboard /> },
      { path: "appointments", element: <AppointmentsPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "inventory", element: <InventoryPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
