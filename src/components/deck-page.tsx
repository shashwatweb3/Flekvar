import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/logo-mark";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(124,92,252,0.4)] px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5CFC]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
      {children}
    </div>
  );
}

function DeckCard({
  children,
  className,
  highlight = false,
}: {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-[20px] border transition-all duration-300",
        highlight
          ? "border-[rgba(124,92,252,0.6)] bg-[#1A1A35] shadow-[0_8px_40px_rgba(124,92,252,0.2)]"
          : "border-[rgba(124,92,252,0.2)] bg-[#1A1A35] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[rgba(124,92,252,0.4)] hover:shadow-[0_12px_40px_rgba(124,92,252,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────────

function DeckNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={cx(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[rgba(124,92,252,0.2)] bg-[rgba(13,13,26,0.92)] backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
        <LogoMark tone="dark" />
        <div className="flex items-center gap-4">
          <a
            href="https://flekvar.xyz"
            target="_blank"
            rel="noreferrer"
            className="hidden text-[14px] font-medium text-[#8888AA] transition-colors hover:text-white sm:block"
          >
            flekvar.xyz
          </a>
          <a
            href="https://x.com/Flekvarhq"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-full border border-[rgba(124,92,252,0.4)] px-4 text-[13px] font-semibold text-white transition-all hover:border-[#7C5CFC] hover:bg-[#7C5CFC]"
          >
            Follow on X
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── SECTION 1: HERO ────────────────────────────────────────────────────────────

function HeroCredentialCard() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[360px] overflow-hidden rounded-[20px] border border-[rgba(124,92,252,0.45)] bg-[#1A1A35] shadow-[0_24px_64px_rgba(124,92,252,0.22)]"
    >
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8888AA]">
          Flekvar Credential
        </span>
        <span className="rounded-full bg-[rgba(124,92,252,0.18)] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#7C5CFC]">
          ZK Proof
        </span>
      </div>
      <div className="border-y border-[rgba(124,92,252,0.15)] px-5 py-3.5">
        <div className="text-[20px] font-bold text-white">Anonymous</div>
        <div className="mt-0.5 text-[11px] font-semibold tracking-[0.12em] text-[#7C5CFC]">
          Verified contributor
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 py-4">
        {[
          { label: "GRADE", value: "A", color: "#4ADE80" },
          { label: "DURATION", value: "14 months", color: "#fff" },
          { label: "SKILL", value: "Solidity", color: "#fff" },
          { label: "CLIENTS", value: "3 (hashed)", color: "#fff" },
          { label: "WALLET", value: "✓ Private", color: "#4ADE80" },
          { label: "STATUS", value: "Verified", color: "#4ADE80" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8888AA]">
              {label}
            </div>
            <div className="mt-1 text-[14px] font-bold" style={{ color }}>
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(124,92,252,0.15)] bg-[rgba(124,92,252,0.07)] px-5 py-3">
        <span className="font-mono text-[11px] font-medium text-[#7C5CFC]">
          ● VALID · SP1 · on-chain · 400ms
        </span>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0D0D1A] px-5 pb-20 pt-32 sm:px-8">
      <div className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.15)_0%,transparent_65%)]" />
      <div className="dark-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(124,92,252,0.4)] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#7C5CFC]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
            Reputation Infrastructure for Web3
          </div>
          <h1 className="mt-6 text-[48px] font-extrabold leading-[1.0] tracking-[-0.04em] text-white sm:text-[60px] lg:text-[68px]">
            Prove your work.
            <br />
            <span className="text-[#7C5CFC]">Hide your wallet.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-[#8888AA]">
            Verified work credentials for builders, bounty hunters, freelancers, and grant applicants — private by default.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#problem"
              className="inline-flex h-12 items-center rounded-full bg-[#7C5CFC] px-7 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#6B4EF0] sm:text-[15px]"
            >
              View Deck
            </a>
            <a
              href="mailto:hello@flekvar.xyz"
              className="inline-flex h-12 items-center rounded-full border border-[rgba(124,92,252,0.4)] px-7 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-[#7C5CFC] hover:bg-[rgba(124,92,252,0.1)] sm:text-[15px]"
            >
              Contact Us
            </a>
          </div>
        </FadeUp>
        <FadeUp delay={0.15} className="flex justify-center lg:justify-end">
          <HeroCredentialCard />
        </FadeUp>
      </div>
    </section>
  );
}

// ── SECTION 2: THE PROBLEM ─────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section id="problem" className="bg-[#0D0D1A] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-12">
          <SectionLabel>01 — The Problem</SectionLabel>
        </FadeUp>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp delay={0.1}>
            <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[42px]">
              Your wallet became your resume.{" "}
              <span className="text-[#7C5CFC]">It shouldn't be.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-[#8888AA]">
              In Web3, proving your work means sharing your wallet. But your wallet doesn't just show your work.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Your exact salary — visible to every future employer",
                "Every client who ever paid you — forever public",
                "Your total holdings and net worth — exposed",
                "Your full transaction history — anyone can read",
                "Your negotiation position — already compromised",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF4444]" />
                  <span className="text-[15px] leading-[1.65] text-[#CCCCDD]">{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="overflow-hidden rounded-[20px] border border-[rgba(255,68,68,0.4)] bg-[#1A0D0D] shadow-[0_8px_40px_rgba(255,68,68,0.1)]">
              <div className="flex items-start justify-between gap-3 px-5 py-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8888]">
                  Raw Wallet View
                </span>
                <span className="rounded-full border border-[rgba(255,68,68,0.5)] bg-[rgba(255,68,68,0.1)] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#FF4444]">
                  ⚠ Warning
                </span>
              </div>
              <div className="border-y border-[rgba(255,68,68,0.2)] px-5 py-3.5">
                <div className="text-[20px] font-bold text-white">Everything Exposed</div>
                <div className="mt-0.5 text-[11px] font-semibold tracking-[0.12em] text-[#FF6666]">
                  Exposure mode
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 py-4">
                {[
                  ["WALLET", "0x84f1...dA8b"],
                  ["BALANCE", "Visible"],
                  ["TRANSACTIONS", "Visible"],
                  ["COUNTERPARTIES", "Visible"],
                  ["PROTOCOLS", "Visible"],
                  ["HISTORY", "Visible"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8888AA]">
                      {label}
                    </div>
                    <div className="mt-1 text-[14px] font-bold text-[#FF4444]">{value}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(255,68,68,0.2)] px-5 py-3">
                <span className="rounded-full border border-[rgba(255,68,68,0.5)] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF4444]">
                  Everything Exposed
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 3: THE INSIGHT ─────────────────────────────────────────────────────

function InsightSection() {
  return (
    <section className="bg-[#080812] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>02 — The Insight</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            Two broken options. We're building the third.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3">
          <FadeUp delay={0.1} className="flex flex-col">
            <DeckCard className="flex flex-1 flex-col p-6">
              <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8888AA]">
                Option 1
              </div>
              <div className="mb-3 text-[32px]">📄</div>
              <h3 className="text-[20px] font-bold text-white">Paper Resume</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#8888AA]">
                A document you wrote about yourself. Anyone can fake it. Nobody can verify it. 540 years old.
              </p>
              <div className="mt-5">
                <span className="rounded-full border border-orange-500/50 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange-400">
                  ✕ Broken
                </span>
              </div>
            </DeckCard>
          </FadeUp>

          <FadeUp delay={0.2} className="flex flex-col">
            <DeckCard className="flex flex-1 flex-col p-6">
              <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8888AA]">
                Option 2
              </div>
              <div className="mb-3 text-[32px]">🔓</div>
              <h3 className="text-[20px] font-bold text-white">Share Wallet</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#8888AA]">
                Everything exposed. Salary visible. Clients visible. Full financial life. To every stranger.
              </p>
              <div className="mt-5">
                <span className="rounded-full border border-[rgba(255,68,68,0.5)] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6666]">
                  ✕ Broken
                </span>
              </div>
            </DeckCard>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-col">
            <DeckCard highlight className="flex flex-1 flex-col p-6">
              <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#7C5CFC]">
                Option 3
              </div>
              <div className="mb-3 text-[32px]">🔒</div>
              <h3 className="text-[20px] font-bold text-white">Flekvar Credential</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#8888AA]">
                Verified from real onchain payments. Private by default. Live — auto-updates. Yours to share.
              </p>
              <div className="mt-5">
                <span className="rounded-full bg-[#7C5CFC] px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  ✓ The Solution
                </span>
              </div>
            </DeckCard>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 4: THE SOLUTION ────────────────────────────────────────────────────

function SolutionSection() {
  const steps = [
    { num: 1, title: "Payment Received", sub: "USDC onchain", highlight: false },
    { num: 2, title: "Verification Layer", sub: "Flekvar + ZK proof", highlight: true },
    { num: 3, title: "Private Credential", sub: "Grade · Duration · Skills", highlight: false },
    { num: 4, title: "Selective Sharing", sub: "Your terms only", highlight: false },
  ];

  return (
    <section className="bg-[#0D0D1A] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4">
          <SectionLabel>03 — The Solution</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-4">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            Verified work credentials.{" "}
            <span className="text-[#7C5CFC]">Private by default.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.12} className="mb-14">
          <p className="max-w-[560px] text-[16px] leading-[1.75] text-[#8888AA]">
            Flekvar turns real onchain payment history into a portable credential — without revealing the wallet behind it.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp delay={0.2}>
            <div>
              {steps.map((step, i) => (
                <div key={step.num} className="relative">
                  <div
                    className={cx(
                      "flex items-start gap-4 rounded-[16px] p-4 transition-all duration-300",
                      step.highlight
                        ? "border border-[rgba(124,92,252,0.5)] bg-[rgba(124,92,252,0.08)]"
                        : "border border-transparent",
                    )}
                  >
                    <div
                      className={cx(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-bold",
                        step.highlight
                          ? "bg-[#7C5CFC] text-white"
                          : "border border-[rgba(124,92,252,0.4)] text-[#7C5CFC]",
                      )}
                    >
                      {step.num}
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-white">{step.title}</div>
                      <div className="mt-0.5 font-mono text-[12px] text-[#8888AA]">{step.sub}</div>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="ml-[28px] h-6 border-l border-dashed border-[rgba(124,92,252,0.3)]" />
                  )}
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="overflow-hidden rounded-[20px] border border-[rgba(124,92,252,0.4)] bg-[#1A1A35] shadow-[0_16px_48px_rgba(124,92,252,0.18)]">
              <div className="bg-[linear-gradient(135deg,#1a2744_0%,#0f1a38_60%,#162040_100%)] px-5 py-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    Flekvar Passport
                  </span>
                  <span className="rounded-full border border-[rgba(124,92,252,0.35)] bg-[rgba(124,92,252,0.15)] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#7C5CFC]">
                    Private Credential
                  </span>
                </div>
                <div className="mt-3 text-[26px] font-extrabold leading-[1.0] tracking-[-0.04em] text-white">
                  Verified Privately
                </div>
                <div className="mt-1 text-[12px] font-semibold tracking-[0.12em] text-[#7C5CFC]">
                  Verified contributor
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 py-4">
                {[
                  { label: "PROJECTS SHIPPED", value: "14", color: "#fff" },
                  { label: "ECOSYSTEMS", value: "Ethereum", color: "#fff" },
                  { label: "YEARS ACTIVE", value: "4", color: "#fff" },
                  { label: "REPEAT CLIENTS", value: "6", color: "#fff" },
                  { label: "CREDENTIAL GRADE", value: "A", color: "#4ADE80" },
                  { label: "STATUS", value: "Verified", color: "#4ADE80" },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8888AA]">
                      {label}
                    </div>
                    <div className="mt-1 text-[14px] font-bold" style={{ color }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(124,92,252,0.15)] px-5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8888AA]">
                      Credential ID
                    </div>
                    <div className="mt-0.5 font-mono text-[12px] text-white">FLKVR-2024-884</div>
                  </div>
                  <span className="rounded-full bg-[rgba(124,92,252,0.18)] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#7C5CFC]">
                    Verified Active
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5: HOW IT WORKS ────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "Connect",
      body: "Connect your wallet. Enable private USDC payments via RAILGUN or Aztec. One-time setup.",
      tag: "RAILGUN · Aztec",
    },
    {
      num: 2,
      title: "Get Paid",
      body: "Clients pay you in private USDC. Amounts encrypted on-chain. Client attests skills at payment time.",
      tag: "Private USDC · Onchain",
    },
    {
      num: 3,
      title: "Generate Proof",
      body: "ZK circuit runs in your browser. Private inputs in, grade + duration out. Your data never leaves your device.",
      tag: "Groth16 · Circom · WASM",
    },
    {
      num: 4,
      title: "Share Credential",
      body: "Credential minted on L2. Share via link or QR. Verifier gets: Grade A · 14 months · Rust. Nothing else.",
      tag: "ERC-721 · L2 · W3C VC",
    },
  ];

  return (
    <section className="bg-[#080812] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>04 — How It Works</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            From payment to proof.{" "}
            <span className="text-[#7C5CFC]">No wallet ever revealed.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.08} className="flex flex-col">
              <DeckCard className="flex flex-1 flex-col p-6">
                <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#7C5CFC] font-mono text-[14px] font-bold text-white">
                  {step.num}
                </div>
                <h3 className="text-[18px] font-bold text-white">{step.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#8888AA]">{step.body}</p>
                <div className="mt-4">
                  <span className="rounded-full border border-[rgba(124,92,252,0.3)] bg-[rgba(124,92,252,0.08)] px-3 py-1 font-mono text-[10px] font-semibold text-[#7C5CFC]">
                    {step.tag}
                  </span>
                </div>
              </DeckCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 6: TECHNOLOGY ──────────────────────────────────────────────────────

function TechnologySection() {
  const techs = [
    {
      layer: "Privacy Layer",
      tool: "RAILGUN / Aztec",
      desc: "Private USDC transfers on Ethereum mainnet. Amounts hidden via ZK proofs. $100M+ live in RAILGUN. Vitalik uses it.",
      chain: "Ethereum Mainnet",
    },
    {
      layer: "ZK Proof System",
      tool: "Groth16 · Circom",
      desc: "Battle-tested ZK-SNARKs. Same system powering DeFi privacy infrastructure. Runs in-browser via WASM.",
      chain: "Browser / WASM",
    },
    {
      layer: "Credential Storage",
      tool: "ERC-721 on L2",
      desc: "Arbitrum or Base. ~$0.02 per mint. Permanent. Inherits Ethereum security. Any ecosystem can verify.",
      chain: "Arbitrum · Base",
    },
    {
      layer: "Credential Format",
      tool: "W3C VC + did:ethr",
      desc: "Open internet standard. Adopted by governments globally. Not locked to any chain or platform.",
      chain: "Chain-agnostic",
    },
    {
      layer: "Verification",
      tool: "Solidity Contract",
      desc: "One function call. Groth16 pairing check. ~$0.01 on L2. Trustless — no Flekvar server required.",
      chain: "Any EVM Chain",
    },
    {
      layer: "Chain Compatibility",
      tool: "EVM + Solana roadmap",
      desc: "EVM-first launch. Solana support via Token-2022 Confidential Transfers. Built for multi-chain future.",
      chain: "Multi-chain",
    },
  ];

  return (
    <section className="bg-[#0D0D1A] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>05 — Technology</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            Built on proven infrastructure.{" "}
            <span className="text-[#7C5CFC]">Chain-agnostic by design.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techs.map((tech, i) => (
            <FadeUp key={tech.tool} delay={i * 0.07} className="flex flex-col">
              <DeckCard className="flex flex-1 flex-col p-6">
                <span className="mb-3 self-start rounded-full bg-[rgba(124,92,252,0.15)] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#7C5CFC]">
                  {tech.layer}
                </span>
                <h3 className="text-[20px] font-bold text-white">{tech.tool}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-[#8888AA]">{tech.desc}</p>
                <div className="mt-4 flex justify-end">
                  <span className="font-mono text-[11px] text-[#8888AA]">{tech.chain}</span>
                </div>
              </DeckCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 7: WHO IT'S FOR ────────────────────────────────────────────────────

function WhoSection() {
  return (
    <section className="bg-[#080812] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>06 — Who It's For</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            Built first for <span className="text-[#7C5CFC]">builders.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} className="mb-5">
          <DeckCard highlight className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(124,92,252,0.18)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#7C5CFC]">
                  ★ Primary
                </span>
                <h3 className="mt-3 text-[26px] font-extrabold text-white sm:text-[30px]">
                  Web3 Developers
                </h3>
                <p className="mt-4 max-w-[500px] text-[15px] leading-[1.75] text-[#8888AA]">
                  Applying for jobs, grants, bounties, freelance contracts. Prove track record without exposing salary, clients, or wallet. One credential. Every opportunity.
                </p>
              </div>
              <div className="flex flex-row gap-8 lg:flex-col lg:items-end lg:justify-center">
                {[
                  { num: "3,000", label: "Superteam India active builders" },
                  { num: "$150K", label: "Average Solana dev salary" },
                  { num: "700+", label: "Web3 jobs per year" },
                ].map(({ num, label }) => (
                  <div key={num} className="text-right">
                    <div className="text-[28px] font-extrabold tracking-[-0.04em] text-white">
                      {num}
                    </div>
                    <div className="text-[12px] text-[#8888AA]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </DeckCard>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[
            {
              icon: "🎯",
              title: "Bounty Hunters",
              desc: "Past completions become proof for future listings. No wallet needed.",
            },
            {
              icon: "💼",
              title: "Freelancers & Creators",
              desc: "Multi-client history — proven, not written. Rate stays private.",
            },
            {
              icon: "📋",
              title: "Grant Applicants",
              desc: "Replace bio paragraphs with payment-verified track record. Gitcoin · Superteam · Solana Foundation.",
            },
            {
              icon: "🏛",
              title: "Protocol Teams",
              desc: "Verify contributors faster. One API call. Grade + skills + duration. No wallet inspection.",
            },
          ].map(({ icon, title, desc }, i) => (
            <FadeUp key={title} delay={0.1 + i * 0.07}>
              <DeckCard className="flex items-start gap-4 p-6">
                <span className="text-[28px]">{icon}</span>
                <div>
                  <h3 className="text-[17px] font-bold text-white">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[#8888AA]">{desc}</p>
                </div>
              </DeckCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 8: MARKET OPPORTUNITY ─────────────────────────────────────────────

function MarketSection() {
  const stats = [
    { num: "93M", label: "India crypto owners", source: "Triple-A, 2024" },
    { num: "#1", label: "India Web3 dev pool", source: "Rise Report, 2024" },
    { num: "327M", label: "Asia-Pacific crypto users", source: "38% of global · Kraken 2024" },
    { num: "700+", label: "Web3 jobs open/yr", source: "All need verification" },
    { num: "$150K", label: "Avg Solana dev salary", source: "web3.career, 2025" },
    { num: "3,000", label: "Superteam India members", source: "First 3,000 users" },
    { num: "1 in 4", label: "Profiles fake by 2028", source: "Gartner forecast" },
    { num: "$0.02", label: "Cost per credential mint", source: "Arbitrum / Base L2" },
  ];

  return (
    <section className="bg-[#0D0D1A] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>07 — Market Opportunity</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            The numbers behind the opportunity.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ num, label, source }, i) => (
            <FadeUp key={num + label} delay={i * 0.06}>
              <div className="rounded-[20px] border border-[rgba(124,92,252,0.2)] bg-[#1A1A35] p-5 transition-all hover:border-[rgba(124,92,252,0.4)] hover:shadow-[0_8px_32px_rgba(124,92,252,0.1)]">
                <div className="text-[36px] font-extrabold tracking-[-0.04em] text-white sm:text-[40px]">
                  {num}
                </div>
                <div className="mt-1 text-[13px] font-semibold text-[#CCCCDD]">{label}</div>
                <div className="mt-2 font-mono text-[10px] text-[#7C5CFC]">{source}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 9: COMPETITIVE ─────────────────────────────────────────────────────

type CellValue = boolean | "partial";

function CompCell({ value }: { value: CellValue }) {
  if (value === true) return <span className="font-bold text-[#4ADE80]">✓</span>;
  if (value === "partial") return <span className="font-bold text-amber-400">~</span>;
  return <span className="text-[#FF4444]">✕</span>;
}

function CompetitiveSection() {
  const rows: Array<{
    name: string;
    payment: CellValue;
    zk: CellValue;
    live: CellValue;
    multi: CellValue;
    highlight?: boolean;
  }> = [
    { name: "Talent Protocol", payment: false, zk: false, live: false, multi: false },
    { name: "Gitcoin Passport", payment: false, zk: "partial", live: false, multi: false },
    { name: "Superteam PoW NFT", payment: true, zk: false, live: false, multi: false },
    { name: "zkPass", payment: false, zk: true, live: false, multi: "partial" },
    { name: "Flekvar", payment: true, zk: true, live: true, multi: true, highlight: true },
  ];

  return (
    <section className="bg-[#080812] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>08 — Competitive Landscape</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            The gap nobody fills.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="overflow-x-auto rounded-[20px] border border-[rgba(124,92,252,0.2)] bg-[#1A1A35]">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(124,92,252,0.2)] bg-[rgba(124,92,252,0.1)]">
                  <th className="px-5 py-4 text-left font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C5CFC]">
                    Project
                  </th>
                  <th className="px-4 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C5CFC]">
                    Payment Verified
                  </th>
                  <th className="px-4 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C5CFC]">
                    ZK Private
                  </th>
                  <th className="px-4 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C5CFC]">
                    Live Credential
                  </th>
                  <th className="px-4 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C5CFC]">
                    Multi-use Case
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.name}
                    className={cx(
                      "border-b border-[rgba(124,92,252,0.1)] last:border-0 transition-colors",
                      row.highlight
                        ? "bg-[rgba(124,92,252,0.08)]"
                        : "hover:bg-[rgba(255,255,255,0.02)]",
                    )}
                  >
                    <td className="px-5 py-4">
                      <span
                        className={cx(
                          "text-[15px] font-semibold",
                          row.highlight ? "text-white" : "text-[#CCCCDD]",
                        )}
                      >
                        {row.name}
                        {row.highlight ? " ✦" : ""}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-[16px]">
                      <CompCell value={row.payment} />
                    </td>
                    <td className="px-4 py-4 text-center text-[16px]">
                      <CompCell value={row.zk} />
                    </td>
                    <td className="px-4 py-4 text-center text-[16px]">
                      <CompCell value={row.live} />
                    </td>
                    <td className="px-4 py-4 text-center text-[16px]">
                      <CompCell value={row.multi} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-[13px] leading-[1.75] text-[#8888AA]">
            Flekvar is the only product where payment-verified + ZK private + live credential + multi-use case are all true simultaneously.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ── SECTION 10: ROADMAP ────────────────────────────────────────────────────────

function RoadmapSection() {
  const phases = [
    {
      label: "Now",
      period: "Community + Waitlist",
      current: true,
      items: [
        "500 early builder waitlist",
        "Superteam India outreach",
        "X community building",
        "Ecosystem partnerships",
      ],
    },
    {
      label: "Q3 2026",
      period: "MVP — Devnet",
      current: false,
      items: [
        "Private USDC payment layer",
        "ZK credential generation",
        "Browser proof via WASM",
        "First 50 beta credentials",
      ],
    },
    {
      label: "Q4 2026",
      period: "Mainnet Launch",
      current: false,
      items: [
        "L2 credential storage live",
        "B2B verifier API",
        "Grant platform integrations",
        "500 active users",
      ],
    },
    {
      label: "2027",
      period: "Scale",
      current: false,
      items: [
        "Multi-chain support",
        "SE Asia expansion",
        "Protocol hiring integrations",
        "Seed raise: $500K–1M",
      ],
    },
  ];

  return (
    <section className="bg-[#0D0D1A] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>09 — Roadmap</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            Early stage. <span className="text-[#7C5CFC]">Real momentum.</span>
          </h2>
        </FadeUp>

        {/* Desktop horizontal */}
        <FadeUp delay={0.2} className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-[5%] right-[5%] top-[21px] h-px bg-[rgba(124,92,252,0.2)]" />
            <div className="grid grid-cols-4 gap-5">
              {phases.map((phase) => (
                <div key={phase.label} className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className={cx(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2",
                        phase.current
                          ? "border-[#7C5CFC] bg-[#7C5CFC] shadow-[0_0_20px_rgba(124,92,252,0.5)]"
                          : "border-[rgba(124,92,252,0.4)] bg-[#0D0D1A]",
                      )}
                    >
                      <div
                        className={cx(
                          "h-3 w-3 rounded-full",
                          phase.current ? "bg-white" : "bg-[#7C5CFC]",
                        )}
                      />
                    </div>
                    <div>
                      <div
                        className={cx(
                          "text-[15px] font-bold",
                          phase.current ? "text-[#7C5CFC]" : "text-white",
                        )}
                      >
                        {phase.label}
                      </div>
                      <div className="text-[12px] text-[#8888AA]">{phase.period}</div>
                    </div>
                  </div>
                  <div
                    className={cx(
                      "rounded-[16px] border p-4",
                      phase.current
                        ? "border-[rgba(124,92,252,0.5)] bg-[rgba(124,92,252,0.08)]"
                        : "border-[rgba(124,92,252,0.2)] bg-[#1A1A35]",
                    )}
                  >
                    <ul className="space-y-2.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C5CFC]" />
                          <span className="text-[13px] leading-[1.5] text-[#CCCCDD]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Mobile vertical */}
        <div className="space-y-0 lg:hidden">
          {phases.map((phase, i) => (
            <FadeUp key={phase.label} delay={i * 0.08}>
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 flex flex-col items-center">
                  <div
                    className={cx(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                      phase.current
                        ? "border-[#7C5CFC] bg-[#7C5CFC] shadow-[0_0_16px_rgba(124,92,252,0.4)]"
                        : "border-[rgba(124,92,252,0.4)] bg-[#0D0D1A]",
                    )}
                  >
                    <div
                      className={cx(
                        "h-2.5 w-2.5 rounded-full",
                        phase.current ? "bg-white" : "bg-[#7C5CFC]",
                      )}
                    />
                  </div>
                  {i < phases.length - 1 && (
                    <div className="mt-1 w-px bg-[rgba(124,92,252,0.2)]" style={{ height: "calc(100% + 8px)" }} />
                  )}
                </div>
                <div className="mb-8">
                  <div
                    className={cx(
                      "text-[15px] font-bold",
                      phase.current ? "text-[#7C5CFC]" : "text-white",
                    )}
                  >
                    {phase.label}
                  </div>
                  <div className="mb-3 text-[12px] text-[#8888AA]">{phase.period}</div>
                  <div
                    className={cx(
                      "rounded-[16px] border p-4",
                      phase.current
                        ? "border-[rgba(124,92,252,0.5)] bg-[rgba(124,92,252,0.08)]"
                        : "border-[rgba(124,92,252,0.2)] bg-[#1A1A35]",
                    )}
                  >
                    <ul className="space-y-2.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C5CFC]" />
                          <span className="text-[13px] leading-[1.5] text-[#CCCCDD]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 11: WHY PARTNER ────────────────────────────────────────────────────

function WhyPartnerSection() {
  const cards = [
    {
      icon: "🔒",
      title: "Privacy-native use case",
      desc: "Flekvar demonstrates real-world utility for private transaction infrastructure. Every ecosystem with private payments gains a reputation layer.",
    },
    {
      icon: "👷",
      title: "Builder community focus",
      desc: "India + SE Asia Web3 builders. 93M crypto owners. #1 global developer pool. Access the fastest growing builder ecosystem.",
    },
    {
      icon: "🧮",
      title: "Chain-agnostic credentials",
      desc: "W3C VC format. Works on any chain. Built to integrate with any ecosystem that supports private payments.",
    },
    {
      icon: "⚡",
      title: "Infrastructure layer",
      desc: "Flekvar is reputation infrastructure — like DNS for trust. Every dApp, DAO, and grant system benefits from one integration.",
    },
    {
      icon: "🌏",
      title: "Real distribution",
      desc: "Superteam India community. Active X presence. Grant pipeline. Hackathon strategy. We bring builder distribution.",
    },
    {
      icon: "🤝",
      title: "Open to co-building",
      desc: "Looking for ecosystem grants, technical integration support, and co-marketing. We build Flekvar as a public good.",
    },
  ];

  return (
    <section className="bg-[#080812] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-4 text-center">
          <SectionLabel>10 — Why Partner</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-14 text-center">
          <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px]">
            What we bring to any ecosystem.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.07} className="flex flex-col">
              <DeckCard className="flex flex-1 flex-col gap-4 p-6">
                <span className="text-[28px]">{icon}</span>
                <h3 className="text-[17px] font-bold text-white">{title}</h3>
                <p className="flex-1 text-[14px] leading-[1.7] text-[#8888AA]">{desc}</p>
              </DeckCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 12: FINAL CTA ──────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0D0D1A] px-5 py-32 sm:px-8 sm:py-40">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.2)_0%,transparent_65%)]" />
      </div>
      <div className="dark-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-[800px] text-center">
        <FadeUp className="flex justify-center">
          <LogoMark tone="dark" className="text-[28px]" />
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="mt-10 text-[44px] font-extrabold leading-[1.0] tracking-[-0.04em] text-white sm:text-[58px]">
            The future belongs to
            <br />
            <span className="text-[#7C5CFC]">verifiable builders.</span> ⚡
          </h2>
        </FadeUp>

        <FadeUp
          delay={0.2}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="https://x.com/Flekvarhq"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#7C5CFC] px-8 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#6B4EF0] sm:w-auto"
          >
            Follow @Flekvarhq
          </a>
          <a
            href="https://flekvar.xyz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[rgba(124,92,252,0.4)] px-8 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-[#7C5CFC] hover:bg-[rgba(124,92,252,0.1)] sm:w-auto"
          >
            Visit flekvar.xyz
          </a>
        </FadeUp>

        <FadeUp delay={0.3} className="mt-16">
          <p className="font-mono text-[12px] text-[#8888AA]">
            deck.flekvar.xyz · Reputation infrastructure for Web3 builders
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ── MAIN EXPORT ────────────────────────────────────────────────────────────────

export default function DeckPage() {
  return (
    <div className="overflow-x-hidden bg-[#0D0D1A]">
      <DeckNavbar />
      <HeroSection />
      <ProblemSection />
      <InsightSection />
      <SolutionSection />
      <HowItWorksSection />
      <TechnologySection />
      <WhoSection />
      <MarketSection />
      <CompetitiveSection />
      <RoadmapSection />
      <WhyPartnerSection />
      <FinalCTA />
    </div>
  );
}
