import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { eventTypeDemoData } from "@/Admin/data/EventTypeDemoData";

export default function EventTypeDetail() {
    const { EventTypeCode } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        const found = eventTypeDemoData.find((e) => e.EventTypeCode === EventTypeCode);
        setEvent(found || null);
      }, [EventTypeCode]);

      if (!event) return <p className="text-center mt-20">Event not found.</p>;
      return(
        <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                    <Label label="Event Code" required />
                    <TextInput value={event.EventTypeCode} readOnly />
                </div>
                <div>
                    <Label label="Event Category Code" required />
                    <TextInput value={event.EventTypeName} readOnly />
                </div>
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
      );
}