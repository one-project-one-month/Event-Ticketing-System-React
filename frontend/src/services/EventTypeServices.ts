import { apiGet, apiPost } from "@/types/apiClient";
import type {
  EventTypeData,
  EventTypeResponse,
  createEventTypeData,
} from "@/Admin/DataTypes/EventTypes";

export const getEventTypes = () =>
  apiGet<EventTypeResponse["data"]>("api/EventCategory/List");

export const createEventType = (payload: createEventTypeData) =>
  apiPost<{ eventType: EventTypeResponse }>("api/EventCategory/Create", payload);

export const updateEventType = (eventCategorycode: string, payload: EventTypeData) =>
  apiPost<{ eventType: EventTypeResponse }>(`api/EventCategory/Update/${eventCategorycode}`, payload);

export const getEventTypeByCode = (eventCategorycode: string) =>
  apiGet<{ eventType: EventTypeData }>(`api/EventCategory/Edit/${eventCategorycode}`);
