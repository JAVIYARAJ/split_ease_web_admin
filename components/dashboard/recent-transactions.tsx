"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const transactions = [
  {
    id: 1,
    user: { name: "Sarah Miller", avatar: "", initials: "SM" },
    description: "Dinner at Italian Restaurant",
    group: "Weekend Trip",
    amount: 156.50,
    type: "expense",
    status: "settled",
    date: "2 hours ago"
  },
  {
    id: 2,
    user: { name: "James Wilson", avatar: "", initials: "JW" },
    description: "Uber to Airport",
    group: "Business Trip",
    amount: 45.00,
    type: "expense",
    status: "pending",
    date: "5 hours ago"
  },
  {
    id: 3,
    user: { name: "Emma Davis", avatar: "", initials: "ED" },
    description: "Settlement Payment",
    group: "Roommates",
    amount: 320.00,
    type: "settlement",
    status: "completed",
    date: "1 day ago"
  },
  {
    id: 4,
    user: { name: "Michael Brown", avatar: "", initials: "MB" },
    description: "Groceries",
    group: "Household",
    amount: 89.75,
    type: "expense",
    status: "settled",
    date: "1 day ago"
  },
  {
    id: 5,
    user: { name: "Olivia Taylor", avatar: "", initials: "OT" },
    description: "Movie Tickets",
    group: "Friends",
    amount: 64.00,
    type: "expense",
    status: "pending",
    date: "2 days ago"
  }
]

export function RecentTransactions() {
  return (
    <Card className="bg-card border-border h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-6">
        <div>
          <CardTitle className="text-lg font-semibold text-card-foreground">Recent Transactions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest expense and settlement activity
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 hover:text-primary">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={transaction.user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {transaction.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-card-foreground">
                    {transaction.description}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "shrink-0 text-[10px] px-1.5 h-4",
                      transaction.status === "settled" && "border-primary/50 text-primary",
                      transaction.status === "pending" && "border-yellow-500/50 text-yellow-500",
                      transaction.status === "completed" && "border-primary/50 text-primary"
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[11px] text-muted-foreground truncate">{transaction.user.name}</p>
                  <span className="text-muted-foreground opacity-50">•</span>
                  <p className="text-[11px] text-muted-foreground truncate">{transaction.group}</p>
                  <span className="text-muted-foreground opacity-50">•</span>
                  <p className="text-[11px] text-muted-foreground truncate whitespace-nowrap">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-bold",
                    transaction.type === "settlement" ? "text-primary" : "text-card-foreground"
                  )}>
                    {transaction.type === "settlement" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </p>
                </div>
                <div className={cn(
                  "hidden xs:flex h-8 w-8 items-center justify-center rounded-full shrink-0",
                  transaction.type === "settlement" ? "bg-primary/10" : "bg-destructive/10"
                )}>
                  {transaction.type === "settlement" ? (
                    <ArrowDownLeft className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
