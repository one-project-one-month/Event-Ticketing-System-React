import { NavLink } from "react-router-dom";

const EventCard = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded bg-gray-300 p-3">
      <img
        src="https://placehold.co/600x400/png"
        alt=""
        className="h-[250px] w-full rounded-sm object-cover object-center"
      />
      <div className="w-full text-left">
        <h2>Title</h2>
        <p>Description</p>
        <p>
          Date <span>Dec-10-2025</span>
        </p>
      </div>
      <div className="flex w-full justify-end">
        <NavLink
          to={"/events/eventinfo"}
          className="cursor-pointer rounded-3xl border border-black p-3 transition-colors hover:bg-black hover:text-white"
        >
          Buy Tickets
        </NavLink>
      </div>
    </div>
  );
};

export default EventCard;
