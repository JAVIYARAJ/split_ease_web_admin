"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  FolderPlus, 
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  FolderOpen,
  TrendingUp,
  Calendar
} from "lucide-react"

const groups = [
  { 
    id: 1, 
    name: "Roommates 2024", 
    type: "Living",
    members: 4, 
    totalExpenses: "$4,850", 
    balance: "$320",
    settled: 85,
    avatar: "",
    created: "Jan 1, 2024",
    status: "active"
  },
  { 
    id: 2, 
    name: "Weekend Trip NYC", 
    type: "Travel",
    members: 6, 
    totalExpenses: "$2,450", 
    balance: "$180",
    settled: 92,
    avatar: "",
    created: "Mar 15, 2024",
    status: "active"
  },
  { 
    id: 3, 
    name: "Office Lunch Club", 
    type: "Food",
    members: 12, 
    totalExpenses: "$1,890", 
    balance: "$45",
    settled: 98,
    avatar: "",
    created: "Feb 10, 2024",
    status: "active"
  },
  { 
    id: 4, 
    name: "Family Vacation", 
    type: "Travel",
    members: 8, 
    totalExpenses: "$8,920", 
    balance: "$650",
    settled: 72,
    avatar: "",
    created: "Dec 20, 2023",
    status: "active"
  },
  { 
    id: 5, 
    name: "Game Night Crew", 
    type: "Entertainment",
    members: 5, 
    totalExpenses: "$380", 
    balance: "$0",
    settled: 100,
    avatar: "",
    created: "Apr 1, 2024",
    status: "settled"
  },
  { 
    id: 6, 
    name: "Birthday Party", 
    type: "Event",
    members: 15, 
    totalExpenses: "$1,200", 
    balance: "$120",
    settled: 90,
    avatar: "",
    created: "Mar 28, 2024",
    status: "active"
  },
]

const stats = [
  { title: "Total Groups", value: "1,247", change: "+18%", icon: FolderOpen, color: "text-chart-1" },
  { title: "Active Groups", value: "986", change: "+12%", icon: TrendingUp, color: "text-chart-2" },
  { title: "Total Members", value: "8,432", change: "+15%", icon: Users, color: "text-chart-3" },
  { title: "Avg Group Size", value: "6.8", change: "+2%", icon: Calendar, color: "text-chart-4" },
]

const typeColors: Record<string, string> = {
  Living: "bg-chart-1/20 text-chart-1",
  Travel: "bg-chart-2/20 text-chart-2",
  Food: "bg-chart-3/20 text-chart-3",
  Entertainment: "bg-chart-4/20 text-chart-4",
  Event: "bg-chart-5/20 text-chart-5",
}

export default function GroupsPage() {
  return (
    <DashboardLayout title="Group Management" description="Manage expense groups">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`rounded-full bg-secondary p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Groups Grid */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">All Groups</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search groups..." 
                className="w-64 pl-9 bg-secondary border-border text-foreground"
              />
            </div>
            <Button variant="outline" className="gap-2 border-border bg-secondary text-foreground">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <FolderPlus className="h-4 w-4" />
              Create Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={group.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary text-lg">
                          {group.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        <Badge className={typeColors[group.type] || "bg-muted text-muted-foreground"}>
                          {group.type}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Edit className="mr-2 h-4 w-4" /> Edit Group
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-secondary focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{group.members} members</span>
                      </div>
                      <span className="text-muted-foreground">{group.created}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Expenses</p>
                        <p className="text-lg font-semibold text-foreground">{group.totalExpenses}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Outstanding</p>
                        <p className={`text-lg font-semibold ${group.balance === '$0' ? 'text-primary' : 'text-chart-3'}`}>
                          {group.balance}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Settlement Progress</span>
                        <span className="text-xs font-medium text-foreground">{group.settled}%</span>
                      </div>
                      <Progress value={group.settled} className="h-2 bg-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
