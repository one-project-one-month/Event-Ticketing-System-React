import { apiGet, apiPost } from "@/types/apiClient";
import Api from "@/types/Api";
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
  formData.append("AdminCode", payload.AdminCode);
  formData.append("FullName", payload.FullName);
  formData.append("Phone", payload.Phone);
  if (payload.ProfileImage) {
    formData.append("ProfileImage", payload.ProfileImage);
  }

  return Api.post<AdminResponse>("/api/Admin/EditProfileImage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
};
