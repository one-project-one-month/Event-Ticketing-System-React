import { useEffect, useState } from "react";
import VenueCard from "@/User/components/Venues/VenueCard";
import { getUserVenues } from "@/services/UserVenueService";
import type { UserVenueData } from "@/User/DataTypes/Venue";
import ArrowRight from "@/User/assets/icons/arrow-right.svg";

const Venue = () => {
  const [venues, setVenues] = useState<UserVenueData[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const fetchVenues = async (page: number) => {
    try {
      setLoading(true);
      const res = await getUserVenues(page);

      if (res && Array.isArray(res.data?.venueList)) {
        setVenues(res.data?.venueList);
        setTotalPages(res.data?.totalPages || 1);
        setPageNo(res.data?.pageNo || 1);
      }
    } catch (err) {
      console.error("Failed to fetch venues:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues(pageNo);
  }, [pageNo]);

  return (
    <section>
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="figtreef text-[2rem] font-bold">
          Venues for Your Next Event
        </h1>
        <hr className="w-44 border-2 border-black" />
      </div>

      {loading ? (
        <p className="text-center my-10">Loading venues...</p>
      ) : (
        <div className="mx-auto my-10 grid w-fit grid-cols-3 justify-between gap-x-7 gap-y-5 align-middle">
          {venues.map((venue) => (
            <VenueCard
              key={venue.venueCode}
              venuecode={venue.venueCode}
              buildingName={venue.venuetypename}
              imagePath={
                venue.venueimage?.filter(Boolean)?.[0]
                  ? `${baseURL}/${venue.venueimage.filter(Boolean)[0]}`
                  : ""}
              name={venue.venuetypename}
              capacity={venue.capacity}
              address={venue.address}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-row items-center justify-center gap-2">
          <img
            src={ArrowRight}
            alt="Prev Page"
            className={`size-8 rotate-180 cursor-pointer ${
              pageNo <= 1 && "hidden"
            }`}
            onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
          />
          <div className="flex w-fit flex-row gap-1.5 text-xl">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPageNo(index + 1)}
                className={`cursor-pointer p-0.5 hover:underline ${
                  index + 1 === pageNo && "underline"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <img
            src={ArrowRight}
            alt="Next Page"
            className={`size-8 cursor-pointer ${
              pageNo >= totalPages && "hidden"
            }`}
            onClick={() =>
              setPageNo((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </div>
      )}
    </section>
  );
};

export default Venue;
