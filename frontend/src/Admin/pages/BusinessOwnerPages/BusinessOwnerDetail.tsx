import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BusinessOwnerDemoData } from "@/Admin/data/BusinessOwnerDemoData";

export default function BusinessOwnerDetail() {
    const { BusinessOwnerCode } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        const found = BusinessOwnerDemoData.find((e) => e.BusinessOwnerCode === BusinessOwnerCode);
        setEvent(found || null);
      }, [BusinessOwnerCode]);

      if (!event) return <p className="text-center mt-20">Business owner not found.</p>;
      return(
        <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Business Owner Information</h1>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                    <Label label="Business Owner Code" required />
                    <TextInput value={event.BusinessOwnerCode} readOnly />
                </div>
                <div>
                    <Label label="Full Name" required />
                    <TextInput value={event.BusinessOwnerName} readOnly />
                </div>
                <div>
                    <Label label="Email" required />
                    <TextInput value={event.Email} readOnly />
                </div>
                <div>
                    <Label label="Phone Number" required />
                    <TextInput value={event.PhoneNumber} readOnly />
                </div>
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
      );
}