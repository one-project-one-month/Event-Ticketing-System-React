import { useRef, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { PieLabelProps } from "recharts/types/polar/Pie";
import { ChevronDownIcon } from "lucide-react";
import {
  type DashboardResponseModel,
  TTCountType,
} from "@/Admin/DataTypes/Dashboard.ts";

// --- Main Chart Component ---
export const BestSellingChart = ({
  chartData,
}: {
  chartData: DashboardResponseModel;
}) => {
  const [timeframe, setTimeframe] = useState<TTCountType>(TTCountType.Week);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const chartDataSource = Array.isArray(chartData?.ticketCounts)
    ? chartData.ticketCounts.find(
        (data) => data.ticketCountPeriod === timeframe,
      )
    : null;

  const handleTimeframeSelect = (selectedTimeframe: TTCountType) => {
    setTimeframe(selectedTimeframe);
    setIsDropdownOpen(false);
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  const data = (chartDataSource?.ttCounts ?? []).map((entry, idx) => ({
    ...entry,
    color: entry.color || COLORS[idx % COLORS.length], // fallback colour
  }));
  const totalValue = data.reduce(
    (sum, entry) => sum + (entry.totalCount || 0),
    0,
  );

  // Custom label renderer for the pie chart slices
  const renderCustomizedLabel = (props: PieLabelProps) => {
    const { cx, cy, midAngle, outerRadius, payload } = props;
    if (!cx || !cy || !outerRadius || !midAngle || !payload) return null;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // FIX 1: Use the correct case 'totalCount' from the payload.
    const percentage = ((payload.totalCount as number) / totalValue) * 100;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="pointer-events-none font-bold"
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    );
  };

  if (!Array.isArray(chartData?.ticketCounts) || data.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">
        No chart data available
      </div>
    );
  }

  return (
    <div className="mx-auto max-h-[22rem] w-full max-w-2xl rounded-2xl bg-slate-50 p-6 font-sans">
      {/* Header Section */}
      <header className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-800 sm:mb-0">
          Best Selling
        </h1>
        {/* --- Dropdown --- */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-36 cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600"
          >
            <span>
              {timeframe === TTCountType.Week ? "This Week" : "This Month"}
            </span>
            <ChevronDownIcon />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-36 rounded-lg border border-slate-100 bg-white">
              <ul className="py-1">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTimeframeSelect(TTCountType.Week);
                    }}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    This Week
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTimeframeSelect(TTCountType.Month);
                    }}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    This Month
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Chart and Legend Section */}
      <div className="flex flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="h-64 w-full flex-1 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="49%"
                outerRadius="100%"
                fill="#8884d8"
                paddingAngle={3}
                dataKey="totalCount"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex flex-col justify-center space-y-4">
          {data.map((entry) => (
            <div key={entry.label} className="flex items-start space-x-4">
              <div
                className="mt-1 h-5 w-2 flex-shrink-0 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {entry.totalCount.toLocaleString()}
                </p>
                <p className="text-base text-slate-500">{entry.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
