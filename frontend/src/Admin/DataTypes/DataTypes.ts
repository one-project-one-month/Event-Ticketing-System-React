export interface EventListData{
    EventCode:string,
    EventCatecoryCode:string,
    EventName:string,
    EventUniqueName:string,
    BusinessOwnerName:string,
    VenueName:string,
    VenueType:string,
    Capacity:number,
    Description:string,
    Facility:string,
    Addons:string[],
    VenueImage:string[],
    Address:string,
    StartDate:Date,
    EndDate:Date,
    TotalTicketQty:number,
    TicketSold:number,
    EventStatus:string,
    IsActive:boolean
}

export interface EventTypeData {
    EventTypeCode: string;
    EventTypeName: string;
    CreatedDate: Date;
}

export interface TicketTypeData {
    TicketTypeCode: string;
    TicketTypeName: string;
    TicketPrice: number;
    TicketQuantity: number;
    EventName: string;
}

export interface BusinessOwnerData {
    BusinessOwnerCode: string;
    BusinessOwnerName: string;
    Email: string;
    PhoneNumber: string;
}