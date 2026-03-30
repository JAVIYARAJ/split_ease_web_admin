"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, TrendingUp, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: string
  avtar: string | null
  full_name: string
  total_spent: number
  total_groups: number
}

interface TopUsersProps {
  data: User[]
  loading?: boolean
}

export function TopUsers({ data, loading }: TopUsersProps) {
  const renderSkeletons = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-4 w-4 bg-muted/20" />
          <Skeleton className="h-10 w-10 rounded-full bg-muted/20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2 bg-muted/20" />
            <Skeleton className="h-3 w-1/4 bg-muted/20" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-4 w-16 bg-muted/20 ml-auto" />
            <Skeleton className="h-3 w-10 bg-muted/20 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-card border-border group overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-black tracking-tight text-card-foreground">Top Active Users</CardTitle>
          <CardDescription className="text-[13px] font-medium text-muted-foreground italic">
            Most active platform participants by spending volume
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10">
          Rankings <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? renderSkeletons() : (
          <div className="space-y-4">
            {data.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">No data available</p>
              </div>
            ) : data.map((user, index) => {
              const initials = user.full_name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()

              return (
                <div 
                  key={user.id} 
                  className="flex items-center gap-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-secondary/20 p-2 transition-all duration-300"
                >
                  <span className="w-6 text-center text-[10px] font-black text-muted-foreground/60 font-mono tracking-tighter">
                    #{index + 1}
                  </span>
                  <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                    <AvatarImage src={user.avtar || undefined} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-black text-card-foreground tracking-tight">{user.full_name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Users className="h-2.5 w-2.5 text-muted-foreground" />
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{user.total_groups} groups joined</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-card-foreground tracking-tighter">
                      ₹{user.total_spent.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end gap-1 text-primary">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Active</span>
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

