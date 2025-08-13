import { Link } from "react-router-dom";
import EventCard from "@/User/components/Events/EventCard";
import VenueCard from "../Venues/VenueCard";
import type {HomeResponseData} from "@/User/DataTypes/Home";

interface IOverviewList {
  title: string;
  viewLink: string;
  fetchLink: string;
  type: "E" | "V";
  response : HomeResponseData["data"];
}

export default function OverviewList({
  title,
  viewLink,
  fetchLink,
  type,
  response
}: IOverviewList) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const events = response?.topThreeEvents.events ?? [];
  const venues = response?.topThreeVenues.venues ?? [];

  return (
    <section className="mx-12 mb-14 p-14 pt-5 pb-0">
      {/* Title + View all */}
      <div className="mt-16 mb-8 flex flex-row items-center justify-between">
        <h3 className="text-4xl font-bold">{title}</h3>
        <Link
          to={viewLink}
          className="rounded-lg border border-black p-2 px-3 transition-colors hover:bg-black hover:text-white"
        >
          View All
        </Link>
      </div>

      {/* Cards */}
      <div className="flex flex-row items-center justify-between gap-6">
        {type === "E"
          ? events.slice(0, 3).map((event) => (
              <EventCard
                key={event.eventcode}
                imageUrl={`${baseURL}/${event.venueimage}`}
                title={event.eventname}
                location={event.address}
              />
            ))
          : venues.slice(0, 3).map((venue) => (
              <VenueCard
                key={venue.venuecode}
                venueId={venue.venueid}
                imagePath={`${baseURL}/${venue.venueimage}`}
                buildingName={venue.venuename}
                name={venue.venuetypename}
                capacity={venue.capacity}
                address={venue.address}
              />
            ))}
      </div>
    </section>
  );
}
