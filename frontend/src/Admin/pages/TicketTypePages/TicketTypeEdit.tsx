import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TicketTypeDemoData } from "@/Admin/data/TicketTypeDemoData";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";

export default function TicketTypeEditPage() {
    const navigate = useNavigate();
    const { ticketTypeCode } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const handleUpdate = () => {
        // Update logic here...
        setShowSuccess(true);
    };

    const [form, setForm] = useState({
    TicketTypeCode: "",
    TicketTypeName: "",
    TicketPrice: 0.00,
    TicketQuantity: 0,
    EventName: "",
    });

    useEffect(() => {
        const found = TicketTypeDemoData.find(
        (e) => e.TicketTypeCode === ticketTypeCode
        );
        console.log("ticketTypeCode from route:", ticketTypeCode);
        console.log("found record:", found);
        if (found) {
        setForm({
            TicketTypeCode: found.TicketTypeCode,
            TicketTypeName: found.TicketTypeName,
            TicketPrice: found.TicketPrice,
            TicketQuantity: found.TicketQuantity,
            EventName: found.EventName,
        });
        }
        }, [ticketTypeCode]);

    return(
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>
            <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
                <div>
                    <Label label="Event Type Name" required />
                    <TextInput
                    value={form.TicketTypeName} onChange={(e) =>
                    setForm({ ...form, TicketTypeName: e.target.value })
                }/>
                </div>
                <div>
                  <Label label="Price" required />
                  <TextInput
                    value={form.TicketPrice} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Quantity" required />
                  <TextInput
                    value={form.TicketQuantity} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Event Name" required />
                  <TextInput
                    value={form.EventName} 
                    disabled
                  />
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-[20px]">
                <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
                <YellowButton text="Update" type="submit" onClick={handleUpdate}/>
                <UpdateSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
            </div>
        </div>
    );
}