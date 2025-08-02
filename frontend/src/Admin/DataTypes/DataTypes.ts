export interface EventListData {
  EventCode: string;
  EventCatecoryCode: string;
  EventName: string;
  EventUniqueName: string;
  BusinessOwnerName: string;
  VenueName: string;
  VenueType: string;
  Capacity: number;
  Description: string;
  Facility: string;
  Addons: string[];
  VenueImage: string[];
  Address: string;
  StartDate: Date;
  EndDate: Date;
  TotalTicketQty: number;
  TicketSold: number;
  EventStatus: string;
  IsActive: boolean;
}

export interface EventTypeData {
  EventTypeCode: string;
  EventTypeName: string;
  CreatedDate: Date;
}

export interface TicketTypeData {
  TicketTypeCode: string;
  TicketTypeName: string;
  TicketPrice: number;
  TicketQuantity: number;
  EventName: string;
}

export interface BusinessOwnerData {
  BusinessOwnerCode: string;
  BusinessOwnerName: string;
  Email: string;
  PhoneNumber: string;
}

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