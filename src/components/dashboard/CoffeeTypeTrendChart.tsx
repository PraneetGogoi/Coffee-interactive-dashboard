import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const COLORS: Record<string, string> = {
  Arabica: "hsl(250, 65%, 55%)",
  Excelsa: "hsl(170, 60%, 42%)",
  Robusta: "hsl(30, 85%, 55%)",
  Libriac: "hsl(340, 70%, 55%)",
};

interface Props {
  data: Record<string, unknown>[];
  coffeeTypes: string[];
}

export function CoffeeTypeTrendChart({ data, coffeeTypes }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Coffee Type Trends</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {coffeeTypes.map((ct) => (
            <Line key={ct} type="monotone" dataKey={ct} stroke={COLORS[ct] || "hsl(200, 75%, 50%)"} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
