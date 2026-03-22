import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = [
  "hsl(220, 15%, 88%)", // Sun
  "hsl(250, 65%, 55%)", // Mon
  "hsl(170, 60%, 42%)", // Tue
  "hsl(30, 85%, 55%)",  // Wed
  "hsl(340, 70%, 55%)", // Thu
  "hsl(200, 75%, 50%)", // Fri
  "hsl(220, 15%, 88%)", // Sat
];

export function DayOfWeekChart({ data }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Sales by Day of Week</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value: number) => [`$${value.toFixed(0)}`, "Revenue"]} contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
