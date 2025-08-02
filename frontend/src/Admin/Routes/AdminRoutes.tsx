import { createBrowserRouter } from "react-router-dom";
import { ProtectedAdminRoute } from "@/Admin/Routes/ProtectedAdminRoute";
import AdminLayout from "@/Admin/components/Layouts/AdminLayout";
import AdminLoginPage from "@/Admin/pages/Login";

// Admin pages
import AdminDashboardPage from "@/Admin/pages/Dashboard";
import AdminPage from "@/Admin/pages/Admin";
import TicketTypePage from "@/Admin/pages/TicketTypePages/TicketType";
import VenueTypePage from "@/Admin/pages/VenueType";
import VenueListPage from "@/Admin/pages/VenueList";
import EventTypePage from "@/Admin/pages/EventTypePages/EventType";
import EventListPage from "@/Admin/pages/EventListPages/EventList";
import BusinessOwnerPage from "@/Admin/pages/BusinessOwnerPages/BusinessOwner";
import BusinessEmailPage from "@/Admin/pages/BusinessEmail";
import PurchasedHistoryPage from "@/Admin/pages/PurchasedHistory";
import VerificationHistoryPage from "@/Admin/pages/VerificationHistory";
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
          { path: "ticket-type", 
            children:[
              {index: true, Component: TicketTypePage },
              {path: ":TicketTypeCode", Component: TicketTypeDetailPage },
              {path: ":ticketTypeCode/edit", Component: TicketTypeEditPage },
              {path: "create", Component: CreateTicketTypePage }
            ]
          },
          { path: "venuetype", Component: VenueTypePage },
          { path: "venuelist", Component: VenueListPage },
          { path: "event/type",
            children:[
              { index: true, Component: EventTypePage},
              {path: ":eventCategorycode", Component: EventTypeDetailPage},
              {path: ":eventCategorycode/edit", Component: EventTypeEditPage},
              {path: "create", Component: CreateEventTypePage}
            ]
           },
          { path: "event/list", 
            children: [
              {index: true, Component: EventListPage},
              { path: ":EventUniqueName", Component: EventDetailPage },
              { path: ":eventId/edit", Component: EventEditPage },
              {path:"create", Component: CreateEventPage}
            ]
          },
          { path: "business/owner",
            children:[
              { index: true, Component: BusinessOwnerPage },
              {path:":BusinessOwnerCode", Component: BusinessOwnerDetailPage },
              {path:":businessOwnerCode/edit", Component: BusinessOwnerEditPage },
              {path: "create", Component: CreateBusinessOwnerPage}
            ] 
          },
          { path: "businessemail", Component: BusinessEmailPage },
          { path: "historypurchased", Component: PurchasedHistoryPage },
          { path: "historyverification", Component: VerificationHistoryPage },
          { path: "setting", Component: SettingPage },
        ],
      },
    ],
  },
]);
