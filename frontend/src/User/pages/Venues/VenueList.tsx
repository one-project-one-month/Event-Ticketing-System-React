import VenueCard from "@/User/components/Venues/VenueCard";
import type { IVenueCard } from "@/User/types";

const Venue = () => {
  const venues: IVenueCard[] = [
    {
      venueId: "v001",
      imagePath:
        "https://i.pinimg.com/1200x/07/aa/c9/07aac91701af0d21a2182bf433430cee.jpg",
      buildingName: "Royal Tower",
      name: "Grand Hall",
      size: 500,
      address: "No.12, Main Street, Yangon",
    },
    {
      venueId: "v002",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Silver Plaza",
      name: "Event Space A",
      size: 300,
      address: "45B, Inya Road, Yangon",
    },
    {
      venueId: "v003",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Skyline Center",
      name: "Conference Room",
      size: 200,
      address: "No.8, Pyay Road, Yangon",
    },
    {
      venueId: "v004",
      imagePath:
        "https://i.pinimg.com/1200x/07/aa/c9/07aac91701af0d21a2182bf433430cee.jpg",
      buildingName: "Empire Tower",
      name: "Banquet Hall",
      size: 600,
      address: "77, Kabar Aye Pagoda Road, Yangon",
    },
    {
      venueId: "v005",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Sunset Complex",
      name: "Outdoor Venue",
      size: 800,
      address: "123, Bayint Naung Road, Yangon",
    },
    {
      venueId: "v006",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Heritage Hall",
      name: "Art Gallery Space",
      size: 150,
      address: "19, Bogalay Zay Street, Yangon",
    },
    {
      venueId: "v007",
      imagePath:
        "https://i.pinimg.com/1200x/07/aa/c9/07aac91701af0d21a2182bf433430cee.jpg",
      buildingName: "Crystal Center",
      name: "Wedding Ballroom",
      size: 700,
      address: "88, Strand Road, Yangon",
    },
    {
      venueId: "v008",
      imagePath:
        "https://i.pinimg.com/736x/1b/96/13/1b961339b8b62a6db978e8d8b611336e.jpg",
      buildingName: "Unity Mall",
      name: "Mini Theatre",
      size: 250,
      address: "56, Baho Road, Yangon",
    },
    {
      venueId: "v009",
      imagePath:
        "https://i.pinimg.com/736x/86/e4/ab/86e4ab366931b3a01b2baf81d0b8e793.jpg",
      buildingName: "Galaxy Plaza",
      name: "Roof Top Lounge",
      size: 350,
      address: "33, Sayar San Road, Yangon",
    },
  ];

  return (
    <section>
      {/* Venue List */}
      <div className="mx-auto my-10 grid w-fit grid-cols-3 justify-between gap-x-7 gap-y-5 align-middle">
        {venues.map((venue) => (
          <VenueCard
            venueId={venue.venueId}
            buildingName={venue.buildingName}
            imagePath={venue.imagePath}
            name={venue.name}
            size={venue.size}
            address={venue.address}
          />
        ))}
      </div>
      {/* Penigation Indicator */}
    </section>
  );
};

export default Venue;
