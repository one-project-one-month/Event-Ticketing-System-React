import { useState } from "react";
import EventCard from "./EventCard";
import type { UserEventData } from "@/User/DataTypes/Event";

export type Event = {
  title: string;
  location: string;
};

const EventPostList = ({
  events,
  eventPerPage,
}: {
  events: UserEventData[];
  eventPerPage: number;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-7">
        {events.map((e) => (
          <EventCard
            title={e.eventname}
            location={e.address}
            eventcode={e.eventcode}
            imageUrl={e.venueimage[0]}
          />
        ))}
      </div>
    </>
  );
};

export default EventPostList;
