// src/Admin/pages/Event/View.jsx
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
//import axios from "axios";

// export default function EventViewPage() {
//   const { eventId } = useParams();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     // Replace with your real API endpoint
//     axios.get(`/api/admin/events/${eventId}`)
//       .then((res) => setEvent(res.data))
//       .catch((err) => console.error("Error fetching event:", err));
//   }, [eventId]);

//   if (!event) return <div>Loading event...</div>;
// src/Admin/pages/Event/View.jsx
import { useParams } from "react-router-dom";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";

export default function EventDetail() {
  const { eventId } = useParams();

  const event = eventListDemoData.find(e => e.EventUniqueName === eventId);

  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Details</h1>
      <div className="space-y-2">
        <div><strong>Event Name:</strong> {event.EventName}</div>
        <div><strong>Unique Name:</strong> {event.EventUniqueName}</div>
        <div><strong>Business Owner:</strong> {event.BusinessOwnerName}</div>
        <div><strong>Status:</strong> {event.IsActive ? "Active" : "Inactive"}</div>
      </div>
    </div>
  );
}

