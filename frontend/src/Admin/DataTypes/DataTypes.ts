import type { VenueTypeData } from "@/Admin/DataTypes/VenueType.ts";

export interface IVenueTypeUI extends VenueTypeData {
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