

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