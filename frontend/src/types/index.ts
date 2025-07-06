export interface NavItem {
  title?: string;
  href?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  menu?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;

export interface QRInfo {
  name: string;
  ticketNumber: string;
  event: string;
}

