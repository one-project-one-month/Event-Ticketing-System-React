import type { ITotalCount } from "@/types";
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
    <section className="mx-12 my-8 flex h-80 flex-row items-center justify-between bg-orange-200 px-52">
      {dummyTotalCounts.map((d, index) => (
        <TotalCount key={index} count={d.count} label={d.label} />
      ))}
    </section>
  );
}
