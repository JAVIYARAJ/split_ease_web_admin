"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"

interface ChartData {
  label: string
  expenses: number
  settlements: number
}

export function ExpenseChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("this_year")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const fetchData = async (overrideFilter?: string, overrideRange?: DateRange) => {
    const currentFilter = overrideFilter ?? filter
    const currentRange = overrideRange ?? dateRange

    setLoading(true)
    setError(null)
    
    // Minimum spin time for better UX feel (800ms)
    const startTime = Date.now()
    
    try {
      const supabase = createClient()
      
      const params: any = {
        p_filter: currentFilter
      }

      if (currentFilter === "custom" && currentRange?.from) {
        // Use local date format but include standard 00:00:00+00 timing
        const formatDateForRPC = (date: Date, isStart: boolean) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const time = isStart ? "00:00:00+00" : "23:59:59+00";
          return `${year}-${month}-${day} ${time}`;
        };

        params.p_start_date = formatDateForRPC(currentRange.from, true)
        if (currentRange.to) {
          params.p_end_date = formatDateForRPC(currentRange.to, false)
        }
      }

      const { data: rpcData, error: rpcError } = await supabase.rpc("web_get_expense_overview_rpc", params)

      if (rpcError) throw rpcError
      
      // Ensure we spin for at least 800ms for that "premium" feel
      const elapsed = Date.now() - startTime
      if (elapsed < 800) await new Promise(resolve => setTimeout(resolve, 800 - elapsed))
      
      setData(rpcData || [])
    } catch (err: any) {
      console.error("Error fetching expense overview:", err)
      setError(err.message || "Failed to load chart data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Only auto-fetch for standard filters, not custom range
    if (filter !== "custom") {
      fetchData()
    }
  }, [filter])

  const renderHeaderActions = () => (
    <div className="flex-1 flex items-center justify-end gap-2">
      {filter === "custom" ? (
        <div className="flex items-center gap-2 bg-secondary/30 p-1 rounded-xl border border-border/50 animate-in fade-in slide-in-from-right-2 duration-300">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "h-8 px-3 text-[11px] font-black uppercase tracking-widest bg-transparent hover:bg-secondary/80 hover:text-primary transition-all duration-200 justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, y")
                  )
                ) : (
                  <span>Select Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-border bg-card shadow-2xl" align="end">
              <div className="p-3 bg-card border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  {dateRange?.to ? 'Range Ready' : 'Select End Date'}
                </span>
                <Button 
                  size="sm" 
                  className="h-7 px-4 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform"
                  disabled={!dateRange?.from || !dateRange?.to}
                  onClick={() => {
                    setIsPopoverOpen(false)
                    fetchData()
                  }}
                >
                  Apply
                </Button>
              </div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <div className="h-4 w-px bg-border/50 mx-1" />
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            onClick={() => {
              setFilter("this_year")
              setDateRange(undefined)
            }}
          >
            Reset
          </Button>
        </div>
      ) : (
        <Select value={filter} onValueChange={(val) => {
          setFilter(val)
          if (val === "custom") {
            setIsPopoverOpen(true)
          }
        }}>
          <SelectTrigger className="h-9 w-36 bg-secondary/50 border-border text-[11px] font-black uppercase tracking-widest text-foreground hover:border-primary/50 transition-colors">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="this_week" className="text-[11px] font-black uppercase tracking-widest">This Week</SelectItem>
            <SelectItem value="this_month" className="text-[11px] font-black uppercase tracking-widest">This Month</SelectItem>
            <SelectItem value="this_year" className="text-[11px] font-black uppercase tracking-widest">This Year</SelectItem>
            <SelectItem value="custom" className="text-[11px] font-black uppercase tracking-widest text-primary focus:text-primary focus:bg-primary/10">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 ml-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-500 hover:rotate-180 group/refresh" 
        onClick={() => fetchData()}
        disabled={loading}
      >
        <RefreshCw className={cn("h-4 w-4 transition-transform duration-700", loading && "animate-spin")} />
      </Button>
    </div>
  )

  return (
    <Card className="bg-card border-border h-full flex flex-col group overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-black tracking-tight text-card-foreground">Expense overview</CardTitle>
          <CardDescription className="text-[13px] font-medium text-muted-foreground italic">
            Visualizing platform liquidity and debt clearance
          </CardDescription>
        </div>
        {renderHeaderActions()}
      </CardHeader>
      
      <CardContent className="pt-4 flex-1 flex flex-col">
        {loading && data.length === 0 ? (
          <div className="h-[300px] w-full flex flex-col gap-4">
             <div className="flex-1 flex items-end gap-2 px-2">
               {[40, 70, 45, 90, 65, 30, 80, 55, 20, 75, 40, 60].map((h, i) => (
                 <Skeleton key={i} className="flex-1 bg-muted/20" style={{ height: `${h}%` }} />
               ))}
             </div>
             <div className="h-4 w-full flex justify-between px-2">
                {[1,2,3,4].map(i => <Skeleton key={i} className="h-3 w-12 bg-muted/20" />)}
             </div>
          </div>
        ) : error ? (
          <div className="h-[300px] w-full flex flex-col items-center justify-center gap-4 text-center p-6 bg-destructive/5 rounded-[24px] border border-destructive/10">
            <p className="text-sm font-bold text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={() => fetchData()} className="border-destructive/20 text-destructive hover:bg-destructive hover:text-white">
              Try Reloading
            </Button>
          </div>
        ) : (
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSettlements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="label" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 600 }}
                  tickFormatter={(value) => value.startsWith('W') ? `Week ${value.slice(1)}` : value}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 600 }}
                  tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 800 }}
                  labelStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: '8px', opacity: 0.5 }}
                  labelFormatter={(value) => value.startsWith('W') ? `Week ${value.slice(1)}` : value}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  name="Group Expenses"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="settlements"
                  stroke="var(--chart-2)"
                  strokeWidth={3}
                  strokeDasharray="6 6"
                  fillOpacity={1}
                  fill="url(#colorSettlements)"
                  name="Settlements Cleared"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-auto pt-6 flex items-center justify-center gap-8 border-t border-white/5">
          <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-500">
            <div className="h-2 w-6 rounded-full bg-primary" />
            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">Platform Expenses</span>
          </div>
          <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-500">
            <div className="h-2 w-6 rounded-full bg-chart-2 border border-chart-2/20 border-dashed" />
            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">Platform Settlement</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
