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
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-6">
        <div>
          <CardTitle className="text-xl font-bold text-foreground">Top Power Users</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Influential users by transaction volume
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 hover:text-primary rounded-xl">
          Detailed Report <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-3">
          {users.map((user, index) => (
            <div key={user.id} className="group flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-border/50 hover:bg-secondary/30 transition-all duration-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/50 text-[11px] font-black text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                #0{index + 1}
              </div>
              <Avatar className="h-11 w-11 shadow-sm border-2 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/5 text-primary text-sm font-bold">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[15px] font-bold text-foreground">{user.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground/60">{user.groups} established groups</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-black tracking-tight text-foreground">
                  ${user.totalExpenses.toLocaleString()}
                </p>
                <div className="flex items-center justify-end gap-1 font-bold text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-[11px]">{user.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
