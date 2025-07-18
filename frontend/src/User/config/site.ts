import { Icons } from "../components/Icons";

export const siteConfig = {
  name: "Event Ticketing System",

  mainNav: {
    menu: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Events",
        href: "events",
      },
      {
        title: "Venue",
        href: "venue",
      },
      {
        title: "Check QR",
        href: "checkqr",
      },
      {
        icon: Icons.search,
        isSearch: true,
        action: () => {
          console.log("Search clicked");
        },
      },
    ],
  },
};
