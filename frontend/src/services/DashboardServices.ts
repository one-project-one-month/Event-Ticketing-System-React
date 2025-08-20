import { apiGet } from "@/types/apiClient.ts";
import type { DashboardResponseModel } from "@/Admin/DataTypes/Dashboard.ts";

export const getDashboardData = () =>
  apiGet<DashboardResponseModel>("api/Dashboard/");
