import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { TicketTypeData } from "@/Admin/DataTypes/TicketTypes";
import { getTicketTypeByCode } from "@/services/TicketTypeServices";

export default function TicketTypeDetail() {
    const { tickettypecode } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<TicketTypeData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicketType = async () => {
            if (!tickettypecode) return;
            const res = await getTicketTypeByCode(tickettypecode);
            if (res.isSuccess && res.data?.TicketType){
                setEvent(res.data.TicketType ? [res.data.TicketType] : []); 
            } else {
                console.error("Failed to fetch ticket type:", res.message);
                setEvent([]);
            }
            setLoading(false);
        };
        fetchTicketType();
    }, [tickettypecode]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
      if (!event.length) return <p className="text-center mt-20">Ticket not found.</p>;
      return(
        <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Ticket Type Information</h1>

            <div className="space-y-10">
                {event.map((event, index) => (
                    <div key={index} className="grid grid-cols-2 gap-x-8 gap-y-5 border-b pb-5">
                        <div>
                            <Label label="Ticket Type Code" required />
                            <TextInput value={event.tickettypecode} readOnly />
                        </div>
                        <div>
                            <Label label="Ticket Type Name" required />
                            <TextInput value={event.tickettypename} readOnly />
                        </div>
                        <div>
                            <Label label="Ticket Price" required />
                            <TextInput value={event.ticketprice} readOnly />
                        </div>
                        <div>
                            <Label label="Ticket Quantity" required />
                            <TextInput value={event.ticketquantity} readOnly />
                        </div>
                        <div>
                            <Label label="Event Name" required />
                            <TextInput value={event.eventname} readOnly />
                        </div>
                    </div>
                ))};
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
      );
}