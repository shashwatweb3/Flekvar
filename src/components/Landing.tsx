import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "dark" | "white";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function buttonClasses(variant: ButtonVariant = "primary") {
  return cx(
    "inline-flex items-center justify-center rounded-full border-[1.5px] px-8 py-3.5 text-[15px] font-semibold transition-all duration-200",
    "hover:-translate-y-0.5",
    variant === "primary" && "border-[var(--ink)] bg-[var(--ink)] text-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--ink)_85%,transparent)]",
    variant === "outline" && "border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
    variant === "dark" && "border-[var(--ink)] bg-[var(--primary)] text-white hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]",
    variant === "white" && "border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[color-mix(in_oklab,white_85%,var(--bg))]",
  );
}

function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: ButtonVariant }) {
  return (
    <button className={cx(buttonClasses(variant), className)} {...props}>
      {children}
    </button>
  );
}

function SectionTag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]",
        dark ? "border-white/25 text-white/80" : "border-[var(--ink)] text-[var(--ink)]",
      )}
    >
      <span
        className={cx(
          "h-2 w-2 rounded-full border",
          dark ? "border-white bg-[var(--primary)]" : "border-[var(--ink)] bg-[var(--primary)]",
        )}
      />
      {children}
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5 text-[22px] font-extrabold tracking-[-0.04em] text-[var(--ink)]">
      <span className="inline-block h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-[var(--primary)]" />
      Flekvar
    </div>
  );
}

function Card({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "purple" | "dark";
}) {
  const tones = {
    white: "border-[var(--ink)] bg-white text-[var(--ink)]",
    purple: "border-[var(--ink)] bg-[var(--primary)] text-white",
    dark: "border-[var(--ink)] bg-[var(--ink)] text-white",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={cx(
        "rounded-[24px] border-[1.5px] shadow-[5px_5px_0px_var(--ink)] transition-transform duration-200",
        tones[tone],
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
};

function HeroVisual() {
  return (
    <div className="flex justify-center">
      <motion.svg
        width="480"
        height="480"
        viewBox="0 0 480 480"
        fill="none"
        className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <ellipse cx="240" cy="240" rx="200" ry="200" stroke="var(--primary)" strokeWidth="1" strokeDasharray="6 10" opacity="0.32" />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <ellipse cx="240" cy="240" rx="155" ry="155" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 8" opacity="0.22" />
        </motion.g>

        <circle cx="90" cy="120" r="4" fill="var(--primary)" opacity="0.7" />
        <circle cx="390" cy="160" r="3" fill="var(--primary)" opacity="0.55" />
        <circle cx="400" cy="340" r="5" fill="var(--primary)" opacity="0.44" />
        <circle cx="80" cy="360" r="3" fill="var(--primary)" opacity="0.5" />
        <circle cx="240" cy="60" r="4" fill="white" opacity="0.3" />

        <motion.g animate={{ y: [0, -18, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="110" y="140" width="260" height="180" rx="18" fill="#1a2744" />
          <rect x="110" y="140" width="260" height="180" rx="18" stroke="var(--primary)" strokeWidth="1.5" opacity="0.5" />

          <rect x="130" y="165" width="40" height="32" rx="6" fill="rgba(139,92,246,0.15)" stroke="var(--primary)" strokeWidth="1" />
          <line x1="138" y1="175" x2="162" y2="175" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <line x1="138" y1="181" x2="158" y2="181" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />
          <line x1="138" y1="187" x2="165" y2="187" stroke="var(--primary)" strokeWidth="0.8" opacity="0.6" />

          <rect x="185" y="165" width="160" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="185" y="181" width="120" height="8" rx="3" fill="rgba(255,255,255,0.05)" />

          <rect x="305" y="160" width="50" height="42" rx="10" fill="rgba(139,92,246,0.2)" stroke="var(--primary)" strokeWidth="1.5" />
          <text x="330" y="186" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="800" fontSize="20" fill="var(--primary)">
            A
          </text>

          <rect x="130" y="215" width="220" height="30" rx="8" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
          <text x="240" y="234" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="var(--primary)" opacity="0.88">
            VERIFIED REPUTATION · PRIVATE · PORTABLE
          </text>

          <rect x="130" y="258" width="220" height="8" rx="2" fill="rgba(255,255,255,0.05)" />
          <rect x="130" y="272" width="200" height="8" rx="2" fill="rgba(255,255,255,0.04)" />
        </motion.g>

        <g transform="translate(390,70)">
          <path d="M20 2L4 8v8c0 8.5 6.9 16.4 16 18 9.1-1.6 16-9.5 16-18V8L20 2z" fill="rgba(139,92,246,0.2)" stroke="var(--primary)" strokeWidth="1.5" />
          <path d="M14 18l4 4 8-8" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <g transform="translate(55,300)">
          <rect x="4" y="12" width="18" height="14" rx="3" fill="rgba(139,92,246,0.2)" stroke="var(--primary)" strokeWidth="1.5" />
          <path d="M8 12V8a5 5 0 0 1 10 0v4" stroke="var(--primary)" strokeWidth="1.5" fill="none" />
          <circle cx="13" cy="19" r="2" fill="var(--primary)" />
        </g>
      </motion.svg>
    </div>
  );
}

function PassportCard({ mode }: { mode: "raw" | "zk" }) {
  const raw = mode === "raw";

  return (
    <div className="w-[420px] max-w-full overflow-hidden rounded-[20px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:translate-y-[-4px] hover:scale-[1.02]">
      <div className="bg-[linear-gradient(135deg,#1a2744_0%,#0f1a38_60%,#162040_100%)] px-8 pb-6 pt-8">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">Flekvar Credential</div>
            <div className="mt-1 font-mono text-[11px] text-white/35">PRIVATE REPUTATION LAYER</div>
          </div>
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-[var(--primary)] bg-[rgba(139,92,246,0.15)]">
            <div className="h-6 w-6 rounded-full border-[1.5px] border-[var(--primary)]" />
          </div>
        </div>
        <div className="text-[30px] font-extrabold tracking-[-0.03em] text-white">Flekvar Passport</div>
        <div className="mt-1 text-[12px] font-semibold tracking-[0.18em] text-[var(--primary)]">VERIFIED PRIVATELY</div>
      </div>

      <div className="bg-[#F8F7F2]">
        <div className="flex border-b border-black/10">
          <div className="flex h-[120px] w-[100px] items-center justify-center border-r border-black/10 bg-[var(--bg2)]">
            <svg width="56" height="60" viewBox="0 0 56 60" fill="none">
              <circle cx="28" cy="22" r="14" fill="#CBD5E1" />
              <path d="M4 56c0-13.3 10.7-24 24-24s24 10.7 24 24" fill="#CBD5E1" />
            </svg>
          </div>
          <div className="flex-1 px-5 py-4">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Holder</div>
            <div className="mb-3 mt-1 font-mono text-[14px] font-bold text-[var(--ink)]">{raw ? "0x84f1...dA8b" : "Anonymous"}</div>
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Wallet</div>
            <div className="mt-1 font-mono text-[13px] font-bold text-[var(--ink)]">{raw ? "Publicly visible" : "Verified privately"}</div>
            <div className="mt-3 font-mono text-[11px] text-[var(--muted)]">issuer: did:flekvar:credential</div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Reputation Score", raw ? "Derived from wallet" : "92 / 100"],
              ["Builder Since", "2021"],
              ["Contribution", raw ? "Activity exposed" : "Level IV"],
              ["Skills", raw ? "Wallet-interpreted" : "Infra / Research"],
              ["Trust Score", raw ? "Needs history read" : "High confidence"],
              ["Client Surface", raw ? "Counterparties visible" : "Hashed privately"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
                <div className={cx("mt-1 font-mono text-[13px] font-bold text-[var(--ink)]", raw && label !== "Builder Since" && "blur-[2px]")}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cx(
            "mx-5 mb-4 mt-1 flex items-center justify-between rounded-[14px] border px-4 py-3",
            raw ? "border-[var(--ink)] bg-white" : "border-[var(--ink)] bg-[var(--primary)]",
          )}
        >
          <div>
            <div className={cx("text-[12px] font-bold", raw ? "text-[var(--ink)]" : "text-white")}>
              {raw ? "Raw wallet mode" : "ZK proof valid"}
            </div>
            <div className={cx("font-mono text-[11px]", raw ? "text-[var(--muted)]" : "text-white/75")}>
              {raw ? "Every signal leaks from the wallet" : "Share proof, not private activity"}
            </div>
          </div>
          <div className={cx("font-mono text-[11px] font-bold", raw ? "text-[var(--ink)]" : "text-white")}>
            {raw ? "WARNING" : "VALID"}
          </div>
        </div>

        <div className="bg-[#1a2744] px-5 py-4 font-mono text-[11px] leading-6 text-white/45">
          FLKVR&lt;&lt;&lt;PRIVATE&lt;&lt;&lt;REPUTATION&lt;&lt;&lt;PORTABLE
          <br />
          VERIFIED&lt;CONTRIBUTOR&lt;LEVELIV&lt;&lt;&lt;ACTIVE
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<"raw" | "zk">("zk");
  const ctaRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMode((current) => (current === "raw" ? "zk" : "raw"));
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed left-0 right-0 top-0 z-50 px-6 py-[18px] transition-all duration-300 md:px-12">
        <div
          className={cx(
            "mx-auto flex max-w-[1400px] items-center justify-between transition-all duration-300",
            scrolled && "rounded-full border border-black/10 bg-[rgba(242,241,236,0.88)] px-4 py-3 backdrop-blur-[14px]",
          )}
        >
          <LogoMark />
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["#vision", "Vision"],
              ["#demo", "Demo"],
              ["#waitlist", "Waitlist"],
            ].map(([href, label]) => (
              <a key={label} href={href} className="text-[15px] font-medium text-[var(--ink)] transition-opacity hover:opacity-60">
                {label}
              </a>
            ))}
          </nav>
          <Button variant="outline" className="px-6 py-2.5 text-[14px]">
            Join Waitlist
          </Button>
        </div>
      </header>

      <section
        id="vision"
        className="grid min-h-screen grid-cols-1 items-center gap-[60px] px-6 pb-20 pt-[140px] md:px-12 lg:grid-cols-2"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-4 py-1.5 text-[13px] font-semibold text-white">
            <span>🔐</span> Privacy-first reputation protocol
          </div>
          <h1 className="mt-7 text-[clamp(48px,6vw,82px)] font-extrabold leading-[1] tracking-[-0.06em] text-[var(--ink)]">
            Proof without
            <br />
            <span className="rounded-md bg-[var(--primary)] px-2 text-white">exposure.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[18px] leading-[1.65] text-[var(--muted)]">
            Flekvar helps users prove reputation, contribution, and credibility onchain without exposing wallets, balances, or private activity.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button>View Demo</Button>
            <Button variant="outline">Join Waitlist</Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-black/15 pt-10">
            {[
              ["Portable Identity", "Private by default"],
              ["Selective Disclosure", "Context-aware proof"],
              ["Verified Reputation", "Readable trust signal"],
            ].map(([value, label]) => (
              <div key={value}>
                <div className="text-[30px] font-extrabold tracking-[-0.04em] text-[var(--ink)]">{value}</div>
                <div className="mt-1 text-[14px] text-[var(--muted)]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </section>

      <div className="flex flex-wrap items-center gap-6 overflow-hidden bg-[var(--ink)] px-6 py-8 md:px-12">
        <div className="text-[13px] font-medium text-white/42">Early builders joining the journey.</div>
        <div className="flex flex-1 flex-wrap items-center gap-12">
          {["Builder collectives", "Research groups", "Grant circles", "Private communities", "Protocol teams"].map((item) => (
            <span key={item} className="text-[15px] font-semibold text-white/50 transition-colors hover:text-[var(--primary)]">
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="bg-[var(--background)] px-6 py-24 md:px-12">
        <motion.div {...fadeUp}>
          <SectionTag>01 — Problem &amp; Solution</SectionTag>
          <h2 className="mt-5 text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
            Wallet exposure
            <br />
            kills trust design.
          </h2>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-[var(--muted)]">
            A verifier wants proof of contribution. Today that often means reading the wallet. Flekvar breaks that pattern.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <Card tone="white" className="overflow-hidden">
              <div className="flex items-center gap-3 border-b-[1.5px] border-[var(--ink)] bg-[#FFF0F0] px-7 py-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--red)]" />
                <h3 className="text-[20px] font-extrabold">Without Flekvar</h3>
                <span className="ml-auto rounded-full border border-[var(--red)] bg-[#FFE5E5] px-3 py-1 text-[11px] font-bold text-[var(--red)]">
                  EXPOSED
                </span>
              </div>
              <div className="bg-white px-7 py-7">
                <p className="mb-5 text-[13px] leading-[1.6] text-[var(--muted)]">
                  Share a wallet and the verifier can infer balances, counterparties, history, behavior, and protocol activity.
                </p>
                {[
                  ["Wallet address", "0x84f1...dA8b"],
                  ["Balances", "Stablecoins, grants, governance"],
                  ["Transaction history", "Publicly visible"],
                  ["Public activity", "Voting and transfers exposed"],
                  ["Protocol interactions", "Linkable across apps"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="mb-3 flex items-center justify-between rounded-[14px] border-[1.5px] border-[var(--ink)] bg-[var(--bg)] px-4 py-3 text-[14px] last:mb-0"
                  >
                    <span className="text-[13px] font-medium text-[var(--muted)]">{label}</span>
                    <span className="font-mono font-medium text-[var(--red)]">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <Card tone="white" className="overflow-hidden">
              <div className="flex items-center gap-3 border-b-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-7 py-5">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                <h3 className="text-[20px] font-extrabold text-white">With Flekvar</h3>
                <span className="ml-auto rounded-full border border-[var(--ink)] bg-white px-3 py-1 text-[11px] font-bold text-[var(--ink)]">
                  PRIVATE
                </span>
              </div>
              <div className="bg-white px-7 py-7">
                <p className="mb-5 text-[13px] leading-[1.6] text-[var(--muted)]">
                  Share a private credential instead: reputation, contribution, and trust become verifiable without wallet exposure.
                </p>
                {[
                  ["Reputation Score", "92 / 100"],
                  ["Verified Contributor", "Active"],
                  ["Builder Since", "2021"],
                  ["Contribution Level", "Level IV"],
                  ["Skills", "Infra / Research"],
                  ["Trust Score", "High confidence"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="mb-3 flex items-center justify-between rounded-[14px] border-[1.5px] border-[var(--ink)] bg-[var(--bg)] px-4 py-3 text-[14px] last:mb-0"
                  >
                    <span className="text-[13px] font-medium text-[var(--muted)]">{label}</span>
                    <span className="font-mono font-bold text-[var(--primary)]">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="demo" className="bg-[var(--ink)] px-6 py-24 md:px-12">
        <motion.div {...fadeUp}>
          <SectionTag dark>02 — Live Demo</SectionTag>
          <h2 className="mt-5 text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-white">
            The Flekvar Passport.
            <br />
            Toggle modes below.
          </h2>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-white/55">
            Switch between exposed wallet mode and private reputation mode. This is what a verifier sees.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col items-center">
          <div className="mb-10 flex items-center gap-4 rounded-full border border-white/15 bg-white/8 px-2 py-1.5">
            <button
              type="button"
              onClick={() => setMode("raw")}
              className={cx(
                "rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all",
                mode === "raw" ? "bg-white text-[var(--ink)]" : "bg-transparent text-white/50",
              )}
            >
              Raw Wallet
            </button>
            <button
              type="button"
              onClick={() => setMode("zk")}
              className={cx(
                "rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all",
                mode === "zk" ? "bg-[var(--primary)] text-white" : "bg-transparent text-white/50",
              )}
            >
              ZK Private
            </button>
          </div>

          <motion.div {...fadeUp}>
            <PassportCard mode={mode} />
          </motion.div>

          <p className="mt-5 font-mono text-[13px] text-white/35">← tap toggle to switch between exposure modes →</p>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-24 md:px-12">
        <motion.div {...fadeUp}>
          <SectionTag>03 — Feature Cards</SectionTag>
          <h2 className="mt-5 text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
            Modern SaaS design,
            <br />
            reputation-first story.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Private Reputation", "Trust becomes legible without exposing sensitive history.", "white"],
            ["Portable Identity", "One reputation layer that follows the user across contexts.", "purple"],
            ["Verifiable Contribution", "Communities can read contribution as proof, not lore.", "dark"],
            ["Selective Disclosure", "Reveal only what the verifier needs to know.", "white"],
            ["Reputation Layer", "A protocol-native trust surface for the onchain era.", "dark"],
            ["Identity Without Exposure", "Proof, not surveillance.", "purple"],
          ].map(([title, copy, tone], index) => (
            <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
              <Card tone={tone as "white" | "purple" | "dark"} className="h-full p-7">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-current/20 bg-white/10">
                  <span
                    className={cx(
                      "h-5 w-5 rounded-full",
                      tone === "white" ? "bg-[var(--primary)]" : "bg-white",
                    )}
                  />
                </div>
                <h3 className="text-[28px] font-extrabold leading-[1.08] tracking-[-0.04em]">{title}</h3>
                <p className={cx("mt-4 text-[14px] leading-[1.7]", tone === "white" ? "text-[var(--muted)]" : "text-white/75")}>
                  {copy}
                </p>
                <div className="mt-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/20 bg-white/10 text-lg">
                  +
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] px-6 py-24 md:px-12">
        <motion.div {...fadeUp}>
          <SectionTag dark>04 — Building In Public</SectionTag>
          <h2 className="mt-5 text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-white">
            Building in public.
          </h2>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-white/50">
            Every sprint. Every milestone. Every update.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Research", "Complete", "100%"],
            ["Prototype", "Live", "78%"],
            ["Closed Alpha", "Next", "42%"],
            ["Public Beta", "Queued", "16%"],
          ].map(([phase, status, percent], index) => (
            <motion.div key={phase} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
              <Card tone="dark" className="h-full p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">{status}</span>
                  <span className="h-3 w-3 rounded-full bg-[var(--primary)]" />
                </div>
                <h3 className="text-[24px] font-extrabold tracking-[-0.04em] text-white">{phase}</h3>
                <div className="mt-8 h-3 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: percent }} />
                </div>
                <div className="mt-4 flex items-center justify-between text-[13px] text-white/48">
                  <span>Progress</span>
                  <span className="font-mono">{percent}</span>
                </div>
                <div className="mt-8 rounded-[18px] border border-white/10 bg-white/6 p-4">
                  <div className="h-16 rounded-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--bg2)] px-6 py-24 md:px-12">
        <motion.div {...fadeUp}>
          <SectionTag>05 — Bento Grid</SectionTag>
          <h2 className="mt-5 text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
            Structured like a
            <br />
            serious infrastructure startup.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            ["Built for Ethereum", "Open identity surfaces and portable reputation across the onchain stack.", "white", "lg:col-span-2"],
            ["Privacy-first", "Readable proofs, private source data.", "purple", ""],
            ["Designed for reputation", "Built around trust, not dashboards.", "dark", ""],
            ["Made for builders", "Contributors, communities, and grant programs.", "white", ""],
            ["Early access opening soon", "Founding users shape the public launch.", "purple", ""],
            ["Trust layer for onchain users", "Portable identity and contribution context in one system.", "dark", "lg:col-span-2"],
          ].map(([title, copy, tone, span], index) => (
            <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
              <Card tone={tone as "white" | "purple" | "dark"} className={cx("h-full p-7", span)}>
                <div className="inline-flex rounded-full border border-current/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-6 text-[30px] font-extrabold leading-[1.08] tracking-[-0.04em]">{title}</h3>
                <p className={cx("mt-4 text-[14px] leading-[1.7]", tone === "white" ? "text-[var(--muted)]" : "text-white/75")}>
                  {copy}
                </p>
                <div className="mt-10 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-10 w-10 rounded-[14px] border border-current/20 bg-white/10" />
                    <span className="h-10 w-16 rounded-[14px] border border-current/20 bg-white/10" />
                  </div>
                  <span className={cx("font-mono text-[11px]", tone === "white" ? "text-black/40" : "text-white/40")}>signal</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="bg-[var(--background)] px-6 pb-20 pt-4 md:px-12">
        <motion.div
          {...fadeUp}
          ref={ctaRef}
          onMouseMove={(event) => {
            const bounds = ctaRef.current?.getBoundingClientRect();
            if (!bounds) return;
            setPointer({
              x: ((event.clientX - bounds.left) / bounds.width) * 100,
              y: ((event.clientY - bounds.top) / bounds.height) * 100,
            });
          }}
          className="relative overflow-hidden rounded-[24px] border-[1.5px] border-[var(--ink)] bg-[var(--primary)] p-10 shadow-[5px_5px_0px_var(--ink)] md:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.18), transparent 28%)`,
            }}
          />
          <div className="absolute right-[60px] top-1/2 hidden -translate-y-1/2 lg:block">
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="h-40 w-40 rounded-full border border-[var(--ink)]/35" />
          </div>

          <div className="relative max-w-[520px]">
            <SectionTag>06 — Final CTA</SectionTag>
            <h2 className="mt-6 text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
              The future of reputation won’t be fully public.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-black/65">
              Join the first users shaping portable onchain identity.
            </p>
            <div className="mt-8 flex max-w-[520px] flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-[52px] flex-1 rounded-full border-[1.5px] border-[var(--ink)] bg-white px-5 text-[15px] text-[var(--ink)] outline-none placeholder:text-black/35"
              />
              <Button variant="white">Reserve My Spot</Button>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-[var(--ink)] px-6 pb-10 pt-16 md:px-12">
        <div className="mb-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 text-[24px] font-extrabold tracking-[-0.04em] text-white">Flekvar</div>
            <p className="max-w-[260px] text-[14px] leading-[1.6] text-white/40">
              Privacy-first reputation and identity infrastructure for the next generation of onchain users.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {["Twitter/X", "GitHub", "Docs", "Privacy"].map((item) => (
              <div key={item}>
                <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white/38">{item}</div>
                <a href="#" className="text-[14px] text-white/70 transition-colors hover:text-[var(--primary)]">
                  Open
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-white/35">Flekvar © 2026</p>
          <div className="flex flex-wrap gap-2">
            {["Privacy-first", "Portable reputation", "Built in public"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[var(--primary)]/40 px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.08em] text-[var(--primary)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
