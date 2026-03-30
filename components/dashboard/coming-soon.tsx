"use client"

import { Button } from "@/components/ui/button"
import { Rocket, ArrowLeft, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ComingSoonProps {
  title: string
  description?: string
  icon?: any
}

export function ComingSoon({ title, description = "We're working hard to bring this feature to life. Stay tuned!", icon: Icon = Clock }: ComingSoonProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-card border border-border shadow-2xl animate-in zoom-in-50 duration-500">
          <Icon className="h-12 w-12 text-primary" />
          <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-yellow-500 animate-bounce" />
        </div>
      </div>

      <div className="animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-6xl">
          {title} <span className="text-primary italic">Coming Soon</span>
        </h1>
        
        <p className="mb-10 max-w-lg mx-auto text-lg font-medium text-muted-foreground/80 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300">
        <Button asChild size="lg" className="h-14 px-8 rounded-2xl gap-2 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
        </Button>
        
        <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl gap-2 text-lg font-bold border-border bg-secondary/30 hover:bg-secondary/50 transition-all hover:scale-105 active:scale-95">
          <Rocket className="h-5 w-5 text-primary" />
          Notify Me
        </Button>
      </div>

      <div className="mt-16 flex gap-8 opacity-40 animate-in fade-in duration-1000 delay-500">
        <div className="h-1 w-12 rounded-full bg-primary/50" />
        <div className="h-1 w-12 rounded-full bg-primary" />
        <div className="h-1 w-12 rounded-full bg-primary/50" />
      </div>
    </div>
  )
}
