import { useEffect, useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import { createTicketType } from "@/services/TicketTypeServices";
import type { createTicketTypeData } from "@/Admin/DataTypes/TicketTypes";
import { SelectBox } from "@/Admin/components/ui/SelectBox";
import type { EventData } from "@/Admin/DataTypes/Event";
import {getEvents} from '@/services/EventServices';

export default function CreateTicketType() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState<EventData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res =  await getEvents();
      if(res.isSuccess && Array.isArray(res.data?.eventList)){
          setData(res.data.eventList);
      }else {
          console.error("Failed to fetch Ticket Types:", res.message);
          setData([]);
      }
    };
    fetchData();
  })

  const [form, setForm] = useState<createTicketTypeData>({
    eventCode: "",
    ticketTypeName: "",
    ticketprice: "",
    ticketQuantity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof createTicketTypeData
  ) => {
    const value = key === "ticketQuantity" ? parseInt(e.target.value) || 0 : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");
    try {
      const res = await createTicketType(form);
      if (res && res.isSuccess) {
        setShowSuccess(true);
      } else {
        setError(res.message || "Failed to create ticket type");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#6C2BD9]">Ticket Type Information</h1>
      <h2 className="text-xl mb-6 text-[#6C2BD9]">
        Please fill in all required fields to create a new Ticket Type.
      </h2>
      <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
        <div>
          <Label label="Ticket Type Name" required />
          <TextInput
            placeholder="Enter ticket type name"
            value={form.ticketTypeName}
            onChange={(e) => handleChange(e, "ticketTypeName")}
          />
        </div>
        <div>
          <Label label="Price" required />
          <TextInput
            placeholder="Enter price"
            value={form.ticketprice}
            onChange={(e) => handleChange(e, "ticketprice")}
          />
        </div>
        <div>
          <Label label="Quantity" required />
          <TextInput
            placeholder="Enter quantity"
            type="number"
            value={form.ticketQuantity}
            onChange={(e) => handleChange(e, "ticketQuantity")}
          />
        </div>
        <div>
          <Label label="Event Code" required />
          <SelectBox value={form.eventCode}
          onChange={(e) => 
            setForm({...form, eventCode: e.target.value})
          }>
            <option value="" className="text-center">---Select Event---</option>
            {
              data.map((e) => (
                <option key = {e.eventcode} value={e.eventcode}>
                  {e.eventname}
                </option>
              )
            )}
          </SelectBox>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-8 flex justify-end gap-[20px]">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Create" type="submit" onClick={handleSave} />
      </div>

      <SaveSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onConfirm={() => {
          setShowSuccess(false);
          navigate("/admin/ticket-type");
        }}
      />
    </div>
  );
}
