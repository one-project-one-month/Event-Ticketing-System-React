import {
  Calendar,
  MapPinned,
  MessageCircleWarning,
  Ticket,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const TicketInfo = () => {
  return (
    <div className="flex flex-col">
      <div className="relative flex w-full bg-[url('/yw-event-img/detail-bg.png')] bg-cover bg-center pt-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#071739]/100 to-[#14409f]/60"></div>
        <div className="z-10 flex w-full flex-col items-center justify-start">
          <div className="w-ful flex w-[30%] flex-col items-center px-5">
            <img
              src="/yw-event-img/event.png"
              alt=""
              className="h-[500px] w-full rounded-md object-cover object-center"
            />
            <h2 className="text-[2.7rem] font-bold text-white uppercase">
              EDM FESTIVAL 2025
            </h2>
          </div>
          <div className="flex w-full justify-between px-15 py-8 text-white">
            <div className="flex w-[60%] flex-col gap-5 pt-5">
              <div className="flex justify-start gap-4">
                <Calendar size={50} />
                <div className="text-3xl leading-12 font-semibold">
                  <p>Saturday, Oct 18, 2025</p>
                  <p>4:00 PM – Midnight</p>
                </div>
              </div>
              <div className="flex justify-start gap-4">
                <MapPinned size={50} />
                <div className="text-3xl leading-12 font-semibold">
                  <p>Yangon Convention Center (YCC)</p>
                  <p>
                    Kabar Aye Pagoda Rd, Mayangone Township, Yangon, Myanmar
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-[40%] flex-col items-end gap-5 px-5 pt-5">
              <h2 className="flex items-center justify-start gap-5 place-self-start text-3xl font-semibold">
                <Ticket size={40} /> Ticket Information
              </h2>
              <div className="flex justify-end gap-5">
                <div className="w-fit cursor-pointer rounded-sm bg-white px-4 py-3 text-center text-[#103263]">
                  <h3 className="font-semibold">VVIP</h3>
                  <p>90000 MMK</p>
                </div>
                <div className="w-fit cursor-pointer rounded-sm bg-white px-4 py-3 text-center text-[#103263]">
                  <h3 className="font-semibold">VVIP</h3>
                  <p>90000 MMK</p>
                </div>
                <div className="w-fit cursor-pointer rounded-sm bg-white px-4 py-3 text-center text-[#103263]">
                  <h3 className="font-semibold">VVIP</h3>
                  <p>90000 MMK</p>
                </div>
              </div>
              <div className="flex w-fit items-center justify-end gap-3 rounded-full bg-[#FF4D4D] px-3 py-2">
                <MessageCircleWarning size={40} />{" "}
                <p className="text-xl">No refunds after August 15.</p>
              </div>
              <div className="w-full">
                <NavLink
                  to={"/events/ticketdetails"}
                  className="float-end rounded-full bg-gradient-to-r from-[#3985F3] via-[#2DB5DE] to-[#2066C9] px-8 py-5 text-4xl font-semibold"
                >
                  Get Your Ticket Now
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_600px] gap-4 px-8 py-5">
        <div className="">
          <h2 className="text-3xl font-bold">ABOUT EVENT</h2>
          <p className="py-5 ps-2 text-2xl font-semibold">
            Feel the bass, feel the freedom — the Yangon EDM Festival 2025 is
            here to set the city on fire!Join thousands of EDM lovers for the
            most electrifying night of the year, featuring top international and
            local DJs, immersive light shows, fire cannons, and giant LED walls.
          </p>
          <div className="p-10">
            <h3 className="text-3xl font-semibold">Line Up Includes</h3>
            <ul className="flex list-disc flex-col ps-10 text-2xl">
              <li>DJ Zyan</li>
              <li>DJ Luki</li>
              <li>Mako Paulse</li>
              <li>Basscore Twins</li>
            </ul>
          </div>
          <p className="w-[60%] text-xl uppercase">
            Laser domes, neon body paint, food trucks, and chill zones — all in
            one epic night!
          </p>
        </div>
        <div className="flex flex-col gap-5 p-3">
          <div className="w-[80%] rounded-md border-3 border-[#071739] bg-[#E6EBF5] p-5 ps-10 dark:text-[#071739]">
            <h3 className="text-3xl font-semibold">Facilities</h3>
            <ul className="list-disc p-2 text-xl leading-9">
              <li>Festival entry and wristband</li>
              <li>Free glowstick on entry</li>
              <li>VIP lounge access (VIP only)</li>
              <li>Backstage meet-and-greet (VVIP Only)</li>
              <li>Access to EDM food court and drink zone</li>
            </ul>
          </div>
          <div className="w-[80%] rounded-md border-3 border-[#071739] bg-[#E6EBF5] p-5 ps-10 dark:text-[#071739]">
            <h3 className="text-3xl font-semibold">Parking Lot</h3>
            <ul className="list-disc p-2 text-xl leading-9">
              <li>
                Limited parking available inside YCC (first come, first served)
              </li>
              <li>Grab & taxi drop-off zone available</li>
              <li>
                Nearest bus stop: Kabar Aye Road, In front of Myanmar Plaza
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
