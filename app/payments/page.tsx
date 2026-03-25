"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  CreditCard,
  Building2,
  Smartphone,
  DollarSign,
  TrendingUp,
  Download,
  Eye,
  RefreshCw,
  XCircle,
  CheckCircle,
  Clock,
  Banknote,
  Wallet
} from "lucide-react"

const payments = [
  { 
    id: "PAY-001234", 
    user: "Sarah Johnson",
    avatar: "",
    method: "Credit Card",
    methodIcon: CreditCard,
    last4: "4242",
    amount: "$156.80", 
    fee: "$4.70",
    net: "$152.10",
    date: "Mar 15, 2024",
    status: "completed"
  },
  { 
    id: "PAY-001235", 
    user: "Michael Chen",
    avatar: "",
    method: "Bank Transfer",
    methodIcon: Building2,
    last4: "6789",
    amount: "$320.00", 
    fee: "$3.20",
    net: "$316.80",
    date: "Mar 14, 2024",
    status: "completed"
  },
  { 
    id: "PAY-001236", 
    user: "Emily Davis",
    avatar: "",
    method: "Apple Pay",
    methodIcon: Smartphone,
    last4: "1234",
    amount: "$89.50", 
    fee: "$2.69",
    net: "$86.81",
    date: "Mar 13, 2024",
    status: "pending"
  },
  { 
    id: "PAY-001237", 
    user: "James Wilson",
    avatar: "",
    method: "Credit Card",
    methodIcon: CreditCard,
    last4: "5678",
    amount: "$445.00", 
    fee: "$13.35",
    net: "$431.65",
    date: "Mar 12, 2024",
    status: "completed"
  },
  { 
    id: "PAY-001238", 
    user: "Lisa Anderson",
    avatar: "",
    method: "Bank Transfer",
    methodIcon: Building2,
    last4: "9012",
    amount: "$78.25", 
    fee: "$0.78",
    net: "$77.47",
    date: "Mar 11, 2024",
    status: "failed"
  },
  { 
    id: "PAY-001239", 
    user: "Robert Brown",
    avatar: "",
    method: "Google Pay",
    methodIcon: Smartphone,
    last4: "3456",
    amount: "$212.00", 
    fee: "$6.36",
    net: "$205.64",
    date: "Mar 10, 2024",
    status: "refunded"
  },
]

const stats = [
  { title: "Total Volume", value: "$1.2M", change: "+18%", icon: DollarSign, color: "text-chart-1" },
  { title: "Successful", value: "4,892", change: "+12%", icon: CheckCircle, color: "text-primary" },
  { title: "Failed", value: "156", change: "-8%", icon: XCircle, color: "text-destructive" },
  { title: "Platform Fees", value: "$36.2K", change: "+15%", icon: Banknote, color: "text-chart-2" },
]

const paymentMethods = [
  { method: "Credit Card", percentage: 45, color: "bg-chart-1" },
  { method: "Bank Transfer", percentage: 30, color: "bg-chart-2" },
  { method: "Apple Pay", percentage: 15, color: "bg-chart-3" },
  { method: "Google Pay", percentage: 10, color: "bg-chart-4" },
]

const statusConfig = {
  completed: { label: "Completed", color: "bg-primary/20 text-primary" },
  pending: { label: "Pending", color: "bg-chart-3/20 text-chart-3" },
  failed: { label: "Failed", color: "bg-destructive/20 text-destructive" },
  refunded: { label: "Refunded", color: "bg-chart-2/20 text-chart-2" },
}

export default function PaymentsPage() {
  return (
    <DashboardLayout title="Payments" description="Manage payment transactions and methods">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-primary' : stat.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Methods Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Payment Methods</CardTitle>
            <CardDescription className="text-muted-foreground">Distribution by method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.method} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{method.method}</span>
                  <span className="text-muted-foreground">{method.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className={`h-full ${method.color} rounded-full transition-all`} 
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-primary">96.8%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Avg Processing</p>
                  <p className="text-2xl font-bold text-foreground">2.4s</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Payments</CardTitle>
              <CardDescription className="text-muted-foreground">All payment transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 border-border bg-secondary text-foreground">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-border bg-secondary text-foreground">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Payment ID</TableHead>
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-muted-foreground">Method</TableHead>
                  <TableHead className="text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const status = statusConfig[payment.status as keyof typeof statusConfig]
                  return (
                    <TableRow key={payment.id} className="border-border hover:bg-secondary/50">
                      <TableCell className="font-mono text-sm text-foreground">{payment.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payment.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {payment.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-foreground">{payment.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <payment.methodIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{payment.method}</span>
                          <span className="text-muted-foreground text-xs">•••• {payment.last4}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-foreground">{payment.amount}</p>
                          <p className="text-xs text-muted-foreground">Fee: {payment.fee}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
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
                              <RefreshCw className="mr-2 h-4 w-4" /> Refund
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground focus:bg-secondary">
                              <Download className="mr-2 h-4 w-4" /> Receipt
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
