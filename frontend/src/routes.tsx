import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import HomePage from "./pages/Home";
import EventPage from "./pages/Events/Event";
import VenuePage from "./pages/Venues/Venue";
import EventRootLayout from "./pages/Events/EventRootLayout";
import VenueRootLayout from "./pages/Venues/VenueRootLayout";
import CheckQRPage from "./pages/CheckQR";
import EventInfoPage from "./pages/Events/EventInfo";
import TicketDetailPage from "./pages/Events/TicketDetail";
import VenueDetailsPage from "./pages/Venues/VenueDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "events",
        Component: EventRootLayout,
        children: [
          { index: true, Component: EventPage },
          { path: "eventinfo", Component: EventInfoPage },
          { path: "ticketdetails", Component: TicketDetailPage },
        ],
      },
      {
        path: "venue",
        Component: VenueRootLayout,
        children: [
          { index: true, Component: VenuePage },
          { path: "venuedetails", Component: VenueDetailsPage },
        ],
      },
      { path: "checkqr", Component: CheckQRPage },
    ],
  },
]);
