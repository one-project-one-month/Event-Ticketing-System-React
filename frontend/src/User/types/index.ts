import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title?: string;
  href?: string;
  icon?: LucideIcon; // Type-safe icon prop
  disabled?: boolean;
  isSearch?: boolean;
  action?: () => void;
};

export interface NavItemWithChildren extends NavItem {
  menu?: NavItemWithChildren[];
  footer?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;

export interface QRInfo {
  QrString: string;
  EventName: string;
  EventCode: string;
  Eventdate: string;
  EventTimeFrom: string;
  EventTimeTo: string;
  GateOpenTime: string;
  TicketCode: string;
  TicketPrice: string;
  TicketType: string;
  FullName: string;
  Email: string;
  VenueName: string;
  Address: string;
}

export interface ITotalCount {
  count: number;
  label: string;
}
<<<<<<< HEAD

export interface IVenueCard {
  venueId: string;
  imagePath: string;
  buildingName: string;
  name: string;
  capacity: number;
  address: string;
}
=======
>>>>>>> Aye-Chan-Soe
