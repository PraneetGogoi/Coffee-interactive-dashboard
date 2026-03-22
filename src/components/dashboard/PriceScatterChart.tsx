import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

const COLORS: Record<string, string> = {
  Arabica: "hsl(250, 65%, 55%)",
  Excelsa: "hsl(170, 60%, 42%)",
  Robusta: "hsl(30, 85%, 55%)",
  Libriac: "hsl(340, 70%, 55%)",
};

interface DataPoint {
  unitPrice: number;
  quantity: number;
  sales: number;
  coffeeType: string;
}

interface Props {
  data: DataPoint[];
  coffeeTypes: string[];
}

export function PriceScatterChart({ data, coffeeTypes }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Unit Price vs Quantity</h3>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 91%)" />
          <XAxis type="number" dataKey="unitPrice" name="Unit Price" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <YAxis type="number" dataKey="quantity" name="Quantity" tick={{ fontSize: 9, fill: "hsl(220, 10%, 48%)" }} axisLine={false} tickLine={false} />
          <ZAxis type="number" dataKey="sales" range={[20, 200]} />
          <Tooltip formatter={(value: number, name: string) => [name === "Unit Price" ? `$${value.toFixed(2)}` : value, name]} contentStyle={{ borderRadius: "12px", fontSize: 12 }} />
          {coffeeTypes.map((ct) => (
            <Scatter key={ct} name={ct} data={data.filter((d) => d.coffeeType === ct)} fill={COLORS[ct] || "hsl(200, 75%, 50%)"} fillOpacity={0.6} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {coffeeTypes.map((ct) => (
          <div key={ct} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[ct] }} />
            <span className="text-muted-foreground">{ct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
