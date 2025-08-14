import {type ApiResponse } from "@/types/ApiResponse";
export interface EventTypeData {
    eventCategoryid: string;
    eventCategorycode: string;
    categoryname: string;
    createdby: string;
    createdat: Date;
}

export type EventTypeResponse = ApiResponse<{
  eventCategories: EventTypeData[];
}>;

export type EventTypeByCode = ApiResponse<{
  event: EventTypeData;
}>;

export interface createEventTypeData {
    categoryName: string;
}

export interface updateEventTypeData {
  eventCategoryCode: string;
  categoryName: string;
}