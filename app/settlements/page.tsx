"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Wallet,
  TrendingUp,
  DollarSign,
  RefreshCw
} from "lucide-react"

const settlements = [
  { 
    id: 1, 
    from: { name: "Sarah Johnson", avatar: "" },
    to: { name: "Michael Chen", avatar: "" },
    amount: "$156.80", 
    group: "Roommates 2024",
    date: "Mar 15, 2024",
    status: "pending",
    dueDate: "Mar 20, 2024"
  },
  { 
    id: 2, 
    from: { name: "Emily Davis", avatar: "" },
    to: { name: "James Wilson", avatar: "" },
    amount: "$320.00", 
    group: "Weekend Trip NYC",
    date: "Mar 14, 2024",
    status: "completed",
    dueDate: "Mar 18, 2024"
  },
  { 
    id: 3, 
    from: { name: "Lisa Anderson", avatar: "" },
    to: { name: "Sarah Johnson", avatar: "" },
    amount: "$89.50", 
    group: "Office Lunch Club",
    date: "Mar 13, 2024",
    status: "overdue",
    dueDate: "Mar 10, 2024"
  },
  { 
    id: 4, 
    from: { name: "Robert Brown", avatar: "" },
    to: { name: "Amanda Miller", avatar: "" },
    amount: "$445.00", 
    group: "Family Vacation",
    date: "Mar 12, 2024",
    status: "pending",
    dueDate: "Mar 22, 2024"
  },
  { 
    id: 5, 
    from: { name: "David Taylor", avatar: "" },
    to: { name: "Emily Davis", avatar: "" },
    amount: "$78.25", 
    group: "Game Night Crew",
    date: "Mar 11, 2024",
    status: "completed",
    dueDate: "Mar 15, 2024"
  },
  { 
    id: 6, 
    from: { name: "Amanda Miller", avatar: "" },
    to: { name: "Robert Brown", avatar: "" },
    amount: "$212.00", 
    group: "Birthday Party",
    date: "Mar 10, 2024",
    status: "pending",
    dueDate: "Mar 25, 2024"
  },
]

const stats = [
  { title: "Total Pending", value: "$156K", subtitle: "12 settlements", icon: Clock, color: "text-chart-3" },
  { title: "Completed Today", value: "$24.5K", subtitle: "8 settlements", icon: CheckCircle, color: "text-primary" },
  { title: "Overdue", value: "$8.2K", subtitle: "3 settlements", icon: AlertCircle, color: "text-destructive" },
  { title: "Avg Settlement", value: "$245", subtitle: "+12% this week", icon: TrendingUp, color: "text-chart-2" },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-chart-3/20 text-chart-3", icon: Clock },
  completed: { label: "Completed", color: "bg-primary/20 text-primary", icon: CheckCircle },
  overdue: { label: "Overdue", color: "bg-destructive/20 text-destructive", icon: AlertCircle },
}

export default function SettlementsPage() {
  return (
    <DashboardLayout title="Settlements" description="Manage debt settlements between users">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className={`rounded-full bg-secondary p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Settlement Summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Settlement Queue</CardTitle>
            <CardDescription className="text-muted-foreground">Pending and recent settlements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {settlements.map((settlement) => {
              const status = statusConfig[settlement.status as keyof typeof statusConfig]
              return (
                <div key={settlement.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center gap-4">
                    {/* From User */}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={settlement.from.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {settlement.from.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block">
                        <p className="text-sm font-medium text-foreground">{settlement.from.name}</p>
                        <p className="text-xs text-muted-foreground">owes</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />

                    {/* To User */}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={settlement.to.avatar} />
                        <AvatarFallback className="bg-chart-2/20 text-chart-2">
                          {settlement.to.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block">
                        <p className="text-sm font-medium text-foreground">{settlement.to.name}</p>
                        <p className="text-xs text-muted-foreground">{settlement.group}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">{settlement.amount}</p>
                      <p className="text-xs text-muted-foreground">Due {settlement.dueDate}</p>
                    </div>
                    <Badge className={status.color}>
                      <status.icon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <CheckCircle className="mr-2 h-4 w-4" /> Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <RefreshCw className="mr-2 h-4 w-4" /> Send Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-secondary focus:text-destructive">
                          <AlertCircle className="mr-2 h-4 w-4" /> Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Settlement Stats */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Settlement Rate</CardTitle>
            <CardDescription className="text-muted-foreground">This month's performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    className="text-secondary"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={`${87 * 3.51} 351`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute text-3xl font-bold text-foreground">87%</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">On-time settlement rate</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="text-foreground font-medium">847</span>
                </div>
                <Progress value={85} className="h-2 bg-secondary" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="text-foreground font-medium">124</span>
                </div>
                <Progress value={12} className="h-2 bg-secondary" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Overdue</span>
                  <span className="text-foreground font-medium">29</span>
                </div>
                <Progress value={3} className="h-2 bg-secondary" />
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground">
              <Wallet className="mr-2 h-4 w-4" />
              Process All Pending
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
