import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { Checkbox} from "@/Admin/components/ui/Checkbox";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";

export default function EventEditPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    EventCode: "",
    EventName: "",
    EventUniqueName: "",
    BusinessOwnerName: "",
    VenueName: "",
    StartDate: "",
    EndDate: "",
    IsActive: false,
  });

useEffect(() => {
  const found = eventListDemoData.find(e => e.EventUniqueName === eventId);
  if (found) {
    const start = new Date(found.StartDate);
    const end = new Date(found.EndDate);

    setForm({
      EventCode: found.EventCode,
      EventName: found.EventName,
      EventUniqueName: found.EventUniqueName,
      BusinessOwnerName: found.BusinessOwnerName,
      VenueName: found.VenueName,
      StartDate: !isNaN(start.getTime()) ? start.toISOString().slice(0, 16) : "",
      EndDate: !isNaN(end.getTime()) ? end.toISOString().slice(0, 16) : "",
      IsActive: found.IsActive,
    });
  }
}, [eventId]);

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Information</h1>
      <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
        <div>
           <Label label="Event Name" required />
        <TextInput
          value={form.EventName} 
          disabled
        />
        </div>
        <div>
          <Label label="Event Unique Name" required />
        <TextInput
          value={form.EventUniqueName}
          disabled
        />
        </div>
        <div>
          <Label label="Event Category" required />
        <TextInput
         value={"MapThisWithAPI"}
         disabled
         />
        </div>
        <div>
          <Label label="Business Owner Name" required />
        <TextInput
          value={form.BusinessOwnerName} 
          disabled
        />
        </div>
        <div>
          <Label label="Venue Name" required />
        <TextInput
          value={form.VenueName} 
          disabled
        />
        </div>
        <div>
          <Label label="Total Ticket Quantity" required />
        <TextInput
        value={"MapThisWithAPI"}
        disabled
        />
        </div>
        <div>
          <Label label="Start Date" required />
        <TextInput
          value={form.StartDate}
          disabled/>
        </div>
        <div>
          <Label label="End Date" required />
        <TextInput
        value={form.EndDate} 
        disabled
        />
        </div>
        <div>
          <Checkbox
          label="Is Active"
          checked={form.IsActive}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-[20px]">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Update" type="submit" />
      </div>
    </div>
  );
}
