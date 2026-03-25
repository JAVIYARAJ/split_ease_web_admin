import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ActiveGroups } from "@/components/dashboard/active-groups"
import { TopUsers } from "@/components/dashboard/top-users"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      
      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        {/* Dashboard Content */}
        <main className="p-4 md:p-6 space-y-6 pt-10">
          
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
            <RecentTransactions />
            <ActiveGroups />
          </div>
          
          {/* Top Users */}
          <TopUsers />
        </main>
      </div>
    </div>
  )
}
