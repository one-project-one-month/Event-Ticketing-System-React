import { apiGet, apiPostFormWithQuery } from "@/types/apiClient";
import type {
  CreateVenueParams,
  CreateVenueRequest,
  VenueResponse,
} from "@/Admin/DataTypes/VenueDataTypes.ts";

export const getVenues = () => apiGet<VenueResponse["data"]>("api/Venue/List");

export const createVenue = (payload: CreateVenueRequest) => {
  const formData = new FormData();

  const files = payload.formData.getAll("VenueImage");

  files.forEach((file) => {
    if (file instanceof File) {
      formData.append("VenueImage", file);
    }
  });

  return apiPostFormWithQuery<null, CreateVenueParams>(
    "api/Venue/Create",
    payload.query,
    formData,
  );
};

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
