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