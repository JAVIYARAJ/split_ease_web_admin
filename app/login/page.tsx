"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, Sparkles, LayoutDashboard, Database, LockKeyhole } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000)
  }

  const features = [
    { icon: LayoutDashboard, title: "Precision Control", desc: "Unified dashboard for group management." },
    { icon: Database, title: "Scale Ready", desc: "Enterprise-grade database performance." },
    { icon: LockKeyhole, title: "End-to-End Encryption", desc: "Highest standard for secure settlements." },
  ]

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#050505]">
      {/* 🌲 The Left visual Panel - "Deep Forest" */}
      <div className="relative hidden w-[55%] flex-col justify-between p-20 lg:flex overflow-hidden">
        {/* Cinematic Visual Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Users/rajjaviya/.gemini/antigravity/brain/eb21fd99-d13a-49a1-8a7d-d14f794cc9c8/login_visual_abstract_1774475357257.png"
            alt="Admin Visual"
            className="h-full w-full object-cover opacity-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        {/* Branding & Status */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-primary shadow-[0_0_40px_-5px_rgba(var(--primary-rgb),0.6)] group-hover:scale-110 transition-all duration-700">
              <ShieldCheck className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tight text-white uppercase">SplitEase</span>
              <span className="text-[10px] font-black text-primary/60 tracking-[0.5em] uppercase">Enterprise</span>
            </div>
          </Link>
          <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
        </div>

        {/* Cinematic Content Section */}
        <div className="relative z-10 max-w-lg space-y-16">
          <div className="space-y-6">
            <h1 className="text-7xl font-black leading-[0.95] tracking-tighter text-white">
              Built for <br />
              <span className="text-primary">Performance.</span>
            </h1>
            <p className="text-xl font-medium text-white/30 leading-relaxed max-w-sm font-sans">
              Experience the pinnacle of platform administration and financial auditing.
            </p>
          </div>

          <div className="space-y-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-6 group cursor-default">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6 text-white/20 group-hover:text-inherit" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/80 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-[11px] font-bold text-white/20 leading-relaxed max-w-[240px] italic">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛰️ The Right Login Panel - "Mist Charcoal" */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-24 relative bg-[#0A0A0A] border-l border-white/5">
        {/* Subtle radial inner glow for premium feel */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/[0.03] blur-[200px] -z-10" />

        <div className="w-full max-w-[420px] space-y-14 animate-in fade-in slide-in-from-right-16 duration-1000">
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-5xl font-black tracking-tighter text-white">Security Check</h2>
            <p className="text-base font-bold text-white/20 uppercase tracking-[0.25em]">Authorized Access Protocols Only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3.5 group/field">
              <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 ml-2 transition-colors group-focus-within/field:text-primary">
                Administrator Identifier
              </Label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-all duration-500">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin.id@splitease.core"
                  required
                  className="h-16 pl-15 rounded-[24px] bg-white/[0.02] border-white/5 focus:border-primary/40 focus:bg-white/[0.04] focus:ring-8 focus:ring-primary/5 transition-all duration-500 font-bold text-white text-lg placeholder:text-white/5"
                />
              </div>
            </div>

            <div className="space-y-3.5 group/field">
              <div className="flex items-center justify-between ml-2">
                <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 transition-colors group-focus-within/field:text-primary">
                  Access Security Key
                </Label>
                <Link href="#" className="text-[10px] font-black text-primary/30 hover:text-primary transition-all tracking-[0.2em] uppercase italic">
                  Recovery
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-all duration-500">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  required
                  className="h-16 pl-15 pr-15 rounded-[24px] bg-white/[0.02] border-white/5 focus:border-primary/40 focus:bg-white/[0.04] focus:ring-8 focus:ring-primary/5 transition-all duration-500 font-bold text-white text-lg placeholder:text-white/5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer ml-2 pt-2">
              <Checkbox id="remember" className="h-5 w-5 rounded-md border-white/10 transition-all data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <Label htmlFor="remember" className="text-[12px] font-black text-white/20 cursor-pointer group-hover:text-white/40 transition-colors uppercase tracking-[0.3em]">
                Secure Persistent Link
              </Label>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full h-18 rounded-[24px] text-lg font-black transition-all duration-700",
                "bg-primary text-primary-foreground hover:scale-[1.02] shadow-[0_20px_50px_-10px_rgba(var(--primary-rgb),0.5)]",
                "active:scale-95 group overflow-hidden relative",
                isLoading && "opacity-80 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 border-[3px] border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span className="tracking-[0.3em] uppercase">Validating</span>
                </div>
              ) : (
                <span className="flex items-center gap-3 tracking-[0.3em] uppercase relative z-10">
                  ESTABLISH CONNECTION <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <footer className="pt-20 text-center">
            <p className="text-[10px] font-black text-white/[0.03] uppercase tracking-[0.6em] italic leading-loose">
              System Authorization Required <br />
              Identity Segment: ALPHA-SEC-CORE
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
