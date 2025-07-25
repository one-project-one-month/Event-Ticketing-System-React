import { useState } from "react";
import EventCard from "./EventCard";
import ArrowRight from "@/User/assets/icons/arrow-right.svg";

export type Event = {
  title: string;
  location: string;
};

const EventPostList = ({
  events,
  eventPerPage,
}: {
  events: Event[];
  eventPerPage: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(events.length / eventPerPage);
  const pageNumbers = [];
  const indexOfLastEvent = currentPage * eventPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
        {currentEvents.map((e) => (
          <EventCard title={e.title} location={e.location} />
        ))}
      </div>
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
          {pageNumbers.map((number) => (
            <li
              className={`text-primary cursor-pointer p-2 text-center text-xl font-semibold select-none ${currentPage == number && "underline"}`}
              onClick={() => paginate(number)}
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
  );
};

export default EventPostList;
