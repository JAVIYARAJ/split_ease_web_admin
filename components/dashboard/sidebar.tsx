"use client"

import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  Wallet, 
  PieChart, 
  Settings, 
  Bell,
  CreditCard,
  TrendingUp,
  FolderOpen,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigationItems = [
  { 
    section: "MAIN",
    items: [
      { name: "Overview", icon: LayoutDashboard, href: "/", badge: null },
      { name: "Users", icon: Users, href: "/users", badge: "1.2k" },
      { name: "Groups", icon: FolderOpen, href: "/groups", badge: "156" },
    ]
  },
  {
    section: "EXPENSES",
    items: [
      { name: "Transactions", icon: Receipt, href: "/transactions", badge: null },
      { name: "Settlements", icon: Wallet, href: "/settlements", badge: "12" },
      { name: "Payments", icon: CreditCard, href: "/payments", badge: null },
    ]
  },
  {
    section: "ANALYTICS",
    items: [
      { name: "Reports", icon: PieChart, href: "/reports", badge: null },
      { name: "Insights", icon: TrendingUp, href: "/insights", badge: "New" },
    ]
  },
  {
    section: "SETTINGS",
    items: [
      { name: "Notifications", icon: Bell, href: "/notifications", badge: "5" },
      { name: "Settings", icon: Settings, href: "/settings", badge: null },
    ]
  }
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">SplitEase</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8 text-muted-foreground", collapsed && "hidden")}
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navigationItems.map((section) => (
            <div key={section.section} className="space-y-1">
              {!collapsed && (
                <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {section.section}
                </p>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-sidebar-accent text-primary" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant={item.badge === "New" ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            item.badge === "New" && "bg-primary text-primary-foreground"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              )
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div className={cn(
            "flex items-center gap-3 rounded-lg bg-sidebar-accent p-3",
            collapsed && "justify-center p-2"
          )}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="truncate text-xs text-muted-foreground">admin@splitease.com</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Collapse Button */}
        {collapsed && (
          <div className="border-t border-border p-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-full text-muted-foreground"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
