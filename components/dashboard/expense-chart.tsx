"use client"

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

const data = [
  { month: "Jan", expenses: 42000, settlements: 38000 },
  { month: "Feb", expenses: 52000, settlements: 48000 },
  { month: "Mar", expenses: 48000, settlements: 45000 },
  { month: "Apr", expenses: 61000, settlements: 55000 },
  { month: "May", expenses: 55000, settlements: 52000 },
  { month: "Jun", expenses: 67000, settlements: 62000 },
  { month: "Jul", expenses: 72000, settlements: 68000 },
  { month: "Aug", expenses: 65000, settlements: 60000 },
  { month: "Sep", expenses: 78000, settlements: 72000 },
  { month: "Oct", expenses: 82000, settlements: 78000 },
  { month: "Nov", expenses: 91000, settlements: 85000 },
  { month: "Dec", expenses: 96000, settlements: 90000 }
]

export function ExpenseChart() {
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-card-foreground">Expense Overview</CardTitle>
          <CardDescription className="text-muted-foreground">
            Monthly expense and settlement trends
          </CardDescription>
        </div>
        <Select defaultValue="year">
          <SelectTrigger className="w-32 bg-secondary border-border text-foreground">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={300}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSettlements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(0.16 0.01 260)', 
                  border: '1px solid oklch(0.28 0.01 260)',
                  borderRadius: '8px',
                  color: 'oklch(0.98 0 0)'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="oklch(0.72 0.19 160)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExpenses)"
                name="Expenses"
              />
              <Area
                type="monotone"
                dataKey="settlements"
                stroke="oklch(0.7 0.15 250)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSettlements)"
                name="Settlements"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Settlements</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
