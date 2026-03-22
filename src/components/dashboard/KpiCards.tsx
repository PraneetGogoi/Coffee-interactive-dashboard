import { DollarSign, ShoppingCart, Users, Package, TrendingUp, Tag, Heart } from "lucide-react";

interface Props {
  totalSales: number;
  totalOrders: number;
  totalQuantity: number;
  avgOrderValue: number;
  uniqueCustomers: number;
  avgUnitPrice: number;
  loyaltyRate: number;
}

const cards = [
  { key: "totalSales" as const, label: "Total Revenue", icon: DollarSign, format: (v: number) => `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, gradient: "gradient-primary" },
  { key: "totalOrders" as const, label: "Orders", icon: ShoppingCart, format: (v: number) => v.toLocaleString() },
  { key: "uniqueCustomers" as const, label: "Customers", icon: Users, format: (v: number) => v.toLocaleString() },
  { key: "totalQuantity" as const, label: "Units Sold", icon: Package, format: (v: number) => v.toLocaleString() },
  { key: "avgOrderValue" as const, label: "Avg Order", icon: TrendingUp, format: (v: number) => `$${v.toFixed(2)}` },
  { key: "avgUnitPrice" as const, label: "Avg Price", icon: Tag, format: (v: number) => `$${v.toFixed(2)}` },
  { key: "loyaltyRate" as const, label: "Loyalty Rate", icon: Heart, format: (v: number) => `${v.toFixed(1)}%` },
];

export function KpiCards(props: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      {cards.map((c, i) => {
        const isHero = c.gradient;
        return (
          <div
            key={c.key}
            className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
              isHero
                ? `${c.gradient} text-primary-foreground`
                : "bg-card shadow-card border border-border/60"
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-1.5 rounded-lg ${isHero ? "bg-white/20" : "bg-primary/10"}`}>
                <c.icon className={`h-3.5 w-3.5 ${isHero ? "text-primary-foreground" : "text-primary"}`} />
              </div>
            </div>
            <p className={`text-xl font-bold font-mono tracking-tight ${isHero ? "" : "text-foreground"}`}>
              {c.format(props[c.key])}
            </p>
            <span className={`text-[10px] font-medium uppercase tracking-widest mt-1 block ${isHero ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
