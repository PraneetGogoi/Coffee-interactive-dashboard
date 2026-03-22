import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = ["hsl(250, 65%, 55%)", "hsl(170, 60%, 42%)", "hsl(30, 85%, 55%)", "hsl(340, 70%, 55%)"];

export function SizeBreakdownChart({ data }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Revenue by Bag Size</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value: number) => [`$${value.toFixed(0)}`, "Revenue"]} contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
