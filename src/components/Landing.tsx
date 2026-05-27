import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowDown, Wallet, Zap, Shield, Layers, Coins, Activity,
  Boxes, Cpu, Network, Lock, Gauge, Repeat, Sparkles, ChevronRight,
  CircleDot, TrendingUp, Hexagon, ExternalLink, Check, X,
} from "lucide-react";

/* ---------- Atoms ---------- */

function Button({
  children, variant = "primary", className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-soft hover:-translate-y-0.5",
    ghost: "text-foreground/80 hover:text-foreground hover:bg-white/5",
    outline: "border border-border text-foreground hover:bg-white/5 hover:border-primary/40",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary-glow ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
      {children}
    </span>
  );
}

function GlowOrb({ className = "", color = "var(--primary)" }: { className?: string; color?: string }) {
  return <div className={`glow-orb ${className}`} style={{ background: color, opacity: 0.5 }} />;
}

function SectionHeader({ eyebrow, title, sub, center = true }: {
  eyebrow?: string; title: React.ReactNode; sub?: string; center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <div className="mb-4"><Badge>{eyebrow}</Badge></div>}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gradient leading-[1.05]">{title}</h2>
      {sub && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{sub}</p>}
    </motion.div>
  );
}

function FlekvarMark() {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary-glow" />
      <Hexagon className="absolute inset-0 m-auto h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
    </div>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Features", "Demo", "Architecture", "Why Now", "Roadmap", "Docs"];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-full border border-border/60 backdrop-blur-xl transition-all duration-500 ${scrolled ? "bg-background/70 px-4 py-2 shadow-elegant" : "bg-background/30 px-6 py-3"}`}>
          <a href="#" className="flex items-center gap-2.5">
            <FlekvarMark />
            <span className="font-semibold tracking-tight text-foreground">Flekvar</span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">Watch Demo</Button>
            <Button>Launch App <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function HeroDashboard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -m-12 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-orbit" />
        <div className="absolute inset-8 rounded-full border border-primary/5" style={{ animation: "orbit 30s linear infinite reverse" }} />
      </div>

      <div className="relative glass-strong rounded-3xl p-5 shadow-glow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs font-mono text-muted-foreground">0x7C3A...AED1</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary-glow">EIP-7702 ACTIVE</span>
        </div>

        <div className="mt-5 space-y-3">
          <FeedCard icon={<Coins className="h-4 w-4" />} label="Incoming transfer" value="10,000 PEPE" sub="from 0x91e...4f2" tint="muted" />
          <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-primary animate-pulse-glow" /></div>
          <FeedCard icon={<Repeat className="h-4 w-4" />} label="Uniswap v4 hook" value="Auto-swap executing" sub="atomic · singleton pool" tint="primary" shimmer />
          <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-primary animate-pulse-glow" /></div>
          <FeedCard icon={<Check className="h-4 w-4" />} label="Received" value="42.18 USDC" sub="≈ $42.18" tint="success" />
          <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-primary animate-pulse-glow" /></div>
          <FeedCard icon={<TrendingUp className="h-4 w-4" />} label="Morpho vault deposit" value="8.2% APY active" sub="MetaMorpho · auto-compound" tint="primary" />
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-background/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Yield earned · 24h</div>
              <div className="text-lg font-medium text-foreground">+$4.23 <span className="text-success text-sm">▲ 8.2%</span></div>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">tx 0xae...c12</div>
          </div>
          <svg viewBox="0 0 200 50" className="w-full h-12">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.24 295)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.62 0.24 295)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,40 L20,35 L40,38 L60,28 L80,30 L100,22 L120,25 L140,15 L160,18 L180,8 L200,10 L200,50 L0,50 Z" fill="url(#g1)" />
            <path d="M0,40 L20,35 L40,38 L60,28 L80,30 L100,22 L120,25 L140,15 L160,18 L180,8 L200,10" fill="none" stroke="oklch(0.74 0.20 300)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-8 top-12 hidden md:block glass rounded-2xl p-3 shadow-elegant">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center"><Zap className="h-4 w-4 text-primary-foreground" /></div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Gas</div>
            <div className="text-xs font-mono text-foreground">$0.04</div>
          </div>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-6 bottom-20 hidden md:block glass rounded-2xl p-3 shadow-elegant">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center"><Activity className="h-4 w-4 text-success" /></div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">APY</div>
            <div className="text-xs font-mono text-foreground">8.2%</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeedCard({ icon, label, value, sub, tint = "muted", shimmer = false }: {
  icon: React.ReactNode; label: string; value: string; sub: string;
  tint?: "muted" | "primary" | "success"; shimmer?: boolean;
}) {
  const tints = {
    muted: "bg-white/[0.02]",
    primary: "bg-primary/10 border-primary/30",
    success: "bg-success/10 border-success/30",
  };
  const iconTints = {
    muted: "bg-white/5 text-muted-foreground",
    primary: "bg-primary/20 text-primary-glow",
    success: "bg-success/20 text-success",
  };
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border p-3 flex items-center gap-3 ${tints[tint]}`}>
      {shimmer && (
        <motion.div className="absolute inset-0 -translate-x-full" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ background: "linear-gradient(90deg, transparent, oklch(0.74 0.20 300 / 0.15), transparent)" }} />
      )}
      <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${iconTints[tint]}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground truncate">{value}</div>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground hidden sm:block">{sub}</div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <GlowOrb className="h-[600px] w-[600px] -top-40 -left-40 animate-float-slow" />
      <GlowOrb className="h-[500px] w-[500px] top-20 right-0 animate-float-slow" color="oklch(0.74 0.20 300)" />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>Live on Ethereum · EIP-7702 enabled</Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-gradient">
            Every token you receive becomes <span className="text-gradient-primary">yield automatically</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Flekvar lets your existing wallet auto-convert incoming tokens into USDC and deposit them into Morpho vaults instantly — in the same transaction.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-3 text-sm text-muted-foreground/80 max-w-xl">
            No new wallet. No manual swaps. No custody. Just one receive policy.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
            <Button>Launch App <ArrowRight className="h-4 w-4" /></Button>
            <Button variant="outline"><Sparkles className="h-4 w-4" /> Watch Live Demo</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground">
            {["Powered by Ethereum", "Uniswap v4 hooks", "Morpho integrated", "Base optimized"].map((t) => (
              <div key={t} className="flex items-center gap-2"><CircleDot className="h-3 w-3 text-primary" />{t}</div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <HeroDashboard />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Problem / Solution ---------- */

function ProblemSolution() {
  const junkTokens = [
    { sym: "PEPE", val: "10,000", color: "oklch(0.75 0.18 140)" },
    { sym: "SHIB", val: "5.2M", color: "oklch(0.7 0.2 30)" },
    { sym: "AIRDROP", val: "1,420", color: "oklch(0.65 0.15 60)" },
    { sym: "WOJAK", val: "8,800", color: "oklch(0.68 0.2 350)" },
    { sym: "RNDM", val: "33", color: "oklch(0.7 0.15 250)" },
  ];
  return (
    <section className="relative py-32">
      <GlowOrb className="h-[400px] w-[400px] top-40 left-1/4 opacity-30" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="The problem" title={<>The receive side of crypto is <em className="not-italic text-gradient-primary">broken</em>.</>} sub="Wallets accumulate noise. Memecoins, airdrops, payments in 14 different assets. Nothing earns. Nothing compounds. Nothing works for you." />

        <div className="mt-16 grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Wallet today</div>
            <div className="space-y-2">
              {junkTokens.map((t) => (
                <div key={t.sym} className="flex items-center justify-between rounded-xl bg-background/40 px-4 py-2.5 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full" style={{ background: t.color, opacity: 0.7 }} />
                    <span className="text-sm font-mono text-foreground">{t.sym}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{t.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 text-sm text-muted-foreground">47 useless tokens sitting idle.</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center text-primary">
            <ArrowRight className="hidden lg:block h-10 w-10 animate-pulse-glow" />
            <ArrowDown className="lg:hidden h-10 w-10 animate-pulse-glow" />
            <span className="mt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Flekvar</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="glass-strong rounded-3xl p-6 ring-glow">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Wallet with Flekvar</div>
            <div className="rounded-2xl bg-background/40 border border-primary/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
                  <div>
                    <div className="text-sm font-mono text-foreground">USDC</div>
                    <div className="text-[10px] text-muted-foreground">Morpho · auto-compound</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">$12,840.22</div>
                  <div className="text-[10px] text-success">+ 8.2% APY</div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["yield", "auto", "atomic"].map(t => (
                <div key={t} className="rounded-xl bg-primary/10 border border-primary/20 text-center py-2 text-[10px] font-mono uppercase text-primary-glow">{t}</div>
              ))}
            </div>
            <div className="mt-5 text-sm text-muted-foreground">Every incoming token becomes productive capital.</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Now ---------- */

function WhyNow() {
  const cards = [
    { name: "EIP-7702", desc: "Existing wallets can now delegate smart contract behavior without changing addresses.", stat: "11,000+", label: "delegations", icon: Cpu },
    { name: "Uniswap v4", desc: "Hooks enable atomic receive-side conversion directly inside the sender's transaction.", stat: "$190B", label: "cumulative volume", icon: Repeat },
    { name: "Morpho", desc: "Permissionless yield vaults with up to 10.8% APY across curated risk strategies.", stat: "$9B+", label: "deposits", icon: TrendingUp },
  ];
  return (
    <section id="why-now" className="relative py-32">
      <GlowOrb className="h-[500px] w-[500px] top-40 right-0 opacity-30" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Why now" title={<>This only became possible in <em className="not-italic text-gradient-primary">2025</em>.</>} sub="Three Ethereum primitives shipped this year. Flekvar exists at their intersection." />

        <div className="mt-16 relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line-grad" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.24 295 / 0)" />
                <stop offset="50%" stopColor="oklch(0.74 0.20 300 / 0.6)" />
                <stop offset="100%" stopColor="oklch(0.62 0.24 295 / 0)" />
              </linearGradient>
            </defs>
            <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {cards.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ y: -6 }} className="group relative glass-strong rounded-3xl p-7 hover:border-primary/50 transition-all duration-500">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-radial)" }} />
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30 flex items-center justify-center shadow-glow">
                    <c.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="mt-5 text-2xl font-medium text-foreground">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="text-3xl font-medium text-gradient-primary tracking-tight">{c.stat}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{c.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center text-lg text-muted-foreground">
          Flekvar exists at the intersection of these three primitives.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Bento Features ---------- */

function FeatureBento() {
  const features = [
    { title: "Atomic Conversion", desc: "Receive, swap and deposit in a single transaction.", icon: Zap, span: "md:col-span-2" },
    { title: "Existing Wallet", desc: "Works with MetaMask, Rabby, Coinbase Wallet.", icon: Wallet, span: "" },
    { title: "Yield Automation", desc: "Auto-compound into Morpho vaults.", icon: TrendingUp, span: "" },
    { title: "Receive Policies", desc: "Configure once. Programmable, revocable, auditable.", icon: Layers, span: "" },
    { title: "No Custody", desc: "You keep full control. Always.", icon: Lock, span: "" },
    { title: "Base Optimized", desc: "Sub-cent gas on Base L2.", icon: Layers, span: "" },
    { title: "Multi-token Routing", desc: "Routes any ERC-20 through Uniswap v4 to USDC.", icon: Network, span: "md:col-span-2" },
    { title: "Allowlist Exceptions", desc: "Keep ETH, WBTC, or any token untouched.", icon: Shield, span: "" },
    { title: "Salary Split", desc: "Auto-route payroll into yield + ETH + forwarding.", icon: Gauge, span: "" },
  ];
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Features" title={<>An operating system for <em className="not-italic text-gradient-primary">incoming value</em>.</>} sub="Every primitive you need to make your wallet productive — composable, atomic, and built on the latest Ethereum standards." />
        <div className="mt-16 grid md:grid-cols-3 gap-4 auto-rows-fr">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (i % 3) * 0.05 }} whileHover={{ y: -4 }} className={`group relative glass rounded-3xl p-6 overflow-hidden hover:border-primary/40 transition-all duration-500 ${f.span}`}>
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-radial)" }} />
              <div className="relative flex flex-col h-full">
                <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-primary-glow" />
                </div>
                <h3 className="text-lg font-medium text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Live Demo ---------- */

function LiveDemo() {
  const steps = [
    { t: "T=0s", s: "Friend sends 10,000 PEPE" },
    { t: "T=4s", s: "EIP-7702 delegation activates" },
    { t: "T=7s", s: "Uniswap v4 atomic swap executes" },
    { t: "T=10s", s: "USDC deposited into Morpho vault" },
    { t: "T=12s", s: "Dashboard: +$4.23 · 8.2% APY" },
  ];
  return (
    <section id="demo" className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Live Demo" title={<>The <em className="not-italic text-gradient-primary">12-second demo</em> that explains everything.</>} sub="A stranger sends you a meme coin. Your wallet turns it into productive yield automatically." />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-14 relative rounded-3xl overflow-hidden border border-primary/30 shadow-glow-soft">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -inset-1 rounded-3xl opacity-50" style={{ background: "var(--gradient-radial)" }} />
          <div className="relative bg-background/80 backdrop-blur-xl p-6 md:p-10 grid lg:grid-cols-[1fr_auto] gap-10">
            <div className="space-y-1">
              {steps.map((s, i) => (
                <motion.div key={s.s} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="flex items-center gap-4 py-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-mono text-[11px] ${i === steps.length - 1 ? "bg-primary text-primary-foreground shadow-glow" : "bg-primary/15 border border-primary/30 text-primary-glow"}`}>
                      {s.t}
                    </div>
                    {i < steps.length - 1 && <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-transparent" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground font-medium">{s.s}</div>
                  </div>
                  {i === 2 && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary-glow">atomic</span>}
                  {i === 0 && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">sender paid gas</span>}
                </motion.div>
              ))}
            </div>

            <div className="lg:w-[340px]">
              <div className="glass rounded-2xl p-4 font-mono text-xs">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-[10px] text-muted-foreground">flekvar.log</span>
                </div>
                <div className="space-y-1.5 text-muted-foreground">
                  <div><span className="text-primary-glow">›</span> incoming transfer detected</div>
                  <div><span className="text-primary-glow">›</span> policy.match() → SWAP_TO_USDC</div>
                  <div><span className="text-primary-glow">›</span> 7702.delegate(FlekvarRouter)</div>
                  <div><span className="text-primary-glow">›</span> v4.hook.beforeReceive()</div>
                  <div><span className="text-primary-glow">›</span> swap PEPE → USDC ok</div>
                  <div><span className="text-primary-glow">›</span> morpho.deposit(42.18)</div>
                  <div className="text-success">✓ yield active · 8.2% APY</div>
                </div>
              </div>
              <div className="mt-3 glass rounded-2xl p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Realized earnings</div>
                <div className="mt-1 text-2xl text-gradient-primary font-medium">+$4.23 USDC</div>
                <div className="mt-1 text-xs text-muted-foreground">earning 8.2% APY · auto-compounding</div>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>gas $0.04</span><span>block 21,448,902</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Architecture ---------- */

function Architecture() {
  const nodes = [
    { title: "Sender Wallet", sub: "any EOA" },
    { title: "ERC-20 Transfer", sub: "Type-4 SET_CODE tx" },
    { title: "EIP-7702 Delegation Layer", sub: "code injected at recipient" },
    { title: "Flekvar Contract", sub: "policy engine" },
    { title: "Uniswap v4 PoolManager", sub: "singleton architecture" },
    { title: "USDC Conversion", sub: "atomic execution" },
    { title: "Morpho Vault", sub: "MetaMorpho vaults" },
    { title: "Yield-bearing Balance", sub: "auto-compounding" },
  ];
  return (
    <section id="architecture" className="relative py-32">
      <GlowOrb className="h-[500px] w-[500px] top-40 right-0 opacity-40" />
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader eyebrow="Architecture" title={<>One transaction. <em className="not-italic text-gradient-primary">Six protocols</em>. Zero friction.</>} />
        <div className="mt-16 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <div className="space-y-3">
            {nodes.map((n, i) => (
              <motion.div key={n.title} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.05 }} className={`relative flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className={`w-full md:w-[46%] glass rounded-2xl p-5 ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"} hover:border-primary/40 transition-all group`}>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary-glow font-mono text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="text-foreground font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{n.sub}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-glow animate-pulse-glow" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Policy Engine ---------- */

function PolicyEngine() {
  const [active, setActive] = useState(0);
  const policies = [
    { name: "Convert all → USDC", desc: "Every incoming token swaps to USDC. Idle balance, zero risk.", rows: [{ k: "Strategy", v: "swap → USDC" }, { k: "Risk", v: "none" }, { k: "Yield", v: "—" }] },
    { name: "Convert + Yield", desc: "Auto-swap and deposit into Morpho yield vaults.", rows: [{ k: "Strategy", v: "swap → USDC → Morpho" }, { k: "APY", v: "8.2%" }, { k: "Compound", v: "auto" }] },
    { name: "Keep ETH and WBTC", desc: "Allowlist core assets. Convert everything else.", rows: [{ k: "Keep", v: "ETH, WBTC" }, { k: "Convert", v: "all others" }, { k: "Yield", v: "USDC only" }] },
    { name: "Salary Split", desc: "40% yield · 30% ETH · 30% forwarded to savings address.", rows: [{ k: "Yield", v: "40%" }, { k: "ETH", v: "30%" }, { k: "Forward", v: "30% → 0xSAV..." }] },
  ];
  const cur = policies[active];
  return (
    <section className="relative py-32">
      <GlowOrb className="h-[400px] w-[400px] top-40 left-1/4 opacity-30" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Policy Engine" title={<>Your wallet. <em className="not-italic text-gradient-primary">Your rules</em>.</>} sub="Receive policies are programmable, revocable, and auditable. Configure once — your wallet executes forever." />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {policies.map((p, i) => (
              <motion.button key={p.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} onClick={() => setActive(i)} className={`w-full text-left glass rounded-2xl p-5 transition-all duration-300 ${active === i ? "border-primary/60 ring-glow" : "hover:border-primary/30"}`}>
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-mono text-xs transition-colors ${active === i ? "bg-primary text-primary-foreground" : "bg-primary/15 border border-primary/30 text-primary-glow"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{p.desc}</div>
                  </div>
                  {active === i && <div className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />}
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="glass-strong rounded-3xl p-6 shadow-glow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">policy.json</div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-success/15 text-success">SIGNED</span>
            </div>
            <div className="mt-5 font-mono text-xs space-y-2 text-muted-foreground">
              <div><span className="text-primary-glow">name</span>: <span className="text-foreground">"{cur.name}"</span></div>
              <div><span className="text-primary-glow">trigger</span>: <span className="text-foreground">"onReceive(*)"</span></div>
              <div><span className="text-primary-glow">delegate</span>: <span className="text-foreground">"7702://FlekvarRouter"</span></div>
              <div><span className="text-primary-glow">actions</span>: [</div>
              {cur.rows.map((r) => (
                <div key={r.k} className="pl-4">{"{ "}<span className="text-primary-glow">{r.k.toLowerCase()}</span>: <span className="text-foreground">"{r.v}"</span>{" },"}</div>
              ))}
              <div>]</div>
            </div>
            <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-3">
              {cur.rows.map((r) => (
                <div key={r.k} className="rounded-xl bg-background/40 border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.k}</div>
                  <div className="mt-1 text-sm font-mono text-foreground">{r.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */

function Comparison() {
  const cols = ["Flekvar", "Smart wallets", "Manual swap", "AutoSwappr"];
  const rows: { feat: string; vals: (boolean | string)[] }[] = [
    { feat: "Atomic conversion", vals: [true, false, false, "partial"] },
    { feat: "Existing wallet support", vals: [true, false, true, false] },
    { feat: "Mainnet support", vals: [true, true, true, false] },
    { feat: "Yield automation", vals: [true, "partial", false, false] },
    { feat: "No migration required", vals: [true, false, true, false] },
    { feat: "Consumer-first UX", vals: [true, false, false, "partial"] },
  ];
  const cell = (v: boolean | string, hl: boolean) => {
    if (v === true) return <Check className={`h-4 w-4 mx-auto ${hl ? "text-success" : "text-foreground/70"}`} />;
    if (v === false) return <X className="h-4 w-4 mx-auto text-muted-foreground/40" />;
    return <span className="text-xs font-mono text-muted-foreground">{v}</span>;
  };
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Comparison" title={<>Why Flekvar is <em className="not-italic text-gradient-primary">different</em>.</>} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-14 glass-strong rounded-3xl p-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-muted-foreground font-normal"></th>
                  {cols.map((c, i) => (
                    <th key={c} className={`px-5 py-4 text-sm font-medium ${i === 0 ? "text-primary-glow" : "text-muted-foreground"}`}>
                      <div className={`relative ${i === 0 ? "ring-glow rounded-xl py-2" : ""}`}>{c}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={r.feat} className="border-t border-border">
                    <td className="px-5 py-4 text-sm text-foreground">{r.feat}</td>
                    {r.vals.map((v, ci) => (
                      <td key={ci} className={`px-5 py-4 text-center ${ci === 0 ? "bg-primary/[0.06]" : ""}`}>{cell(v, ci === 0)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Metrics ---------- */

function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{n.toLocaleString(undefined, { maximumFractionDigits: decimals })}{suffix}</span>;
}

function Metrics() {
  const stats = [
    { label: "EIP-7702 delegations", value: 11000, suffix: "+" },
    { label: "Uniswap v4 volume", value: 190, prefix: "$", suffix: "B" },
    { label: "Hooks initialized", value: 5000, suffix: "+" },
    { label: "Morpho deposits", value: 9, prefix: "$", suffix: "B+" },
    { label: "Max APY", value: 10.8, suffix: "%", decimals: 1 },
    { label: "Base gas cost", value: 0.10, prefix: "< $", decimals: 2 },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Numbers" title={<>The primitives are <em className="not-italic text-gradient-primary">already live</em>.</>} />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.05 }} className="glass rounded-3xl p-6 hover:border-primary/40 transition-all">
              <div className="text-4xl md:text-5xl font-medium text-gradient-primary tracking-tight">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */

function HowItWorks() {
  const steps = [
    { t: "Connect your existing wallet", d: "MetaMask, Rabby, or Rainbow — no migration.", icon: Wallet },
    { t: "Set your receive policy", d: "Convert everything to USDC + yield.", icon: Layers },
    { t: "Sign EIP-7702 delegation", d: "One-time setup. Revocable any time.", icon: Shield },
    { t: "Receive any token", d: "PEPE, SHIB, DAI, DAO payouts, anything.", icon: Coins },
    { t: "Yield starts instantly", d: "USDC deposited automatically into Morpho.", icon: TrendingUp },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader eyebrow="How it works" title={<>One receive policy. <em className="not-italic text-gradient-primary">Infinite automation</em>.</>} />
        <div className="mt-16 space-y-4">
          {steps.map((s, i) => (
            <motion.div key={s.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.06 }} className="group glass rounded-2xl p-5 flex items-center gap-5 hover:border-primary/40 transition-all">
              <div className="text-xs font-mono text-muted-foreground w-8">0{i + 1}</div>
              <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary-glow" />
              </div>
              <div className="flex-1">
                <div className="text-foreground font-medium">{s.t}</div>
                <div className="text-sm text-muted-foreground">{s.d}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-glow group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Roadmap ---------- */

function Roadmap() {
  const phases = [
    { t: "ETHGlobal MVP", d: "Hackathon prototype on Sepolia.", q: "Q1" },
    { t: "Base Mainnet", d: "Audited launch on Base L2.", q: "Q2" },
    { t: "Mobile App", d: "iOS / Android with passkeys.", q: "Q3" },
    { t: "Payroll SDK", d: "Drop-in receive layer for payroll protocols.", q: "Q3" },
    { t: "DAO Integrations", d: "Treasuries auto-route contributor payments.", q: "Q4" },
    { t: "Cross-chain", d: "Unified receive policies across L2s.", q: "Q4" },
  ];
  return (
    <section id="roadmap" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader eyebrow="Roadmap" title={<>The path to <em className="not-italic text-gradient-primary">programmable wallets</em>.</>} />
        <div className="mt-16 overflow-x-auto -mx-4 px-4">
          <div className="flex gap-4 min-w-max pb-4">
            {phases.map((p, i) => (
              <motion.div key={p.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.06 }} className="w-72 glass rounded-3xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-glow animate-pulse-glow" />
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">{p.q}</span>
                </div>
                <div className="mt-4 text-lg font-medium text-foreground">{p.t}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Vision ---------- */

function Vision() {
  return (
    <section className="relative py-32 overflow-hidden">
      <GlowOrb className="h-[700px] w-[700px] top-0 left-1/2 -translate-x-1/2 opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full border border-primary/10 animate-float-slow" />
        <div className="absolute bottom-20 right-10 h-32 w-32 rounded-2xl border border-primary/10 rotate-12 animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full border border-primary/20" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <Badge>Vision</Badge>
        <h2 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gradient leading-[1.05]">
          Your wallet should <em className="not-italic text-gradient-primary">work for you</em>.
        </h2>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
          Crypto users shouldn't manually manage every incoming token. Flekvar transforms passive wallets into programmable financial automation systems — receive-side conversion, onchain yield routing, finance that compounds while you sleep.
        </p>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

function FinalCTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative rounded-3xl overflow-hidden border border-primary/30 glass-strong p-10 md:p-16 shadow-glow-soft">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <GlowOrb className="h-[400px] w-[400px] -top-20 -right-20 opacity-60" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <Badge>Get started</Badge>
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gradient leading-[1.05]">
                Turn every incoming token into <em className="not-italic text-gradient-primary">productive capital</em>.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button>Launch Flekvar <ArrowRight className="h-4 w-4" /></Button>
                <Button variant="outline">Read Documentation <ExternalLink className="h-4 w-4" /></Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Built for the next era of Ethereum wallets.</p>
            </div>
            <div className="hidden lg:block">
              <div className="glass rounded-3xl p-5 w-64 shadow-elegant">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
                  policy active
                </div>
                <div className="mt-4 text-3xl text-gradient-primary font-medium">$12,840</div>
                <div className="text-xs text-muted-foreground">earning 8.2% APY</div>
                <div className="mt-4 h-px bg-border" />
                <div className="mt-3 space-y-1.5 text-[11px] font-mono text-muted-foreground">
                  <div className="flex justify-between"><span>+ 42.18 USDC</span><span className="text-success">now</span></div>
                  <div className="flex justify-between"><span>+ 12.04 USDC</span><span>2m</span></div>
                  <div className="flex justify-between"><span>+ 8.21 USDC</span><span>11m</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Architecture", "Demo", "Roadmap"] },
    { title: "Developers", links: ["Docs", "SDK", "GitHub", "Contracts"] },
    { title: "Community", links: ["Twitter / X", "Discord", "Mirror", "Farcaster"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Disclosures"] },
  ];
  return (
    <footer className="relative pt-20 pb-10 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-[1.5fr_2fr] gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <FlekvarMark />
              <span className="font-semibold text-foreground">Flekvar</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">An Ethereum wallet automation protocol. Every token, productive by default.</p>
            <div className="mt-5 flex items-center gap-3">
              <a className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition text-xs font-mono" href="#" aria-label="GitHub">GH</a>
              <a className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition text-xs font-mono" href="#" aria-label="Twitter">X</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{c.title}</div>
                <ul className="space-y-2">
                  {c.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-foreground/80 hover:text-primary-glow transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">Powered by Ethereum, Uniswap v4, and Morpho.</div>
          <div className="text-xs font-mono text-muted-foreground">© {new Date().getFullYear()} Flekvar Labs</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <WhyNow />
        <HowItWorks />
        <LiveDemo />
        <FeatureBento />
        <Architecture />
        <PolicyEngine />
        <Metrics />
        <Comparison />
        <Roadmap />
        <Vision />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
