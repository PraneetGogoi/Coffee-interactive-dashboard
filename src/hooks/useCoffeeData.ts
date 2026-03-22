import { useMemo, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CoffeeOrder, Filters } from "@/data/types";

export function useCoffeeData() {
  const [data, setData] = useState<CoffeeOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    year: "all",
    coffeeType: "all",
    country: "all",
    roastType: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: rows, error } = await supabase
        .from("coffee_orders")
        .select("*")
        .order("order_date", { ascending: true });

      if (!error && rows) {
        const mapped: CoffeeOrder[] = rows.map((r) => ({
          orderId: r.order_id,
          orderDate: r.order_date,
          customerName: r.customer_name,
          country: r.country,
          quantity: r.quantity,
          unitPrice: r.unit_price,
          sales: r.sales,
          coffeeType: r.coffee_type,
          roastType: r.roast_type,
          size: r.size,
          loyaltyCard: r.loyalty_card,
          year: r.year,
          month: r.month,
          monthName: r.month_name,
        }));
        setData(mapped);
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel("coffee_orders_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "coffee_orders" },
        () => fetchData()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = useMemo(() => {
    return data.filter((d) => {
      if (filters.year !== "all" && d.year !== Number(filters.year)) return false;
      if (filters.coffeeType !== "all" && d.coffeeType !== filters.coffeeType) return false;
      if (filters.country !== "all" && d.country !== filters.country) return false;
      if (filters.roastType !== "all" && d.roastType !== filters.roastType) return false;
      return true;
    });
  }, [data, filters]);

  // KPIs
  const kpis = useMemo(() => {
    const totalSales = filtered.reduce((s, d) => s + d.sales, 0);
    const totalOrders = new Set(filtered.map((d) => d.orderId)).size;
    const totalQuantity = filtered.reduce((s, d) => s + d.quantity, 0);
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const uniqueCustomers = new Set(filtered.map((d) => d.customerName)).size;
    const avgUnitPrice = filtered.length > 0 ? filtered.reduce((s, d) => s + d.unitPrice, 0) / filtered.length : 0;
    const loyaltyRate = filtered.length > 0 ? (filtered.filter(d => d.loyaltyCard === "Yes").length / filtered.length) * 100 : 0;
    return { totalSales, totalOrders, totalQuantity, avgOrderValue, uniqueCustomers, avgUnitPrice, loyaltyRate };
  }, [filtered]);

  // Sales by month
  const salesByMonth = useMemo(() => {
    const map = new Map<string, { month: string; sales: number; quantity: number; orders: Set<string> }>();
    filtered.forEach((d) => {
      const key = `${d.year}-${String(d.month).padStart(2, "0")}`;
      const label = `${d.monthName.slice(0, 3)} ${d.year}`;
      const cur = map.get(key) || { month: label, sales: 0, quantity: 0, orders: new Set<string>() };
      cur.sales += d.sales;
      cur.quantity += d.quantity;
      cur.orders.add(d.orderId);
      map.set(key, cur);
    });
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, v]) => ({ month: v.month, sales: v.sales, quantity: v.quantity, orders: v.orders.size }));
  }, [filtered]);

  // By coffee type
  const salesByCoffeeType = useMemo(() => {
    const map = new Map<string, { sales: number; quantity: number }>();
    filtered.forEach((d) => {
      const cur = map.get(d.coffeeType) || { sales: 0, quantity: 0 };
      cur.sales += d.sales;
      cur.quantity += d.quantity;
      map.set(d.coffeeType, cur);
    });
    return [...map.entries()].map(([name, v]) => ({ name, value: v.sales, quantity: v.quantity }));
  }, [filtered]);

  // By country
  const salesByCountry = useMemo(() => {
    const map = new Map<string, { sales: number; orders: Set<string>; customers: Set<string> }>();
    filtered.forEach((d) => {
      const cur = map.get(d.country) || { sales: 0, orders: new Set<string>(), customers: new Set<string>() };
      cur.sales += d.sales;
      cur.orders.add(d.orderId);
      cur.customers.add(d.customerName);
      map.set(d.country, cur);
    });
    return [...map.entries()]
      .map(([name, v]) => ({ name, value: v.sales, orders: v.orders.size, customers: v.customers.size }))
      .sort((a, b) => b.value - a.value);
  }, [filtered]);

  // By roast
  const salesByRoast = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((d) => map.set(d.roastType, (map.get(d.roastType) || 0) + d.sales));
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [filtered]);

  // Top customers
  const topCustomers = useMemo(() => {
    const map = new Map<string, { sales: number; orders: Set<string>; country: string }>();
    filtered.forEach((d) => {
      const cur = map.get(d.customerName) || { sales: 0, orders: new Set<string>(), country: d.country };
      cur.sales += d.sales;
      cur.orders.add(d.orderId);
      map.set(d.customerName, cur);
    });
    return [...map.entries()]
      .map(([name, v]) => ({ name, value: v.sales, orders: v.orders.size, country: v.country }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filtered]);

  // Coffee type trend
  const coffeeTypeTrend = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    filtered.forEach((d) => {
      const key = `${d.year}-${String(d.month).padStart(2, "0")}`;
      if (!map.has(key)) map.set(key, {});
      const rec = map.get(key)!;
      rec[d.coffeeType] = (rec[d.coffeeType] || 0) + d.sales;
    });
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, rec]) => {
        const [y, m] = key.split("-");
        const names = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return { month: `${names[+m]} ${y}`, ...rec };
      });
  }, [filtered]);

  // Loyalty analysis
  const loyaltyAnalysis = useMemo(() => {
    const loyal = filtered.filter((d) => d.loyaltyCard === "Yes");
    const nonLoyal = filtered.filter((d) => d.loyaltyCard === "No");
    return [
      { name: "Loyalty Members", sales: loyal.reduce((s, d) => s + d.sales, 0), orders: new Set(loyal.map((d) => d.orderId)).size, customers: new Set(loyal.map((d) => d.customerName)).size },
      { name: "Non-Members", sales: nonLoyal.reduce((s, d) => s + d.sales, 0), orders: new Set(nonLoyal.map((d) => d.orderId)).size, customers: new Set(nonLoyal.map((d) => d.customerName)).size },
    ];
  }, [filtered]);

  // Size breakdown
  const salesBySize = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((d) => {
      const label = `${d.size} Kg`;
      map.set(label, (map.get(label) || 0) + d.sales);
    });
    return [...map.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => parseFloat(a.name) - parseFloat(b.name));
  }, [filtered]);

  // Heatmap
  const heatmapData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const years = [...new Set(filtered.map((d) => d.year))].sort();
    return months.map((month, mi) => {
      const row: Record<string, unknown> = { month };
      years.forEach((year) => {
        const sales = filtered.filter((d) => d.year === year && d.month === mi + 1).reduce((s, d) => s + d.sales, 0);
        row[String(year)] = sales;
      });
      return row;
    });
  }, [filtered]);

  // Yearly comparison
  const yearlyComparison = useMemo(() => {
    const map = new Map<number, { year: number; sales: number; orders: number; quantity: number }>();
    filtered.forEach((d) => {
      const cur = map.get(d.year) || { year: d.year, sales: 0, orders: 0, quantity: 0 };
      cur.sales += d.sales;
      cur.quantity += d.quantity;
      map.set(d.year, cur);
    });
    const orderSets = new Map<number, Set<string>>();
    filtered.forEach((d) => {
      if (!orderSets.has(d.year)) orderSets.set(d.year, new Set());
      orderSets.get(d.year)!.add(d.orderId);
    });
    return [...map.values()].map((v) => ({ ...v, orders: orderSets.get(v.year)?.size || 0 })).sort((a, b) => a.year - b.year);
  }, [filtered]);

  // Price-quantity scatter
  const priceQuantityData = useMemo(() => {
    return filtered.map((d) => ({ unitPrice: d.unitPrice, quantity: d.quantity, sales: d.sales, coffeeType: d.coffeeType }));
  }, [filtered]);

  // Country × type cross
  const countryTypeCross = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    filtered.forEach((d) => {
      if (!map.has(d.country)) map.set(d.country, {});
      const rec = map.get(d.country)!;
      rec[d.coffeeType] = (rec[d.coffeeType] || 0) + d.sales;
    });
    return [...map.entries()].map(([country, types]) => ({ country, ...types }));
  }, [filtered]);

  // NEW: Avg price by coffee type
  const avgPriceByType = useMemo(() => {
    const map = new Map<string, { total: number; count: number }>();
    filtered.forEach(d => {
      const cur = map.get(d.coffeeType) || { total: 0, count: 0 };
      cur.total += d.unitPrice;
      cur.count += 1;
      map.set(d.coffeeType, cur);
    });
    return [...map.entries()].map(([name, v]) => ({ name, avgPrice: v.count > 0 ? v.total / v.count : 0 }));
  }, [filtered]);

  // NEW: Cumulative sales over time
  const cumulativeSales = useMemo(() => {
    let running = 0;
    return salesByMonth.map(m => {
      running += m.sales;
      return { month: m.month, cumulative: running };
    });
  }, [salesByMonth]);

  // NEW: Quantity by month trend
  const quantityByMonth = useMemo(() => {
    return salesByMonth.map(m => ({ month: m.month, quantity: m.quantity }));
  }, [salesByMonth]);

  // NEW: Roast × Country cross
  const roastCountryCross = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    filtered.forEach(d => {
      if (!map.has(d.country)) map.set(d.country, {});
      const rec = map.get(d.country)!;
      rec[d.roastType] = (rec[d.roastType] || 0) + d.sales;
    });
    return [...map.entries()].map(([country, types]) => ({ country, ...types }));
  }, [filtered]);

  // NEW: Customer order frequency distribution
  const customerFrequency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    filtered.forEach(d => {
      if (!map.has(d.customerName)) map.set(d.customerName, new Set());
      map.get(d.customerName)!.add(d.orderId);
    });
    const freq = new Map<string, number>();
    map.forEach((orders) => {
      const bucket = orders.size === 1 ? "1 order" : orders.size <= 3 ? "2-3 orders" : orders.size <= 5 ? "4-5 orders" : "6+ orders";
      freq.set(bucket, (freq.get(bucket) || 0) + 1);
    });
    const order = ["1 order", "2-3 orders", "4-5 orders", "6+ orders"];
    return order.filter(b => freq.has(b)).map(name => ({ name, value: freq.get(name)! }));
  }, [filtered]);

  // NEW: Avg order value by country
  const avgOrderByCountry = useMemo(() => {
    const map = new Map<string, { total: number; orders: Set<string> }>();
    filtered.forEach(d => {
      const cur = map.get(d.country) || { total: 0, orders: new Set<string>() };
      cur.total += d.sales;
      cur.orders.add(d.orderId);
      map.set(d.country, cur);
    });
    return [...map.entries()].map(([name, v]) => ({ name, avgValue: v.orders.size > 0 ? v.total / v.orders.size : 0 })).sort((a, b) => b.avgValue - a.avgValue);
  }, [filtered]);

  // NEW: Sales by day of week
  const salesByDayOfWeek = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const map = new Map<number, number>();
    filtered.forEach(d => {
      const day = new Date(d.orderDate).getDay();
      map.set(day, (map.get(day) || 0) + d.sales);
    });
    return days.map((name, i) => ({ name, value: map.get(i) || 0 }));
  }, [filtered]);

  // NEW: Month-over-month growth
  const monthlyGrowth = useMemo(() => {
    if (salesByMonth.length < 2) return [];
    return salesByMonth.slice(1).map((m, i) => {
      const prev = salesByMonth[i].sales;
      const growth = prev > 0 ? ((m.sales - prev) / prev) * 100 : 0;
      return { month: m.month, growth, sales: m.sales };
    });
  }, [salesByMonth]);

  const years = [...new Set(data.map((d) => d.year))].sort();
  const coffeeTypes = [...new Set(data.map((d) => d.coffeeType))].sort();
  const countries = [...new Set(data.map((d) => d.country))].sort();
  const roastTypes = [...new Set(data.map((d) => d.roastType))].sort();

  return {
    data: filtered,
    allData: data,
    loading,
    filters,
    setFilters,
    kpis,
    salesByMonth,
    salesByCoffeeType,
    salesByCountry,
    salesByRoast,
    topCustomers,
    coffeeTypeTrend,
    loyaltyAnalysis,
    salesBySize,
    heatmapData,
    yearlyComparison,
    priceQuantityData,
    countryTypeCross,
    avgPriceByType,
    cumulativeSales,
    quantityByMonth,
    roastCountryCross,
    customerFrequency,
    avgOrderByCountry,
    salesByDayOfWeek,
    monthlyGrowth,
    options: { years, coffeeTypes, countries, roastTypes },
  };
}
