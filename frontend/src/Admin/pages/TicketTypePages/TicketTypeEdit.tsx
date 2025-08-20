import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import UpdateSuccessModal from "@/Admin/components/ui/UpdateSuccessModal";
import { getTicketTypeByCode, updateTicketType } from "@/services/TicketTypeServices";

export default function TicketTypeEditPage() {
    const navigate = useNavigate();
    const { code } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
    tickettypecode: "",
    tickettypename: "",
    ticketprice: "",
    tickettypquantity: 0,
    eventname: "",
    eventcode: ""
    });

    useEffect(() => {
    if(!code) return;
    const fetchData = async () => {
      setLoading(true);
      const res = await getTicketTypeByCode(code);
      if(res.isSuccess && res.data?.ticketType){
        const event = res.data.ticketType;

        setForm({
          tickettypecode: event.ticketTypeCode,
          tickettypename: event.ticketTypeName,
          ticketprice: event.ticketprice,
          tickettypquantity: event.ticketQuantity,
          eventcode: event.eventCode,
          eventname: event.eventName
        });
      }else{
        console.error("Failed to fetch ticket type: ", res.message)
      }
      setLoading(false);
    };
      fetchData();
    }, [code]);

const handleUpdate = async () => {
  const res = await updateTicketType({
      ticketTypeCode: form.tickettypecode,
      ticketTypeName:form.tickettypename
    });

    if(res.isSuccess){
      setShowSuccess(true);
    }
    else{
      alert
    }
  };

    return(
        <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#233B75]">Event Category Information</h1>
            {loading ? (
              <p className="text-center mt-20">Loading...</p>
            ) : (
              <>
                <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
                <div>
                    <Label label="Ticket Type Name" required />
                    <TextInput
                    value={form.tickettypename} onChange={(e) =>
                    setForm({ ...form, tickettypename: e.target.value })
                }/>
                </div>
                <div>
                  <Label label="Price" required />
                  <TextInput
                    value={form.ticketprice} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Quantity" required />
                  <TextInput
                    value={form.tickettypquantity ? form.tickettypquantity.toString() : ""} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Event Name" required />
                  <TextInput type="text"
                    value={form.eventname} 
                    disabled
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
