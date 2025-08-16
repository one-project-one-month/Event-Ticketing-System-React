import type { ApiResponse } from "@/types/ApiResponse";

export interface AdminData {
  adminCode: string;
  username?: string;
  fullName: string;
  email: string;
  phoneNo: string;
  profileImageUrl?: string;
}

export interface AdminDataList {
  adminCode: string;
  fullName: string;
  email: string;
  phoneNo: string;
}

export type AdminListResponse = ApiResponse<{
  adminList: AdminDataList[];
}>;

export interface AdminDataByCodeData {
  adminCode: string;
  username: string;
  fullName: string;
  email: string;
  phoneNo: string;
  profileImage: string;
}

export type AdminDataByCodeResponse = ApiResponse<{
  admin: AdminDataByCodeData;
}>;

export interface UpdateAdminRequest {
  adminCode: string;
  phoneNo: string;
  fullName: string;
}

export interface UploadProfileImageRequest {
  AdminCode: string;
  FullName: string;
  Phone: string;
  ProfileImage: File | null;
}

export type AdminResponse = ApiResponse<{
  admin: AdminData;
}>;

export type createAdminData = {
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  fullName: string;
};
