"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Receipt,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardStats {
  total_users: { value: number; change_percent: number }
  active_groups: { value: number; change_percent: number }
  pending_settlement: { value: number; change_percent: number }
  total_transactions: { value: number; change_percent: number }
}

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data, error: rpcError } = await supabase.rpc("web_get_admin_dashboard_stats_rpc")
      
      if (rpcError) throw rpcError
      
      if (!data) {
        throw new Error("No data received from dashboard stats")
      }

      setStats(data)
    } catch (err: any) {
      console.error("Error fetching dashboard stats:", err)
      setError(err.message || "Failed to load statistics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-card border-border overflow-hidden">
            <CardContent className="p-6">
               <div className="flex items-start justify-between">
                <div className="space-y-3 w-full">
                  <Skeleton className="h-4 w-[100px] bg-muted/20" />
                  <Skeleton className="h-10 w-[140px] bg-muted/20" />
                  <Skeleton className="h-4 w-[120px] bg-muted/20" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl bg-muted/20 flex-shrink-0" />
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/20 p-6 flex flex-col items-center gap-4">
        <p className="text-destructive font-bold text-center">{error}</p>
        <button 
          onClick={() => fetchStats()} 
          className="px-4 py-2 bg-destructive text-white rounded-lg font-bold text-sm hover:bg-destructive/90 transition-colors"
        >
          Try Again
        </button>
      </Card>
    )
  }

  if (!stats) return null;

  const cards = [
    {
      title: "Total Users",
      value: stats.total_users.value.toLocaleString(),
      change: `${stats.total_users.change_percent >= 0 ? '+' : ''}${stats.total_users.change_percent}%`,
      trend: stats.total_users.change_percent >= 0 ? "up" : "down",
      icon: Users,
      description: "from platform start"
    },
    {
      title: "Active Groups",
      value: stats.active_groups.value.toLocaleString(),
      change: `${stats.active_groups.change_percent >= 0 ? '+' : ''}${stats.active_groups.change_percent}%`,
      trend: stats.active_groups.change_percent >= 0 ? "up" : "down",
      icon: LayoutDashboard,
      description: "vs launch"
    },
    {
      title: "Total Transactions",
      value: stats.total_transactions.value.toLocaleString(),
      change: `${stats.total_transactions.change_percent >= 0 ? '+' : ''}${stats.total_transactions.change_percent}%`,
      trend: stats.total_transactions.change_percent >= 0 ? "up" : "down",
      icon: Receipt,
      description: "all time total"
    },
    {
      title: "Pending Settlement",
      value: `₹${stats.pending_settlement.value.toLocaleString()}`,
      change: `${stats.pending_settlement.change_percent >= 0 ? '+' : ''}${stats.pending_settlement.change_percent}%`,
      trend: stats.pending_settlement.change_percent >= 0 ? "up" : "down",
      icon: DollarSign,
      description: "current outstanding"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {cards.map((stat) => (
        <Card key={stat.title} className="bg-card border-border hover:border-primary/20 transition-all group overflow-hidden relative">
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-black tracking-widest uppercase text-muted-foreground/60">{stat.title}</p>
                <p className="text-3xl font-black tracking-tighter text-card-foreground">{stat.value}</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
                  <span className={cn(
                    "flex items-center gap-0.5 text-xs font-black px-1.5 py-0.5 rounded-full shrink-0",
                    stat.trend === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                  )}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-wider font-mono">
                    {stat.description}
                  </span>
                </div>
              </div>
              <div className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300",
                stat.trend === "up" 
                  ? "bg-primary/5 border-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110" 
                  : "bg-destructive/5 border-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground group-hover:scale-110"
              )}>
                <stat.icon className="h-5 w-5 shrink-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
