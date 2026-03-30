"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  ChevronDown,
  DollarSign,
  Globe,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Star,
  TrendingUp,
  Bell,
  Wallet,
  PieChart,
  Menu,
  X,
} from "lucide-react"

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const features = [
  {
    icon: Users,
    title: "Smart Group Splits",
    desc: "Create groups for trips, roommates, or events. Add expenses and SplitEase automatically divides them fairly among members.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Balances",
    desc: "See who owes what at a glance. Dynamic balance tracking updates instantly as expenses are added or settled.",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Wallet,
    title: "One-Tap Settlements",
    desc: "Settle up with friends instantly. Record payments and clear debts with a single tap — no awkward conversations needed.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/20",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: PieChart,
    title: "Expense Analytics",
    desc: "Visualise your spending patterns. Understand where your money goes with beautiful charts and category breakdowns.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Automated nudges ensure no payment slips through the cracks — keeping your groups balanced and stress-free.",
    color: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20",
    glow: "rgba(244,63,94,0.15)",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    desc: "Your financial data stays private and protected with end-to-end encryption and enterprise-grade infrastructure.",
    color: "from-teal-500/20 to-teal-500/5",
    border: "border-teal-500/20",
    glow: "rgba(20,184,166,0.15)",
  },
]

const steps = [
  { step: "01", title: "Create a Group", desc: "Set up a group for any occasion — a trip, dinner, flat, or project. Invite friends via link." },
  { step: "02", title: "Log Expenses", desc: "Add expenses with a description and amount. Choose equal split, custom amounts, or percentages." },
  { step: "03", title: "Track Balances", desc: "SplitEase calculates the optimal payment paths to minimize the number of transactions." },
  { step: "04", title: "Settle Up", desc: "Mark payments as settled and enjoy a clean, zero-balance group when you're done." },
]

const testimonials = [
  { name: "Priya Sharma", role: "frequent traveller", text: "SplitEase made our 10-day Europe trip so smooth. No arguments over who owes what — it just handled everything.", stars: 5 },
  { name: "Rohan Mehta", role: "flatmate", text: "We use it every month for rent, electricity, groceries. It's become an essential part of living together.", stars: 5 },
  { name: "Aisha Khan", role: "event organiser", text: "Organised a 30-person reunion. The group expense tracking was flawless. Settled everything in minutes.", stars: 5 },
]

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect for casual groups and occasional trips.",
    cta: "Get Started Free",
    features: ["Up to 5 active groups", "Unlimited expenses", "Basic analytics", "Settlement tracking"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "per month",
    desc: "For power users who split expenses regularly.",
    cta: "Start Free Trial",
    features: ["Unlimited groups", "Advanced analytics", "Custom split rules", "Priority support", "Export to CSV / PDF"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "For organisations and large communities.",
    cta: "Contact Sales",
    features: ["Everything in Pro", "Admin dashboard", "SSO integration", "Dedicated support", "SLA guarantee"],
    highlighted: false,
  },
]

// ─────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────

function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-3 group" id="nav-logo">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-110">
            <DollarSign className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-black tracking-tight text-white italic">SplitEase</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[["#features", "Features"], ["#how-it-works", "How it works"], ["#testimonials", "Reviews"], ["#pricing", "Pricing"]].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold text-white/50 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" id="nav-login" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
            Admin Login
          </Link>
          <a
            href="#get-started"
            id="nav-cta"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-black text-sm font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all"
          >
            Get the App <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          id="mobile-menu-toggle"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 px-6 py-6 flex flex-col gap-5">
          {[["#features", "Features"], ["#how-it-works", "How it works"], ["#testimonials", "Reviews"], ["#pricing", "Pricing"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-base font-semibold text-white/60 hover:text-white transition-colors">
              {label}
            </a>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="text-base font-bold text-white/40 hover:text-white transition-colors">
            Admin Login
          </Link>
          <a href="#get-started" onClick={() => setOpen(false)} className="px-5 py-3 rounded-xl bg-primary text-black text-sm font-black text-center">
            Get the App
          </a>
        </div>
      )}
    </header>
  )
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/8 blur-[120px] animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/6 blur-[120px] animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[100px] animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }} />
    </div>
  )
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = Math.ceil(to / 60)
          const timer = setInterval(() => {
            start += step
            if (start >= to) { setCount(to); clearInterval(timer) }
            else setCount(start)
          }, 20)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <NavBar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <FloatingOrbs />

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4" />
            Expense splitting, reimagined for everyone
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Split expenses.{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-teal-400">
              Stay friends.
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/40 font-medium max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed">
            SplitEase makes shared expenses effortless — whether it's a trip, rent, dinner, or a group project. Add, split, and settle in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300" id="get-started">
            <a
              href="#"
              id="hero-primary-cta"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-black font-black text-base shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300"
            >
              Download the App <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#how-it-works"
              id="hero-secondary-cta"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-base hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            {[
              { val: 50000, suf: "+", label: "Active Users" },
              { val: 2000000, suf: "+", label: "Expenses Split" },
              { val: 99, suf: "%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary">
                  <CountUp to={s.val} suffix={s.suf} />
                </div>
                <div className="text-sm text-white/30 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 hover:text-white/50 transition-colors animate-bounce">
          <span className="text-xs font-semibold tracking-widest">SCROLL</span>
          <ChevronDown className="h-5 w-5" />
        </a>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-bold tracking-widest uppercase mb-5">
              Core Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-5">
              Everything you need,{" "}
              <span className="text-primary">nothing you don't.</span>
            </h2>
            <p className="text-lg text-white/30 max-w-xl mx-auto">
              Designed to make shared finances simple, transparent, and stress-free for groups of all sizes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                id={`feature-card-${i}`}
                className={`relative group p-8 rounded-3xl border ${f.border} bg-gradient-to-br ${f.color} backdrop-blur hover:scale-[1.02] transition-all duration-300 cursor-default overflow-hidden`}
                style={{
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${f.glow}`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                    <f.icon className="h-6 w-6 text-white/70" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-white">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-bold tracking-widest uppercase mb-5">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-5">
              Up and running in{" "}
              <span className="text-primary">60 seconds.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} id={`step-${i}`} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
                )}
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-black text-primary">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2">{s.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section id="testimonials" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-bold tracking-widest uppercase mb-5">
              What People Say
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
              Loved by thousands of{" "}
              <span className="text-primary">groups worldwide.</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                id={`testimonial-${i}`}
                className="group relative p-8 rounded-3xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-emerald-700/50 flex items-center justify-center font-black text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-black text-sm">{t.name}</div>
                    <div className="text-white/30 text-xs capitalize">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-bold tracking-widest uppercase mb-5">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-5">
              Simple, transparent{" "}
              <span className="text-primary">pricing.</span>
            </h2>
            <p className="text-lg text-white/30">No hidden fees. No surprises. Start free forever.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 items-center">
            {plans.map((plan, i) => (
              <div
                key={i}
                id={`plan-${i}`}
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "border-primary/40 bg-gradient-to-b from-primary/15 to-primary/5 shadow-[0_0_60px_rgba(16,185,129,0.15)] lg:scale-105"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-black text-xs font-black">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-black mb-1 text-white/80">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-sm text-white/30">{plan.period}</span>
                  </div>
                  <p className="text-sm text-white/40 mt-2">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm text-white/60">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  id={`plan-cta-${i}`}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-primary text-black shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-[1.02]"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ── */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-[48px] blur-xl" />
          <div className="relative z-10 p-16 rounded-[48px] border border-primary/20 bg-gradient-to-b from-primary/10 to-primary/5">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                <DollarSign className="h-10 w-10 text-black" />
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-5">
              Ready to split smarter?
            </h2>
            <p className="text-lg text-white/40 mb-10 max-w-lg mx-auto">
              Join over 50,000 groups who use SplitEase to keep their finances fair and friendships intact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                id="final-cta-primary"
                className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-black font-black text-base shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300"
              >
                <Zap className="h-5 w-5" /> Download Free
              </a>
              <Link
                href="/login"
                id="final-cta-secondary"
                className="flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-base hover:bg-white/10 transition-all"
              >
                <LayoutDashboard className="h-5 w-5" /> Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <DollarSign className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-black italic text-white">SplitEase</span>
            </div>
            <div className="flex flex-wrap items-center gap-8 text-sm text-white/30">
              <a href="#features" className="hover:text-white/60 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white/60 transition-colors">Pricing</a>
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <Link href="/login" className="hover:text-white/60 transition-colors">Admin Login</Link>
            </div>
            <p className="text-sm text-white/20">© {new Date().getFullYear()} SplitEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
