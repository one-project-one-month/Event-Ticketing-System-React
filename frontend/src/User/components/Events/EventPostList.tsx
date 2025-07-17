import EventCard from "./EventCard";

const EventPostList = () => {
  const events = [
    {
      title: "EDM Festival",
      location: "Yangon convention center",
    },
    {
      title: "LIve concert night",
      location: "Sedona hotel Yangon",
    },
    {
      title: "Pool Party",
      location: "Pan Pacific Hotel Yangon",
    },
    {
      title: "Rock Night Festival",
      location: "Yangon Park",
    },
    {
      title: "EDM Beach Party",
      location: "Ngapali",
    },
    {
      title: "Indie Live Sessions",
      location: "Pan Pacific Hotel Yangon",
    },
    {
      title: "Halloween Costume Bash",
      location: "Yangon convention center",
    },
    {
      title: "Local Drama Performance",
      location: "Sedona hotel Yangon",
    },
    {
      title: "Jazz & Blues Evening",
      location: "Pan Pacific Hotel Yangon",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
      {events.map((e) => (
        <EventCard title={e.title} location={e.location} />
      ))}
    </div>
  );
};

export default EventPostList;
