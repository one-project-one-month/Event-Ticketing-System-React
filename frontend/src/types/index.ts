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
  Location: string;
  Address: string;
}

export interface ITotalCount {
  count: number;
  label: string;
}

