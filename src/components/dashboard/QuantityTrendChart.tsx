import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { month: string; quantity: number }[];
}

export function QuantityTrendChart({ data }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Quantity Sold Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="qtyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(30, 85%, 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(30, 85%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value: number) => [value, "Units"]} contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
          <Area type="monotone" dataKey="quantity" stroke="hsl(30, 85%, 55%)" fill="url(#qtyGrad)" strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
