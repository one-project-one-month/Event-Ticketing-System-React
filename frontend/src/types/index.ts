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

export interface ITotalCount {
  count: number;
  label: string;
}

export interface IVenueCard {
  venueId: string;
  imagePath: string;
  buildingName: string;
  name: string;
  capacity: number;
  address: string;
}
// ADMIN Types
export type NavItemChild = {
  title: string;
  href: string;
  icon?: LucideIcon; // Make icon optional
};

export type AdminNavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  active?: boolean;
  hasDropdown?: boolean;
  children?: NavItemChild[]; // Use the new child type
};
