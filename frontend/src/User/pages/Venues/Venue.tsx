import SampleVenueBg from "@/User/assets/sample-venue.png";
import { House, MapPin, Users } from "lucide-react";

const Venue = () => {
  return (
    <div className="h-[29rem] w-[26rem] overflow-hidden rounded-lg bg-[#071739] font-['figtree'] text-white">
      <div className="h-1/2 w-full">
        <img
          src={SampleVenueBg}
          alt="Venue Overview Photo"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      {/* Venue Detail Overview */}
      <div className="p-5">
        <div className="">
          <p className="mb-2.5 text-2xl font-bold uppercase">
            Lotte Hotel Yangon
          </p>
          <div className="grid grid-cols-2 grid-cols-[24px_1fr] gap-2">
            <House />
            <p>Sapphire Ballroom</p>
            <Users />
            <p>800 guests</p>
            <MapPin />
            <p>
              2F, No. 82, Sin Phyu Shin Avenue, Pyay Road, Hlaing Township,
              Yangon, Myanmar
            </p>
          </div>
        </div>
        <div className="mt-3 w-full">
          <a
            className="float-right cursor-pointer rounded bg-white px-2.5 py-1.5 text-black transition-colors duration-300 hover:bg-[#103263] hover:text-white"
            href="#"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default Venue;
