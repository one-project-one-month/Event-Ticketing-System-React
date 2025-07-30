export const adminSiteConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Admin",
      href: "/admin/admin",
    },
    {
      title: "Ticket Type",
      href: "/admin/ticket-type",
    },
    {
      title: "Venue",
      children: [
        { title: "Venue Type", href: "/admin/venuetype" },
        { title: "Venue List", href: "/admin/venuelist" },
      ],
    },
    {
      title: "Event",
      children: [
        { title: "Event Type", href: "/admin/eventtype" },
        { title: "Event List", href: "/admin/eventlist" },
      ],
    },
    {
      title: "Business",
      children: [
        { title: "Business Owner", href: "/admin/businessowner" },
        { title: "Business Email", href: "/admin/businessemail" },
      ],
    },
    {
      title: "History",
      children: [
        { title: "Purchased History", href: "/admin/historypurchased" },
        { title: "Verification History", href: "/admin/historyverification" },
      ],
    },
    {
      title: "Setting",
      href: "/admin/setting",
    },
  ],
};
