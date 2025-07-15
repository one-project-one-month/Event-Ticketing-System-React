const links = {
  x: "https://twitter.com/sample",
  discord: "https://discord.com/users/sample",
  facebook: "https://facebook.com/users/sample",
};

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
    ],
  },

  footerNav: [
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms&Privacy",
          href: "/terms",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "X",
          href: links.x,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
      ],
    },
    {
      title: "Partner",
      items: [
        {
          title: "Shoppy",
          href: "https://shoppy.com",
          external: true,
        },
        {
          title: "Poppy",
          href: "https://poppy.com",
          external: true,
        },
      ],
    },
  ],
};
