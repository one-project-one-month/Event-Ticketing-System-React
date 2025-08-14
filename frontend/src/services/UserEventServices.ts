import { apiGet } from "@/types/apiClient";
import type {
  UserEventByCodeResponse,
  UserEventResponse,
} from "@/User/DataTypes/Event";

export const getUserEvents = (page_number: number) =>
  apiGet<UserEventResponse["data"]>("api/Event/UserEvents/" + page_number);

export const getUserEventByCode = (eventcode: string) =>
  apiGet<UserEventByCodeResponse["data"]>("api/Event/UserEventDetails/" + eventcode);
