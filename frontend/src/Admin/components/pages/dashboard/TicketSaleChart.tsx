import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import type { DashboardTicketSale } from "@/Admin/DataTypes/Dashboard.ts";

function generateEvenTicks(data: DashboardTicketSale[], steps = 4) {
  if (!data || data.length === 0) return [0, 1]; // default

  const max = Math.max(...data.map((d) => d.totalCount));

  if (max === 0) return [0, 1]; // avoid [0,0,0]

  // Decide a nice step
  const step = Math.ceil(max / steps) || 1; // at least 1
  const ticks = [];
  for (let i = 0; i <= steps; i++) {
    ticks.push(i * step);
  }

  // Ensure the last tick is at least max
  if (ticks[ticks.length - 1] < max) ticks.push(max);

  return ticks;
}

interface TicketSaleChartProps {
  data: DashboardTicketSale[];
}

export default function TicketSaleChart({ data }: TicketSaleChartProps) {
  const ticks = useMemo(() => generateEvenTicks(data), [data]);

  return (
    <div className="w-full rounded-2xl bg-[#f6f4fb] p-4">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-xl font-semibold text-black">Ticket Sale</h2>
        <p className="rounded-md bg-[#5b3cc4] px-3 py-1 text-sm font-semibold text-white">
          Monthly
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTicket" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b3cc4" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#5b3cc4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#e5e5e5" strokeDasharray="5 5" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, Math.max(...ticks)]}
            ticks={ticks}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalCount"
            stroke="#5b3cc4"
            fill="url(#colorTicket)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
