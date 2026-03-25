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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Receipt,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar
} from "lucide-react"

const transactions = [
  { 
    id: 1, 
    description: "Dinner at Italian Restaurant", 
    category: "Food",
    amount: "$156.80", 
    type: "expense",
    paidBy: "Sarah Johnson",
    avatar: "",
    group: "Roommates 2024",
    date: "Mar 15, 2024",
    status: "completed",
    splitWith: 4
  },
  { 
    id: 2, 
    description: "Uber to Airport", 
    category: "Travel",
    amount: "$45.00", 
    type: "expense",
    paidBy: "Michael Chen",
    avatar: "",
    group: "Weekend Trip NYC",
    date: "Mar 14, 2024",
    status: "completed",
    splitWith: 3
  },
  { 
    id: 3, 
    description: "Settlement Payment", 
    category: "Settlement",
    amount: "$320.00", 
    type: "settlement",
    paidBy: "Emily Davis",
    avatar: "",
    group: "Roommates 2024",
    date: "Mar 13, 2024",
    status: "completed",
    splitWith: 1
  },
  { 
    id: 4, 
    description: "Hotel Booking - 3 nights", 
    category: "Travel",
    amount: "$890.00", 
    type: "expense",
    paidBy: "James Wilson",
    avatar: "",
    group: "Family Vacation",
    date: "Mar 12, 2024",
    status: "pending",
    splitWith: 8
  },
  { 
    id: 5, 
    description: "Groceries for Week", 
    category: "Food",
    amount: "$234.50", 
    type: "expense",
    paidBy: "Lisa Anderson",
    avatar: "",
    group: "Roommates 2024",
    date: "Mar 11, 2024",
    status: "completed",
    splitWith: 4
  },
  { 
    id: 6, 
    description: "Movie Tickets", 
    category: "Entertainment",
    amount: "$68.00", 
    type: "expense",
    paidBy: "Robert Brown",
    avatar: "",
    group: "Game Night Crew",
    date: "Mar 10, 2024",
    status: "completed",
    splitWith: 4
  },
  { 
    id: 7, 
    description: "Electric Bill - March", 
    category: "Utilities",
    amount: "$145.00", 
    type: "expense",
    paidBy: "Amanda Miller",
    avatar: "",
    group: "Roommates 2024",
    date: "Mar 9, 2024",
    status: "completed",
    splitWith: 4
  },
  { 
    id: 8, 
    description: "Birthday Cake & Decorations", 
    category: "Event",
    amount: "$180.00", 
    type: "expense",
    paidBy: "David Taylor",
    avatar: "",
    group: "Birthday Party",
    date: "Mar 8, 2024",
    status: "pending",
    splitWith: 12
  },
]

const stats = [
  { title: "Total Volume", value: "$2.4M", change: "+15%", icon: DollarSign, color: "text-chart-1", isUp: true },
  { title: "This Month", value: "$186K", change: "+8%", icon: TrendingUp, color: "text-chart-2", isUp: true },
  { title: "Avg Transaction", value: "$78.50", change: "-2%", icon: Receipt, color: "text-chart-3", isUp: false },
  { title: "Pending", value: "$12.4K", change: "+24%", icon: Calendar, color: "text-chart-4", isUp: true },
]

const categoryColors: Record<string, string> = {
  Food: "bg-chart-1/20 text-chart-1",
  Travel: "bg-chart-2/20 text-chart-2",
  Utilities: "bg-chart-3/20 text-chart-3",
  Entertainment: "bg-chart-4/20 text-chart-4",
  Event: "bg-chart-5/20 text-chart-5",
  Settlement: "bg-primary/20 text-primary",
}

export default function TransactionsPage() {
  return (
    <DashboardLayout title="Transactions" description="View all expense transactions">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-sm ${stat.isUp ? 'text-primary' : 'text-destructive'}`}>
                    {stat.isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className={`rounded-full bg-secondary p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions Table */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-foreground">All Transactions</CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="w-full sm:w-64 pl-9 bg-secondary border-border text-foreground"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-secondary border-border text-foreground">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all" className="text-foreground">All</SelectItem>
                <SelectItem value="food" className="text-foreground">Food</SelectItem>
                <SelectItem value="travel" className="text-foreground">Travel</SelectItem>
                <SelectItem value="utilities" className="text-foreground">Utilities</SelectItem>
                <SelectItem value="entertainment" className="text-foreground">Entertainment</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 border-border bg-secondary text-foreground">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Transaction</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Group</TableHead>
                <TableHead className="text-muted-foreground">Split</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={transaction.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary text-sm">
                          {transaction.paidBy.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">Paid by {transaction.paidBy}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={categoryColors[transaction.category] || "bg-muted text-muted-foreground"}>
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{transaction.group}</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.splitWith} people</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={
                        transaction.status === 'completed' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-chart-3/20 text-chart-3'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${transaction.type === 'settlement' ? 'text-primary' : 'text-foreground'}`}>
                      {transaction.type === 'settlement' ? '+' : ''}{transaction.amount}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground focus:bg-secondary">
                          <Edit className="mr-2 h-4 w-4" /> Edit
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
