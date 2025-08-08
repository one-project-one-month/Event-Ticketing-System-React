import { apiGet } from "@/types/apiClient";
import type { VenueResponse } from "@/Admin/DataTypes/VenueDataTypes.ts";

export const getVenues = () => apiGet<VenueResponse["data"]>("api/Venue/List");

// export const createTicketType = (payload: createTicketTypeData) =>
//   apiPost<{ TicketType: TicketTypeResponse }>("api/TicketType/Create", payload);
//
// export const updateTicketType = (payload: updateTicketTypeData) =>
//   apiPost<{ TicketType: TicketTypeResponse }>(`api/TicketType/Update`, payload);
//
// export const getTicketTypeByCode = (code: string) =>
//   apiGet<TicketTypeByCode["data"]>(`api/TicketType/Edit/${code}`);
//
// export const deleteTicketType = (code: string) =>
//   apiPost<{ TicketType: TicketTypeResponse }>(
//     `api/TicketType/Delete/${code}`,
//     {},
//   );
