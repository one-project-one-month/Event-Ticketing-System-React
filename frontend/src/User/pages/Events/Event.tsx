import { NavLink, useSearchParams } from "react-router-dom";
import EventPostList from "@/User/components/Events/EventPostList";
import { useEffect, useState } from "react";
import { getUserEvents } from "@/services/UserEventServices";
import type { UserEventData } from "@/User/DataTypes/Event";
import ArrowRight from "@/User/assets/icons/arrow-right.svg";

const Event = () => {
  const [searchParam] = useSearchParams();
  const selectCategory = searchParam.get("cat");
  const [data, setData] = useState<UserEventData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchUserEvents = async (pageNumber: number) => {
    const res = await getUserEvents(pageNumber);
    if (res.isSuccess && Array.isArray(res.data?.eventList)) {
      if (selectCategory === "trend") {
        setData(res.data.top3Events);
      } else {
        setData(res.data.eventList);
      }
      setTotalPages(res.data.totalPages);
    } else {
      console.error("Unable to fetch user events! ", res.message);
      setData([]);
    }
  };
  useEffect(() => {
    fetchUserEvents(currentPage);
  }, [currentPage, selectCategory]);

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
          {data.length > 0 ? (
            <>
              <EventPostList events={data} eventPerPage={9} />
              <nav className="flex w-full items-center justify-center p-3">
                <ul className="flex items-center justify-center gap-3">
                  <li
                    className="cursor-pointer"
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  >
                    <img
                      src={ArrowRight}
                      alt="arrow left"
                      className="rotate-180 select-none"
                      draggable="false"
                    />
                  </li>
                  {pageNumbers.map((number, index) => (
                    <li
                      className={`text-primary cursor-pointer p-2 text-center text-xl font-semibold select-none ${currentPage == number && "underline"}`}
                      onClick={() => paginate(number)}
                      key={index}
                    >
                      {number}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer"
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                  >
                    <img
                      src={ArrowRight}
                      alt="arrow right"
                      className="select-none"
                      draggable="false"
                    />
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <>
              <p>No Events</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
