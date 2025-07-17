import type { ITotalCount } from "@/types";

export default function TotalCount({ count, label }: ITotalCount) {
  return (
    <div className="figtreef flex flex-col justify-center text-center text-white">
      <p className="text-[3rem] font-semibold">{count}</p>
      <p className="text-3xl">{label}</p>
    </div>
  );
}
