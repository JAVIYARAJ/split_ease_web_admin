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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold tracking-tight text-card-foreground">{stat.value}</p>
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "flex items-center gap-0.5 text-sm font-medium",
                    stat.trend === "up" ? "text-primary" : "text-destructive"
                  )}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.description}</span>
                </div>
              </div>
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                stat.trend === "up" ? "bg-primary/10" : "bg-destructive/10"
              )}>
                <stat.icon className={cn(
                  "h-6 w-6",
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                )} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
