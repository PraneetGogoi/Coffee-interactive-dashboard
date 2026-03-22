import { useState } from "react";
import { useCoffeeData } from "@/hooks/useCoffeeData";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SalesTrendChart } from "@/components/dashboard/SalesTrendChart";
import { CoffeeTypeChart } from "@/components/dashboard/CoffeeTypeChart";
import { CountryChart } from "@/components/dashboard/CountryChart";
import { CoffeeTypeTrendChart } from "@/components/dashboard/CoffeeTypeTrendChart";
import { TopCustomersChart } from "@/components/dashboard/TopCustomersChart";
import { RoastChart } from "@/components/dashboard/RoastChart";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { LoyaltyChart } from "@/components/dashboard/LoyaltyChart";
import { SizeBreakdownChart } from "@/components/dashboard/SizeBreakdownChart";
import { HeatmapChart } from "@/components/dashboard/HeatmapChart";
import { YearlyComparisonChart } from "@/components/dashboard/YearlyComparisonChart";
import { CountryTypeCrossChart } from "@/components/dashboard/CountryTypeCrossChart";
import { PriceScatterChart } from "@/components/dashboard/PriceScatterChart";
import { CumulativeSalesChart } from "@/components/dashboard/CumulativeSalesChart";
import { AvgPriceByTypeChart } from "@/components/dashboard/AvgPriceByTypeChart";
import { CustomerFrequencyChart } from "@/components/dashboard/CustomerFrequencyChart";
import { AvgOrderByCountryChart } from "@/components/dashboard/AvgOrderByCountryChart";
import { DayOfWeekChart } from "@/components/dashboard/DayOfWeekChart";
import { MonthlyGrowthChart } from "@/components/dashboard/MonthlyGrowthChart";
import { RoastCountryCrossChart } from "@/components/dashboard/RoastCountryCrossChart";
import { QuantityTrendChart } from "@/components/dashboard/QuantityTrendChart";
import { Activity } from "lucide-react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const coffee = useCoffeeData();

  if (coffee.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground font-body text-sm">Loading real-time data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 60 : 220 }}
      >
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <h1 className="text-lg font-display font-bold text-foreground capitalize tracking-tight">{activeTab.replace("-", " ")}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Activity className="h-3 w-3 text-accent" />
                <p className="text-[11px] text-muted-foreground font-mono">{coffee.data.length} records · live</p>
              </div>
            </div>
            <FilterBar filters={coffee.filters} onChange={coffee.setFilters} options={coffee.options} />
          </div>
        </header>

        <div className="p-6">
          {activeTab === "overview" && <OverviewTab coffee={coffee} />}
          {activeTab === "trends" && <TrendsTab coffee={coffee} />}
          {activeTab === "breakdown" && <BreakdownTab coffee={coffee} />}
          {activeTab === "customers" && <CustomersTab coffee={coffee} />}
          {activeTab === "analytics" && <AnalyticsTab coffee={coffee} />}
          {activeTab === "deep-dive" && <DeepDiveTab coffee={coffee} />}
          {activeTab === "orders" && <OrdersTab coffee={coffee} />}
        </div>
      </main>
    </div>
  );
}

function OverviewTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="space-y-5 animate-fade-up">
      <KpiCards {...coffee.kpis} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SalesTrendChart data={coffee.salesByMonth} />
        </div>
        <CoffeeTypeChart data={coffee.salesByCoffeeType} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CountryChart data={coffee.salesByCountry} />
        <RoastChart data={coffee.salesByRoast} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SizeBreakdownChart data={coffee.salesBySize} />
        <AvgPriceByTypeChart data={coffee.avgPriceByType} />
        <DayOfWeekChart data={coffee.salesByDayOfWeek} />
      </div>
    </div>
  );
}

function TrendsTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SalesTrendChart data={coffee.salesByMonth} />
        <QuantityTrendChart data={coffee.quantityByMonth} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CoffeeTypeTrendChart data={coffee.coffeeTypeTrend} coffeeTypes={coffee.options.coffeeTypes} />
        <CumulativeSalesChart data={coffee.cumulativeSales} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyGrowthChart data={coffee.monthlyGrowth} />
        <YearlyComparisonChart data={coffee.yearlyComparison} />
      </div>
      <HeatmapChart data={coffee.heatmapData} years={coffee.options.years} />
    </div>
  );
}

function BreakdownTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CoffeeTypeChart data={coffee.salesByCoffeeType} />
        <RoastChart data={coffee.salesByRoast} />
        <SizeBreakdownChart data={coffee.salesBySize} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CountryTypeCrossChart data={coffee.countryTypeCross} coffeeTypes={coffee.options.coffeeTypes} />
        <RoastCountryCrossChart data={coffee.roastCountryCross} roastTypes={coffee.options.roastTypes} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CountryChart data={coffee.salesByCountry} />
        <AvgPriceByTypeChart data={coffee.avgPriceByType} />
      </div>
    </div>
  );
}

function CustomersTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TopCustomersChart data={coffee.topCustomers} />
        </div>
        <LoyaltyChart data={coffee.loyaltyAnalysis} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CustomerFrequencyChart data={coffee.customerFrequency} />
        <AvgOrderByCountryChart data={coffee.avgOrderByCountry} />
      </div>
    </div>
  );
}

function AnalyticsTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PriceScatterChart data={coffee.priceQuantityData} coffeeTypes={coffee.options.coffeeTypes} />
        <MonthlyGrowthChart data={coffee.monthlyGrowth} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <YearlyComparisonChart data={coffee.yearlyComparison} />
        <CumulativeSalesChart data={coffee.cumulativeSales} />
      </div>
      <HeatmapChart data={coffee.heatmapData} years={coffee.options.years} />
    </div>
  );
}

function DeepDiveTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <DayOfWeekChart data={coffee.salesByDayOfWeek} />
        <AvgPriceByTypeChart data={coffee.avgPriceByType} />
        <CustomerFrequencyChart data={coffee.customerFrequency} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RoastCountryCrossChart data={coffee.roastCountryCross} roastTypes={coffee.options.roastTypes} />
        <CountryTypeCrossChart data={coffee.countryTypeCross} coffeeTypes={coffee.options.coffeeTypes} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AvgOrderByCountryChart data={coffee.avgOrderByCountry} />
        <LoyaltyChart data={coffee.loyaltyAnalysis} />
      </div>
    </div>
  );
}

function OrdersTab({ coffee }: { coffee: ReturnType<typeof useCoffeeData> }) {
  return (
    <div className="animate-fade-up">
      <OrdersTable data={coffee.data} />
    </div>
  );
}
