"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Users, 
  Receipt, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Users",
    value: "12,456",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Active Groups",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Receipt,
    description: "vs last month"
  },
  {
    title: "Total Transactions",
    value: "$2.4M",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month"
  },
  {
    title: "Pending Settlements",
    value: "$156K",
    change: "-4.3%",
    trend: "down",
    icon: TrendingUp,
    description: "vs last month"
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card/50 border-border/50 group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300",
                  stat.trend === "up" ? "bg-primary/10 group-hover:bg-primary/20" : "bg-destructive/10 group-hover:bg-destructive/15"
                )}>
                  <stat.icon className={cn(
                    "h-6 w-6",
                    stat.trend === "up" ? "text-primary" : "text-destructive"
                  )} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-tight shadow-sm",
                  stat.trend === "up" ? "bg-primary/20 text-primary" : "bg-destructive/10 text-destructive"
                )}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {stat.change}
                </div>
              </div>
              
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black tracking-tighter text-foreground leading-none">{stat.value}</h3>
                </div>
                <div className="pt-1">
                  <span className="text-xs font-medium text-muted-foreground/50 italic">{stat.description}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
