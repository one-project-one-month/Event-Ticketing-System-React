import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "@/User/components/Events/EventCard";
import VenueCard from "@/User/components/Venues/VenueCard";
import { searchEventsByDate, searchEventsByAmount, searchEventsAndVenues } from "@/services/SearchService";

const ITEMS_PER_PAGE = 9;

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get("q") || "";
  const minPrice = Number(query.get("minPrice") || 0);
  const maxPrice = Number(query.get("maxPrice") || 0);
  const date = query.get("date") || "";

  const [events, setEvents] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchResults = async () => {
      setMessage("");
      setPage(1);

      let allEvents: any[] = [];
      let allVenues: any[] = [];

      try {
        if (date) {
          const dateRes = await searchEventsByDate(new Date().toISOString().split("T")[0], date);
          if (dateRes.isSuccess) {
            allEvents.push(...(dateRes.data?.events || []));
            allVenues.push(...(dateRes.data?.venues || []));
          }
        }

        if (minPrice > 0 || maxPrice > 0) {
          const amtRes = await searchEventsByAmount(minPrice, maxPrice);
          if (amtRes.isSuccess) {
            allEvents.push(...(amtRes.data?.events || []));
            allVenues.push(...(amtRes.data?.venues || []));
          }
        }

        if (q) {
          const termRes = await searchEventsAndVenues(q);
          if (termRes.isSuccess) {
            allEvents.push(...(termRes.data?.events || []));
            allVenues.push(...(termRes.data?.venues || []));
          }
        }

        setEvents(allEvents);
        setVenues(allVenues);

        if (allEvents.length === 0 && allVenues.length === 0) {
          setMessage("No results found. Try adjusting your search filters.");
        }
      } catch (error) {
        console.error("Search failed:", error);
        setMessage("An error occurred while searching. Please try again.");
      }
    };

    fetchResults();
  }, [q, minPrice, maxPrice, date]);

  const combined = [...events.map(e => ({ type: "event", ...e })), ...venues.map(v => ({ type: "venue", ...v }))];
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginated = combined.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(combined.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {message && <p className="text-center text-red-500">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((item, idx) =>
          item.type === "event" ? (
            <EventCard
              key={`event-${idx}`}
              title={item.eventname}
              location={item.address}
              imageUrl={`${baseURL}/${item.venueimage?.[0]}`}
              eventcode={item.eventcode}
            />
          ) : (
            <VenueCard
              key={`venue-${idx}`}
              venuecode={item.venuecode}
              imagePath={`${baseURL}/${item.venueimage?.[0]}`}
              buildingName={item.venuename}
              name={item.venuetypename}
              capacity={item.capacity}
              address={item.address}
            />
          )
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
