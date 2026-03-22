import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";

interface Props {
  data: { month: string; growth: number; sales: number }[];
}

export function MonthlyGrowthChart({ data }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Month-over-Month Growth</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="growthPos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(170, 60%, 42%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(170, 60%, 42%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <ReferenceLine y={0} stroke="hsl(220, 15%, 80%)" strokeDasharray="3 3" />
          <Tooltip
            formatter={(value: number, name: string) => [name === "growth" ? `${value.toFixed(1)}%` : `$${value.toFixed(0)}`, name === "growth" ? "Growth" : "Revenue"]}
            contentStyle={{ borderRadius: "12px", fontSize: 12 }}
          />
          <Area type="monotone" dataKey="growth" stroke="hsl(250, 65%, 55%)" fill="url(#growthPos)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
