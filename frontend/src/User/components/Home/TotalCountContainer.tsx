import type { ITotalCount } from "@/types";
import TotalCount from "./TotalCount";

interface Props {
  counts: (ITotalCount & { format?: "default" | "short" | "percent" })[];
}

export default function TotalCountContainer({ counts }: Props) {
  return (
    <section className="mx-12 my-16 mt-20 mb-0 flex h-80 flex-col justify-center gap-12 bg-[#071739] px-40">
      <h3 className="figtree text-center text-4xl text-white">
        Our progress in numbers
      </h3>

      <div className="flex w-full flex-row items-center justify-between">
        {counts.map((d, index) => (
          <TotalCount
            key={index}
            count={d.count}
            label={d.label}
            format={d.format || "short"}
          />
        ))}
      </div>
    </section>
  );
}
