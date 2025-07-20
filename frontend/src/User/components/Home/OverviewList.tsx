import { Link } from "react-router-dom";
import EventCard from "@/User/components/Events/EventCard";

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
  console.log(fetchLink, type);
  return (
    <section className="mx-12 mb-5 p-14 pt-5 pb-0">
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
        {Array.from({ length: 3 }).map((_, index) => (
          <EventCard key={index} title="Sample Title" location="Yangon" />
        ))}
      </div>
    </section>
  );
}
