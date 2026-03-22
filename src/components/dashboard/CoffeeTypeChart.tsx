import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  Arabica: "hsl(250, 65%, 55%)",
  Excelsa: "hsl(170, 60%, 42%)",
  Robusta: "hsl(30, 85%, 55%)",
  Libriac: "hsl(340, 70%, 55%)",
};

interface Props {
  data: { name: string; value: number; quantity: number }[];
}

export function CoffeeTypeChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Coffee Type Split</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" nameKey="name" stroke="none">
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "hsl(200, 75%, 50%)"} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(0)}`} contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-muted/50">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[d.name] }} />
            <span className="text-muted-foreground truncate">{d.name}</span>
            <span className="font-mono font-semibold text-foreground ml-auto">{total > 0 ? ((d.value / total) * 100).toFixed(0) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
