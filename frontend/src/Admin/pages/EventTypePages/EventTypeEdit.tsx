import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { eventTypeDemoData } from "@/Admin/data/EventTypeDemoData";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";

export default function EventTypeEditPage() {
    const navigate = useNavigate();
    const { eventTypeCode } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const handleUpdate = () => {
        // Update logic here...
        setShowSuccess(true);
    };

    const [form, setForm] = useState({
    EventTypeCode: "",
    EventTypeName: "",
    });

    useEffect(() => {
        const found = eventTypeDemoData.find(
        (e) => e.EventTypeCode === eventTypeCode
        );
        console.log("eventTypeCode from route:", eventTypeCode);
        console.log("found record:", found);
        if (found) {
        setForm({
            EventTypeCode: found.EventTypeCode,
            EventTypeName: found.EventTypeName,
        });
        }
        }, [eventTypeCode]);

    return(
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>
            <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
                <div>
                    <Label label="Event Type Name" required />
                    <TextInput
                    value={form.EventTypeName} onChange={(e) =>
                    setForm({ ...form, EventTypeName: e.target.value })
                }/>
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