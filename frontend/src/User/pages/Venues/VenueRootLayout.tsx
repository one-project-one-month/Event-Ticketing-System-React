import { Outlet } from "react-router-dom";

const VenueRootLayout = () => {
  return (
    <>
      <div className="px-16 py-8 pt-0">
        <Outlet />
      </div>
    </>
  );
};

export default VenueRootLayout;
