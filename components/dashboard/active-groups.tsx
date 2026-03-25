"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronRight,
  Users,
  Plane,
  Home,
  Briefcase,
  PartyPopper
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const groups = [
  {
    id: 1,
    name: "Weekend Trip NYC",
    icon: Plane,
    members: 6,
    totalExpenses: 2450.00,
    settled: 1890.00,
    status: "active",
    recentActivity: "2 min ago"
  },
  {
    id: 2,
    name: "Roommates 2024",
    icon: Home,
    members: 4,
    totalExpenses: 3200.00,
    settled: 3200.00,
    status: "settled",
    recentActivity: "1 hour ago"
  },
  {
    id: 3,
    name: "Office Lunch Club",
    icon: Briefcase,
    members: 12,
    totalExpenses: 890.00,
    settled: 450.00,
    status: "active",
    recentActivity: "3 hours ago"
  },
  {
    id: 4,
    name: "Birthday Party",
    icon: PartyPopper,
    members: 8,
    totalExpenses: 560.00,
    settled: 280.00,
    status: "active",
    recentActivity: "5 hours ago"
  }
]

export function ActiveGroups() {
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-6">
        <div>
          <CardTitle className="text-lg font-semibold text-card-foreground">Active Groups</CardTitle>
          <CardDescription className="text-muted-foreground">
            Top groups by recent activity
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 hover:text-primary">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="space-y-4">
          {groups.slice(0, 5).map((group) => {
            const settlementPercent = (group.settled / group.totalExpenses) * 100
            
            return (
              <div 
                key={group.id} 
                className="rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <group.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="font-medium text-card-foreground truncate">{group.name}</p>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "text-[10px] shrink-0 h-4 px-1.5",
                            group.status === "settled" 
                              ? "border-primary/50 text-primary" 
                              : "border-yellow-500/50 text-yellow-500"
                          )}
                        >
                          {group.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground shrink-0">{group.recentActivity}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">{group.members} members</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        ${group.settled.toLocaleString()} / ${group.totalExpenses.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress 
                        value={settlementPercent} 
                        className="h-1.5 bg-secondary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
