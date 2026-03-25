"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ComingSoon } from "@/components/dashboard/coming-soon"
import { Bell } from "lucide-react"

export default function NotificationsPage() {
  return (
    <DashboardLayout title="System Notifications">
      <ComingSoon 
        title="Notifications" 
        description="Stay updated with all activities. Your detailed notification center is coming very soon with custom alerts and push support."
        icon={Bell}
      />
    </DashboardLayout>
  )
}
