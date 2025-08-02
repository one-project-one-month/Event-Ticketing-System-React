import { apiGet, apiPost } from "@/types/apiClient";
import type {
  EventTypeData,
  EventTypeResponse,
} from "@/Admin/DataTypes/EventTypes";

export const getEventTypes = () =>
  apiGet<EventTypeResponse["data"]>("api/EventCategory/List");

export const createEventType = (payload: EventTypeData) =>
  apiPost<{ eventType: EventTypeData }>("api/EventCategory/Create", payload);

export const updateEventType = (eventCategorycode: string, payload: EventTypeData) =>
  apiPost<{ eventType: EventTypeData }>(`api/EventCategory/Update/${eventCategorycode}`, payload);

export const getEventTypeByCode = (eventCategorycode: string) =>
  apiGet<{ eventType: EventTypeData }>(`api/EventCategory/Edit/${eventCategorycode}`);
