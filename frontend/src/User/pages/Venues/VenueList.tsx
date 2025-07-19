import VenueCard from "@/User/components/Venues/VenueCard";
import type { IVenueCard } from "@/User/types";
import { useState } from "react";
import ArrowRight from "@/User/assets/icons/arrow-right.svg";

const Venue = () => {
  const venues: IVenueCard[] = [
    {
      venueId: "v001",
      imagePath:
        "https://i.pinimg.com/1200x/07/aa/c9/07aac91701af0d21a2182bf433430cee.jpg",
      buildingName: "Royal Tower",
      name: "Grand Hall",
      capacity: 500,
      address: "No.12, Main Street, Yangon",
    },
    {
      venueId: "v002",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Silver Plaza",
      name: "Event Space A",
      capacity: 300,
      address: "45B, Inya Road, Yangon",
    },
    {
      venueId: "v003",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Skyline Center",
      name: "Conference Room",
      capacity: 200,
      address: "No.8, Pyay Road, Yangon",
    },
    {
      venueId: "v004",
      imagePath:
        "https://i.pinimg.com/1200x/07/aa/c9/07aac91701af0d21a2182bf433430cee.jpg",
      buildingName: "Empire Tower",
      name: "Banquet Hall",
      capacity: 600,
      address: "77, Kabar Aye Pagoda Road, Yangon",
    },
    {
      venueId: "v005",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Sunset Complex",
      name: "Outdoor Venue",
      capacity: 800,
      address: "123, Bayint Naung Road, Yangon",
    },
    {
      venueId: "v006",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Heritage Hall",
      name: "Art Gallery Space",
      capacity: 150,
      address: "19, Bogalay Zay Street, Yangon",
    },
    {
      venueId: "v007",
      imagePath:
        "https://i.pinimg.com/1200x/07/aa/c9/07aac91701af0d21a2182bf433430cee.jpg",
      buildingName: "Crystal Center",
      name: "Wedding Ballroom",
      capacity: 700,
      address: "88, Strand Road, Yangon",
    },
    {
      venueId: "v008",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Unity Mall",
      name: "Mini Theatre",
      capacity: 250,
      address: "56, Baho Road, Yangon",
    },
    {
      venueId: "v009",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Galaxy Plaza",
      name: "Roof Top Lounge",
      capacity: 350,
      address: "33, Sayar San Road, Yangon",
    },
    {
      venueId: "v008",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Unity Mall",
      name: "Mini Theatre",
      capacity: 250,
      address: "56, Baho Road, Yangon",
    },
    {
      venueId: "v009",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Galaxy Plaza",
      name: "Roof Top Lounge",
      capacity: 350,
      address: "33, Sayar San Road, Yangon",
    },
  ];
  const [penigation, setPenigation] = useState(0);
  const venueCount = 11;
  const lastCount = venueCount % 9;

  return (
    <section>
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="figtreef text-[2rem] font-bold">
          Venues for Your Next Event
        </h1>
        <hr className="w-44 border-2 border-black" />
      </div>
      {/* Venue List */}
      <div className="mx-auto my-10 grid w-fit grid-cols-3 justify-between gap-x-7 gap-y-5 align-middle">
        {venues.slice(9 * penigation, 9 * penigation + 9).map((venue) => (
          <VenueCard
            venueId={venue.venueId}
            buildingName={venue.buildingName}
            imagePath={venue.imagePath}
            name={venue.name}
            capacity={venue.capacity}
            address={venue.address}
          />
        ))}
      </div>
      {/* Penigation Indicator */}
      {venueCount > 9 ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <img
            src={ArrowRight}
            alt="Left Penigation Arrow"
            className={`size-8 rotate-180 cursor-pointer ${penigation != lastCount - 1 && "hidden"}`}
            onClick={() => {
              setPenigation(penigation - 1);
            }}
          />
          <div className="flex w-fit flex-row gap-1.5 text-xl">
            {Array.from({ length: lastCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPenigation(index)}
                className={`cursor-pointer p-0.5 hover:underline ${index == penigation && "underline"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <img
            src={ArrowRight}
            alt="Right Penigation Arrow"
            className={`size-8 cursor-pointer ${penigation == lastCount - 1 && "hidden"}`}
            onClick={() => {
              setPenigation(penigation + 1);
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default Venue;
