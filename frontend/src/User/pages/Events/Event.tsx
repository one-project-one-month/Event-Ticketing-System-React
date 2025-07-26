import { NavLink, useSearchParams } from "react-router-dom";
import EventPostList from "@/User/components/Events/EventPostList";

const Event = () => {
  const [searchParam] = useSearchParams();
  const selectCategory = searchParam.get("cat");
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
    <div className="px-5">
      <div className="py-8">
        <div className="my-8 ms-2 w-[80%]">
          <li className="flex list-none gap-3">
            <ul>
              <NavLink
                to={"/events?cat=all"}
                className={`border-black p-2 text-3xl font-semibold dark:border-white ${selectCategory == "all" || !selectCategory ? "border-b-2 text-black" : "text-gray-300"}`}
              >
                All
              </NavLink>
            </ul>
            <ul>
              <NavLink
                to={"/events?cat=trend"}
                className={`border-black p-2 text-3xl font-semibold dark:border-white ${selectCategory == "trend" ? "border-b-2 text-black" : "text-gray-300"}`}
              >
                Trending Events
              </NavLink>
            </ul>
          </li>
        </div>
        <div className="lg:px-10">
          <EventPostList events={events} eventPerPage={9} />
        </div>
      </div>
    </div>
  );
};

export default Event;
