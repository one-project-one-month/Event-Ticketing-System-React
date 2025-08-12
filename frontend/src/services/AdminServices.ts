import { apiGet, apiPost } from "@/types/apiClient";
import type {
  UpdateAdminRequest,
  AdminResponse,
  UploadProfileImageRequest,
} from "@/Admin/DataTypes/Admin";

export const getAdminData = (adminCode: string) =>
  apiGet<AdminResponse["data"]>(`api/Admin/Edit/${adminCode}`);

export const updateAdminData = (payload: UpdateAdminRequest) =>
  apiPost<AdminResponse>(`/api/Admin/Update`, payload);

export const updateAdminProfileImage = (payload: UploadProfileImageRequest) => {
  const formData = new FormData();
  formData.append("adminCode", payload.AdminCode);
  formData.append("fullName", payload.FullName);
  formData.append("phoneNo", payload.Phone);
  formData.append("profileImage", payload.ProfileImage as File);

  return apiPost<AdminResponse>("/api/Admin/EditProfileImage", formData).then(
    (res) => res.data,
  );
};
