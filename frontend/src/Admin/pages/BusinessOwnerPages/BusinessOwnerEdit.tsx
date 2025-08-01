import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BusinessOwnerDemoData } from "@/Admin/data/BusinessOwnerDemoData";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";

export default function BusinessOwnerEditPage() {
    const navigate = useNavigate();
    const { businessOwnerCode } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const handleUpdate = () => {
        // Update logic here...
        setShowSuccess(true);
    };

    const [form, setForm] = useState({
    BusinessOwnerCode: "",
    BusinessOwnerName: "",
    Email: "",
    PhoneNumber: ""
    });

    useEffect(() => {
        const found = BusinessOwnerDemoData.find(
        (e) => e.BusinessOwnerCode === businessOwnerCode
        );
        console.log("ticketTypeCode from route:", businessOwnerCode);
        console.log("found record:", found);
        if (found) {
        setForm({
            BusinessOwnerCode: found.BusinessOwnerCode,
            BusinessOwnerName: found.BusinessOwnerName,
            Email: found.Email,
            PhoneNumber: found.PhoneNumber,
        });
        }
        }, [businessOwnerCode]);

    return(
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Business owner Information</h1>
            <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
                <div>
                    <Label label="Full Name" required />
                    <TextInput
                    value={form.BusinessOwnerName} onChange={(e) =>
                    setForm({ ...form, BusinessOwnerName: e.target.value })
                }/>
                </div>
                <div>
                  <Label label="Email" required />
                  <TextInput
                    value={form.Email} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Phone Number" required />
                  <TextInput
                    value={form.PhoneNumber} onChange={(e) =>
                    setForm({ ...form, PhoneNumber: e.target.value })
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