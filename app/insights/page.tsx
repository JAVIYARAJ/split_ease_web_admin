"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  BarChart3,
  Activity,
  Clock
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts"

const engagementData = [
  { day: "Mon", active: 8500, new: 320, returning: 8180 },
  { day: "Tue", active: 9200, new: 380, returning: 8820 },
  { day: "Wed", active: 8800, new: 290, returning: 8510 },
  { day: "Thu", active: 9500, new: 420, returning: 9080 },
  { day: "Fri", active: 10200, new: 480, returning: 9720 },
  { day: "Sat", active: 7800, new: 250, returning: 7550 },
  { day: "Sun", active: 6500, new: 180, returning: 6320 },
]

const retentionData = [
  { week: "W1", rate: 100 },
  { week: "W2", rate: 85 },
  { week: "W3", rate: 72 },
  { week: "W4", rate: 68 },
  { week: "W5", rate: 65 },
  { week: "W6", rate: 62 },
  { week: "W7", rate: 60 },
  { week: "W8", rate: 58 },
]

const keyMetrics = [
  { 
    title: "User Growth Rate", 
    value: "+24.5%", 
    change: "+3.2%",
    isUp: true,
    description: "Month over month",
    icon: Users,
    color: "text-chart-1"
  },
  { 
    title: "Avg Settlement Time", 
    value: "2.4 days", 
    change: "-18%",
    isUp: true,
    description: "Faster than last month",
    icon: Clock,
    color: "text-primary"
  },
  { 
    title: "Revenue per User", 
    value: "$12.80", 
    change: "+8%",
    isUp: true,
    description: "Platform fees",
    icon: DollarSign,
    color: "text-chart-2"
  },
  { 
    title: "Churn Rate", 
    value: "3.2%", 
    change: "-0.5%",
    isUp: true,
    description: "Below target",
    icon: Activity,
    color: "text-chart-3"
  },
]

const insights = [
  {
    id: 1,
    type: "opportunity",
    title: "High engagement in Travel groups",
    description: "Travel expense groups show 45% higher engagement than average. Consider promoting travel-specific features.",
    impact: "High",
    icon: Lightbulb,
    color: "bg-primary/20 text-primary"
  },
  {
    id: 2,
    type: "warning",
    title: "Settlement delays in large groups",
    description: "Groups with 10+ members show 2x longer settlement times. Consider implementing split payment reminders.",
    impact: "Medium",
    icon: AlertTriangle,
    color: "bg-chart-3/20 text-chart-3"
  },
  {
    id: 3,
    type: "success",
    title: "Mobile app adoption increasing",
    description: "68% of transactions now happen on mobile, up from 52% last quarter.",
    impact: "Positive",
    icon: CheckCircle,
    color: "bg-primary/20 text-primary"
  },
  {
    id: 4,
    type: "opportunity",
    title: "Weekend activity spike",
    description: "Friday evenings see 3x more expense entries. Consider targeted notifications during peak times.",
    impact: "Medium",
    icon: Zap,
    color: "bg-chart-2/20 text-chart-2"
  },
]

const goals = [
  { name: "Monthly Active Users", current: 10892, target: 12000, percentage: 91 },
  { name: "Transaction Volume", current: 186000, target: 200000, percentage: 93 },
  { name: "Settlement Rate", current: 87, target: 95, percentage: 92 },
  { name: "New User Signups", current: 328, target: 400, percentage: 82 },
]

export default function InsightsPage() {
  return (
    <DashboardLayout title="Insights" description="AI-powered analytics and recommendations">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.isUp ? (
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                    <span className={metric.isUp ? "text-primary text-sm" : "text-destructive text-sm"}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground text-sm">{metric.description}</span>
                  </div>
                </div>
                <div className={`rounded-full bg-secondary p-3 ${metric.color}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Engagement */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Engagement</CardTitle>
            <CardDescription className="text-muted-foreground">Daily active users this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                />
                <Area type="monotone" dataKey="active" stroke="hsl(var(--primary))" fill="url(#activeGradient)" strokeWidth={2} name="Active Users" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Retention Curve */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Retention</CardTitle>
            <CardDescription className="text-muted-foreground">8-week cohort retention curve</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                  formatter={(value: number) => [`${value}%`, 'Retention']}
                />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Goals */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Insights */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">AI Insights</CardTitle>
                <CardDescription className="text-muted-foreground">Recommendations based on your data</CardDescription>
              </div>
              <Badge className="bg-primary/20 text-primary">
                <Zap className="h-3 w-3 mr-1" />
                4 New
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="flex gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
                <div className={`rounded-lg p-2 h-fit ${insight.color}`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{insight.title}</h4>
                    <Badge variant="secondary" className="bg-secondary text-muted-foreground text-xs">
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Goals</CardTitle>
            <CardDescription className="text-muted-foreground">Track progress towards targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{goal.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {typeof goal.current === 'number' && goal.current > 1000 
                      ? `${(goal.current/1000).toFixed(0)}K` 
                      : goal.current
                    }
                    {goal.name === "Settlement Rate" ? "%" : ""} / 
                    {typeof goal.target === 'number' && goal.target > 1000 
                      ? `${(goal.target/1000).toFixed(0)}K` 
                      : goal.target
                    }
                    {goal.name === "Settlement Rate" ? "%" : ""}
                  </span>
                </div>
                <div className="relative">
                  <Progress value={goal.percentage} className="h-3 bg-secondary" />
                  <span className="absolute right-0 -top-6 text-xs font-medium text-foreground">
                    {goal.percentage}%
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-primary">89.5%</p>
                </div>
                <Button className="bg-primary text-primary-foreground">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
