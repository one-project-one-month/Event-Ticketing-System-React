import type { ITotalCount } from "@/types";

interface TotalCountProps extends ITotalCount {
  format?: "default" | "short" | "percent";
}

export default function TotalCount({
  count,
  label,
  format = "default",
}: TotalCountProps) {
  const getFormattedCount = () => {
    if (format === "percent") {
      return `${count}%`;
    }

    if (format === "short") {
      if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
      }
      if (count >= 100) {
        return `${Math.floor(count / 100) * 100}+`;
      }
    }

    return count;
  };

  return (
    <div className="figtreef flex flex-col justify-center text-center text-white">
      <p className="text-[3rem] font-semibold">{getFormattedCount()}</p>
      <p className="text-3xl">{label}</p>
    </div>
  );
}
