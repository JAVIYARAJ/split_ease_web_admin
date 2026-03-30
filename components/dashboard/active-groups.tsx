"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ChevronRight,
  Users,
  Calendar,
  IndianRupee
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

interface Group {
  id: string
  name: string
  group_icon: string | null
  last_activity: string | null
  total_expense: number
  total_members: number
}

interface ActiveGroupsProps {
  data: Group[]
  loading?: boolean
}

export function ActiveGroups({ data, loading }: ActiveGroupsProps) {
  const renderSkeletons = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg border border-border bg-secondary/10 p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-xl bg-muted/20 shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <Skeleton className="h-4 w-1/2 bg-muted/20" />
                <Skeleton className="h-3 w-1/4 bg-muted/20" />
              </div>
              <Skeleton className="h-3 w-3/4 bg-muted/20" />
              <Skeleton className="h-1.5 w-full bg-muted/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-card border-border h-full flex flex-col group overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-black tracking-tight text-card-foreground">Active Groups</CardTitle>
          <CardDescription className="text-[13px] font-medium text-muted-foreground italic">
            Top performing group communities by volume
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10">
          Rankings <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 h-[450px] overflow-y-auto custom-scrollbar">
        {loading ? renderSkeletons() : (
          <div className="space-y-4">
            {data.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">No active groups</p>
              </div>
            ) : data.map((group) => {
              const lastActivity = group.last_activity ? new Date(group.last_activity) : null

              return (
                <div 
                  key={group.id} 
                  className="rounded-lg border border-border/50 bg-secondary/20 p-4 transition-all duration-300 hover:bg-secondary/40 hover:border-primary/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/5 shrink-0 overflow-hidden">
                      {group.group_icon ? (
                        <Avatar className="h-full w-full rounded-none">
                          <AvatarImage src={group.group_icon} className="object-cover" />
                          <AvatarFallback className="bg-transparent"><Users className="h-5 w-5 text-primary" /></AvatarFallback>
                        </Avatar>
                      ) : (
                        <Users className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <p className="text-sm font-black text-card-foreground truncate tracking-tight">{group.name}</p>
                          <Badge 
                            variant="outline"
                            className="text-[9px] font-black uppercase tracking-tighter shrink-0 h-4 px-1.5 border-primary/20 text-primary bg-primary/5"
                          >
                            Active
                          </Badge>
                        </div>
                        {lastActivity && (
                          <div className="flex items-center gap-1 opacity-60">
                            <Calendar className="h-2.5 w-2.5" />
                            <p className="text-[10px] font-bold text-muted-foreground shrink-0 uppercase tracking-wider">
                              {formatDistanceToNow(lastActivity, { addSuffix: true })}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{group.total_members} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3 text-primary" />
                            <span className="text-[10px] font-black text-card-foreground uppercase tracking-wide">
                              {group.total_expense.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress 
                          value={75} // Logic depends on what we prioritize, for now showing activity heat
                          className="h-1 bg-secondary overflow-hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

