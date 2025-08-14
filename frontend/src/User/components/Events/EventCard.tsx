import { MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import placeholderImage from "/yw-event-img/event.png";

const EventCard = ({
  title,
  location,
  imageUrl,
  eventcode
}: {
  title: string;
  location: string;
  imageUrl: string;
  eventcode:string;
}) => {
  return (
    <div className="relative flex h-[500px] flex-col items-center justify-center overflow-auto rounded-md font-['figtree'] shadow-gray-800 transition-shadow hover:shadow-md dark:border">
      <img
        src={imageUrl || placeholderImage}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = placeholderImage;
        }}
        alt="Event"
        className="z-0 h-full w-full object-cover object-center"
      />
      <div className="absolute bottom-0 z-10 w-full bg-gradient-to-b from-transparent via-white/30 to-transparent p-3 text-white backdrop-blur-[2px]">
        <h2 className="mb-2 text-3xl font-bold drop-shadow-lg">{title}</h2>
        <div className="flex items-center justify-between">
          <p className="flex">
            <MapPin /> {location}
          </p>
          <NavLink
            to={`/events/eventinfo/${eventcode}`}
            className="rounded-sm border border-black bg-white p-1 font-semibold text-black transition-colors hover:bg-[#071739] hover:text-white"
          >
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
