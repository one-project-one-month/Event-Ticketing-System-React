import { Link } from "react-router-dom";
import EventCard from "@/User/components/Events/EventCard";
import VenueCard from "../Venues/VenueCard";

interface IOverviewList {
  title: string;
  viewLink: string;
  fetchLink: string;
  type: "E" | "V";
}

export default function OverviewList({
  title,
  viewLink,
  fetchLink,
  type,
}: IOverviewList) {
  // TODO: Implment data fetching
  console.log(fetchLink);
  return (
    <section className="mx-12 mb-14 p-14 pt-5 pb-0">
      {/* Title and View all */}
      <div className="mt-16 mb-8 flex flex-row items-center justify-between">
        <h3 className="text-4xl font-bold">{title}</h3>
        <Link
          to={viewLink}
          className="rounded-lg border border-black p-2 px-3 transition-colors hover:bg-black hover:text-white"
        >
          View All
        </Link>
      </div>
      {/* Event List */}
      <div className="flex flex-row items-center justify-between gap-6">
        {type === "E"
          ? Array.from({ length: 3 }).map((_, index) => (
              <EventCard key={index} title="Sample Title" location="Yangon" />
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <VenueCard
                key={index}
                venueId={`${_}`}
                imagePath={
                  "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg"
                }
                buildingName="Sample Building"
                name="Sample Name"
                capacity={300}
                address="An Address.................."
              />
            ))}
      </div>
    </section>
  );
}
