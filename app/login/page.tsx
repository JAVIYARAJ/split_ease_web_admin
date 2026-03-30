"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    // Step 1: Sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      toast.error(signInError.message)
      setIsLoading(false)
      return
    }

    // Step 2: Verify admin access via RPC
    // RPC returns: { message: string, is_admin: boolean }
    const { data: adminCheck, error: rpcError } = await supabase.rpc("check_admin_access_rpc")

    if (rpcError || !adminCheck?.is_admin) {
      // Not an admin — sign out immediately and reject
      await supabase.auth.signOut()
      toast.error(adminCheck?.message ?? "Access Denied. You do not have admin privileges.")
      setIsLoading(false)
      return
    }

    // Step 3: Admin confirmed — proceed to dashboard
    toast.success("Welcome back!")
    router.push("/dashboard")
    router.refresh()
  }

  const features = [
    { icon: ShieldCheck, title: "Precision Control", desc: "Unified dashboard for group management." },
    { icon: ShieldCheck, title: "Scale Ready", desc: "Enterprise-grade database performance." },
    { icon: ShieldCheck, title: "End-to-End Encryption", desc: "Highest standard for secure settlements." },
  ]

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-[#050505]">
      {/* 🌲 Left Section - Persisting the User's Dark Design */}
      <div className="relative hidden w-[45%] flex-col justify-between p-20 lg:flex overflow-hidden bg-[#050505] border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.05)_0%,transparent_70%)]" />

        {/* Branding */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-4 group" title="Back to home">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-transform group-hover:scale-110">
              <ShieldCheck className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white italic">SplitEase</span>
          </Link>
        </div>

        {/* Cinematic Content Section */}
        <div className="relative z-10 max-w-lg space-y-16">
          <div className="space-y-4">
            <h1 className="text-6xl font-black leading-[1] tracking-tighter text-white">
              Built for <br/>
              <span className="text-primary truncate">Performance.</span>
            </h1>
            <p className="text-xl font-medium text-white/30 leading-relaxed max-w-sm">
              Experience the pinnacle of platform administration and financial auditing.
            </p>
          </div>

          <div className="space-y-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-6 group cursor-default">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:bg-primary group-hover:border-primary">
                  <feature.icon className="h-5 w-5 text-white/20 group-hover:text-primary-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black tracking-widest text-white/80 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-[13px] font-medium text-white/20 leading-relaxed max-w-[240px] italic">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔐 Right Section - "Standard" Design with a "Dark Modern" Scheme */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-20 bg-[#080808]">
        {/* Mobile Branding */}
        <div className="lg:hidden mb-12 flex items-center gap-3">
           <ShieldCheck className="h-10 w-10 text-primary" />
           <span className="text-3xl font-black tracking-tighter text-white italic">SplitEase</span>
        </div>

        <div className="w-full max-w-[420px] space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="text-center sm:text-left space-y-3">
            <h2 className="text-5xl font-black tracking-tighter text-white leading-tight">Identity Check</h2>
            <p className="text-lg font-bold text-white/20 tracking-[0.2em]">Authorized Entrance Only</p>
          </div>

          {/* Elevated Professional Dark Card */}
          <div className="bg-[#111111] p-8 sm:p-14 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 relative group/card overflow-hidden">
            {/* Subtle glow edge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[13px] font-black tracking-widest text-white/30 ml-2">
                  Email Address
                </Label>
                <div className="relative group/field">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/field:text-primary transition-colors">
                    <Mail className="h-5.5 w-5.5" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@splitease.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-16 pl-14 rounded-2xl bg-[#080808] border-white/5 focus:border-primary/40 focus:bg-black focus:ring-8 focus:ring-primary/5 transition-all font-bold text-white text-base shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between ml-2">
                  <Label htmlFor="password" className="text-[13px] font-black tracking-widest text-white/30">
                    Secure Password
                  </Label>
                </div>
                <div className="relative group/field">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/field:text-primary transition-colors">
                    <Lock className="h-5.5 w-5.5" />
                  </div>
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-16 pl-14 pr-14 rounded-2xl bg-[#080808] border-white/5 focus:border-primary/40 focus:bg-black focus:ring-8 focus:ring-primary/5 transition-all font-bold text-white text-base shadow-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5.5 w-5.5" /> : <Eye className="h-5.5 w-5.5" />}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className={cn(
                  "w-full h-18 rounded-[24px] text-lg font-black transition-all duration-700 shadow-2xl relative overflow-hidden group/btn",
                  "bg-primary text-primary-foreground hover:scale-[1.02] shadow-primary/30",
                  "active:scale-95",
                  isLoading && "opacity-80 cursor-not-allowed"
                )}
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 border-4 border-background/20 border-t-background rounded-full animate-spin" />
                    <span className="tracking-[0.2em]">Validating</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-4 relative z-10 tracking-[0.2em]">
                    Login <ArrowRight className="h-6 w-6" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
