import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import type { Filters } from "@/data/types";

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  options: { years: number[]; coffeeTypes: string[]; countries: string[]; roastTypes: string[] };
}

const defaultFilters: Filters = { year: "all", coffeeType: "all", country: "all", roastType: "all" };

export function FilterBar({ filters, onChange, options }: Props) {
  const update = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });
  const hasFilters = Object.values(filters).some((v) => v !== "all");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect label="Year" value={filters.year} onValueChange={(v) => update("year", v)} options={options.years.map(String)} />
      <FilterSelect label="Coffee" value={filters.coffeeType} onValueChange={(v) => update("coffeeType", v)} options={options.coffeeTypes} />
      <FilterSelect label="Country" value={filters.country} onValueChange={(v) => update("country", v)} options={options.countries} />
      <FilterSelect label="Roast" value={filters.roastType} onValueChange={(v) => update("roastType", v)} options={options.roastTypes} />
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => onChange(defaultFilters)} className="h-8 text-xs text-muted-foreground hover:text-foreground rounded-full">
          <RotateCcw className="h-3 w-3 mr-1" /> Reset
        </Button>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onValueChange, options }: { label: string; value: string; onValueChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[120px] h-8 text-xs bg-card border-border/60 rounded-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {label}s</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
