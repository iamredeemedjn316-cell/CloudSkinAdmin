import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout, PractitionerLayout, ReceptionLayout } from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppointmentsPage from "./pages/admin/AppointmentsPage";
import ViewAllAppointmentsPage from "./pages/admin/ViewAllAppointmentsPage";
import ConfirmedAppointmentsPage from "./pages/admin/ConfirmedAppointmentsPage";
import InProgressAppointmentsPage from "./pages/admin/InProgressAppointmentsPage";
import PendingAppointmentsPage from "./pages/admin/PendingAppointmentsPage";
import CancelledAppointmentsPage from "./pages/admin/CancelledAppointmentsPage";
import PatientsPage from "./pages/admin/PatientsPage";
import ViewAllPatientsPage from "./pages/admin/ViewAllPatientsPage";
import PatientProfilePage from "./pages/admin/PatientProfilePage";
import PatientsArchivePage from "./pages/admin/PatientsArchivePage";
import StaffPage from "./pages/admin/StaffPage";
import ViewAllStaffPage from "./pages/admin/ViewAllStaffPage";
import StaffArchivePage from "./pages/admin/StaffArchivePage";
import ServicesPage from "./pages/admin/ServicesPage";
import ViewAllServicesPage from "./pages/admin/ViewAllServicesPage";
import ServicesArchivePage from "./pages/admin/ServicesArchivePage";
import PackagesPage from "./pages/admin/PackagesPage";
import ViewAllPackagesPage from "./pages/admin/ViewAllPackagesPage";
import AddPackagePage from "./pages/admin/AddPackagePage";
import PackageDetailsPage from "./pages/admin/PackageDetailsPage";
import PackagesArchivePage from "./pages/admin/PackagesArchivePage";
import InventoryPage from "./pages/admin/InventoryPage";
import LowStockPage from "./pages/admin/inventory/LowStockPage";
import VouchersPage from "./pages/admin/VouchersPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import BlogPage from "./pages/admin/BlogPage";
import MessagesPage from "./pages/admin/MessagesPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
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
      { path: "appointments/all", element: <ViewAllAppointmentsPage /> },
      { path: "appointments/confirmed", element: <ConfirmedAppointmentsPage /> },
      { path: "appointments/in-progress", element: <InProgressAppointmentsPage /> },
      { path: "appointments/pending", element: <PendingAppointmentsPage /> },
      { path: "appointments/cancelled", element: <CancelledAppointmentsPage /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "patients/all", element: <ViewAllPatientsPage /> },
      { path: "patients/:patientId", element: <PatientProfilePage /> },
      { path: "patients-archive", element: <PatientsArchivePage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "staff/all", element: <ViewAllStaffPage /> },
      { path: "staff-archive", element: <StaffArchivePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/all", element: <ViewAllServicesPage /> },
      { path: "services-archive", element: <ServicesArchivePage /> },
      { path: "packages", element: <PackagesPage /> },
      { path: "packages/all", element: <ViewAllPackagesPage /> },
      { path: "packages/add", element: <AddPackagePage /> },
      { path: "packages/:packageId", element: <PackageDetailsPage /> },
      { path: "packages-archive", element: <PackagesArchivePage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "inventory/low-stock", element: <LowStockPage /> },
      { path: "inventory/full-stock", element: <InventoryPage /> },
      { path: "inventory/ok-stock", element: <InventoryPage /> },
      { path: "inventory/very-low-stock", element: <LowStockPage /> },
      { path: "inventory/no-stock", element: <InventoryPage /> },
      { path: "inventory/suppliers", element: <InventoryPage /> },
      { path: "inventory/purchase-orders", element: <InventoryPage /> },
      { path: "inventory/audit-logs", element: <InventoryPage /> },
      { path: "vouchers", element: <VouchersPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "reviews", element: <ReviewsPage /> },
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
