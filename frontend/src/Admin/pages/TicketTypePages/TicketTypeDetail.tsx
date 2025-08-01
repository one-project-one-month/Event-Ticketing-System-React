import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TicketTypeDemoData } from "@/Admin/data/TicketTypeDemoData";

export default function TicketTypeDetail() {
    const { TicketTypeCode } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        const found = TicketTypeDemoData.find((e) => e.TicketTypeCode === TicketTypeCode);
        setEvent(found || null);
      }, [TicketTypeCode]);

      if (!event) return <p className="text-center mt-20">Ticket not found.</p>;
      return(
        <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Ticket Type Information</h1>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                    <Label label="Event Code" required />
                    <TextInput value={event.TicketTypeCode} readOnly />
                </div>
                <div>
                    <Label label="Event Category Code" required />
                    <TextInput value={event.TicketTypeName} readOnly />
                </div>
                <div>
                    <Label label="Event Category Code" required />
                    <TextInput value={event.TicketPrice} readOnly />
                </div>
                <div>
                    <Label label="Event Category Code" required />
                    <TextInput value={event.TicketQuantity} readOnly />
                </div>
                <div>
                    <Label label="Event Category Code" required />
                    <TextInput value={event.EventName} readOnly />
                </div>
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
      );
}