import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { name: string; value: number; orders: number; country: string }[];
}

export function TopCustomersChart({ data }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Top 10 Customers</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} width={100} />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
            contentStyle={{ borderRadius: "12px", fontSize: 12 }}
          />
          <Bar dataKey="value" fill="hsl(170, 60%, 42%)" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
