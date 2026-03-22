import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, Download } from "lucide-react";
import type { CoffeeOrder } from "@/data/types";

const PAGE_SIZE = 15;

const typeDots: Record<string, string> = {
  Arabica: "bg-chart-1",
  Excelsa: "bg-chart-2",
  Robusta: "bg-chart-3",
  Libriac: "bg-chart-4",
};

interface Props {
  data: CoffeeOrder[];
}

export function OrdersTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState<keyof CoffeeOrder>("orderDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const searched = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((d) =>
      d.customerName.toLowerCase().includes(q) ||
      d.coffeeType.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.orderId.toLowerCase().includes(q)
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    return [...searched].sort((a, b) => {
      const va = a[sortCol], vb = b[sortCol];
      if (typeof va === "number" && typeof vb === "number") return sortDir === "asc" ? va - vb : vb - va;
      return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }, [searched, sortCol, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (col: keyof CoffeeOrder) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const exportCSV = () => {
    const headers = ["Date", "Customer", "Coffee", "Roast", "Country", "Qty", "Unit Price", "Sales", "Size", "Loyalty"];
    const rows = sorted.map(d => [d.orderDate, d.customerName, d.coffeeType, d.roastType, d.country, d.quantity, d.unitPrice, d.sales, d.size, d.loyaltyCard]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "coffee_orders.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const columns: [keyof CoffeeOrder, string][] = [
    ["orderDate", "Date"],
    ["customerName", "Customer"],
    ["coffeeType", "Coffee"],
    ["roastType", "Roast"],
    ["country", "Country"],
    ["quantity", "Qty"],
    ["unitPrice", "Price"],
    ["sales", "Sales"],
    ["loyaltyCard", "Loyalty"],
  ];

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-card">
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-sm font-semibold font-display text-foreground">Order Details</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="pl-8 w-[200px] h-8 text-xs bg-background rounded-full"
            />
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV} className="h-8 text-xs rounded-full">
            <Download className="h-3 w-3 mr-1" /> Export
          </Button>
        </div>
      </div>
      <div className="overflow-auto px-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/30">
              {columns.map(([col, label]) => (
                <TableHead
                  key={col}
                  onClick={() => toggleSort(col)}
                  className="cursor-pointer select-none text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground h-8"
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {sortCol === col && <ArrowUpDown className="h-3 w-3" />}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((d, i) => (
              <TableRow key={`${d.orderId}-${i}`} className="text-xs border-border/20 hover:bg-muted/30 transition-colors">
                <TableCell className="text-muted-foreground py-2.5 font-mono text-[11px]">{d.orderDate}</TableCell>
                <TableCell className="font-medium py-2.5">{d.customerName}</TableCell>
                <TableCell className="py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${typeDots[d.coffeeType] || "bg-muted"}`} />
                    {d.coffeeType}
                  </span>
                </TableCell>
                <TableCell className="py-2.5">{d.roastType}</TableCell>
                <TableCell className="py-2.5">{d.country}</TableCell>
                <TableCell className="py-2.5 text-center font-mono">{d.quantity}</TableCell>
                <TableCell className="py-2.5 font-mono">${d.unitPrice.toFixed(2)}</TableCell>
                <TableCell className="font-semibold py-2.5 font-mono">${d.sales.toFixed(2)}</TableCell>
                <TableCell className="py-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${d.loyaltyCard === "Yes" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    {d.loyaltyCard}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border/30">
        <span className="text-[10px] text-muted-foreground font-mono">{sorted.length} results</span>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="h-7 w-7 p-0 rounded-full">
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="text-[10px] text-muted-foreground font-mono px-2">{page + 1} / {totalPages || 1}</span>
          <Button variant="ghost" size="sm" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="h-7 w-7 p-0 rounded-full">
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
