// region Dashboard Chart Types

export interface DashboardCount {
  totalCount: number;
  difference: number;
}

// Corresponds to the C# class TTCount
export interface TTCount {
  label: string;
  totalCount: number;
  // Adding color property for chart rendering
  color: string;
}

// Corresponds to the C# class DashboardTTCount
export interface DashboardTTCount {
  type: TTCountType;
  ttCounts: TTCount[];
}

// Corresponds to the C# class DashboardTicketSale
export interface DashboardTicketSale {
  month: string;
  totalCount: number;
}

// Corresponds to the C# class DashboardResponseModel
export interface DashboardResponseModel {
  totalEvent: DashboardCount;
  totalVenue: DashboardCount;
  totalAdmin: DashboardCount;
  totalBO: DashboardCount;
  ticketCounts: DashboardTTCount[];
  ticketSales: DashboardTicketSale[];
}

export const TTCountType = {
  Week: 0,
  Month: 1,
} as const;
export type TTCountType = (typeof TTCountType)[keyof typeof TTCountType];
// endregion
