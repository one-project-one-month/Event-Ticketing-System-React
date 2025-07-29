export interface EventViewData{
    EventCode:string,
    EventCatecoryCode:string,
    EventName:string,
    UniqueName:string,
    BusinessOwnerName:string,
    VenueName:string,
    VenueType:string,
    Capacity:number,
    Description:string,
    Facility:string,
    Addons:[string],
    VenueImage:[string],
    Address:string,
    StartDate:Date,
    EndDate:Date,
    TotalTicketQty:number,
    TicketSold:number,
    EventStatus:string,
    IsActive:boolean,
}

export interface EventListData{
    EventName: string;
    EventUniqueName: string;
    BussinessOwnerName: string;
    IsActive: boolean;
}