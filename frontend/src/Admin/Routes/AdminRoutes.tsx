import { createBrowserRouter } from "react-router-dom";
import { ProtectedAdminRoute } from "@/Admin/Routes/ProtectedAdminRoute";
import AdminLayout from "@/Admin/components/Layouts/AdminLayout";
import AdminLoginPage from "@/Admin/pages/Auth/Login";

// Admin pages
import AdminDashboardPage from "@/Admin/pages/Dashboard";
import AdminPage from "@/Admin/pages/Admin";
import TicketTypePage from "@/Admin/pages/TicketTypePages/TicketType";
import VenueTypePage from "@/Admin/pages/VenueType";
import VenueListPage from "@/Admin/pages/VenueList";
import EventTypePage from "@/Admin/pages/EventTypePages/EventType";
import EventListPage from "@/Admin/pages/EventListPages/EventList";
import BusinessOwnerPage from "@/Admin/pages/BusinessOwnerPages/BusinessOwner";
import { BusinessEmail as BusinessEmailPage } from "@/Admin/pages/BusinessEmail";
import PurchasedHistoryPage from "@/Admin/pages/PurchasedHistory";
import { VerificationHistory as VerificationHistoryPage } from "@/Admin/pages/VerificationHistory";
import SettingPage from "@/Admin/pages/Setting";
import EventDetailPage from "../pages/EventListPages/EventDetail";
import EventEditPage from "../pages/EventListPages/EventEdit";
import CreateEventPage from "../pages/EventListPages/CreateEvent";
import EventTypeDetailPage from "../pages/EventTypePages/EventTypeDetail";
import EventTypeEditPage from "../pages/EventTypePages/EventTypeEdit";
import CreateEventTypePage from "../pages/EventTypePages/CreateEventType";
import TicketTypeDetailPage from "../pages/TicketTypePages/TicketTypeDetail";
import TicketTypeEditPage from "../pages/TicketTypePages/TicketTypeEdit";
import CreateTicketTypePage from "../pages/TicketTypePages/CreateTicketType";
import BusinessOwnerDetailPage from "../pages/BusinessOwnerPages/BusinessOwnerDetail";
import BusinessOwnerEditPage from "../pages/BusinessOwnerPages/BusinessOwnerEdit";
import CreateBusinessOwnerPage from "../pages/BusinessOwnerPages/CreateBusinessOwner";
import ForgotPasswordPage from "@/Admin/pages/Auth/ForgotPassword";
import ResetPasswordPage from "@/Admin/pages/Auth/ResetPassword";
import ResetSuccess from "../pages/Auth/ResetSuccess";
import CreateVenueTypePage from "@/Admin/pages/VenueTypePages/CreateVenueType.tsx";
import ViewVenueTypePage from "@/Admin/pages/VenueTypePages/ViewVenueType.tsx";
import EditVenueTypePage from "@/Admin/pages/VenueTypePages/EditVenueType.tsx";
import CreateVenuePage from "@/Admin/pages/VenuePages/CreateVenuePage.tsx";
import ViewVenuePage from "@/Admin/pages/VenuePages/ViewVenuePage";
import EditVenuePage from "@/Admin/pages/VenuePages/EditVenuePage.tsx";
import BusinessEmailDetail from "@/Admin/components/pages/businessemail/BusinessEmailDetail.tsx";
import VerificationCodeDetail from "@/Admin/components/pages/verificationcode/VerificationCodeDetail.tsx";
import PurchasedHistoryDetailPage from "@/Admin/pages/PurchasedHistoryPages/PurchasedHistoryDetailPage.tsx";

export const adminRouter = createBrowserRouter([
  {
    path: "/admin/login",
    Component: AdminLoginPage,
  },
  {
    path: "/admin/forgot-password",
    Component: ForgotPasswordPage,
  },
  { path: "/admin/reset-password", Component: ResetPasswordPage },
  { path: "/admin/reset-success", Component: ResetSuccess },
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
          {
            path: "ticket-type",
            children: [
              { index: true, Component: TicketTypePage },
              { path: ":code", Component: TicketTypeDetailPage },
              { path: ":code/edit", Component: TicketTypeEditPage },
              { path: "create", Component: CreateTicketTypePage },
            ],
          },
          {
            path: "venue-type",
            children: [
              { index: true, Component: VenueTypePage },
              { path: "create", Component: CreateVenueTypePage },
              { path: ":venueTypeCode", Component: ViewVenueTypePage },
              { path: ":venueTypeCode/edit", Component: EditVenueTypePage },
            ],
          },
          {
            path: "venue",
            children: [
              { index: true, Component: VenueListPage },
              { path: "create", Component: CreateVenuePage },
              { path: ":venueCode", Component: ViewVenuePage },
              { path: ":venueCode/edit", Component: EditVenuePage },
            ],
          },
          {
            path: "event/type",
            children: [
              { index: true, Component: EventTypePage },
              { path: ":eventCategorycode", Component: EventTypeDetailPage },
              { path: ":eventCategorycode/edit", Component: EventTypeEditPage },
              { path: "create", Component: CreateEventTypePage },
            ],
          },
          {
            path: "event/list",
            children: [
              { index: true, Component: EventListPage },
              { path: ":eventCode", Component: EventDetailPage },
              { path: ":eventCode/edit", Component: EventEditPage },
              { path: "create", Component: CreateEventPage },
            ],
          },
          {
            path: "business/owner",
            children: [
              { index: true, Component: BusinessOwnerPage },
              { path: ":ownerCode", Component: BusinessOwnerDetailPage },
              { path: ":ownerCode/edit", Component: BusinessOwnerEditPage },
              { path: "create", Component: CreateBusinessOwnerPage },
            ],
          },
          {
            path: "business/email",
            children: [
              { index: true, Component: BusinessEmailPage },
              { path: ":bEmailCode", Component: BusinessEmailDetail },
            ],
          },
          {
            path: "history/purchased",
            children: [
              { index: true, Component: PurchasedHistoryPage },
              {
                path: ":transactionCode",
                Component: PurchasedHistoryDetailPage,
              },
            ],
          },
          {
            path: "history/verification",
            children: [
              { index: true, Component: VerificationHistoryPage },
              { path: ":verificationCode", Component: VerificationCodeDetail },
            ],
          },
          { path: "setting", Component: SettingPage },
        ],
      },
    ],
  },
]);
