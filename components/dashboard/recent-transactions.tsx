"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  MoreHorizontal,
  Users,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

interface Transaction {
  id: string
  type: 'expense' | 'settlement'
  avtar: string | null
  full_name: string
  created_at: string
  group_name: string | null
  description: string
  total_amount: number
}

interface RecentTransactionsProps {
  data: Transaction[]
  loading?: boolean
}

export function RecentTransactions({ data, loading }: RecentTransactionsProps) {
  const renderSkeletons = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border border-border bg-secondary/10 p-4">
          <Skeleton className="h-10 w-10 rounded-full bg-muted/20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 bg-muted/20" />
            <Skeleton className="h-3 w-1/2 bg-muted/20" />
          </div>
          <Skeleton className="h-8 w-16 bg-muted/20" />
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-card border-border h-full flex flex-col group overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-black tracking-tight text-card-foreground">Recent Transactions</CardTitle>
          <CardDescription className="text-[13px] font-medium text-muted-foreground italic">
            Latest platform expense and settlement activity
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10">
          View All <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 h-[450px] overflow-y-auto custom-scrollbar">
        {loading ? renderSkeletons() : (
          <div className="space-y-4">
            {data.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">No recent activity</p>
              </div>
            ) : data.map((transaction) => {
              const date = new Date(transaction.created_at)
              const initials = transaction.full_name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()

              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/20 p-4 transition-all duration-300 hover:bg-secondary/40 hover:border-primary/20 hover:translate-x-1"
                >
                  <Avatar className="h-10 w-10 shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all border border-white/5">
                    <AvatarImage src={transaction.avtar || undefined} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 ml-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-black text-card-foreground tracking-tight">
                        {transaction.description}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 text-[9px] font-black uppercase tracking-tighter px-1.5 h-4 border-none",
                          transaction.type === "expense" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                        )}
                      >
                        {transaction.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
                      <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-widest leading-none">{transaction.full_name}</p>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30 shrink-0" />
                      <p className="text-[10px] font-black text-primary/80 truncate uppercase tracking-widest leading-none">
                        {transaction.group_name || 'Personal'}
                      </p>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30 shrink-0" />
                      <p className="text-[10px] font-bold text-muted-foreground/60 truncate whitespace-nowrap uppercase tracking-widest leading-none">
                        {formatDistanceToNow(date, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="text-right">
                      <p className={cn(
                        "text-[15px] font-black tracking-tighter leading-none mb-1",
                        transaction.type === "settlement" ? "text-primary" : "text-card-foreground"
                      )}>
                        {transaction.type === "settlement" ? "+" : "-"}₹{transaction.total_amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                      </p>
                      <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] leading-none">
                        {transaction.type === "settlement" ? 'Credit' : 'Debit'}
                      </p>
                    </div>
                    <div className={cn(
                      "hidden xs:flex h-8 w-8 items-center justify-center rounded-xl shrink-0 border border-white/5 shadow-sm",
                      transaction.type === "settlement" ? "bg-primary/10" : "bg-destructive/10"
                    )}>
                      {transaction.type === "settlement" ? (
                        <ArrowDownLeft className="h-4 w-4 text-primary" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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

