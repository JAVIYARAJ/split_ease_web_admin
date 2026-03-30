"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ActiveGroups } from "@/components/dashboard/active-groups"
import { TopUsers } from "@/components/dashboard/top-users"

interface DashboardOverview {
  recent_transactions: any[]
  active_groups: any[]
  top_users: any[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardOverview | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchOverview = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data: rpcData, error } = await supabase.rpc("web_get_dashboard_overview_rpc")
      
      if (error) throw error
      setData(rpcData)
    } catch (err) {
      console.error("Error fetching dashboard overview:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOverview()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ExpenseChart />
            </div>
            <div>
              <CategoryChart />
            </div>
          </div>

          {/* Transactions and Groups Row */}
          <div className="grid gap-6 xl:grid-cols-2">
            <RecentTransactions 
              data={data?.recent_transactions || []} 
              loading={loading} 
            />
            <ActiveGroups 
              data={data?.active_groups || []} 
              loading={loading} 
            />
          </div>

          {/* Top Users */}
          <TopUsers 
            data={data?.top_users || []} 
            loading={loading} 
          />
        </main>
      </div>
    </div>
  )
}
