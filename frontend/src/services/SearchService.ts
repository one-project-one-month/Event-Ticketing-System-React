import { apiGet} from "@/types/apiClient";
import type {
    SearchDataResponse} from "@/User/DataTypes/Search";

export const searchEventsAndVenues = (searchTerm: string) =>
  apiGet<SearchDataResponse["data"]>(
    `api/SearchEventsAndVenues?searchTerm=${encodeURIComponent(searchTerm)}`
  );

export const searchEventsByDate = (StartDate: string, EndDate: string) =>
  apiGet<SearchDataResponse["data"]>(
    `api/SearchEventsAndVenues/BetweenDate?StartDate=${encodeURIComponent(StartDate)}&EndDate=${encodeURIComponent(EndDate)}`
  );

export const searchEventsByAmount = (fromAmount: number, toAmount: number) =>
  apiGet<SearchDataResponse["data"]>(
    `api/SearchEventsAndVenues/BetweenAmount?FromAmount=${fromAmount}&ToAmount=${toAmount}`
  );