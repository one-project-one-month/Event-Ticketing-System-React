import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventTypeByCode } from "@/services/EventTypeServices";
import type { EventTypeData } from "@/Admin/DataTypes/EventTypes";

export default function EventTypeDetail() {
  const { eventCategorycode } = useParams<{ eventCategorycode: string }>();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventTypeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventType = async () => {
      if (!eventCategorycode) return;

      const res = await getEventTypeByCode(eventCategorycode);

      if (res.isSuccess && res.data?.event) {
        console
        setEvents(res.data.event ? [res.data.event] : []); 
      } else {
        console.error("Failed to fetch event type:", res.message);
        setEvents([]);
      }

      setLoading(false);
    };

    fetchEventType();
  }, [eventCategorycode]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!events.length) return <p className="text-center mt-20 text-red-500">No event category found.</p>;

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>

      <div className="space-y-20">
        {events.map((event, index) => (
          <div key={index} className="grid grid-cols-2 gap-x-25 gap-y-10 border-b mt-10 pb-5">
            <div>
              <Label label="Event Code" required />
              <TextInput value={event.eventCategorycode} readOnly />
            </div>
            <div>
              <Label label="Event Category Name" required />
              <TextInput value={event.categoryname} readOnly />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
