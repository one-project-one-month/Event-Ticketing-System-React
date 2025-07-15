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
        { title: "Venue Type", href: "/admin/venue/type" },
        { title: "Venue List", href: "/admin/venue/list" },
      ],
    },
    {
      title: "Event",
      children: [
        { title: "Event Type", href: "/admin/event/type" },
        { title: "Event List", href: "/admin/event/list" },
      ],
    },
    {
      title: "Business",
      children: [
        { title: "Business Owner", href: "/admin/business/owner" },
        { title: "Business Email", href: "/admin/business/email" },
      ],
    },
    {
      title: "History",
      children: [
        { title: "Purchased History", href: "/admin/history/purchased" },
        { title: "Verification History", href: "/admin/history/verification" },
      ],
    },
    {
      title: "Setting",
      href: "/admin/setting",
    },
  ],
};
