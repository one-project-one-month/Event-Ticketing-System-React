import { getUserEventByCode } from "@/services/UserEventServices";
import { GetVerifyCode } from "@/services/VerifyCode";
import VerifyDialog from "@/User/components/Events/VerifyDialog";
import { Button } from "@/User/components/ui/button";
import type { TicketType } from "@/User/DataTypes/Event";
import { type ProcessTransactionPayload } from "@/User/DataTypes/Transaction";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketDetail = () => {
  const { eventcode } = useParams<{ eventcode: string }>();
  const [transaction, setTransaction] = useState<ProcessTransactionPayload>({
    eventCode: eventcode as string,
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    ticketTypeCode: "",
    ticketQuantity: 1,
  });
  const [showVerifyDialog, setShowVerifyDialog] = useState<boolean>(false);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [type, setType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const selectedTicket = ticketTypes.find((t) => t.tickettypecode === type);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ProcessTransactionPayload,
  ) => {
    setTransaction((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const fetchUserEventByCode = async (eventcode: string) => {
    const res = await getUserEventByCode(eventcode);
    if (res.isSuccess && res.data != null) {
      console.log("User events: ", res.data);
      setTicketTypes(res.data.ticketTypes);
      setEventName(res.data.eventname);
      if (res.data.ticketTypes.length > 0) {
        const firstTicketType = res.data.ticketTypes[0].tickettypecode;
        setType(firstTicketType);
        setTransaction((prev) => ({ ...prev, ticketTypeCode: firstTicketType }));
      }
    } else {
      console.log("User Event error: ", res.message);
      setTicketTypes([]);
    }
  };

  const handleConfirm = async () => {
    if (
      !transaction.email ||
      !transaction.eventCode ||
      !transaction.fullName ||
      !transaction.gender ||
      !transaction.ticketQuantity ||
      !transaction.ticketTypeCode ||
      !transaction.phone
    ) {
      setError("please fill all field");
      return;
    }
    console.log("Email : ", transaction.email);
    const res = await GetVerifyCode({ email: transaction.email });
    if (res.isSuccess) {
      setShowVerifyDialog(true);
    } else {
      setShowVerifyDialog(false);
      setError("something is wrong");
    }
  };

  useEffect(() => {
    fetchUserEventByCode(eventcode as string);
  }, []);

  if (!eventcode) return null;

  return (
    <div className="relative flex items-center justify-center py-10">
      <div className="grid w-[75%] grid-cols-2 rounded-sm border bg-[url('/yw-event-img/detail-bg.png')] bg-cover bg-center shadow-sm">
        <div className="items-left flex flex-col justify-end ps-20 pb-20 text-8xl font-extrabold text-white text-shadow-2xs">
          <h2>{eventName}</h2>
        </div>
        <div className="items-left flex flex-col justify-evenly gap-5 bg-black/10 p-20 text-white backdrop-blur-md">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl font-semibold">
              Full Name
            </label>
            <div className="rounded-md border-2 border-transparent bg-white p-5 hover:border-black">
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="w-full border-s-2 border-black bg-white ps-1 text-black outline-none"
                onChange={(e) => handleChange(e, "fullName")}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-xl font-semibold">
              Phone
            </label>
            <div className="rounded-md border-2 border-transparent bg-white p-5 hover:border-black">
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                className="w-full border-s-2 border-black bg-white ps-1 text-black outline-none"
                onChange={(e) => handleChange(e, "phone")}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <div className="rounded-md border-2 border-transparent bg-white p-5 hover:border-black">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full border-s-2 border-black bg-white ps-1 text-black outline-none"
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold">Gender</p>
            <div className="justify-left flex items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="input-radio"
                  onChange={(e) => handleChange(e, "gender")}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  id="female"
                  value="female"
                  name="gender"
                  className="input-radio"
                  onChange={(e) => handleChange(e, "gender")}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  id="other"
                  value="other"
                  name="gender"
                  className="input-radio"
                  onChange={(e) => handleChange(e, "gender")}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="ticketType" className="text-xl font-semibold">
              Ticket Type
            </label>
            <div className="flex w-full justify-start gap-5">
              {ticketTypes.map((t) => {
                const isSelected = t.tickettypecode === type;
                return (
                  <div
                    key={t.tickettypecode}
                    className={`w-fit cursor-pointer rounded-sm px-4 py-3 text-center ${
                      isSelected
                        ? "bg-[#103263] text-white"
                        : "bg-white text-[#103263]"
                    }`}
                    onClick={() => {
                      setType(t.tickettypecode);
                      setTransaction((prev) => ({
                        ...prev,
                        ticketTypeCode: t.tickettypecode,
                      }));
                    }}
                  >
                    <h3 className="font-semibold">{t.tickettypename}</h3>
                    <p>{t.ticketprice.toLocaleString()} MMK</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p>Quantity</p>
            <div className="justify-left mt-3 flex items-center gap-1">
              <Button
                className="cursor-pointer"
                onClick={() => {
                  if (transaction.ticketQuantity > 1) {
                    setTransaction((prev) => ({
                      ...prev,
                      ticketQuantity: prev.ticketQuantity - 1,
                    }));
                  }
                }}
              >
                <Minus />
              </Button>
              <input
                type="number"
                value={transaction.ticketQuantity}
                className="no-spinner w-12 border-b-2 p-1 text-center text-xl font-semibold text-white outline-none"
                onChange={(e) =>
                  setTransaction((prev) => ({
                    ...prev,
                    ticketQuantity: Number(e.target.value),
                  }))
                }
              />
              <Button
                className="cursor-pointer"
                onClick={() =>
                  setTransaction((prev) => ({
                    ...prev,
                    ticketQuantity: prev.ticketQuantity + 1,
                  }))
                }
              >
                <Plus />
              </Button>
            </div>
            {selectedTicket && (
              <p className="mt-5 text-lg font-semibold">
                Total Cost:{" "}
                {(
                  Number(selectedTicket.ticketprice) *
                  transaction.ticketQuantity
                ).toLocaleString()}{" "}
                ks
              </p>
            )}
          </div>
          {error && (
            <p className="h-3 text-center text-xl font-semibold text-red-500">
              {error}
            </p>
          )}
          <div className="flex justify-end pb-5">
            <Button
              onClick={handleConfirm}
              className="w-full cursor-pointer rounded-md bg-[#071739] p-8 text-2xl text-white hover:bg-white hover:text-[#071739]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 flex h-full w-full items-center justify-center backdrop-opacity-30 ${showVerifyDialog ? "block" : "hidden"}`}
      >
        <VerifyDialog
          show={showVerifyDialog}
          setShow={setShowVerifyDialog}
          email={transaction.email}
          transactionPayload={transaction}
        />
      </div>
    </div>
  );
};

export default TicketDetail;
