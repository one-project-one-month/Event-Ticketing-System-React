import type { AdminNavItem } from "@/types";
import {
  BarChart3,
  Calendar,
  Grid3X3,
  History,
  MapPin,
  Ticket,
  Users,
  LocateIcon,
  List,
  LayoutList,
  FunnelPlus,
  MailSearch,
  UserRoundCheck,
  BadgeCheck,
  TicketCheck,
} from "lucide-react";

export const adminSiteConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: BarChart3,
      active: true,
    },
    {
      title: "Admin",
      href: "/admin/admin",
      icon: Users,
    },
    {
      title: "Ticket Type",
      href: "/admin/ticket-type",
      icon: Ticket,
    },
    {
      title: "Venue",
      icon: MapPin,
      hasDropdown: true,
      children: [
        { title: "Venue Type", href: "/admin/venue-type", icon: LocateIcon },
        { title: "Venue List", href: "/admin/venue", icon: List },
      ],
    },
    {
      title: "Event",
      icon: Calendar,
      hasDropdown: true,
      children: [
        { title: "Event Type", href: "/admin/event/type", icon: FunnelPlus },
        { title: "Event List", href: "/admin/event/list", icon: LayoutList },
      ],
    },
    {
      title: "Business",
      icon: Grid3X3,
      hasDropdown: true,
      children: [
        {
          title: "Business Owner",
          href: "/admin/business/owner",
          icon: MailSearch,
        },
        {
          title: "Business Email",
          href: "/admin/business/email",
          icon: UserRoundCheck,
        },
      ],
    },
    {
      title: "History",
      icon: History,
      hasDropdown: true,
      children: [
        {
          title: "Purchased History",
          href: "/admin/history/purchased",
          icon: TicketCheck,
        },
        {
          title: "Verification History",
          href: "/admin/history/verification",
          icon: BadgeCheck,
        },
      ],
    },
  ] as AdminNavItem[], // Type insertion
};
