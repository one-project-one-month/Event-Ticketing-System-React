import { apiGet, apiPost } from "@/types/apiClient";
import type {
  EventTypeResponse,
  createEventTypeData,
  EventTypeByCode,
  updateEventTypeData
} from "@/Admin/DataTypes/EventTypes";

export const getEventTypes = () =>
  apiGet<EventTypeResponse["data"]>("api/EventCategory/List");

export const createEventType = (payload: createEventTypeData) =>
  apiPost<{ eventType: EventTypeResponse }>("api/EventCategory/Create", payload);

export const updateEventType = (payload: updateEventTypeData) =>
  apiPost<{ eventType: EventTypeResponse }>(`api/EventCategory/Update`, payload);

export const getEventTypeByCode = (eventCategorycode: string) =>
  apiGet<EventTypeByCode["data"]>(`api/EventCategory/Edit/${eventCategorycode}`);

export const deleteEventType = (eventCategorycode: string) =>
  apiPost<{ eventType: EventTypeResponse }>(`api/EventCategory/Delete/${eventCategorycode}`, {});
