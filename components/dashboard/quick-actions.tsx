"use client"

import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Users, 
  Receipt, 
  Wallet,
  FileText,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const actions = [
  { label: "Add Expense", icon: Receipt, variant: "default" as const },
  { label: "Create Group", icon: Users, variant: "outline" as const },
  { label: "Settlement", icon: Wallet, variant: "outline" as const },
  { label: "Reports", icon: FileText, variant: "outline" as const },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">
      {actions.map((action) => (
        <Button 
          key={action.label}
          variant={action.variant}
          className={cn(
            "h-12 px-6 gap-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            action.variant === "default" 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" 
              : "border-border/50 bg-secondary/50 text-foreground hover:bg-secondary/80 hover:border-primary/30"
          )}
        >
          <action.icon className="h-4 w-4 stroke-[2.5px]" />
          <span className="font-semibold tracking-tight">{action.label}</span>
        </Button>
      ))}
    </div>
  )
}
