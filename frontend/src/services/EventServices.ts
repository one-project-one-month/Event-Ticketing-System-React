import { apiGet, apiPost } from "@/types/apiClient";
import type {
  EventResponse,
  createEventData,
  EventByCode,
  updateEventData
} from "@/Admin/DataTypes/Event";


export const getEvents = () =>
  apiGet<EventResponse["data"]>("api/Event/List");

export const createEvent = (payload: createEventData) =>
  apiPost<{ events: EventResponse }>("api/Event/Create", payload);

export const updateEventType = (payload: updateEventData) =>
  apiPost<{ event: EventResponse }>(`api/Event/Update`, payload);

export const getEventByCode = (eventCode: string) =>
  apiGet<EventByCode["data"]>(`api/Event/Edit/${eventCode}`);

export const deleteEvent = (eventCode: string) =>
  apiPost<{ eventType: EventResponse }>(`api/Event/Delete/${eventCode}`, {});