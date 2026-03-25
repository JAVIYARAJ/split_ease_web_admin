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

const actions = [
  { label: "Add Expense", icon: Receipt, variant: "default" as const },
  { label: "Create Group", icon: Users, variant: "outline" as const },
  { label: "Settlement", icon: Wallet, variant: "outline" as const },
  { label: "Reports", icon: FileText, variant: "outline" as const },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          className={
            action.variant === "default"
              ? "gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              : "gap-2 border-border bg-secondary text-foreground hover:bg-secondary/80"
          }
        >
          <action.icon className="h-4 w-4" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
