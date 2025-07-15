// src/Admin/Routes/adminRoutes.tsx
import { createBrowserRouter } from "react-router-dom";
import { ProtectedAdminRoute } from "@/Admin/Routes/ProtectedAdminRoute";
import AdminLayout from "@/Admin/components/Layouts/AdminLayout";
import AdminLoginPage from "@/Admin/pages/Login";

// Admin pages
import AdminDashboardPage from "@/Admin/pages/Dashboard";
import AdminPage from "@/Admin/pages/Admin";
import TicketTypePage from "@/Admin/pages/TicketType";
import VenueTypePage from "@/Admin/pages/VenueType";
import VenueListPage from "@/Admin/pages/VenueList";
import EventTypePage from "@/Admin/pages/EventType";
import EventListPage from "@/Admin/pages/EventList";
import BusinessOwnerPage from "@/Admin/pages/BusinessOwner";
import BusinessEmailPage from "@/Admin/pages/BusinessEmail";
import PurchasedHistoryPage from "@/Admin/pages/PurchasedHistory";
import VerificationHistoryPage from "@/Admin/pages/VerificationHistory";
import SettingPage from "@/Admin/pages/Setting";

export const adminRouter = createBrowserRouter([
  {
    path: "/admin/login",
    Component: AdminLoginPage,
  },
  {
    path: "/admin",
    Component: ProtectedAdminRoute,
    children: [
      {
        path: "",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboardPage },
          { path: "dashboard", Component: AdminDashboardPage },
          { path: "admin", Component: AdminPage },
          { path: "ticket-type", Component: TicketTypePage },
          { path: "venue/type", Component: VenueTypePage },
          { path: "venue/list", Component: VenueListPage },
          { path: "event/type", Component: EventTypePage },
          { path: "event/list", Component: EventListPage },
          { path: "business/owner", Component: BusinessOwnerPage },
          { path: "business/email", Component: BusinessEmailPage },
          { path: "history/purchased", Component: PurchasedHistoryPage },
          { path: "history/verification", Component: VerificationHistoryPage },
          { path: "setting", Component: SettingPage },
        ],
      },
    ],
  },
]);
