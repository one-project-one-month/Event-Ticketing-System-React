import type { ITotalCount } from "@/User/types";
import TotalCount from "./TotalCount";

export default function TotalCountContainer() {
  const dummyTotalCounts: ITotalCount[] = [
    {
      count: 1000,
      label: "Completed Events",
    },
    {
      count: 5678,
      label: "Events Active",
    },
    {
      count: 12345678,
      label: "Users",
    },
    {
      count: 459278,
      label: "Tickets Sold",
    },
  ];
  return (
    <section className="mx-12 my-16 mt-20 mb-0 flex h-80 flex-col justify-center gap-12 bg-[#071739] px-40">
      <h3 className="figtree text-center text-4xl text-white">
        Our progress in numbers
      </h3>

      <div className="flex w-full flex-row items-center justify-between">
        {dummyTotalCounts.map((d, index) => (
          <TotalCount
            key={index}
            count={d.count}
            label={d.label}
            format="short"
          />
        ))}
      </div>
    </section>
  );
}
