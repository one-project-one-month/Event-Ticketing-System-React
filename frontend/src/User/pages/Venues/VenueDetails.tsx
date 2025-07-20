import VenueForm from "@/User/components/Venues/VenueForm";
import VenueInformation from "@/User/components/Venues/VenueInformation";
import VenuePhoto from "@/User/components/Venues/VenuePhoto";

const VenueDetails = () => {
  return (
    <div>
      <VenuePhoto />
      <div className="grid grid-cols-[47rem_1fr] gap-4">
        <VenueInformation />
        <div className="flex justify-end">
          <VenueForm />
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
