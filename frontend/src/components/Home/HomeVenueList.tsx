import { Link } from "react-router-dom";

export default function HomeVenueList() {
  return (
    <section className="mx-12 bg-orange-200 p-14">
      {/* Title and View all */}
      <div className="mb-8 flex flex-row items-center justify-between">
        <h3 className="w-[25rem] bg-slate-400 py-6 pl-4 text-left text-lg">
          Venue List
        </h3>
        <Link to={"/events"} className="border border-black p-3">
          View All
        </Link>
      </div>
      {/* Event List */}
      <div className="flex flex-row items-center justify-between">
        {Array.from({ length: 3 }).map((_, index) => (
          <DummyEvent key={index} />
        ))}
      </div>
    </section>
  );
}

function DummyEvent() {
  return <div className="h-96 w-80 bg-slate-500"></div>;
}
