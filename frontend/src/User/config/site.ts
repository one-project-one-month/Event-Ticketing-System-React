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
  // footer: [
  //   {
  //     title: "Contact Us",
  //     items: [
  //       {
  //         title: "+95 09 123 456 678",
  //         icon: Icons.phone,
  //       },
  //       {
  //         title: "ETS@gmail.com",
  //         icon: Icons.email,
  //       },
  //       {
  //         title: "Yangon, Myanmar",
  //         icon: Icons.map,
  //         href: "https://maps.google.com",
  //         external: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Menu",
  //     items: [
  //       {
  //         title: "Home",
  //         href: "/",
  //       },
  //       {
  //         title: "Events",
  //         href: "events",
  //       },
  //       {
  //         title: "Venue",
  //         href: "venue",
  //       },
  //       {
  //         title: "Check QR",
  //         href: "checkqr",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Follow Us",
  //     items: [
  //       {
  //         icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  //         label: "Instagram",
  //         href: "https://instagram.com",
  //       },
  //       {
  //         icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  //         label: "Facebook",
  //         href: "https://facebook.com",
  //       },
  //       {
  //         icon: "https://cdn-icons-png.flaticon.com/512/3670/3670151.png",
  //         label: "X",
  //         href: "https://x.com",
  //       },
  //     ],
  //   },
  // ],
};
