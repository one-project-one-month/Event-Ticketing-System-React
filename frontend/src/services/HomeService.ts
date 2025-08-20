import { apiGet} from "@/types/apiClient";
import type {HomeResponseData} from "@/User/DataTypes/Home";

export const getHome = () =>
  apiGet<HomeResponseData["data"]>("api/Home");
