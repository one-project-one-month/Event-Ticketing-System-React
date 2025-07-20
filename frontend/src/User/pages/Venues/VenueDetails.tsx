import VenueInformation from "@/User/components/Venues/VenueInformation";
import VenuePhoto from "@/User/components/Venues/VenuePhoto";

const VenueDetails = () => {
  return (
    <div>
      <VenuePhoto />
      <div className="grid grid-cols-2 grid-cols-[47rem_1fr]">
        <VenueInformation />
        <div>hehe</div>
      </div>
    </div>
  );
};

export default VenueDetails;
