import type { ITotalCount } from "@/types";

export default function TotalCount({ count, label }: ITotalCount) {
  return (
    <div className="flex flex-col justify-center gap-6 text-center">
      <p className="text-3xl font-semibold">{count}</p>
      <p className="text-lg">{label}</p>
    </div>
  );
}
