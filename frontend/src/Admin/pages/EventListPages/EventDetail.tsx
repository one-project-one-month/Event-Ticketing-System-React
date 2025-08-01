import { useParams, useNavigate } from "react-router-dom";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { TextArea } from "@/Admin/components/ui/TextArea";
import { useEffect, useState } from "react";
import { Checkbox } from "@/Admin/components/ui/Checkbox";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";

export default function EventDetail() {
  const { EventUniqueName } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const found = eventListDemoData.find((e) => e.EventUniqueName === EventUniqueName);
    setEvent(found || null);
  }, [EventUniqueName]);

  if (!event) return <p className="text-center mt-20">Event not found.</p>;

  return (
    <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Information</h1>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <Label label="Event Code" required />
          <TextInput value={event.EventCode} readOnly />
        </div>
        <div>
          <Label label="Event Category Code" required />
          <TextInput value={event.EventCategoryCode} readOnly />
        </div>
        <div>
          <Label label="Event Name" required />
          <TextInput value={event.EventName} readOnly />
        </div>
        <div>
          <Label label="Unique Name" required />
          <TextInput value={event.EventUniqueName} readOnly />
        </div>
        <div>
          <Label label="Business Owner Name" required />
          <TextInput value={event.BusinessOwnerName} readOnly />
        </div>
        <div>
          <Label label="Venue Name" required />
          <TextInput value={event.VenueName} readOnly />
        </div>
        <div>
          <Label label="Venue Type" />
          <TextInput value={event.VenueType} readOnly />
        </div>
        <div>
          <Label label="Capacity" required />
          <TextInput value={event.Capacity} readOnly />
        </div>
      </div>

      {/* Description & Facilities side-by-side */}
      <div className="flex gap-10 mt-8">
        <div className="flex-1">
          <Label label="Description" required />
          <TextArea rows={3} value={event.Description} readOnly />
        </div>
        <div className="flex-1">
          <Label label="Facilities" required />
          <TextArea rows={3} value={event.Facilities} readOnly />
        </div>
      </div>

      {/* Addons & Venue Images side-by-side */}
      <div className="flex gap-10 mt-8">
        <div className="flex-1">
          <Label label="Addons" required />
          <div className="flex flex-wrap gap-2 mt-1">
            {event.Addons?.map((addon: string, i: number) => (
              <span
                key={i}
                className="border border-[#6C2BD9] text-[#6C2BD9] text-sm px-3 py-1 rounded-md"
              >
                {addon}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <Label label="Venue Images" required />
          <div className="flex gap-4 mt-1">
            {event.Images?.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt="Venue"
                className="w-32 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Address full width */}
      <div className="mt-8">
        <Label label="Address" required />
        <TextArea value={event.Address} readOnly rows={2} />
      </div>

      {/* Start Date & End Date in 2-column grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-8">
        <div>
          <Label label="Start Date" required />
          <TextInput value={event.StartDate} readOnly />
        </div>
        <div>
          <Label label="End Date" required />
          <TextInput value={event.EndDate} readOnly />
        </div>
      </div>

      {/* Total Ticket Quantity, Ticket Sold & Event Status in 3-column grid */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-5 mt-8">
        <div>
          <Label label="Total Ticket Quantity" required />
          <TextInput value={event.TotalTickets} readOnly />
        </div>
        <div>
          <Label label="Ticket Sold" required />
          <TextInput value={event.TicketsSold} readOnly />
        </div>
        <div>
          <Label label="Event Status" required />
          <TextInput value={event.EventStatus} readOnly />
        </div>
      </div>

      {/* Checkbox below with some top padding */}
      <div className="pt-5">
        <Checkbox label="Active" checked={event.IsActive} />
      </div>

      <div className="mt-8 text-right">
        <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
