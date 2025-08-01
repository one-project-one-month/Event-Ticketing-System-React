import { useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";

export default function CreateTicketType () {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
      const handleSave = () => {
        // Save logic here...
        setShowSuccess(true);
      };
    return (
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6  text-[#6C2BD9]">Ticket Type Information</h1>
            <h2 className="text-xl mb-6  text-[#6C2BD9]">Please fill in all required fields to create a new Ticket Type.</h2>
            <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
                <div>
                    <Label label="Ticket Type Name" required />
                    <TextInput placeholder="Enter tiket type name" />
                </div>
                <div>
                    <Label label="Price" required />
                    <TextInput placeholder="Enter price" />
                </div>
                <div>
                    <Label label="Quantity" required />
                    <TextInput placeholder="Enter quantity" />
                </div>
                <div>
                    <Label label="Event Name" required />
                    <TextInput placeholder="Enter event name" />
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-[20px]">
                    <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
                    <YellowButton text="Create" type="submit" onClick={handleSave}/>
                    <SaveSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
            </div>
        </div>
    );
}