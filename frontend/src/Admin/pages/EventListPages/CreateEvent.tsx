import { useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import DateTimePicker from "@/Admin/components/ui/DateTimePicker";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";

export default function CreateEvent () {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
      const handleSave = () => {
        // Save logic here...
        setShowSuccess(true);
      };
    return (
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6  text-[#6C2BD9]">Event Information</h1>
            <h2 className="text-xl mb-6  text-[#6C2BD9]">Please fill in all required fields to create a new event.</h2>
            <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
                <div>
                    <Label label="Event Name" required />
                    <TextInput placeholder="Enter event name"/>
                </div>
                <div>
                    <Label label="Event Unique Name" required />
                    <TextInput placeholder="Enter event unique name" />
                </div>
                <div>
                    <Label label="Event Category" required />
                    <TextInput placeholder="Enter event category" />
                </div>
                <div>
                    <Label label="Business Owner Name" required />
                    <TextInput placeholder="Enter business owner name" />
                </div>
                <div>
                    <Label label="Venue Name" required />
                    <TextInput placeholder="Enter venue name" />
                </div>
                <div>
                    <Label label="Total Ticket Quantity" required />
                    <TextInput placeholder="Enter total ticket quantity" />
                </div>
                <div>
                    <Label label="Start Date" required/>
                    <DateTimePicker />
                </div>
                <div>
                    <Label label="End Date" required/>
                    <DateTimePicker  />
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-[20px]">
                    <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
                    <YellowButton text="Create" type="submit" onClick={handleSave}/>
                    <SaveSuccessModal
                        open={showSuccess}
                        onClose={() => setShowSuccess(false)}
                        onConfirm={() => {
                        setShowSuccess(false);
                        navigate("/admin/event/list");
                        }}
                    />
            </div>
        </div>
    );
}