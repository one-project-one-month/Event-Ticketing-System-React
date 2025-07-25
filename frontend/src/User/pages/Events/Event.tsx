import { NavLink, useSearchParams } from "react-router-dom";
import EventPostList from "@/User/components/Events/EventPostList";

const Event = () => {
  const [searchParam] = useSearchParams();
  const selectCategory = searchParam.get("cat");
  return (
    <div className="px-5 pt-10">
      <div className="py-5">
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
        <div className="px-10">
          <EventPostList />
        </div>
      </div>
    </div>
  );
};

export default Event;
