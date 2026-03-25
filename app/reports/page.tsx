"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Download, 
  FileText,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  PieChart,
  BarChart3,
  FileSpreadsheet,
  Clock,
  CheckCircle
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const monthlyData = [
  { month: "Jan", expenses: 45000, settlements: 42000, users: 1200 },
  { month: "Feb", expenses: 52000, settlements: 48000, users: 1350 },
  { month: "Mar", expenses: 48000, settlements: 45000, users: 1450 },
  { month: "Apr", expenses: 61000, settlements: 58000, users: 1620 },
  { month: "May", expenses: 55000, settlements: 52000, users: 1780 },
  { month: "Jun", expenses: 67000, settlements: 64000, users: 1950 },
]

const categoryData = [
  { name: "Food & Dining", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Travel", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Utilities", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, color: "hsl(var(--chart-5))" },
]

const topGroupsData = [
  { name: "Roommates 2024", expenses: 45000 },
  { name: "Office Lunch", expenses: 32000 },
  { name: "Family Trip", expenses: 28000 },
  { name: "Weekend Crew", expenses: 21000 },
  { name: "College Friends", expenses: 18000 },
]

const savedReports = [
  { id: 1, name: "Q1 2024 Summary", type: "Quarterly", date: "Apr 1, 2024", status: "ready" },
  { id: 2, name: "Monthly User Growth", type: "Monthly", date: "Mar 31, 2024", status: "ready" },
  { id: 3, name: "Expense Category Analysis", type: "Custom", date: "Mar 28, 2024", status: "ready" },
  { id: 4, name: "Settlement Efficiency", type: "Weekly", date: "Mar 25, 2024", status: "processing" },
]

const reportTemplates = [
  { id: 1, name: "Financial Summary", description: "Complete financial overview with all metrics", icon: DollarSign },
  { id: 2, name: "User Analytics", description: "User growth, engagement, and retention", icon: Users },
  { id: 3, name: "Expense Breakdown", description: "Detailed expense analysis by category", icon: PieChart },
  { id: 4, name: "Settlement Report", description: "Settlement status and efficiency metrics", icon: TrendingUp },
]

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports" description="Generate and view platform reports">
      {/* Report Templates */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportTemplates.map((template) => (
          <Card key={template.id} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/20 p-3">
                  <template.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trends */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Monthly Trends</CardTitle>
              <CardDescription className="text-muted-foreground">Expenses vs Settlements over time</CardDescription>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-32 bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="3months" className="text-foreground">3 Months</SelectItem>
                <SelectItem value="6months" className="text-foreground">6 Months</SelectItem>
                <SelectItem value="1year" className="text-foreground">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="settlementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="expenses" stroke="hsl(var(--chart-1))" fill="url(#expenseGradient)" strokeWidth={2} name="Expenses" />
                <Area type="monotone" dataKey="settlements" stroke="hsl(var(--primary))" fill="url(#settlementGradient)" strokeWidth={2} name="Settlements" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Expense Categories</CardTitle>
            <CardDescription className="text-muted-foreground">Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))"
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm text-foreground">{category.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Groups & Saved Reports */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Groups by Expenses */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Top Groups by Expenses</CardTitle>
            <CardDescription className="text-muted-foreground">Highest spending groups this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topGroupsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Expenses']}
                />
                <Bar dataKey="expenses" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Saved Reports */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Saved Reports</CardTitle>
              <CardDescription className="text-muted-foreground">Previously generated reports</CardDescription>
            </div>
            <Button className="bg-primary text-primary-foreground">
              <FileText className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                      <Badge variant="secondary" className="bg-secondary text-muted-foreground">
                        {report.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === 'ready' ? (
                    <>
                      <Badge className="bg-primary/20 text-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                      <Button variant="ghost" size="icon" className="text-foreground">
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Badge className="bg-chart-3/20 text-chart-3">
                      <Clock className="h-3 w-3 mr-1" />
                      Processing
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
