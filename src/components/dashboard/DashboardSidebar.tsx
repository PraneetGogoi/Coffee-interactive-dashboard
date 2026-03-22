import { Coffee, LayoutDashboard, BarChart3, Table2, TrendingUp, PieChart, Users, Activity } from "lucide-react";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "trends", label: "Trends", icon: TrendingUp },
  { id: "breakdown", label: "Breakdown", icon: PieChart },
  { id: "customers", label: "Customers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "deep-dive", label: "Deep Dive", icon: Activity },
  { id: "orders", label: "Orders", icon: Table2 },
];

export function DashboardSidebar({ activeTab, onTabChange, collapsed, onToggle }: Props) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 gradient-dark ${
        collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <button onClick={onToggle} className="flex-shrink-0 p-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors">
          <Coffee className="h-5 w-5 text-sidebar-primary" />
        </button>
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm font-display font-bold text-sidebar-accent-foreground whitespace-nowrap tracking-tight">
              Coffee<span className="text-sidebar-primary">Pulse</span>
            </h2>
            <p className="text-[9px] text-sidebar-foreground/50 tracking-wider uppercase">Real-time Analytics</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                active
                  ? "bg-primary/20 text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              title={collapsed ? tab.label : undefined}
            >
              <tab.icon className={`h-4 w-4 flex-shrink-0 ${active ? "text-sidebar-primary" : ""}`} />
              {!collapsed && <span>{tab.label}</span>}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-[10px] text-sidebar-foreground/50">Live · Real-time data</p>
          </div>
        </div>
      )}
    </aside>
  );
}
