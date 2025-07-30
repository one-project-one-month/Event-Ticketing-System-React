// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { eventListDemoData } from "@/Admin/data/eventListDemoData";
// import { TextInput } from "@/Admin/components/ui/TextInput";
// import { TextArea } from "@/Admin/components/ui/TextArea";

// export default function ViewEventPage() {
//   const { EventUniqueName } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState<any>(null);

//   useEffect(() => {
//     const match = eventListDemoData.find(e => e.EventUniqueName === EventUniqueName);
//     setEvent(match);
//   }, [EventUniqueName]);

//   if (!event) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-8 bg-[#f6f9ff] min-h-screen">
//       <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-[1100px] mx-auto">
//         <h1 className="text-2xl font-semibold text-[#233b75] mb-10">Event Information</h1>

//         {/* Grid for basic inputs */}
//         <div className="grid grid-cols-2 gap-x-10 gap-y-6">
//           <TextInput readOnly value={event.EventCode} placeholder="Event Code" />
//           <TextInput readOnly value={event.EventCategoryCode} placeholder="Event Category Code" />
//           <TextInput readOnly value={event.EventName} placeholder="Event Name" />
//           <TextInput readOnly value={event.EventUniqueName} placeholder="Unique Name" />
//           <TextInput readOnly value={event.BusinessOwnerName} placeholder="Business Owner Name" />
//           <TextInput readOnly value={event.VenueName} placeholder="Venue Name" />
//           <TextInput readOnly value={event.VenueType} placeholder="Venue Type" />
//           <TextInput readOnly value={event.Capacity} placeholder="Capacity" />
//         </div>

//         {/* Description & Facilities */}
//         <div className="grid grid-cols-2 gap-10 mt-10">
//           <div>
//             <label className="text-sm text-[#888] mb-1 block">Description</label>
//             <TextArea readOnly rows={4} value={event.Description} />
//           </div>
//           <div>
//             <label className="text-sm text-[#888] mb-1 block">Facilities</label>
//             <TextArea readOnly rows={4} value={event.Facilities} />
//           </div>
//         </div>

//         {/* Add-ons */}
//         <div className="mt-10">
//           <label className="text-sm text-[#888] mb-2 block">Add-ons</label>
//           <div className="grid grid-cols-4 gap-4">
//             {event.AddOns?.map((addon: string, idx: number) => (
//               <label key={idx} className="flex items-center gap-2 text-sm text-[#444]">
//                 <input type="checkbox" checked readOnly className="accent-[#233b75] w-4 h-4" />
//                 {addon}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Venue Images */}
//         <div className="mt-10">
//           <label className="text-sm text-[#888] mb-2 block">Venue Image</label>
//           <div className="grid grid-cols-3 gap-4">
//             {event.VenueImages?.map((img: string, idx: number) => (
//               <img key={idx} src={img} alt="Venue" className="rounded-md border w-full h-28 object-cover" />
//             ))}
//           </div>
//         </div>

//         {/* Address */}
//         <div className="mt-10">
//           <label className="text-sm text-[#888] mb-2 block">Address</label>
//           <TextArea readOnly rows={2} value={event.Address} />
//         </div>

//         {/* Dates & Status */}
//         <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-10">
//           <TextInput readOnly value={event.StartDate} placeholder="Start Date" />
//           <TextInput readOnly value={event.EndDate} placeholder="End Date" />
//           <TextInput readOnly value={event.TotalTicketQuantity} placeholder="Total Ticket Quantity" />
//           <TextInput readOnly value={event.TicketSold} placeholder="Ticket Sold" />
//           <TextInput readOnly value={event.EventStatus} placeholder="Event Status" />
//           <div className="flex items-center pt-2">
//             <input type="checkbox" readOnly checked={event.IsActive} className="accent-[#233b75] mr-2 w-4 h-4" />
//             <span className="text-sm text-[#444]">Is Active</span>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div className="mt-10 flex justify-end">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-8 py-2 text-sm bg-[#f0f0f0] text-[#333] rounded-md hover:bg-[#e0e0e0]"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { TextArea } from "@/Admin/components/ui/TextArea";
import { useEffect, useState } from "react";

const Label = ({ label, required }: { label: string; required?: boolean }) => (
  <label className="text-xs font-semibold text-[#6C2BD9] mb-1 block">
    {required && <span className="text-[#6C2BD9]">*</span>} {label}
  </label>
);

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
      <h1 className="text-2xl font-semibold mb-6 text-[#233B75]">Event Information</h1>

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
          <Label label="Capacity" />
          <TextInput value={event.Capacity} readOnly />
        </div>
        <div className="col-span-2">
          <Label label="Description" />
          <TextArea rows={3} value={event.Description} readOnly />
        </div>
        <div className="col-span-2">
          <Label label="Facilities" />
          <TextArea rows={3} value={event.Facilities} readOnly />
        </div>

        <div className="col-span-2">
          <Label label="Addons" />
          <div className="flex flex-wrap gap-2">
            {event.Addons?.map((addon: string, i: number) => (
              <span key={i} className="border border-[#6C2BD9] text-[#6C2BD9] text-sm px-3 py-1 rounded-md">
                {addon}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <Label label="Venue Images" />
          <div className="flex gap-4 mt-1">
            {event.Images?.map((img: string, i: number) => (
              <img key={i} src={img} alt="Venue" className="w-32 h-20 object-cover rounded-md border" />
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <Label label="Address" />
          <TextArea value={event.Address} readOnly rows={2} />
        </div>

        <div>
          <Label label="Start Date" />
          <TextInput value={event.StartDate} readOnly />
        </div>
        <div>
          <Label label="End Date" />
          <TextInput value={event.EndDate} readOnly />
        </div>
        <div>
          <Label label="Total Ticket Quantity" />
          <TextInput value={event.TotalTickets} readOnly />
        </div>
        <div>
          <Label label="Ticket Sold" />
          <TextInput value={event.TicketsSold} readOnly />
        </div>
        <div>
          <Label label="Event Status" />
          <TextInput value={event.EventStatus} readOnly />
        </div>
        <div>
          <Label label="Is Active" />
          <TextInput value={event.IsActive ? "Yes" : "No"} readOnly />
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#233B75] text-white px-6 py-2 rounded hover:bg-[#1b2e60] transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
