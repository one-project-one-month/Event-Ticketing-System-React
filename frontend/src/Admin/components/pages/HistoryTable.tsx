import HistoryPagination from "@/Admin/components/pages/HistoryPagination.tsx";
import { useState } from "react";

const dummyData = [
  {
    email: "chanlay2121@gmail.com",
    event: "EDM FESTIVAL",
    type: "VIP",
    date: "20/07/2025",
  },
  {
    email: "phyuphyu122@gmail.com",
    event: "LIVE CONCERT NIGHT",
    type: "VVIP",
    date: "25/07/2025",
  },
  {
    email: "capy9876@gmail.com",
    event: "POOL PARTY",
    type: "Standard",
    date: "26/07/2025",
  },
  {
    email: "tuylar567@gmail.com",
    event: "INDIE LIVE SESSIONS",
    type: "VIP",
    date: "28/07/2025",
  },
  {
    email: "sha445@gmail.com",
    event: "EDM BEACH PARTY",
    type: "VVIP",
    date: "28/07/2025",
  },
  {
    email: "lynnn3451@gmail.com",
    event: "ROCK NIGHT FESTIVAL",
    type: "Standard",
    date: "31/07/2025",
  },
  {
    email: "juko0909@gmail.com",
    event: "JAZZ & BLUES EVENING",
    type: "VIP",
    date: "31/07/2025",
  },
  {
    email: "phoo6768@gmail.com",
    event: "LOCAL DRAMA PERFORMANCE",
    type: "Standard",
    date: "31/07/2025",
  },
  {
    email: "yoonyoon987@gmail.com",
    event: "HALLOWEEN COSTUME BASH",
    type: "VVIP",
    date: "31/07/2025",
  },
];

export default function HistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="mt-5">
      {/* Header */}
      <div className="flex h-20 w-full items-center justify-between rounded-t-md bg-[#615CB8] px-4 py-3 text-lg font-semibold text-white">
        <div className="w-[5%] text-center">No.</div>
        <div className="w-[25%]">Email</div>
        <div className="w-[25%]">Event Name</div>
        <div className="w-[15%] text-center">Ticket Type Name</div>
        <div className="w-[15%] text-center">Transaction Date</div>
        <div className="w-[10%] text-center">Action</div>
      </div>

      {/* Rows */}
      <div className="overflow-hidden rounded-b-md">
        {dummyData.map((item, index) => (
          <HistoryRow
            key={index}
            index={index + 1}
            email={item.email}
            eventName={item.event}
            ticketType={item.type}
            transactionDate={item.date}
          />
        ))}
      </div>

      {/* Pagination */}
      <HistoryPagination
        currentPage={currentPage}
        totalItems={dummyData.length}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

interface HistoryRowProps {
  index: number;
  email: string;
  eventName: string;
  ticketType: string;
  transactionDate: string;
}

function HistoryRow({
  index,
  email,
  eventName,
  ticketType,
  transactionDate,
}: HistoryRowProps) {
  return (
    <div className="flex w-full items-center justify-between px-4 py-4 text-base odd:bg-white even:bg-[#E6E3FF]">
      <div className="w-[5%] text-center">{index}.</div>
      <div className="w-[25%]">{email}</div>
      <div className="w-[25%]">{eventName}</div>
      <div className="w-[15%] text-center">{ticketType}</div>
      <div className="w-[15%] text-center">{transactionDate}</div>
      <div className="flex w-[10%] justify-center">
        <a href={`/admin/venue/`}>
          <img
            src="/icons/Eye.svg"
            alt="View Data"
            className="cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}
