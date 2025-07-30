// src/Admin/pages/Event/Edit.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { Input } from "@/User/components/ui/input";
import { Button } from "@/User/components/ui/button";

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = () => {
    setForm(prev => ({ ...prev, IsActive: !prev.IsActive }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Event:", form);
    alert("This is demo-only. Event changes are not saved.");
    navigate("/admin/event/list");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="EventCode"
          value={form.EventCode}
          onChange={handleChange}
          placeholder="Event Code"
        />
        <Input
          name="EventName"
          value={form.EventName}
          onChange={handleChange}
          placeholder="Event Name"
        />
        <Input
          name="EventUniqueName"
          value={form.EventUniqueName}
          onChange={handleChange}
          placeholder="Unique Name"
          disabled
        />
        <Input
          name="BusinessOwnerName"
          value={form.BusinessOwnerName}
          onChange={handleChange}
          placeholder="Business Owner"
        />
        <Input
          name="VenueName"
          value={form.VenueName}
          onChange={handleChange}
          placeholder="Venue Name"
        />
        <label className="block text-sm font-medium">Start Date</label>
        <Input
          type="datetime-local"
          name="StartDate"
          value={form.StartDate}
          onChange={handleChange}
        />
        <label className="block text-sm font-medium">End Date</label>
        <Input
          type="datetime-local"
          name="EndDate"
          value={form.EndDate}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.IsActive}
            onChange={handleToggleActive}
          />
          <label>Status: {form.IsActive ? "Active" : "Inactive"}</label>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
