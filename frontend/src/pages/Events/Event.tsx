import EventPostList from "@/components/Events/EventPostList";
import { NavLink } from "react-router-dom";

const Event = () => {
  return (
    <div className="px-5 pt-10">
      <div className="bg-gray-500 py-3">
        <div className="my-8 ms-2 w-[80%] bg-gray-400 p-8">
          <li className="flex list-none gap-3">
            <ul>
              <NavLink to={"/"} className="p-3 underline">
                All
              </NavLink>
            </ul>
            <ul>
              <NavLink to={"/"}>Trending Events</NavLink>
            </ul>
          </li>
        </div>
        <div className="px-10">
          <EventPostList />
        </div>
      </div>
    </div>
  );
};

export default Event;
