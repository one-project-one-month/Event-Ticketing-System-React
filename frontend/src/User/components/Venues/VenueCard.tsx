import type { IVenueCard } from "@/User/types";
import { House, MapPin, Users } from "lucide-react";

const VenueCard = ({
  venueId,
  imagePath,
  buildingName,
  name,
  size,
  address,
}: IVenueCard) => {
  return (
    <div className="relative h-[31rem] w-[28rem] overflow-hidden rounded-lg bg-[#071739] font-['figtree'] text-white">
      <div className="h-1/2 w-full">
        <img
          src={imagePath}
          alt={buildingName}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      {/* Venue Detail Overview */}
      <div className="p-5">
        <div className="">
          <p className="mb-2.5 text-2xl font-bold uppercase">{buildingName}</p>
          <div className="grid grid-cols-2 grid-cols-[24px_1fr] gap-2">
            <House />
            <p>{name}</p>
            <Users />
            <p>{size} guests</p>
            <MapPin />
            <p>{address}</p>
          </div>
        </div>
        <div className="absolute right-4 bottom-8 w-fit">
          <a
            className="float-right cursor-pointer rounded bg-white px-2.5 py-1.5 text-black transition-colors duration-300 hover:bg-[#103263] hover:text-white"
            href="/venue/venuedetails"
            key={venueId}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
