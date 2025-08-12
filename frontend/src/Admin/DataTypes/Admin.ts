import type { ApiResponse } from "@/types/ApiResponse";

export interface AdminData {
  adminCode: string;
  username?: string;
  fullName: string;
  email: string;
  phoneNo: string;
  profileImageUrl?: string;
}

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
