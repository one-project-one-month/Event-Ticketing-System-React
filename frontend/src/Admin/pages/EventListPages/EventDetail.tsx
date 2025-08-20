import { useParams, useNavigate } from "react-router-dom";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { TextArea } from "@/Admin/components/ui/TextArea";
import { useEffect, useState } from "react";
import { Checkbox } from "@/Admin/components/ui/Checkbox";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import {getEventByCode} from '@/services/EventServices';
import type { EventByCodeData } from "@/Admin/DataTypes/Event";

export default function EventDetail() {
  const { eventCode } = useParams<{ eventCode: string }>();
  const navigate = useNavigate();
  const [event, setEvents] = useState<EventByCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
      const fetchTicketType = async () => {
          if (!eventCode) {
              setLoading(false);
              return;
          }
          const res = await getEventByCode(eventCode);
          console.log("API response:", res);
          if (res.isSuccess && res.data?.event) {
              console.log("Event fetched successfully:", res.data.event);
              setEvents(res.data.event); 
          } else {
              console.error("Failed to fetch event:", res.message);
              setEvents(null);
          }
          setLoading(false);
      };
      fetchTicketType();
  }, [eventCode]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!event) return <p className="text-center mt-20">Event not found.</p>;

  return (
    <div className="p-10 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Information</h1>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <Label label="Event Code" required />
          <TextInput value={event.eventcode} readOnly />
        </div>
        <div>
          <Label label="Event Category Code" required />
          <TextInput value={event.eventcategory} readOnly />
        </div>
        <div>
          <Label label="Event Name" required />
          <TextInput value={event.eventname} readOnly />
        </div>
        <div>
          <Label label="Unique Name" required />
          <TextInput value={event.uniquename} readOnly />
        </div>
        <div>
          <Label label="Business Owner Name" required />
          <TextInput value={event.businessownername} readOnly />
        </div>
        <div>
          <Label label="Venue Name" required />
          <TextInput value={event.venuename} readOnly />
        </div>
        <div>
          <Label label="Venue Type" />
          <TextInput value={event.venuetypename} readOnly />
        </div>
        <div>
          <Label label="Capacity" required />
          <TextInput value={event.capacity} readOnly />
        </div>
      </div>

      {/* Description & Facilities side-by-side */}
      <div className="flex gap-10 mt-8">
        <div className="flex-1">
          <Label label="Description" required />
          <TextArea rows={3} value={event.description} readOnly />
        </div>
        <div className="flex-1">
          <Label label="Facilities" required />
          <TextArea rows={3} value={event.facilities} readOnly />
        </div>
      </div>

      {/* Addons & Venue Images side-by-side */}
      <div className="flex gap-10 mt-8">
        <div className="flex-1">
          <Label label="Addons" required />
          <div className="flex flex-wrap gap-2 mt-1">
            {event.addons?.map((addon: string, i: number) => (
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
            {event.venueImage?.map((img: string, i: number) => (
              <img
                key={i}
                src={`${baseURL}/${img}`}
                alt="Venue"
                className="w-32 h-20 object-cover border"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Address full width */}
      <div className="mt-8">
        <Label label="Address" required />
        <TextArea value={event.address} readOnly rows={2} />
      </div>

      {/* Start Date & End Date in 2-column grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-8">
        <div>
          <Label label="Start Date" required />
          <TextInput value={event.startdate} readOnly />
        </div>
        <div>
          <Label label="End Date" required />
          <TextInput value={event.enddate} readOnly />
        </div>
      </div>

      {/* Total Ticket Quantity, Ticket Sold & Event Status in 3-column grid */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-5 mt-8">
        <div>
          <Label label="Total Ticket Quantity" required />
          <TextInput value={event.totalticketquantity} readOnly />
        </div>
        <div>
          <Label label="Ticket Sold" required />
          <TextInput value={event.soldoutcount} readOnly />
        </div>
        <div>
          <Label label="Event Status" required />
          <TextInput value={event.eventstatus} readOnly />
        </div>
      </div>

      {/* Checkbox below with some top padding */}
      <div className="pt-5">
        <Checkbox label="Active" checked={event.isactive} />
      </div>

      <div className="mt-8 text-right">
        <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
