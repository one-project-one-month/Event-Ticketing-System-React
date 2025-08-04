import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { BusinessOwnerData } from "@/Admin/DataTypes/BusinessOwner";
import { getBusinessOwnerByCode } from "@/services/BusinessOwnerServices";

export default function BusinessOwnerDetail() {
  const { ownerCode } = useParams<{ ownerCode: string }>();
  const navigate = useNavigate();
  const [businessOwner, setBusinessOwner] = useState<BusinessOwnerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessOwner = async () => {
      if (!ownerCode) {
        setLoading(false);
        return;
      }

      const res = await getBusinessOwnerByCode(ownerCode);

      if (res.isSuccess && res.data?.businessOwner) {
        setBusinessOwner(res.data.businessOwner);
      } else {
        console.error("Failed to fetch Business Owner:", res.message);
        setBusinessOwner(null);
      }
      setLoading(false);
    };

    fetchBusinessOwner();
  }, [ownerCode]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!businessOwner) return <p className="text-center mt-20">Business owner not found.</p>;

  return (
    <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Business Owner Information</h1>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-b pb-5">
        <div>
          <Label label="Business Owner Code" required />
          <TextInput value={businessOwner.businessownercode} readOnly />
        </div>
        <div>
          <Label label="Full Name" required />
          <TextInput value={businessOwner.fullName} readOnly />
        </div>
        <div>
          <Label label="Email" required />
          <TextInput type="email" value={businessOwner.email} readOnly />
        </div>
        <div>
          <Label label="Phone Number" required />
          <TextInput type="phone number" value={businessOwner.phone} readOnly />
        </div>
      </div>

      <div className="mt-8 text-right">
        <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
