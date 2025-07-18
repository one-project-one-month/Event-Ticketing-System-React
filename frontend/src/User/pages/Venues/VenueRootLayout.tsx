import { Outlet } from "react-router-dom";

const VenueRootLayout = () => {
  return (
    <>
      <div className="px-16 py-8">
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="figtreef text-[2rem] font-bold">
            Venues for Your Next Event
          </h1>
          <hr className="w-44 border-2 border-black" />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default VenueRootLayout;
