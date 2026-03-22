import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const COLORS: Record<string, string> = {
  Light: "hsl(45, 90%, 52%)",
  Medium: "hsl(30, 85%, 55%)",
  Dark: "hsl(250, 65%, 55%)",
};

interface Props {
  data: Record<string, unknown>[];
  roastTypes: string[];
}

export function RoastCountryCrossChart({ data, roastTypes }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Country × Roast Type</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="country" tick={{ fontSize: 10, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {roastTypes.map((rt) => (
            <Bar key={rt} dataKey={rt} stackId="a" fill={COLORS[rt] || "hsl(200, 75%, 50%)"} radius={rt === roastTypes[roastTypes.length - 1] ? [6, 6, 0, 0] : undefined} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
