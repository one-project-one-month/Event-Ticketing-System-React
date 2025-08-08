"use client";

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

const ticketDataMonthly = [
  { month: "Jan", value: 700 },
  { month: "Feb", value: 400 },
  { month: "Mar", value: 300 },
  { month: "Apr", value: 800 },
  { month: "May", value: 200 },
  { month: "Jun", value: 600 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
];

function generateEvenTicks(data: { value: number }[], steps = 4) {
  const max = Math.max(...data.map((d) => d.value));
  const roundedMax = Math.ceil(max / 100) * 100;

  const step = Math.ceil(roundedMax / steps);
  const ticks = [];
  for (let i = 0; i <= steps; i++) {
    ticks.push(i * step);
  }
  return ticks;
}

export default function TicketSaleChart() {
  const ticks = useMemo(() => generateEvenTicks(ticketDataMonthly), []);

  return (
    <div className="h- w-full rounded-2xl bg-[#f6f4fb] p-4">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-xl font-semibold text-black">Ticket Sale</h2>
        <p className="rounded-md bg-[#5b3cc4] px-3 py-1 text-sm font-semibold text-white">
          Monthly
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={ticketDataMonthly}>
          <defs>
            <linearGradient id="colorTicket" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b3cc4" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#5b3cc4" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* ✅ Grid lines */}
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="5 5" />

          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 900]}
            ticks={ticks}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
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
