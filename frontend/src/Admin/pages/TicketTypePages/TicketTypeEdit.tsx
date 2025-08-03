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
    const { ticketTypeCode } = useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
    TicketTypeCode: "",
    TicketTypeName: "",
    TicketPrice: "",
    TicketQuantity: 0,
    EventName: "",
    EventCode: ""
    });

    useEffect(() => {
      if(!ticketTypeCode) return;
      const fetchData = async () => {
        setLoading(true);
        const res = await getTicketTypeByCode(ticketTypeCode);
        if(res.isSuccess && res.data?.TicketType){
          const event = res.data.TicketType;

          setForm({
            TicketTypeCode: event.tickettypecode,
            TicketTypeName: event.tickettypename,
            TicketPrice: event.ticketprice,
            TicketQuantity: event.ticketquantity,
            EventCode: event.eventcode,
            EventName: event.eventname
          });
        }else{
          console.error("Failed to fetch ticket type: ", res.message)
        }
        setLoading(false);
      };
      fetchData();
      }, [ticketTypeCode]);

      const handleUpdate = async () => {
        const res = await updateTicketType({
            tickettypecode: form.TicketTypeCode,
            tickettypename:form.TicketTypeName
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
                    <Label label="Event Type Name" required />
                    <TextInput
                    value={form.TicketTypeName} onChange={(e) =>
                    setForm({ ...form, TicketTypeName: e.target.value })
                }/>
                </div>
                <div>
                  <Label label="Price" required />
                  <TextInput
                    value={form.TicketPrice} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Quantity" required />
                  <TextInput
                    value={form.TicketQuantity} 
                    disabled
                  />
                </div>
                <div>
                  <Label label="Event Name" required />
                  <TextInput
                    value={form.EventName} 
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
