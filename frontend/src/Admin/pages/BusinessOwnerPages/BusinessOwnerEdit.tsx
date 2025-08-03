import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";
import {getBusinessOwnerByCode, updateBusinessOwner} from "@/services/BusinessOwnerServices";

export default function BusinessOwnerEditPage() {
    const navigate = useNavigate();
    const { ownerCode } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
    BusinessOwnerCode: "",
    BusinessOwnerName: "",
    Email: "",
    PhoneNumber: ""
    });

    useEffect(() => {
        if (!ownerCode) return;
    
        const fetchData = async () => {
          setLoading(true);
          const res = await getBusinessOwnerByCode(ownerCode);
    
          if (res.isSuccess && res.data?.businessOwner) {
            const event = res.data.businessOwner;
    
            setForm({
              BusinessOwnerCode: event.businessownercode,
              BusinessOwnerName: event.fullName,
              Email: event.email,
              PhoneNumber: event.phone,
            });
          } else {
            console.error("Failed to fetch Business Owner:", res.message);
          }
          setLoading(false);
        };
    
        fetchData();
      }, [ownerCode]);

      const handleUpdate = async () => {
          const res = await updateBusinessOwner({
            businessownercode: form.BusinessOwnerCode,
            fullName: form.BusinessOwnerName,
            phone: form.PhoneNumber,
          });
      
          if (res.isSuccess) {
            setShowSuccess(true);
          } else {
            alert(res.message || "Update failed.");
          }
        };

    return(
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Business owner Information</h1>
            {loading ? (
                <p className="text-center mt-20">Loading...</p>
            ) : (
                <>
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
                </div>
                </>
            )}
                <UpdateSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
        </div>
    );
}