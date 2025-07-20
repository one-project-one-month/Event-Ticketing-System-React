import VenueDialog from "@/User/components/Venues/VenueDialog";
import VenueForm from "@/User/components/Venues/VenueForm";
import VenueInformation from "@/User/components/Venues/VenueInformation";
import VenuePhoto from "@/User/components/Venues/VenuePhoto";
import { useState } from "react";

const VenueDetails = () => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <VenuePhoto />
      <div className="grid grid-cols-[47rem_1fr] gap-4">
        <VenueInformation />
        <div className="flex justify-end">
          <VenueForm openDialog={() => setShowDialog(true)} />
        </div>
      </div>
      {showDialog && <VenueDialog onClose={() => setShowDialog(false)} />}
    </div>
  );
};

export default VenueDetails;
