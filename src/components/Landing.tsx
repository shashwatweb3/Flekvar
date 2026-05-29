import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import WaitlistCounter from "@/components/waitlist-counter";
import WaitlistForm from "@/components/waitlist-form";

type ButtonVariant = "primary" | "outline" | "dark" | "white";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function buttonClasses(variant: ButtonVariant = "primary") {
  return cx(
    "inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] px-5 py-3 text-[14px] font-semibold transition-all duration-200 sm:px-8 sm:py-3.5 sm:text-[15px]",
    "hover:-translate-y-0.5",
    variant === "primary" &&
      "border-[var(--ink)] bg-[var(--ink)] text-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--ink)_85%,transparent)]",
    variant === "outline" &&
      "border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
    variant === "dark" &&
      "border-[var(--ink)] bg-[var(--primary)] text-white hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]",
    variant === "white" &&
      "border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[color-mix(in_oklab,white_85%,var(--bg))]",
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
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "purple" | "dark";
  interactive?: boolean;
}) {
  const tones = {
    white: "border-[var(--ink)] bg-white text-[var(--ink)]",
    purple: "border-[var(--ink)] bg-[var(--primary)] text-white",
    dark: "border-[var(--ink)] bg-[var(--ink)] text-white",
  };

  return (
    <motion.div
      whileHover={interactive ? { y: -6 } : undefined}
      className={cx(
        "rounded-[24px] border-[1.5px] shadow-[5px_5px_0px_var(--ink)] transition-transform duration-200 will-change-transform sm:rounded-[28px]",
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
        className="h-auto w-full max-w-[260px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[440px] xl:max-w-[480px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <ellipse
            cx="240"
            cy="240"
            rx="200"
            ry="200"
            stroke="var(--primary)"
            strokeWidth="1"
            strokeDasharray="6 10"
            opacity="0.32"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <ellipse
            cx="240"
            cy="240"
            rx="155"
            ry="155"
            stroke="var(--primary)"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.22"
          />
        </motion.g>

        <circle cx="90" cy="120" r="4" fill="var(--primary)" opacity="0.7" />
        <circle cx="390" cy="160" r="3" fill="var(--primary)" opacity="0.55" />
        <circle cx="400" cy="340" r="5" fill="var(--primary)" opacity="0.44" />
        <circle cx="80" cy="360" r="3" fill="var(--primary)" opacity="0.5" />
        <circle cx="240" cy="60" r="4" fill="white" opacity="0.3" />

        <motion.g
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="110" y="140" width="260" height="180" rx="18" fill="#1a2744" />
          <rect
            x="110"
            y="140"
            width="260"
            height="180"
            rx="18"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.5"
          />

          <rect
            x="130"
            y="165"
            width="40"
            height="32"
            rx="6"
            fill="rgba(139,92,246,0.15)"
            stroke="var(--primary)"
            strokeWidth="1"
          />
          <line
            x1="138"
            y1="175"
            x2="162"
            y2="175"
            stroke="var(--primary)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="138"
            y1="181"
            x2="158"
            y2="181"
            stroke="var(--primary)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="138"
            y1="187"
            x2="165"
            y2="187"
            stroke="var(--primary)"
            strokeWidth="0.8"
            opacity="0.6"
          />

          <rect x="185" y="165" width="160" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="185" y="181" width="120" height="8" rx="3" fill="rgba(255,255,255,0.05)" />

          <rect
            x="305"
            y="160"
            width="50"
            height="42"
            rx="10"
            fill="rgba(139,92,246,0.2)"
            stroke="var(--primary)"
            strokeWidth="1.5"
          />
          <text
            x="330"
            y="186"
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="800"
            fontSize="20"
            fill="var(--primary)"
          >
            A
          </text>

          <rect
            x="130"
            y="215"
            width="220"
            height="30"
            rx="8"
            fill="rgba(139,92,246,0.1)"
            stroke="rgba(139,92,246,0.3)"
            strokeWidth="1"
          />
          <text
            x="240"
            y="234"
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="10"
            fill="var(--primary)"
            opacity="0.88"
          >
            VERIFIED REPUTATION · PRIVATE · PORTABLE
          </text>

          <rect x="130" y="258" width="220" height="8" rx="2" fill="rgba(255,255,255,0.05)" />
          <rect x="130" y="272" width="200" height="8" rx="2" fill="rgba(255,255,255,0.04)" />
        </motion.g>

        <g transform="translate(390,70)">
          <path
            d="M20 2L4 8v8c0 8.5 6.9 16.4 16 18 9.1-1.6 16-9.5 16-18V8L20 2z"
            fill="rgba(139,92,246,0.2)"
            stroke="var(--primary)"
            strokeWidth="1.5"
          />
          <path
            d="M14 18l4 4 8-8"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        <g transform="translate(55,300)">
          <rect
            x="4"
            y="12"
            width="18"
            height="14"
            rx="3"
            fill="rgba(139,92,246,0.2)"
            stroke="var(--primary)"
            strokeWidth="1.5"
          />
          <path
            d="M8 12V8a5 5 0 0 1 10 0v4"
            stroke="var(--primary)"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="13" cy="19" r="2" fill="var(--primary)" />
        </g>
      </motion.svg>
    </div>
  );
}

function PassportCard({ mode }: { mode: "raw" | "zk" }) {
  const raw = mode === "raw";
  const detailRows = raw
    ? [
        ["Wallet Address", "0x84f1...dA8b"],
        ["Balances", "Visible"],
        ["Transaction History", "Visible"],
        ["Protocol Activity", "Visible"],
        ["Counterparties", "Visible"],
      ]
    : [
        ["Verified Contributor", "Active"],
        ["Builder Since", "2021"],
        ["Contribution", "Level IV"],
        ["Specialization", "Infrastructure Research"],
        ["Credential", "Private"],
        ["Trust Score", "Verified"],
      ];

  return (
    <div className="w-full max-w-[360px] overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:translate-y-[-4px] hover:scale-[1.02] sm:max-w-[460px] sm:rounded-[24px]">
      <div
        className={cx(
          "px-4 pb-4 pt-5 transition-colors duration-300 sm:px-8 sm:pb-6 sm:pt-8",
          raw
            ? "bg-[linear-gradient(135deg,#2b1115_0%,#190c12_55%,#291118_100%)]"
            : "bg-[linear-gradient(135deg,#1a2744_0%,#0f1a38_60%,#162040_100%)]",
        )}
      >
        <div className="mb-6 flex items-center justify-between sm:mb-7">
          <div>
            <div
              className={cx(
                "font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px]",
                raw ? "text-[#ffb3b3]" : "text-white/45",
              )}
            >
              {raw ? "Raw Wallet View" : "Flekvar Credential"}
            </div>
            <div
              className={cx(
                "mt-1 font-mono text-[10px] sm:text-[11px]",
                raw ? "text-[#ff8f8f]/80" : "text-white/35",
              )}
            >
              {raw ? "EXPOSURE MODE" : "PRIVATE REPUTATION LAYER"}
            </div>
          </div>
          <div
            className={cx(
              "flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] sm:h-[52px] sm:w-[52px]",
              raw
                ? "border-[#ff7c7c] bg-[rgba(255,68,68,0.14)]"
                : "border-[var(--primary)] bg-[rgba(139,92,246,0.15)]",
            )}
          >
            {raw ? (
              <div className="h-3 w-3 rounded-full bg-[#ff7c7c] shadow-[0_0_0_6px_rgba(255,68,68,0.16)] sm:h-3.5 sm:w-3.5" />
            ) : (
              <div className="h-5 w-5 rounded-full border-[1.5px] border-[var(--primary)] sm:h-6 sm:w-6" />
            )}
          </div>
        </div>
        <div className="text-[20px] font-extrabold tracking-[-0.03em] text-white sm:text-[30px]">
          {raw ? "Onchain Exposure Snapshot" : "Flekvar Passport"}
        </div>
        <div
          className={cx(
            "mt-1 text-[11px] font-semibold tracking-[0.18em] sm:text-[12px]",
            raw ? "text-[#ff8f8f]" : "text-[var(--primary)]",
          )}
        >
          {raw ? "EVERYTHING IS PUBLIC" : "VERIFIED PRIVATELY"}
        </div>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0.55, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
        className="bg-[#F8F7F2]"
      >
        <div
          className={cx(
            "border-b px-4 py-4 sm:px-5 sm:py-5",
            raw ? "border-[#ff4444]/15 bg-[#fff4f4]" : "border-black/10 bg-[var(--bg2)]/50",
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Credential Surface
              </div>
              <div className="mt-1 text-[15px] font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-[17px]">
                {raw ? "Financial footprint included" : "Only professional proof shown"}
              </div>
            </div>
            <div
              className={cx(
                "rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
                raw
                  ? "border-[#ff8f8f] bg-[#ffe7e7] text-[var(--red)]"
                  : "border-[var(--primary)]/35 bg-[var(--primary-glow)] text-[var(--primary)]",
              )}
            >
              {raw ? "Warning" : "Verified"}
            </div>
          </div>
        </div>

        <div className="px-3 py-3 sm:px-5 sm:py-5">
          <div className="grid gap-2.5 sm:gap-3">
            {detailRows.map(([label, value]) => (
              <div
                key={label}
                className={cx(
                  "flex min-w-0 flex-col items-start justify-between gap-1.5 rounded-[16px] border-[1.5px] px-3.5 py-3 text-[13px] sm:flex-row sm:items-center sm:gap-6 sm:px-4 sm:py-3.5 sm:text-[14px]",
                  raw ? "border-[#ffb8b8] bg-[#fff7f7]" : "border-[var(--ink)] bg-[var(--bg)]",
                )}
              >
                <span className="text-[13px] font-medium text-[var(--muted)]">{label}</span>
                <span
                  className={cx(
                    "w-full break-words text-left font-mono font-bold sm:w-auto sm:text-right",
                    raw ? "text-[var(--red)]" : "text-[var(--primary)]",
                  )}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cx(
            "mx-3 mb-3 mt-1 rounded-[16px] border-[1.5px] px-3.5 py-3 sm:mx-5 sm:mb-5 sm:px-4 sm:py-3.5",
            raw
              ? "border-[#ff8f8f] bg-[#fff0f0]"
              : "border-[var(--primary)]/35 bg-[var(--primary-glow)]",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div
                className={cx(
                  "text-[11px] font-bold sm:text-[12px]",
                  raw ? "text-[var(--red)]" : "text-[var(--ink)]",
                )}
              >
                Status
              </div>
              <div
                className={cx(
                  "mt-1 font-mono text-[10px] sm:text-[11px]",
                  raw ? "text-[var(--red)]/80" : "text-[var(--muted)]",
                )}
              >
                {raw ? "Everything exposed" : "Only what matters is shared"}
              </div>
            </div>
            <div
              className={cx(
                "inline-flex h-8 shrink-0 items-center rounded-full border px-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
                raw
                  ? "border-[#ff8f8f] text-[var(--red)]"
                  : "border-[var(--primary)]/40 text-[var(--primary)]",
              )}
            >
              {raw ? "Exposed" : "Private"}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-[#1a2744] px-3 py-3 font-mono text-[9px] leading-5 text-white/45 sm:px-5 sm:py-4 sm:text-[11px] sm:leading-6">
          {raw ? "RAW<<<WALLET<<<PUBLIC<<<TRACEABLE" : "FLKVR<<<PRIVATE<<<REPUTATION<<<PORTABLE"}
          <br />
          {raw
            ? "BALANCES<VISIBLE<ACTIVITY<VISIBLE<COUNTERPARTIES"
            : "VERIFIED<CONTRIBUTOR<LEVELIV<<<ACTIVE"}
        </div>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<"raw" | "zk">("zk");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setMode((current) => (current === "raw" ? "zk" : "raw"));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  function scrollToSection(id: "vision" | "demo" | "waitlist") {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-300 sm:px-6 lg:px-8">
        <div
          className={cx(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-300",
            scrolled || menuOpen
              ? "rounded-[28px] border border-black/10 bg-[rgba(242,241,236,0.92)] px-4 py-3 shadow-[0_10px_30px_rgba(13,13,13,0.08)] backdrop-blur-[14px]"
              : "px-1",
          )}
        >
          <LogoMark />
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["#vision", "Vision"],
              ["#demo", "Demo"],
              ["#waitlist", "Waitlist"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(href.slice(1) as "vision" | "demo" | "waitlist");
                }}
                className="text-[15px] font-medium text-[var(--ink)] transition-opacity hover:opacity-60"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button
            variant="outline"
            className="hidden px-6 py-2.5 text-[14px] md:inline-flex"
            onClick={() => scrollToSection("waitlist")}
          >
            Join Waitlist
          </Button>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-white/70 text-[var(--ink)] backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cx(
                  "block h-0.5 w-5 rounded-full bg-current transition-transform duration-200",
                  menuOpen && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cx(
                  "block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cx(
                  "block h-0.5 w-5 rounded-full bg-current transition-transform duration-200",
                  menuOpen && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
        <motion.div
          initial={false}
          animate={{
            opacity: menuOpen ? 1 : 0,
            y: menuOpen ? 0 : -12,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="mx-auto mt-3 max-w-7xl md:hidden"
        >
          <div className="rounded-[28px] border-[1.5px] border-[var(--ink)] bg-[rgba(242,241,236,0.96)] p-4 shadow-[5px_5px_0px_var(--ink)] backdrop-blur">
            <div className="flex flex-col gap-2">
              {[
                ["#vision", "Vision"],
                ["#demo", "Demo"],
                ["#waitlist", "Waitlist"],
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(href.slice(1) as "vision" | "demo" | "waitlist");
                  }}
                  className="rounded-[18px] px-4 py-3 text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-white"
                >
                  {label}
                </a>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => scrollToSection("waitlist")}
            >
              Join Waitlist
            </Button>
          </div>
        </motion.div>
      </header>

      <section
        id="vision"
        className="relative overflow-hidden px-5 pb-12 pt-[110px] scroll-mt-28 sm:px-8 sm:pb-16 sm:pt-[124px] sm:scroll-mt-32 md:pt-[144px] lg:px-12 lg:pb-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-8 h-80 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.14),transparent_70%)]" />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -14, 0], x: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[8%] top-[22%] h-2 w-2 rounded-full bg-[var(--primary)]/50"
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 16, 0], x: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[12%] top-[28%] h-2.5 w-2.5 rounded-full bg-[var(--primary)]/35"
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            className="absolute bottom-[24%] left-[16%] h-1.5 w-1.5 rounded-full bg-[var(--primary)]/55"
          />
        </div>
        <div className="mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="mx-auto flex w-full max-w-[650px] flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-4 py-1.5 text-[12px] font-semibold text-white sm:text-[13px]"
            >
              <span>🔐</span> Private professional identity for Web3
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06 }}
              className="mt-4 max-w-[650px] text-[42px] font-extrabold leading-[1.05] tracking-[-0.06em] text-[var(--ink)] sm:mt-6 sm:text-[48px] sm:leading-[1.04] md:mt-9 md:text-[56px] md:leading-[1] lg:text-[72px] lg:leading-[0.98] xl:text-[88px] xl:leading-[0.95]"
            >
              In Web3,
              <br />
              your resume is
              <br />
              <span className="my-2 inline-block rounded-md bg-[var(--primary)] px-2 py-1 text-white sm:my-3 sm:px-3 sm:py-1.5">
                your wallet.
              </span>
              <br />
              Flekvar changes that.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mt-6 max-w-[620px] text-[16px] leading-[1.7] text-[var(--muted)] sm:mt-6 sm:text-[18px]"
            >
              Today, proving your work history often means exposing your entire wallet. Flekvar lets
              you prove your professional track record without revealing balances, transactions, or
              financial history.
            </motion.p>
            <WaitlistForm tone="light" className="mt-8 max-w-[520px]" />
            <WaitlistCounter tone="light" className="mt-5" />
            <div className="mt-8 grid w-full gap-3 border-t border-black/15 pt-6 sm:mt-10 sm:gap-4 sm:pt-8 lg:grid-cols-1 lg:gap-y-4 xl:grid-cols-3">
              {["Private by default", "Portable identity", "Verifiable contribution"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--ink)] bg-white text-[12px] font-bold text-[var(--primary)]">
                      ✓
                    </span>
                    <div className="text-[15px] font-semibold text-[var(--ink)] sm:text-[16px]">
                      {item}
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
          <div className="mx-auto flex w-full items-center justify-center lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[var(--ink)] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:gap-6">
          <div className="text-[13px] font-medium text-white/42">
            Early builders joining the journey.
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3 lg:gap-12">
            {[
              "Builder collectives",
              "Research groups",
              "Grant circles",
              "Private communities",
              "Protocol teams",
            ].map((item) => (
              <span
                key={item}
                className="text-[14px] font-semibold text-white/50 transition-colors hover:text-[var(--primary)] sm:text-[15px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-[var(--background)] px-5 py-12 sm:px-8 sm:py-16 md:py-28 lg:px-12 lg:py-32">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>01 — Problem &amp; Solution</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            Your work history
            <br />
            shouldn&apos;t expose your
            <br />
            financial history.
          </h2>
          <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
            Web3 created transparent work histories. But it never created a private way to share
            them. Today your work identity and financial identity are the same thing. Flekvar
            separates them.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-7xl items-stretch gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          <motion.div {...fadeUp}>
            <Card tone="white" className="h-full overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b-[1.5px] border-t-[6px] border-[var(--ink)] border-t-[var(--red)] bg-[#FFF0F0] px-5 py-4 sm:px-7 sm:py-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--red)]" />
                <h3 className="text-[18px] font-extrabold sm:text-[20px]">WITHOUT FLEKVAR</h3>
                <span className="rounded-full border border-[var(--red)] bg-[#FFE5E5] px-3 py-1 text-[11px] font-bold text-[var(--red)] sm:ml-auto">
                  WARNING
                </span>
              </div>
              <div className="bg-white px-4 py-5 sm:px-7 sm:py-8">
                <p className="mb-6 max-w-[34rem] text-[13px] leading-[1.7] text-[var(--muted)] sm:text-[14px]">
                  Sharing proof of your work also exposes your balances, transaction history, and
                  network context.
                </p>
                {[
                  ["Wallet address", "0x84f1...dA8b"],
                  ["Balances", "Visible"],
                  ["Transaction History", "Visible"],
                  ["Protocol Activity", "Visible"],
                  ["Counterparties", "Visible"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="mb-2.5 flex min-w-0 flex-col items-start justify-between gap-1.5 rounded-[16px] border-[1.5px] border-[var(--ink)] bg-[var(--bg)] px-3.5 py-3 text-[13px] last:mb-0 sm:mb-3 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-3.5 sm:text-[14px]"
                  >
                    <span className="text-[13px] font-medium text-[var(--muted)]">{label}</span>
                    <span className="w-full break-words text-left font-mono font-medium text-[var(--red)] sm:w-auto sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="mt-4 rounded-[16px] border-[1.5px] border-[var(--red)]/40 bg-[#FFF4F4] px-3.5 py-3 text-[13px] font-semibold text-[var(--red)] sm:mt-5 sm:px-4 sm:py-3.5 sm:text-[14px]">
                  Everything exposed.
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <Card
              tone="white"
              className="h-full overflow-hidden shadow-[0_0_0_1px_rgba(139,92,246,0.24),5px_5px_0px_var(--ink),0_18px_50px_rgba(139,92,246,0.14)]"
            >
              <div className="flex flex-wrap items-center gap-3 border-b-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-5 py-4 sm:px-7 sm:py-5">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                <h3 className="text-[18px] font-extrabold text-white sm:text-[20px]">
                  WITH FLEKVAR
                </h3>
                <span className="rounded-full border border-[var(--ink)] bg-white px-3 py-1 text-[11px] font-bold text-[var(--ink)] sm:ml-auto">
                  VERIFIED
                </span>
              </div>
              <div className="bg-white px-4 py-5 sm:px-7 sm:py-8">
                <p className="mb-6 max-w-[34rem] text-[13px] leading-[1.7] text-[var(--muted)] sm:text-[14px]">
                  You share a private professional credential instead of a financial footprint.
                </p>
                {[
                  ["Verified Contributor", "Active"],
                  ["Builder Since", "2021"],
                  ["Contribution", "Level IV"],
                  ["Specialization", "Infrastructure Research"],
                  ["Credential", "Private"],
                  ["Trust Score", "Verified"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="mb-2.5 flex min-w-0 flex-col items-start justify-between gap-1.5 rounded-[16px] border-[1.5px] border-[var(--ink)] bg-[var(--bg)] px-3.5 py-3 text-[13px] last:mb-0 sm:mb-3 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-3.5 sm:text-[14px]"
                  >
                    <span className="text-[13px] font-medium text-[var(--muted)]">{label}</span>
                    <span className="w-full break-words text-left font-mono font-bold text-[var(--primary)] sm:w-auto sm:text-right">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="mt-4 rounded-[16px] border-[1.5px] border-[var(--primary)]/40 bg-[var(--primary-glow)] px-3.5 py-3 text-[13px] font-semibold text-[var(--ink)] sm:mt-5 sm:px-4 sm:py-3.5 sm:text-[14px]">
                  Only what matters is shared.
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section
        id="demo"
        className="bg-[var(--ink)] px-5 py-12 scroll-mt-28 sm:px-8 sm:py-16 sm:scroll-mt-32 md:py-28 lg:px-12 lg:py-32"
      >
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag dark>02 — Live Demo</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            See the difference.
          </h2>
          <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-white/55 sm:text-[17px]">
            A verifier asks you to prove your track record. Raw wallet view vs Flekvar credential.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center sm:mt-14">
          <div className="mb-6 flex w-full max-w-[360px] items-center gap-1.5 rounded-full border border-white/15 bg-white/8 p-1 sm:mb-8 sm:max-w-[460px] sm:gap-4 sm:p-1.5 sm:px-2">
            <button
              type="button"
              onClick={() => setMode("raw")}
              className={cx(
                "flex-1 rounded-full px-3 py-2 text-[12px] font-semibold transition-all sm:px-6 sm:py-2.5 sm:text-[14px]",
                mode === "raw" ? "bg-white text-[var(--ink)]" : "bg-transparent text-white/50",
              )}
            >
              Raw Wallet View
            </button>
            <button
              type="button"
              onClick={() => setMode("zk")}
              className={cx(
                "flex-1 rounded-full px-3 py-2 text-[12px] font-semibold transition-all sm:px-6 sm:py-2.5 sm:text-[14px]",
                mode === "zk" ? "bg-[var(--primary)] text-white" : "bg-transparent text-white/50",
              )}
            >
              Flekvar Credential
            </button>
          </div>

          <motion.div {...fadeUp} className="w-full">
            <div className="mx-auto flex max-w-[380px] justify-center rounded-[24px] border border-white/10 bg-white/5 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.26)] backdrop-blur sm:max-w-[560px] sm:rounded-[28px] sm:p-3">
              <PassportCard mode={mode} />
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="mt-6 grid w-full max-w-5xl gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          >
            {[
              ["Private by default", "A verifier gets the signal, not the wallet."],
              ["Readable trust", "Your work history becomes instantly legible."],
              ["Selective proof", "Only the relevant context is shared."],
            ].map(([title, copy]) => (
              <Card key={title} tone="dark" interactive={false} className="h-full p-5 sm:p-6">
                <div className="mb-4 h-2.5 w-14 rounded-full bg-[var(--primary)]/70" />
                <h3 className="text-[20px] font-extrabold tracking-[-0.04em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-white/60">{copy}</p>
              </Card>
            ))}
          </motion.div>

          <p className="mt-5 px-4 text-center font-mono text-[12px] text-white/35 sm:text-[13px]">
            ← tap toggle to switch between exposure modes →
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-12 sm:px-8 sm:py-16 md:py-24 lg:px-12 lg:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>03 — Use Cases</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            Real workflows.
            <br />
            Private proof.
          </h2>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-7xl gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Protocol Hiring", "Prove experience without exposing your wallet.", "white"],
            ["Builder Grants", "Show contribution history privately.", "purple"],
            ["Community Access", "Unlock opportunities through verified reputation.", "dark"],
          ].map(([title, copy, tone], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
              <Card tone={tone as "white" | "purple" | "dark"} className="h-full p-5 sm:p-7">
                <div className="inline-flex rounded-full border border-current/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-[26px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[30px]">
                  {title}
                </h3>
                <p
                  className={cx(
                    "mt-4 text-[14px] leading-[1.7]",
                    tone === "white" ? "text-[var(--muted)]" : "text-white/75",
                  )}
                >
                  {copy}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--bg2)] px-5 py-12 sm:px-8 sm:py-16 md:py-24 lg:px-12 lg:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>04 — What Flekvar Is</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            A new category
            <br />
            for Web3.
          </h2>
          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
            Flekvar is a private work credential. Not a profile. Not a credit score. Not a
            reputation leaderboard. A verifiable professional identity layer for Web3.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-7xl gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Work Credential",
            "Private by Default",
            "Portable Across Communities",
            "Verifiable Contribution",
          ].map((title, index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
              <Card tone={index % 2 === 0 ? "white" : "purple"} className="h-full p-5 sm:p-6">
                <div className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-current/25 text-[14px] font-bold">
                  ✓
                </div>
                <h3 className="text-[22px] font-extrabold leading-[1.1] tracking-[-0.04em] sm:text-[24px]">
                  {title}
                </h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-12 sm:px-8 sm:py-16 md:py-24 lg:px-12 lg:py-28">
        <motion.div
          {...fadeUp}
          className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
        >
          <div>
            <SectionTag>05 — What Flekvar Is Not</SectionTag>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
              Clear category.
              <br />
              No confusion.
            </h2>
          </div>

          <Card tone="white" interactive={false} className="p-6 sm:p-7">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  Not
                </div>
                <div className="space-y-3">
                  {[
                    "Credit Score",
                    "Lending Product",
                    "KYC Tool",
                    "Public Reputation Leaderboard",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[15px] font-medium text-[var(--ink)]"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--red)] text-[var(--red)]">
                        ✕
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  Instead
                </div>
                <div className="space-y-3">
                  {[
                    "Private Professional Identity",
                    "Portable Work Credential",
                    "Verifiable Reputation Layer",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[15px] font-medium text-[var(--ink)]"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)]">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-12 sm:px-8 sm:py-16 md:py-24 lg:px-12 lg:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag dark>06 — Building In Public</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Building in public.
          </h2>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-white/50 sm:text-[17px]">
            Every sprint. Every milestone. Every update.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-7xl sm:mt-16">
          <div className="relative hidden h-px bg-white/10 md:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute left-0 top-0 h-px bg-[var(--primary)]"
            />
          </div>
          <div className="relative mt-0 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
            <div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/10 md:hidden" />
            {[
              ["Research", "✓", "Complete", "100%"],
              ["Prototype", "✓", "Live", "78%"],
              ["Closed Alpha", "⚡", "Now", "42%"],
              ["Public Beta", "○", "Next", "16%"],
            ].map(([phase, icon, status, percent], index) => (
              <motion.div
                key={phase}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.05 }}
                className="relative pl-10 md:pl-0"
              >
                <span className="absolute left-0 top-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[var(--ink)] text-[16px] text-[var(--primary)] md:hidden">
                  {icon}
                </span>
                <Card tone="dark" className="h-full p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-[18px] text-[var(--primary)]">
                      {icon}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--primary)]">
                      {percent}
                    </span>
                  </div>
                  <h3 className="text-[26px] font-extrabold tracking-[-0.04em] text-white sm:text-[30px]">
                    {phase}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-white/55">
                    {phase === "Research" &&
                      "Foundational thinking, trust primitives, and system framing are locked in."}
                    {phase === "Prototype" &&
                      "The core interaction is live and the product surface is becoming tangible."}
                    {phase === "Closed Alpha" &&
                      "A tighter user loop is next, with early testers shaping the credential flow."}
                    {phase === "Public Beta" &&
                      "The broader launch opens once the proof surface feels effortless and clear."}
                  </p>
                  <div className="mt-8 h-3 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: percent }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                      className="h-full rounded-full bg-[var(--primary)]"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[13px] text-white/48">
                    <span>{phase === "Closed Alpha" ? "Active milestone" : "Progress"}</span>
                    <span className="font-mono">{percent}</span>
                  </div>
                  <div className="mt-8 rounded-[20px] border border-white/10 bg-white/6 p-4">
                    <div className="mb-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-white/35">
                      <span>Milestone</span>
                      <span>{phase === "Closed Alpha" ? "Activity" : "Status"}</span>
                    </div>
                    <div className="grid gap-2">
                      <div className="h-3 rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.7, delay: 0.1 + index * 0.05 }}
                          className="h-full rounded-full bg-white/25"
                        />
                      </div>
                      <div className="h-3 w-[72%] rounded-full bg-white/10" />
                      <div className="h-3 w-[46%] rounded-full bg-white/10" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-12 sm:px-8 sm:py-16 md:py-24 lg:px-12 lg:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>07 — FAQ</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            Questions,
            <br />
            answered simply.
          </h2>
        </motion.div>

        <div className="mx-auto mt-8 max-w-5xl space-y-3 sm:mt-12 sm:space-y-4">
          {[
            [
              "What is Flekvar?",
              "Flekvar is a private professional identity layer for Web3. It helps you prove your track record without exposing your wallet.",
            ],
            [
              "Does Flekvar expose my wallet?",
              "No. The point of Flekvar is to separate your professional identity from your financial history.",
            ],
            [
              "Is this a public profile?",
              "No. Flekvar is not a public social profile or leaderboard. It is a selective credential layer.",
            ],
            [
              "Who is Flekvar for?",
              "Builders, researchers, contributors, communities, and protocols that need better ways to verify work history.",
            ],
            [
              "When can I get access?",
              "Early access is opening in phases. Join the waitlist to be part of the first onboarding group.",
            ],
          ].map(([question, answer], index) => (
            <motion.div
              key={question}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
            >
              <Card tone="white" interactive={false} className="overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="text-[18px] font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-[22px]">
                    {question}
                  </span>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--ink)] text-[20px] font-light text-[var(--primary)]">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-black/10 px-5 py-5 text-[15px] leading-[1.7] text-[var(--muted)] sm:px-7 sm:py-6">
                    {answer}
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="waitlist"
        className="bg-[var(--background)] px-5 pb-16 pt-4 scroll-mt-28 sm:px-8 sm:pb-20 sm:scroll-mt-32 lg:px-12"
      >
        <motion.div
          {...fadeUp}
          ref={ctaRef}
          onMouseMove={(event) => {
            if (reduceMotion) return;
            const bounds = ctaRef.current?.getBoundingClientRect();
            if (!bounds) return;
            setPointer({
              x: ((event.clientX - bounds.left) / bounds.width) * 100,
              y: ((event.clientY - bounds.top) / bounds.height) * 100,
            });
          }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[24px] border-[1.5px] border-[var(--ink)] bg-[var(--ink)] p-5 shadow-[5px_5px_0px_var(--ink)] sm:p-10 md:p-12 lg:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(139,92,246,0.24), transparent 28%)`,
            }}
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0], x: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[8%] top-[16%] h-2 w-2 rounded-full bg-[var(--primary)]/60"
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 12, 0], x: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-[18%] right-[12%] h-2.5 w-2.5 rounded-full bg-[var(--primary)]/45"
          />
          <div className="absolute right-[30px] top-1/2 hidden -translate-y-1/2 xl:block">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-32 w-32 rounded-full border border-[var(--primary)]/35 2xl:h-40 2xl:w-40"
            />
          </div>

          <div className="relative max-w-[520px]">
            <SectionTag dark>08 — Final CTA</SectionTag>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--primary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
              Founding Member
            </div>
            <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
              Become an early
              <br />
              Flekvar user.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-white/60 sm:text-[16px]">
              Join the first builders helping shape private professional identity for Web3. Limited
              onboarding. Early access only.
            </p>
            <WaitlistForm
              tone="dark"
              buttonLabel="Reserve My Spot"
              className="mt-8 max-w-[520px]"
            />
            <WaitlistCounter tone="dark" className="mt-4" />
          </div>
        </motion.div>
      </section>

      <footer className="bg-[var(--ink)] px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center gap-10 text-center md:mb-12 md:flex-row md:items-start md:justify-between md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-3 text-[24px] font-extrabold tracking-[-0.04em] text-white">
                Flekvar
              </div>
              <p className="max-w-[260px] text-[14px] leading-[1.6] text-white/40">
                Privacy-first reputation and identity infrastructure for the next generation of
                onchain users.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
              {[
                { label: "Twitter/X", value: "@Flekvarhq", href: "https://x.com/Flekvarhq" },
                {
                  label: "Email",
                  value: "work.flekvar@gmail.com",
                  href: "mailto:work.flekvar@gmail.com",
                },
                { label: "GitHub", value: "Coming Soon" },
                { label: "Docs", value: "Coming Soon" },
                { label: "Privacy", value: "Coming Soon" },
              ].map((item) => (
                <div key={item.label} className="text-center md:text-left">
                  <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white/38 md:mb-4">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-all text-[14px] text-white/70 transition-colors hover:text-[var(--primary)]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[14px] text-white/45">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-[13px] text-white/35">Flekvar © 2026</p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-end">
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
        </div>
      </footer>
    </main>
  );
}
