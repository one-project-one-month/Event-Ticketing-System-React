import { getUserEventByCode } from "@/services/UserEventServices";
import type {
  UserEventByCodeResponse,
  UserEventDataByCode,
} from "@/User/DataTypes/Event";
import {
  Calendar,
  MapPinned,
  MessageCircleWarning,
  Ticket,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const TicketInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState<UserEventDataByCode | null>(null);
  const [date, setDate] = useState<string[]>([]);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const fetchUserEventByCode = async (id: string) => {
    const res = await getUserEventByCode(id);
    if (res.isSuccess && res.data != null) {
      setData(res.data);
      const date = new Date(res.data.startdate);
      const formattedDate = dateFormatter.format(date);
      const startTime = timeFormatter.format(date);
      console.log(res.data.ticketTypes);

      setDate([formattedDate, startTime]);
    } else {
      setData(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserEventByCode(id);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="relative flex w-full bg-[url('/yw-event-img/detail-bg.png')] bg-cover bg-center pt-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#071739]/100 to-[#14409f]/60"></div>
        <div className="z-10 flex w-full flex-col items-center justify-start">
          <div className="w-ful flex w-[30%] flex-col items-center px-5">
            <img
              src={data?.venueimage[0]}
              alt=""
              className="h-[500px] w-full rounded-md object-cover object-center"
            />
            <h2 className="text-center text-[2.7rem] font-bold text-white uppercase">
              {data?.eventname}
            </h2>
          </div>
          <div className="flex w-full justify-between px-15 py-8 text-white">
            <div className="flex w-[60%] flex-col gap-5 pt-5">
              <div className="flex justify-start gap-4">
                <Calendar size={50} />
                <div className="text-3xl leading-12 font-semibold">
                  <p>{date[0]}</p>
                  <p>{date[1]} </p>
                </div>
              </div>
              <div className="flex justify-start gap-4">
                <MapPinned size={50} />
                <div className="text-3xl leading-12 font-semibold">
                  <p>{data?.address}</p>
                </div>
              </div>
            </div>
            <div className="flex w-[40%] flex-col items-end gap-5 px-5 pt-5">
              <h2 className="flex items-center justify-start gap-5 place-self-start text-3xl font-semibold">
                <Ticket size={40} /> Ticket Information
              </h2>
              <div className="flex justify-end gap-5">
                {data?.ticketTypes.map((type) => (
                  <div
                    key={type.tickettypecode}
                    className="w-fit cursor-pointer rounded-sm bg-white px-4 py-3 text-center text-[#103263]"
                  >
                    <h3 className="font-semibold">{type.tickettypename}</h3>
                    <p>{type.ticketprice} MMK</p>
                  </div>
                ))}
              </div>
              <div className="flex w-fit items-center justify-end gap-3 rounded-full bg-[#FF4D4D] px-3 py-2">
                <MessageCircleWarning size={40} />{" "}
                <p className="text-xl">No refunds after August 15.</p>
              </div>
              <div className="w-full">
                <NavLink
                  to={"/events/ticketdetails/" + data?.eventcode}
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
            {data?.description}
          </p>
          <div className="p-10">
            <h3 className="text-3xl font-semibold">Addons Include</h3>
            <ul className="flex list-disc flex-col ps-10 text-2xl">
              {data?.addons.split(",").map((add) => (
                <li>{add}</li>
              ))}
            </ul>
          </div>
          <p className="w-[60%] text-xl uppercase">
            Let's meet at {data?.venuename}
          </p>
        </div>
        <div className="flex flex-col gap-5 p-3">
          <div className="w-[80%] rounded-md border-3 border-[#071739] bg-[#E6EBF5] p-5 ps-10 dark:text-[#071739]">
            <h3 className="text-3xl font-semibold">Facilities</h3>
            <ul className="list-disc p-2 text-xl leading-9">
              {data?.facilities.split(",").map((facility) => (
                <li>{facility}</li>
              ))}
            </ul>
          </div>
          {/* <div className="w-[80%] rounded-md border-3 border-[#071739] bg-[#E6EBF5] p-5 ps-10 dark:text-[#071739]">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
