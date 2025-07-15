import { NavLink } from "react-router-dom";

const TicketInfo = () => {
  return (
    <div className="flex flex-col px-20 pt-10">
      <div className="flex w-full rounded-sm bg-gray-600 px-20 py-10">
        <img
          src="https://placehold.co/600x400/png"
          alt=""
          className="h-[400px] w-[30%] rounded object-cover object-center"
        />
        <div className="ms-10 mt-5 flex h-full w-full gap-4 text-white">
          <div className="w-sm">
            <h1>Title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, officiis.
            </p>
          </div>
          <div className="w-sm">
            <h1>Title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, officiis.
            </p>
          </div>
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-2xl font-semibold">Title</h2>
        <ul className="f ps-3 text-xl leading-14">
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
        </ul>
        <div className="flex w-full justify-end">
          <NavLink
            to={"/events/ticketdetails"}
            className="cursor-pointer rounded-3xl border border-black p-3 transition-colors hover:bg-black hover:text-white"
          >
            Buy Tickets
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
