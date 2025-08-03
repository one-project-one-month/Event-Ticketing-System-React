import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { BusinessOwnerData } from "@/Admin/DataTypes/BusinessOwner";
import { getBusinessOwnerByCode } from "@/services/BusinessOwnerServices";

export default function BusinessOwnerDetail() {
    const { ownerCode } = useParams<{ownerCode: string}>();
    const navigate = useNavigate();
    const [events, setEvents] = useState<BusinessOwnerData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBusinessOwner = async () => {
          if (!ownerCode) return;
    
          const res = await getBusinessOwnerByCode(ownerCode);
    
          if (res.isSuccess && res.data?.businessOwner) {
            setEvents(res.data.businessOwner ? [res.data.businessOwner] : []); 
          } else {
            console.error("Failed to fetch Business Owner:", res.message);
            setEvents([]);
          }
          setLoading(false);
        };
            fetchBusinessOwner();
        }, [ownerCode]);

        if (loading) return <p className="text-center mt-20">Loading...</p>;
      if (!events) return <p className="text-center mt-20">Business owner not found.</p>;
      return(
        <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Business Owner Information</h1>

            <div className="space-y-10">
                {events.map((event, index) => (
                <div key={index} className="grid grid-cols-2 gap-x-8 gap-y-5 border-b pb-5">
                    <div>
                    <Label label="Business Owner Code" required />
                    <TextInput value={event.businessownercode} readOnly />
                    </div>
                    <div>
                    <Label label="Full Name" required />
                    <TextInput value={event.fullName} readOnly />
                    </div>
                    <div>
                    <Label label="Email" required />
                    <TextInput value={event.email} readOnly />
                    </div>
                    <div>
                        <Label label="Phone Number" required />
                        <TextInput value={event.phone} readOnly />
                    </div>
                </div>
                ))}
            </div>

            <div className="mt-8 text-right">
                <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
            </div>
        </div>
      );
}