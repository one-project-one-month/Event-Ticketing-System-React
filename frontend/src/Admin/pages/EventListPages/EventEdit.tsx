import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { Checkbox} from "@/Admin/components/ui/Checkbox";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";
import { getEventByCode, updateEventType } from "@/services/EventServices";
import { getEventStatusOptions } from "@/services/EventServices";
import type { eventStatusOptionsData } from "@/Admin/DataTypes/Event";
import { SelectBox } from "@/Admin/components/ui/SelectBox";

export default function EventEditPage() {
  const { eventCode } = useParams<{ eventCode: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventStatusData, SetEventStatusData] = useState<eventStatusOptionsData[]>([]);

  const [form, setForm] = useState({
    eventcode: "",
    eventname: "",
    uniquename: "",
    eventcategory: "",
    businessownername: "",
    venuename: "",
    totalticketquantity: 0,
    startdate: "",
    enddate: "",
    eventStatus: "",
    isactive: false
  });


useEffect(() => {
    if(!eventCode) return;
    const fetchData = async () => {
      setLoading(true);
      const res = await getEventByCode(eventCode);
      if(res.isSuccess && res.data?.event){
        const event = res.data.event;

        setForm({
          eventcode : event.eventcode,
          eventname : event.eventname,
          uniquename : event.uniquename,
          eventcategory : event.eventcategory,
          businessownername : event.businessownername,
          venuename : event.venuename,
          totalticketquantity : event.totalticketquantity,
          startdate : event.startdate,
          enddate : event.enddate,
          eventStatus : event.eventstatus,
          isactive : event.isactive
        });
      }else{
        console.error("Failed to fetch event: ", res.message)
      }
      setLoading(false);
    };
      fetchData();
    }, [eventCode]);

    useEffect(() => {
        const fetchData = async() => {
            const eventStatusRes = await getEventStatusOptions();
            if(eventStatusRes.isSuccess && Array.isArray(eventStatusRes.data?.eventStatusOptions)){
                SetEventStatusData(eventStatusRes.data.eventStatusOptions);
            }
            else{
                console.error("Failed to fetch Eventstatus Options: ", eventStatusRes.message);
                SetEventStatusData([]);
            }
        };
        fetchData();
    }, [])

    const handleUpdate = async () => {
      const res = await updateEventType({
          eventCode: form.eventcode,
          isactive:form.isactive,
          eventStatus : form.eventStatus
        });
    
        if(res.isSuccess){
          setShowSuccess(true);
        }
        else{
          console.log("Error updating: " , res.message);
          alert
        }
    };

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Information</h1>
      {loading ? (
        <p className="text-center mt-20">Loading....</p>
      ) : (
        <>
            <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
              <div>
                <Label label="Event Name" required />
              <TextInput
                value={form.eventname}
                disabled
              />
              </div>
              <div>
                <Label label="Event Unique Name" required />
              <TextInput
                value={form.uniquename}
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
                value={form.businessownername} 
                disabled
              />
              </div>
              <div>
                <Label label="Venue Name" required />
              <TextInput
                value={form.venuename} 
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
                value={form.startdate}
                disabled/>
              </div>
              <div>
                <Label label="End Date" required />
              <TextInput
              value={form.enddate} 
              disabled
              />
              </div>
              <div>
                  <Label label="Event Status" required/>
                  <SelectBox value={form.eventStatus} 
                  onChange={(e) => 
                      setForm({...form, eventStatus : e.target.value})
                  }>
                      <option value="" className="text-center">---Select Eventstatus---</option>
                      {
                          eventStatusData.map((e) => (
                              <option key={e.value} value={e.value}>
                                  {e.label}
                              </option>
                          ))
                      }
                  </SelectBox>  
              </div>
              <div>
                <Checkbox
                label="Is Active"
                checked={form.isactive}
                onChange={(e) => setForm({ ...form, isactive: e.target.checked })}
                />
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
