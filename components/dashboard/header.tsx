"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Calendar,
  Download,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users as UsersIcon,
  Receipt,
  Wallet,
  PieChart,
  FolderOpen,
  CreditCard,
  TrendingUp
} from "lucide-react"

const mobileNavItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/", active: true },
  { name: "Users", icon: UsersIcon, href: "/users", active: false },
  { name: "Groups", icon: FolderOpen, href: "/groups", active: false },
  { name: "Transactions", icon: Receipt, href: "/transactions", active: false },
  { name: "Settlements", icon: Wallet, href: "/settlements", active: false },
  { name: "Payments", icon: CreditCard, href: "/payments", active: false },
  { name: "Reports", icon: PieChart, href: "/reports", active: false },
  { name: "Insights", icon: TrendingUp, href: "/insights", active: false },
]

function MobileSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">SplitEase</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {mobileNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({ title = "Dashboard Overview", description = "Welcome back, Admin" }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar border-border">
            <MobileSidebar />
          </SheetContent>
        </Sheet>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-foreground truncate whitespace-nowrap">
            {title}
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Date Range Selector */}
        <Button variant="outline" className="hidden lg:flex items-center gap-2 border-border bg-secondary/30 text-foreground h-11 px-4 hover:bg-secondary/50">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Last 30 Days</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground/60" />
        </Button>

        {/* Export Button */}
        <Button variant="outline" className="hidden lg:flex gap-2 border-border bg-secondary text-foreground">
          <Download className="h-4 w-4" />
          Export
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-foreground">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
                5
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border-border">
            <DropdownMenuLabel className="text-foreground">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <div className="max-h-64 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 text-foreground focus:bg-secondary">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">John Doe joined SplitEase • 2 min ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 text-foreground focus:bg-secondary">
                <p className="text-sm font-medium">Settlement completed</p>
                <p className="text-xs text-muted-foreground">$320 settled in Roommates group • 1 hour ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 text-foreground focus:bg-secondary">
                <p className="text-sm font-medium">Large transaction alert</p>
                <p className="text-xs text-muted-foreground">$2,450 expense in Weekend Trip • 3 hours ago</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem asChild className="justify-center text-primary focus:bg-secondary cursor-pointer">
              <Link href="/notifications" className="w-full text-center">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-foreground">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">AD</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <DropdownMenuLabel className="text-foreground">
              <div className="flex flex-col">
                <span>Admin User</span>
                <span className="text-xs font-normal text-muted-foreground">admin@splitease.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-foreground focus:bg-secondary">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground focus:bg-secondary">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-destructive focus:bg-secondary focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
