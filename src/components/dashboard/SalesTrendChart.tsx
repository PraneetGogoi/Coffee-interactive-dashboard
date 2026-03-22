import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { month: string; sales: number; quantity: number; orders: number }[];
}

export function SalesTrendChart({ data }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-display text-foreground">Revenue Over Time</h3>
        <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{data.length} periods</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(250, 65%, 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(250, 65%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value: number, name: string) => [name === "sales" ? `$${value.toFixed(0)}` : value, name === "sales" ? "Revenue" : name]} contentStyle={{ borderRadius: "12px", border: "1px solid hsl(220,15%,91%)", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
          <Area type="monotone" dataKey="sales" stroke="hsl(250, 65%, 55%)" fill="url(#salesGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "hsl(250, 65%, 55%)", stroke: "white", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
