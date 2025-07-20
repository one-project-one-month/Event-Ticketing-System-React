//import ThankYouDialog from "@/User/components/Events/ThankYouDialog";
import VerifyDialog from "@/User/components/Events/VerifyDialog";
import { Button } from "@/User/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const TicketDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [type, setType] = useState("VVIP");
  const [showVerifyDialog, setShowVerifyDialog] = useState<boolean>(false);
  return (
    <div className="relative flex items-center justify-center py-10">
      <div className="grid w-[75%] grid-cols-2 rounded-sm border bg-[url('/yw-event-img/detail-bg.png')] bg-cover bg-center shadow-sm">
        <div className="items-left flex flex-col justify-end ps-20 pb-20 text-8xl font-extrabold text-white text-shadow-2xs">
          <h2>EDM</h2>
          <h2>FESTIVAL</h2>
        </div>
        <div className="items-left flex flex-col justify-evenly gap-3 bg-white/10 p-20 text-white backdrop-blur-sm">
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
                  className="input-radio"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="input-radio"
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  className="input-radio"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div>
            <p>Ticket Type</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div
                className={`radio-tab rounded-md font-semibold text-gray-500 ${type == "VVIP" ? "bg-[#071739] text-white" : "bg-white"}`}
                onClick={() => setType("VVIP")}
              >
                <p>VVIP</p>
                <p>80000ks</p>
              </div>
              <div
                className={`radio-tab rounded-md font-semibold text-gray-500 ${type == "VIP" ? "bg-[#071739] text-white" : "bg-white"}`}
                onClick={() => setType("VIP")}
              >
                <p>VIP</p>
                <p>50000ks</p>
              </div>
              <div
                className={`radio-tab rounded-md font-semibold text-gray-500 ${type == "Standard" ? "bg-[#071739] text-white" : "bg-white"}`}
                onClick={() => setType("Standard")}
              >
                <p>Standard</p>
                <p>10000ks</p>
              </div>
            </div>
          </div>
          <div>
            <p>Quantity</p>
            <div className="justify-left mt-3 flex items-center gap-1">
              <Button
                className="cursor-pointer"
                onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
              >
                <Minus />
              </Button>
              <input
                type="number"
                value={quantity}
                className="no-spinner w-12 border-b-2 p-1 text-center text-xl font-semibold text-white outline-none"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <Button
                className="cursor-pointer"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="flex justify-end py-10">
            <Button
              onClick={() => setShowVerifyDialog(true)}
              className="w-full cursor-pointer rounded-md bg-[#071739] p-8 text-2xl text-white hover:bg-white hover:text-[#071739]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 flex h-full w-full items-center justify-center backdrop-opacity-5 ${showVerifyDialog ? "block" : "hidden"}`}
      >
        <VerifyDialog show={showVerifyDialog} setShow={setShowVerifyDialog} />
      </div>
    </div>
  );
};

export default TicketDetail;
