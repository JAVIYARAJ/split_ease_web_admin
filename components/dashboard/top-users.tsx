"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, TrendingUp } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Sarah Miller",
    email: "sarah@example.com",
    initials: "SM",
    totalExpenses: 12450,
    groups: 8,
    trend: "+15%"
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james@example.com",
    initials: "JW",
    totalExpenses: 9820,
    groups: 5,
    trend: "+8%"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    initials: "ED",
    totalExpenses: 8540,
    groups: 6,
    trend: "+22%"
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael@example.com",
    initials: "MB",
    totalExpenses: 7230,
    groups: 4,
    trend: "+5%"
  },
  {
    id: 5,
    name: "Olivia Taylor",
    email: "olivia@example.com",
    initials: "OT",
    totalExpenses: 6890,
    groups: 7,
    trend: "+12%"
  }
]

export function TopUsers() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-card-foreground">Top Users</CardTitle>
          <CardDescription className="text-muted-foreground">
            Most active users by expenses
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={user.id} className="flex items-center gap-4">
              <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-card-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.groups} groups</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-card-foreground">
                  ${user.totalExpenses.toLocaleString()}
                </p>
                <div className="flex items-center justify-end gap-1 text-primary">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">{user.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
