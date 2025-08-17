import { useEffect, useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import DateTimePicker from "@/Admin/components/ui/DateTimePicker";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import type { createEventData } from "@/Admin/DataTypes/Event";
import { createEvent } from "@/services/EventServices";
import { SelectBox } from "@/Admin/components/ui/SelectBox";
import type { EventTypeData } from "@/Admin/DataTypes/EventTypes";
import type { BusinessOwnerData } from "@/Admin/DataTypes/BusinessOwner";
import { getEventTypes } from "@/services/EventTypeServices";
import { getBusinessOwners } from "@/services/BusinessOwnerServices";
import { Checkbox } from "@/Admin/components/ui/Checkbox";
import type { VenueData } from "@/Admin/DataTypes/VenueDataTypes";
import { getVenues } from "@/services/VenueService";
import ErrorMessage from "@/Admin/components/Layouts/ErrorMessage.tsx";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [eventTypeData, SetEventTypeData] = useState<EventTypeData[]>([]);
  const [businessOwnerData, SetBusinessOwnerData] = useState<
    BusinessOwnerData[]
  >([]);
  const [venueData, SetVenueData] = useState<VenueData[]>([]);

  const [form, setForm] = useState<createEventData>({
    eventname: "",
    uniquename: "",
    eventcategorycode: "",
    businessownercode: "",
    venuecode: "",
    totalticketquantity: "",
    startdate: new Date(),
    enddate: new Date(),
    isactive: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const eventTypeRes = await getEventTypes();
      if (
        eventTypeRes.isSuccess &&
        Array.isArray(eventTypeRes.data?.eventCategories)
      ) {
        SetEventTypeData(eventTypeRes.data.eventCategories);
      } else {
        console.error("Failed to fetch Ticket Types:", eventTypeRes.message);
        SetEventTypeData([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const businessOwnerRes = await getBusinessOwners();
      if (
        businessOwnerRes.isSuccess &&
        Array.isArray(businessOwnerRes.data?.businessOwners)
      ) {
        SetBusinessOwnerData(businessOwnerRes.data.businessOwners);
      } else {
        console.error(
          "Failed to fetch Businessowners:",
          businessOwnerRes.message,
        );
        SetBusinessOwnerData([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const venueRes = await getVenues();
      if (venueRes.isSuccess && Array.isArray(venueRes.data?.venueList)) {
        SetVenueData(venueRes.data.venueList);
      } else {
        console.error("Failed to fetch Businessowners:", venueRes.message);
        SetVenueData([]);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof createEventData,
  ) => {
    const value =
      key === "totalticketquantity"
        ? parseInt(e.target.value) || 0
        : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");

    if (form.startdate > form.enddate) {
      setError("Start date cannot be later than end date.");
      return;
    }
    if (form.enddate < form.startdate) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    try {
      const res = await createEvent(form);
      if (res && res.isSuccess) {
        setShowSuccess(true);
      } else {
        setError(res.message || "Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl rounded-md bg-white p-20">
      <h1 className="mb-6 text-3xl font-bold text-[#6C2BD9]">
        Event Information
      </h1>
      <h2 className="mb-6 text-xl text-[#6C2BD9]">
        Please fill in all required fields to create a new event.
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-x-25 gap-y-10">
        <div>
          <Label label="Event Name" required />
          <TextInput
            placeholder="Enter event name"
            value={form.eventname}
            onChange={(e) => handleChange(e, "eventname")}
          />
        </div>
        <div>
          <Label label="Event Unique Name" required />
          <TextInput
            type="text"
            placeholder="Enter event unique name"
            value={form.uniquename}
            onChange={(e) => handleChange(e, "uniquename")}
          />
        </div>
        <div>
          <Label label="Event Category" required />
          <SelectBox
            value={form.eventcategorycode}
            onChange={(e) =>
              setForm({ ...form, eventcategorycode: e.target.value })
            }
          >
            <option value="" className="text-center">
              ---Select Event Category---
            </option>
            {eventTypeData.map((e) => (
              <option key={e.eventCategorycode} value={e.eventCategorycode}>
                {e.categoryname}
              </option>
            ))}
          </SelectBox>
        </div>
        <div>
          <Label label="Business Owner Name" required />
          <SelectBox
            value={form.businessownercode}
            onChange={(e) =>
              setForm({ ...form, businessownercode: e.target.value })
            }
          >
            <option value="" className="text-center">
              ---Select Business Owner---
            </option>
            {businessOwnerData.map((e) => (
              <option key={e.businessownercode} value={e.businessownercode}>
                {e.fullName}
              </option>
            ))}
          </SelectBox>
        </div>
        <div>
          <Label label="Venue Name" required />
          <SelectBox
            value={form.venuecode}
            onChange={(e) => setForm({ ...form, venuecode: e.target.value })}
          >
            <option value="" className="text-center">
              ---Select Venue---
            </option>
            {venueData.map((e) => (
              <option key={e.venueCode} value={e.venueCode}>
                {e.venueName}
              </option>
            ))}
          </SelectBox>
        </div>
        <div>
          <Label label="Total Ticket Quantity" required />
          <TextInput
            type="number"
            placeholder="Enter total ticket quantity"
            value={form.totalticketquantity}
            onChange={(e) => handleChange(e, "totalticketquantity")}
          />
        </div>
        <div>
          <Label label="Start Date" required />
          <DateTimePicker
            value={form.startdate}
            onChange={(date) =>
              setForm((prev) => ({ ...prev, startdate: date || new Date() }))
            }
          />
        </div>
        <div>
          <Label label="End Date" required />
          <DateTimePicker
            value={form.enddate}
            onChange={(date) =>
              setForm((prev) => ({ ...prev, enddate: date || new Date() }))
            }
          />
        </div>
        <div>
          <Checkbox
            label="Is Active"
            checked={form.isactive}
            onChange={(e) => setForm({ ...form, isactive: e.target.checked })}
          />
        </div>
      </div>

      {error && <ErrorMessage text={error} />}

      <div className="mt-8 flex justify-end gap-[20px]">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Create" type="submit" onClick={handleSave} />
        <SaveSuccessModal
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          onConfirm={() => {
            setShowSuccess(false);
            navigate("/admin/event/list");
          }}
        />
      </div>
    </div>
  );
}
