import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { OneTicketTypeResponse } from "@/Admin/DataTypes/TicketTypes";
import { getTicketTypeByCode } from "@/services/TicketTypeServices";

export default function TicketTypeDetail() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();
    const [ticketType, setTicketType] = useState<OneTicketTypeResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicketType = async () => {
            if (!code) {
                setLoading(false);
                return;
            }
            const res = await getTicketTypeByCode(code);
            console.log("API response:", res);
            if (res.isSuccess && res.data?.ticketType) {
                console.log("Ticket Type fetched successfully:", res.data.ticketType);
                setTicketType(res.data.ticketType); 
            } else {
                console.error("Failed to fetch ticket type:", res.message);
                setTicketType(null);
            }
            setLoading(false);
        };
        fetchTicketType();
    }, [code]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!ticketType) return <p className="text-center mt-20">Ticket Type not found.</p>;

    return (
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Ticket Type Information</h1>
            <div className="grid grid-cols-2 gap-x-25 gap-y-10 border-b mt-10 pb-5">
                <div>
                    <Label label="Ticket Type Code" required />
                    <TextInput value={ticketType.ticketTypeCode || ""} readOnly />
                </div>
                <div>
                    <Label label="Ticket Type Name" required />
                    <TextInput value={ticketType.ticketTypeName || ""} readOnly />
                </div>
                <div>
                    <Label label="Ticket Price" required />
                    <TextInput value={ticketType.ticketprice} readOnly />
                </div>
                <div>
                    <Label label="Ticket Quantity" required />
                    <TextInput value={ticketType.ticketQuantity ? ticketType.ticketQuantity.toString() : ""} readOnly />
                </div>
                <div>
                    <Label label="Event Name" required />
                    <TextInput value={ticketType.eventName || ""} readOnly />
                </div>
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
    );
}
