import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";
import { getEventTypeByCode, updateEventType } from "@/services/EventTypeServices";

export default function EventTypeEditPage() {
  const navigate = useNavigate();
  const { eventCategorycode } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    eventCategoryid: "",
    eventCategorycode: "",
    categoryname: "",
    createdby: "",
    createdat: new Date(),
  });

  useEffect(() => {
    if (!eventCategorycode) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await getEventTypeByCode(eventCategorycode);

      if (res.isSuccess && res.data?.event) {
        const event = res.data.event;

        setForm({
          eventCategoryid: event.eventCategoryid,
          eventCategorycode: event.eventCategorycode,
          categoryname: event.categoryname,
          createdby: event.createdby,
          createdat: new Date(event.createdat),
        });
      } else {
        console.error("Failed to fetch event type:", res.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [eventCategorycode]);

  const handleUpdate = async () => {
    const res = await updateEventType({
      eventCategoryCode: form.eventCategorycode,
      categoryName: form.categoryname,
    });

    if (res.isSuccess) {
      setShowSuccess(true);
    } else {
      alert(res.message || "Update failed.");
    }
  };

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
            <div>
              <Label label="Event Type Name" required />
              <TextInput
                value={form.categoryname}
                onChange={(e) => setForm({ ...form, categoryname: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-[20px]">
            <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
            <YellowButton text="Update" type="submit" onClick={handleUpdate} />
          </div>
        </>
      )}

      <UpdateSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
