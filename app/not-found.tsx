"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <ComingSoon 
        title="404 - Page Not Found" 
        description="The page you are looking for doesn't exist or has been moved. Let's get you back on track."
        icon={Search}
      />
    </div>
  )
}
