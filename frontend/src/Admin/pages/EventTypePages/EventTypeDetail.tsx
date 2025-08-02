import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventTypeByCode } from "@/services/EventTypeServices";
import {type EventTypeData } from "@/Admin/DataTypes/EventTypes";

export default function EventTypeDetail() {
    const { eventCategorycode } = useParams<{ eventCategorycode: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventTypeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchEventType = async () => {
      if (!eventCategorycode) return;
      const res = await getEventTypeByCode(eventCategorycode);
      if (res.isSuccess && res.data) {
        setEvent(res.data.eventType);
      } else {
        console.error("Failed to fetch event type:", res.message);
      }
      setLoading(false);
    };
    fetchEventType();
  }, [eventCategorycode]);
      
    if (loading) return <p className="text-center mt-20">Loading...</p>;
      if (!event) return <p className="text-center mt-20">Event not found.</p>;
      return(
        <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                    <Label label="Event Code" required />
                    <TextInput value={event.eventCategorycode} readOnly />
                </div>
                <div>
                    <Label label="Event Category Code" required />
                    <TextInput value={event.categoryname} readOnly />
                </div>
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
      );
}