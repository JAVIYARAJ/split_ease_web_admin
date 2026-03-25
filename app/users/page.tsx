"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  UserPlus, 
  Mail, 
  Ban,
  Eye,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
  TrendingUp
} from "lucide-react"

const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", avatar: "", status: "active", groups: 5, expenses: "$2,450", joined: "Jan 15, 2024" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", avatar: "", status: "active", groups: 3, expenses: "$1,890", joined: "Feb 2, 2024" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", avatar: "", status: "inactive", groups: 2, expenses: "$980", joined: "Mar 10, 2024" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", avatar: "", status: "active", groups: 7, expenses: "$4,320", joined: "Jan 8, 2024" },
  { id: 5, name: "Lisa Anderson", email: "lisa.a@email.com", avatar: "", status: "suspended", groups: 1, expenses: "$150", joined: "Apr 5, 2024" },
  { id: 6, name: "Robert Brown", email: "r.brown@email.com", avatar: "", status: "active", groups: 4, expenses: "$2,100", joined: "Feb 20, 2024" },
  { id: 7, name: "Amanda Miller", email: "a.miller@email.com", avatar: "", status: "active", groups: 6, expenses: "$3,650", joined: "Jan 25, 2024" },
  { id: 8, name: "David Taylor", email: "d.taylor@email.com", avatar: "", status: "inactive", groups: 2, expenses: "$720", joined: "Mar 28, 2024" },
]

const stats = [
  { title: "Total Users", value: "12,456", change: "+12%", icon: Users, color: "text-chart-1" },
  { title: "Active Users", value: "10,892", change: "+8%", icon: UserCheck, color: "text-chart-2" },
  { title: "Inactive Users", value: "1,234", change: "-3%", icon: UserX, color: "text-chart-3" },
  { title: "New This Month", value: "328", change: "+24%", icon: TrendingUp, color: "text-chart-4" },
]

export default function UsersPage() {
  return (
    <DashboardLayout title="User Management" description="Manage all platform users">
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

      {/* Users Table */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">All Users</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="w-64 pl-9 bg-secondary border-border text-foreground"
              />
            </div>
            <Button variant="outline" className="gap-2 border-border bg-secondary text-foreground">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Groups</TableHead>
                <TableHead className="text-muted-foreground">Total Expenses</TableHead>
                <TableHead className="text-muted-foreground">Joined</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={
                        user.status === 'active' 
                          ? 'bg-primary/20 text-primary' 
                          : user.status === 'suspended'
                          ? 'bg-destructive/20 text-destructive'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{user.groups}</TableCell>
                  <TableCell className="text-foreground font-medium">{user.expenses}</TableCell>
                  <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Eye className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Edit className="mr-2 h-4 w-4" /> Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Mail className="mr-2 h-4 w-4" /> Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Ban className="mr-2 h-4 w-4" /> Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-secondary focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
