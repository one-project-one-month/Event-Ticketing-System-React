import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserVenueByCode } from "@/services/UserVenueService";
import type { UserVenueDataByCode } from "@/User/DataTypes/Venue";

import SampleVenue from "@/User/assets/sample-venue-1.png";
import VenueDialog from "@/User/components/Venues/VenueDialog";
import VenueForm from "@/User/components/Venues/VenueForm";
import VenueInformation from "@/User/components/Venues/VenueInformation";
import VenuePhoto from "@/User/components/Venues/VenuePhoto";

const VenueDetails = () => {
  const { venuecode } = useParams<{ venuecode: string }>();
  const [venueData, setVenueData] = useState<UserVenueDataByCode | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!venuecode) return;
    const fetchData = async () => {
      const res = await getUserVenueByCode(venuecode);
      if (res.isSuccess && res.data?.venue) {
        setVenueData(res.data.venue);
      }
    };
    fetchData();
  }, [venuecode]);

  const imagePaths = venueData?.venueImage?.filter(Boolean).length
    ? venueData.venueImage.map((img) =>
        img.startsWith("http") ? img : `${baseURL}/${img}`
      )
    : [SampleVenue];

  return (
    <div className="mt-10">
      <VenuePhoto imagePaths={imagePaths} />

      <div className="grid grid-cols-[47rem_1fr] gap-4 mt-4">
        {venueData && (
          <VenueInformation
            venueName={venueData.venueName}
            capacity={venueData.capacity}
            address={venueData.address}
            description={venueData.description}
            addons={venueData.addons}
            facilities={venueData.facilities}
          />
        )}

        <div className="flex justify-end">
          <VenueForm openDialog={() => setShowDialog(true)} />
        </div>
      </div>

      {showDialog && <VenueDialog onClose={() => setShowDialog(false)} />}
    </div>
  );
};

export default VenueDetails;
