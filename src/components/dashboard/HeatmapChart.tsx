import { useMemo } from "react";

interface Props {
  data: Record<string, unknown>[];
  years: number[];
}

export function HeatmapChart({ data, years }: Props) {
  const { maxVal } = useMemo(() => {
    let max = 0;
    data.forEach((row) => {
      years.forEach((y) => {
        const v = (row[String(y)] as number) || 0;
        if (v > max) max = v;
      });
    });
    return { maxVal: max };
  }, [data, years]);

  const getColor = (value: number) => {
    if (value === 0) return "hsl(220, 15%, 95%)";
    const intensity = Math.min(value / maxVal, 1);
    const l = 92 - intensity * 48;
    const s = 50 + intensity * 15;
    return `hsl(250, ${s}%, ${l}%)`;
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Monthly Sales Heatmap</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider py-1 px-2 w-12">Mon</th>
              {years.map((y) => (
                <th key={y} className="text-center text-[10px] font-mono font-medium text-muted-foreground py-1 px-1">{y}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.month as string}>
                <td className="text-[11px] font-medium text-muted-foreground py-0.5 px-2">{row.month as string}</td>
                {years.map((y) => {
                  const val = (row[String(y)] as number) || 0;
                  return (
                    <td key={y} className="py-0.5 px-1">
                      <div
                        className="rounded-lg h-9 flex items-center justify-center text-[10px] font-mono font-semibold transition-all cursor-default hover:scale-105"
                        style={{ background: getColor(val), color: val / maxVal > 0.5 ? "white" : "hsl(220, 25%, 10%)" }}
                        title={`${row.month} ${y}: $${val.toFixed(0)}`}
                      >
                        {val > 0 ? `$${val.toFixed(0)}` : "—"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
