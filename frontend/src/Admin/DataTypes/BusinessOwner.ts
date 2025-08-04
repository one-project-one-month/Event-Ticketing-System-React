import {type ApiResponse } from "@/types/ApiResponse";
export interface BusinessOwnerData {
    businessownerid: string;
    businessownercode: string;
    fullName: string;
    email: string;
    phone: string;
    createdby: string;
    createdat: string;
    modifiedby: string;
    modifiedat: string;
    deleteflag: boolean;
}

export type BusinessOwnerResponse = ApiResponse<{
  businessOwners: BusinessOwnerData[];
}>;

export type BusinessOwnerByCode = ApiResponse<{
  businessOwner: BusinessOwnerData;
}>;

export interface createBusinessOwnerData {
    fullName: string;
    email: string;
    phone: string;
}

export interface updateBusinessOwnerData {
    businessownerid: string;
    businessownercode: string;
    fullName: string;
    phone: string;
    email: string;
}