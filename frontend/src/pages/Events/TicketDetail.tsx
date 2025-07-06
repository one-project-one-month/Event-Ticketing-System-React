import VerifyDialog from "@/components/Events/VerifyDialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const TicketDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [type, setType] = useState("VVIP");
  const [showVerifyDialog, setShowVerifyDialog] = useState<boolean>(false);
  return (
    <div className="relative flex items-center justify-center pt-10">
      <div className="flex rounded-sm border shadow-sm">
        <div className="flex w-[50%] flex-col items-center justify-center bg-gray-300 bg-cover bg-center p-4">
          <img
            src="https://placehold.co/400x600/png"
            alt=""
            className="h-[400px] w-full rounded object-cover object-center"
          />
          <div className="pt-20 text-center">
            <h2>Title content</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis,
              provident?
            </p>
          </div>
        </div>
        <div className="items-left flex w-[50%] flex-col justify-evenly gap-3 p-5 ps-10">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="rounded border border-black p-3"
            />
          </div>
          <div>
            <p className="text-xl font-semibold">Gender</p>
            <div className="justify-left flex items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <input type="radio" id="male" name="gender" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <input type="radio" id="female" name="gender" />
                <label htmlFor="female">Female</label>
              </div>
              <div className="flex items-center justify-center gap-2">
                <input type="radio" id="other" name="gender" />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-xl font-semibold">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="rounded border border-black p-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded border border-black p-3"
            />
          </div>
          <div>
            <p>Ticket Type</p>
            <div className="mt-3 grid w-[60%] grid-cols-3">
              <div
                className={`radio-tab border border-black ${type == "VVIP" && "bg-gray-500 text-white"}`}
                onClick={() => setType("VVIP")}
              >
                <p>VVIP</p>
                <p>80000ks</p>
              </div>
              <div
                className={`radio-tab border-t border-b border-black ${type == "VIP" && "bg-gray-500 text-white"}`}
                onClick={() => setType("VIP")}
              >
                <p>VIP</p>
                <p>50000ks</p>
              </div>
              <div
                className={`radio-tab border border-black ${type == "Standard" && "bg-gray-500 text-white"}`}
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
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus />
              </Button>
              <input
                type="number"
                value={quantity}
                className="no-spinner w-12 rounded border p-1 outline-none"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <Button
                className="cursor-pointer"
                onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
              >
                <Minus />
              </Button>
            </div>
          </div>
          <div className="flex justify-end py-10">
            <Button
              onClick={() => setShowVerifyDialog(true)}
              className="cursor-pointer rounded-3xl border border-black bg-transparent p-8 text-2xl text-black hover:text-white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 flex h-full w-full items-center justify-center backdrop-opacity-5 ${showVerifyDialog ? "block" : "hidden"}`}
      >
        <VerifyDialog show={showVerifyDialog} />
      </div>
    </div>
  );
};

export default TicketDetail;
