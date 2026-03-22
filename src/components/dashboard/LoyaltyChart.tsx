import { Users, UserCheck } from "lucide-react";

interface LoyaltyData {
  name: string;
  sales: number;
  orders: number;
  customers: number;
}

interface Props {
  data: LoyaltyData[];
}

export function LoyaltyChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.sales, 0);

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5">
      <h3 className="text-sm font-semibold font-display text-foreground mb-4">Loyalty Card Impact</h3>
      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = total > 0 ? (d.sales / total) * 100 : 0;
          const isLoyal = i === 0;
          return (
            <div key={d.name} className={`rounded-xl p-4 ${isLoyal ? "gradient-primary text-primary-foreground" : "bg-muted/60 border border-border/40"}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg ${isLoyal ? "bg-white/20" : "bg-primary/10"}`}>
                  {isLoyal ? <UserCheck className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${isLoyal ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {d.name}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className={`text-lg font-bold font-mono ${isLoyal ? "" : "text-foreground"}`}>${d.sales.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                  <p className={`text-[10px] ${isLoyal ? "text-primary-foreground/60" : "text-muted-foreground"}`}>Revenue ({pct.toFixed(0)}%)</p>
                </div>
                <div>
                  <p className={`text-lg font-bold font-mono ${isLoyal ? "" : "text-foreground"}`}>{d.orders}</p>
                  <p className={`text-[10px] ${isLoyal ? "text-primary-foreground/60" : "text-muted-foreground"}`}>Orders</p>
                </div>
                <div>
                  <p className={`text-lg font-bold font-mono ${isLoyal ? "" : "text-foreground"}`}>{d.customers}</p>
                  <p className={`text-[10px] ${isLoyal ? "text-primary-foreground/60" : "text-muted-foreground"}`}>Customers</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
