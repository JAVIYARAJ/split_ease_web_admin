"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      
      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        {/* Header */}
        <DashboardHeader title={title} />
        
        {/* Page Content */}
        <main className="p-4 md:p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
