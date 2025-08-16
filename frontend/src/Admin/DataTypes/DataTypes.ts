// region Dashboard Chart Types
export interface DashboardCount {
  TotalCount: number;
  Difference: number;
}

// Corresponds to the C# class TTCount
export interface TTCount {
  Label: string;
  TotalCount: number;
  // Adding color property for chart rendering
  color: string;
}

// Corresponds to the C# class DashboardTTCount
export interface DashboardTTCount {
  Type: TTCountType;
  TTCounts: TTCount[];
}

// Corresponds to the C# class DashboardTicketSale
export interface DashboardTicketSale {
  Month: string;
  TotalCount: number;
}

// Corresponds to the C# class DashboardResponseModel
export interface DashboardResponseModel {
  TotalEvent: DashboardCount;
  TotalVenue: DashboardCount;
  TotalAdmin: DashboardCount;
  TotalBO: DashboardCount;
  TicketCounts: DashboardTTCount[];
  TicketSales: DashboardTicketSale[];
}

export const TTCountType = {
  Week: "Week",
  Month: "Month",
} as const;

export type TTCountType = (typeof TTCountType)[keyof typeof TTCountType];
// endregion

// region Ticket Types
export interface IVenueType {
  VenueTypeCode: string;
  VenueTypename: string;
  CreatedAt: string;
}

export interface IVenueTypeUI extends IVenueType {
  index: number;
}

// endregion

export interface IAdminInputProps {
  label: string;
  value: string | number;
  name: string;
  onChange: (value: string) => void;
  required?: boolean;
  type: string;
  placeholder: string;
  readonly?: boolean;
  disabled?: boolean;
}

// region Venue Model
export interface IVenueOverViewModel {
  VenueCode: string;
  VenueTypeCode: string;
  VenueName: string;
  Capacity?: number;
}

export interface IVenueDetailModel {
  VenueCode: string;
  VenueTypeCode: string;
  VenueName: string;
  Capacity?: number;
  Address?: string;
  Description?: string;
  Addons?: string[];
  Facilities?: string;
  VenueImage: string[];
}

// endregion