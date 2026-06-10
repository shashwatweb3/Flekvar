import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LogoMark } from "@/components/logo-mark";
import { MascotImage } from "@/components/mascot-image";
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

const WITHOUT_FLEKVAR_ROWS = [
  ["Wallet address", "0x84f1...dA8b"],
  ["Balances", "Visible"],
  ["Transaction History", "Visible"],
  ["Protocol Activity", "Visible"],
  ["Counterparties", "Visible"],
] as const;

const WITH_FLEKVAR_ROWS = [
  ["Verified Contributor", "Active"],
  ["Builder Since", "2021"],
  ["Projects Shipped", "14"],
  ["Ecosystems", "Ethereum"],
  ["Years Active", "4"],
  ["Repeat Clients", "6"],
  ["Credential Grade", "A"],
  ["Status", "Verified"],
] as const;

const PASSPORT_META_ROWS = [
  ["Projects Shipped", "14"],
  ["Ecosystems", "Ethereum"],
  ["Years Active", "4"],
  ["Repeat Clients", "6"],
  ["Credential Grade", "A"],
  ["Status", "Verified"],
] as const;

const FLEKVAR_FLOW = [
  ["Raw History", "Public activity creates the contribution trail a wallet leaves behind."],
  ["Verification Layer", "Flekvar checks the relevant signals and turns them into readable proof."],
  ["Portable Credential", "Builders get a credential they can carry into jobs, grants, and communities."],
] as const;

const WHO_ITS_FOR_CARDS = [
  ["Builders", "Prove what you've built without exposing your wallet."],
  ["Contributors", "Carry reputation across ecosystems."],
  ["Grant Applicants", "Show track record instantly."],
] as const;

function PassportCard({ mode }: { mode: "raw" | "zk" }) {
  const raw = mode === "raw";
  const detailRows = [
    ["Wallet", "0x84f1...dA8b"],
    ["Balance", "Visible"],
    ["Transactions", "Visible"],
    ["Counterparties", "Visible"],
    ["Protocols", "Visible"],
    ["History", "Visible"],
  ] as const;

  return (
    <div className="h-[470px] w-full max-w-[340px] overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:h-[500px] sm:max-w-[360px] lg:h-[520px] lg:max-w-[380px]">
      <motion.div
        key={mode}
        initial={{ opacity: 0.55, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
        className={cx(
          "flex h-full flex-col",
          raw
            ? "bg-[linear-gradient(135deg,#2b1115_0%,#190c12_55%,#291118_100%)]"
            : "bg-[linear-gradient(135deg,#1a2744_0%,#0f1a38_60%,#162040_100%)]",
        )}
      >
        <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5">
          <div className="min-w-0">
            <div
              className={cx(
                "font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px]",
                raw ? "text-[#ffb3b3]" : "text-white/45",
              )}
            >
              {raw ? "RAW WALLET VIEW" : "FLEKVAR PASSPORT"}
            </div>
            <div className="mt-1.5 text-[24px] font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-[28px]">
              {raw ? "Everything exposed" : "Verified Privately"}
            </div>
            <div
              className={cx(
                "mt-1.5 text-[11px] font-semibold tracking-[0.12em] sm:text-[12px]",
                raw ? "text-[#ff8f8f]" : "text-[var(--primary)]",
              )}
            >
              {raw ? "Exposure mode" : "Verified contributor"}
            </div>
          </div>
          <div
            className={cx(
              "inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px]",
              raw
                ? "border-[#ff8f8f] bg-[#ffe7e7] text-[var(--red)]"
                : "border-[var(--primary)]/35 bg-[rgba(139,92,246,0.15)] text-[var(--primary)]",
            )}
          >
            {raw ? "Warning" : "Private Credential"}
          </div>
        </div>

        {raw ? (
          <div className="flex flex-1 px-4 pb-4 sm:px-5 sm:pb-5">
            <div className="flex h-full w-full flex-col rounded-[18px] border border-[#ffb8b8] bg-[#F8F7F2] px-4 py-4 sm:px-4.5 sm:py-4.5">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {detailRows.map(([label, value]) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px]">
                      {label}
                    </div>
                    <div className="mt-1.5 text-[13px] font-bold leading-[1.2] text-[var(--red)] sm:text-[14px]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#ff4444]/15 pt-4">
                <div>
                  <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px]">
                    Exposure Status
                  </div>
                  <div className="mt-1.5 max-w-[13rem] text-[12px] font-semibold leading-[1.35] text-[var(--red)] sm:text-[13px]">
                    Wallet, history, counterparties, and protocols remain visible.
                  </div>
                </div>
                <div className="inline-flex shrink-0 items-center rounded-full border border-[#ff8f8f] bg-[#fff0f0] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--red)] sm:text-[10px]">
                  Everything exposed
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 px-4 pb-4 sm:px-5 sm:pb-5">
            <div className="flex h-full w-full flex-col rounded-[18px] border border-black/10 bg-[#F8F7F2] px-4 py-4 sm:px-4.5 sm:py-4.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px]">
                    Credential
                  </div>
                  <div className="mt-1.5 max-w-[12rem] text-[12px] font-semibold leading-[1.35] text-[var(--ink)] sm:text-[13px]">
                    Portable proof for builders.
                  </div>
                </div>
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/35 bg-[var(--primary-glow)]">
                  <div className="h-5 w-5 rounded-full border-[1.5px] border-[var(--primary)]" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {PASSPORT_META_ROWS.map(([label, value]) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px]">
                      {label}
                    </div>
                    <div className="mt-1.5 text-[13px] font-bold leading-[1.2] text-[var(--ink)] sm:text-[14px]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between gap-3 border-t border-black/10 pt-4">
                <div>
                  <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px]">
                    Credential ID
                  </div>
                  <div className="mt-1.5 font-mono text-[12px] font-bold tracking-[0.12em] text-[var(--ink)] sm:text-[13px]">
                    FLKVR-2021-884
                  </div>
                  <div className="mt-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[10px]">
                    Verification seal
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="inline-flex items-center rounded-full border border-[var(--ink)] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--ink)] sm:text-[10px]">
                    Private Credential
                  </div>
                  <div className="inline-flex items-center rounded-full border border-[var(--primary)]/35 bg-[var(--primary-glow)] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--primary)] sm:text-[10px]">
                    Verified Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDemoMode, setActiveDemoMode] = useState<"raw" | "zk">("zk");
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

  function scrollToSection(id: "vision" | "demo" | "waitlist") {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function switchDemoMode(nextMode: "raw" | "zk") {
    setActiveDemoMode(nextMode);
  }

  return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-3 transition-all duration-300 sm:px-6 md:py-4 lg:px-8">
        <div
          className={cx(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-300",
            scrolled || menuOpen
              ? "rounded-[22px] border border-black/10 bg-[rgba(242,241,236,0.92)] px-4 py-2.5 shadow-[0_10px_30px_rgba(13,13,13,0.08)] backdrop-blur-[14px] md:rounded-[28px] md:py-3"
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
            className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-white/70 text-[var(--ink)] backdrop-blur md:hidden"
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
          className="mx-auto mt-2 max-w-7xl md:hidden"
        >
          <div className="overflow-hidden rounded-[24px] border-[1.5px] border-[var(--ink)] bg-[rgba(242,241,236,0.97)] p-3 shadow-[5px_5px_0px_var(--ink)] backdrop-blur">
            <div className="flex flex-col gap-1.5">
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
                    setMenuOpen(false);
                    scrollToSection(href.slice(1) as "vision" | "demo" | "waitlist");
                  }}
                  className="rounded-[16px] px-4 py-2.5 text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-white"
                >
                  {label}
                </a>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => {
                setMenuOpen(false);
                scrollToSection("waitlist");
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </motion.div>
      </header>

      <section
        id="vision"
        className="relative overflow-hidden px-5 pb-8 pt-[96px] scroll-mt-24 sm:px-8 sm:pb-12 sm:pt-[116px] sm:scroll-mt-28 md:pt-[132px] lg:px-12 lg:pb-14"
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
        <div className="mx-auto grid max-w-7xl items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-10 xl:gap-12">
          <div className="mx-auto flex w-full max-w-[700px] flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-4 py-1.5 text-[12px] font-semibold text-white sm:text-[13px]"
            >
              Reputation infrastructure for Web3 builders
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06 }}
              className="mt-4 max-w-[720px] text-[42px] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--ink)] sm:mt-6 sm:text-[50px] sm:leading-[1.02] md:mt-8 md:text-[58px] lg:text-[76px] lg:leading-[0.96] xl:text-[88px]"
            >
              Your wallet became
              <br />
              your resume.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="mt-5 max-w-[620px] text-[17px] leading-[1.7] text-[var(--muted)] sm:text-[19px]"
            >
              Flekvar is reputation infrastructure for Web3 builders.
              <br />
              Your wallet became your resume.
              <br />
              Flekvar helps you prove your work without exposing your financial history.
            </motion.p>
          </div>
          <div className="mx-auto flex w-full items-center justify-center lg:max-w-none lg:justify-end">
            <div className="flex w-full max-w-[520px] items-center justify-center">
              <WaitlistCounter
                tone="light"
                variant="hero"
                className="w-full max-w-[336px] text-center sm:max-w-[430px] lg:max-w-[470px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl rounded-[24px] border-[1.5px] border-[var(--ink)] bg-white p-5 text-left shadow-[5px_5px_0px_var(--ink)] sm:p-6 lg:p-7"
        >
          <div className="space-y-2.5 text-[15px] leading-[1.7] text-[var(--ink)] sm:text-[16px]">
            <p>Want to prove you&apos;ve contributed to a protocol? Share your wallet.</p>
            <p>Want to show your onchain track record? Share your wallet.</p>
            <p>Want to demonstrate credibility? Share your wallet.</p>
            <p className="pt-2 text-[var(--muted)]">
              The problem is that a wallet doesn&apos;t just show your work.
            </p>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {[
              "Your balances",
              "Your transaction history",
              "Your activity across protocols",
              "Your network and counterparties",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[16px] border border-black/10 bg-[var(--bg)] px-4 py-3 text-[14px] font-semibold text-[var(--ink)]"
              >
                • {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[16px]">
            Imagine applying for a job and attaching your bank statement alongside your resume.
            Most people would never accept that. Yet we&apos;ve normalized it in Web3.
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[16px]">
            We think there&apos;s a better way. A future where you can prove what you&apos;ve
            built without revealing what you own. That&apos;s why we&apos;re building Flekvar.
          </p>
        </motion.div>
      </section>

      <section className="bg-[var(--background)] px-5 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl rounded-[22px] border-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-5 py-4 text-left text-white shadow-[5px_5px_0px_var(--ink)] sm:px-6 sm:py-5"
        >
          <p className="text-[24px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[30px]">
            Your work history should be portable.
            <br />
            Not your financial history.
          </p>
        </motion.div>
      </section>

      <section className="bg-[var(--background)] px-5 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <WaitlistForm tone="light" className="mx-auto max-w-[520px]" />
        </motion.div>
      </section>

      <section className="bg-[var(--background)] px-5 py-7 sm:px-8 sm:py-10 md:py-14 lg:px-12 lg:py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>The Problem</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            Why wallets fail
            <br />
            as reputation.
          </h2>
          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
            Wallets were built to show ownership. Reputation should show contribution. These are
            different signals, and Web3 still treats them like the same thing.
          </p>
        </motion.div>

        <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
          {[
            [
              "Wallets show ownership",
              ["Balances", "Assets", "Transaction history"],
              "white",
            ],
            [
              "Reputation shows contribution",
              ["Work", "Participation", "Track record"],
              "purple",
            ],
            [
              "These are not the same thing",
              ["Flekvar separates them."],
              "dark",
            ],
          ].map(([title, items, tone], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
              <Card tone={tone as "white" | "purple" | "dark"} className="h-full p-4 sm:p-5">
                <h3 className="text-[22px] font-extrabold leading-[1.06] tracking-[-0.04em] sm:text-[26px]">
                  {title}
                </h3>
                <div
                  className={cx(
                    "mt-5 space-y-2 text-[15px] leading-[1.6]",
                    tone === "white" ? "text-[var(--muted)]" : "text-white/72",
                  )}
                >
                  {(items as string[]).map((item) => (
                    <div key={item} className="rounded-[16px] border border-current/15 px-4 py-2.5">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-7xl text-center font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Ownership and contribution are different signals.
        </p>

        <div className="mx-auto mt-6 grid max-w-7xl grid-cols-2 items-stretch gap-2 sm:mt-8 sm:gap-3 lg:hidden">
          <motion.div {...fadeUp} className="min-w-0">
            <Card tone="white" className="relative h-full overflow-hidden">
              <div className="absolute right-1.5 top-8 z-10 sm:right-2.5 sm:top-10">
                <MascotImage
                  name="curiousShrug"
                  className="h-10 w-auto sm:h-12"
                  motionStyle="tilt"
                  delay={0.08}
                />
              </div>
              <div className="flex min-h-12 flex-wrap items-center gap-1.5 border-b border-t-[5px] border-[var(--ink)] border-t-[var(--red)] bg-[#FFF0F0] px-2 py-2 sm:min-h-14 sm:px-3 sm:py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                <h3 className="text-[9px] font-extrabold tracking-[-0.02em] text-[var(--ink)] sm:text-[10px]">
                  WITHOUT FLEKVAR
                </h3>
                <span className="rounded-full border border-[var(--red)] bg-[#FFE5E5] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-[var(--red)]">
                  Warning
                </span>
              </div>
              <div className="bg-white px-2 py-2 sm:px-3 sm:py-3">
                <p className="mb-2.5 max-w-[12rem] text-[8px] leading-[1.35] text-[var(--muted)] sm:mb-3 sm:text-[9px]">
                  Sharing proof exposes balances, history, and network context.
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  {WITHOUT_FLEKVAR_ROWS.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[10px] border border-[var(--ink)] bg-[var(--bg)] px-2 py-1.5 text-[8px] sm:rounded-[12px] sm:px-2.5 sm:py-2 sm:text-[9px]"
                    >
                      <div className="leading-[1.2] text-[var(--muted)]">{label}</div>
                      <div className="mt-1 break-all font-mono font-semibold leading-[1.15] text-[var(--red)]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 rounded-[10px] border border-[var(--red)]/40 bg-[#FFF4F4] px-2 py-1.5 text-[8px] font-semibold leading-[1.2] text-[var(--red)] sm:mt-3 sm:rounded-[12px] sm:px-2.5 sm:py-2 sm:text-[9px]">
                  Everything exposed.
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="min-w-0"
          >
            <Card
              tone="white"
              className="relative h-full overflow-hidden shadow-[0_0_0_1px_rgba(139,92,246,0.24),5px_5px_0px_var(--ink),0_18px_50px_rgba(139,92,246,0.14)]"
            >
              <div className="absolute right-1.5 top-8 z-10 sm:right-2.5 sm:top-10">
                <MascotImage
                  name="doubleThumbsUp"
                  className="h-10 w-auto sm:h-12"
                  motionStyle="tilt"
                  delay={0.14}
                />
              </div>
              <div className="flex min-h-12 flex-wrap items-center gap-1.5 border-b border-[var(--ink)] bg-[var(--primary)] px-2 py-2 sm:min-h-14 sm:px-3 sm:py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <h3 className="text-[9px] font-extrabold tracking-[-0.02em] text-white sm:text-[10px]">
                  WITH FLEKVAR
                </h3>
                <span className="rounded-full border border-[var(--ink)] bg-white px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]">
                  Verified
                </span>
              </div>
              <div className="bg-white px-2 py-2 sm:px-3 sm:py-3">
                <p className="mb-2.5 max-w-[12rem] text-[8px] leading-[1.35] text-[var(--muted)] sm:mb-3 sm:text-[9px]">
                  Share a private professional credential, not a financial footprint.
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  {WITH_FLEKVAR_ROWS.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[10px] border border-[var(--ink)] bg-[var(--bg)] px-2 py-1.5 text-[8px] sm:rounded-[12px] sm:px-2.5 sm:py-2 sm:text-[9px]"
                    >
                      <div className="leading-[1.2] text-[var(--muted)]">{label}</div>
                      <div className="mt-1 break-words font-mono font-bold leading-[1.15] text-[var(--primary)]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 rounded-[10px] border border-[var(--primary)]/40 bg-[var(--primary-glow)] px-2 py-1.5 text-[8px] font-semibold leading-[1.2] text-[var(--ink)] sm:mt-3 sm:rounded-[12px] sm:px-2.5 sm:py-2 sm:text-[9px]">
                  Only what matters is shared.
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="mx-auto mt-8 hidden max-w-6xl items-stretch gap-4 lg:grid lg:grid-cols-2 lg:gap-5 xl:gap-6">
          <motion.div {...fadeUp}>
            <Card tone="white" className="relative h-full overflow-hidden">
              <div className="absolute right-4 top-14 z-10 sm:right-6 sm:top-[58px]">
                <MascotImage
                  name="curiousShrug"
                  className="h-16 w-auto sm:h-20"
                  motionStyle="tilt"
                  delay={0.1}
                />
              </div>
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
                {WITHOUT_FLEKVAR_ROWS.map(([label, value]) => (
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
              className="relative h-full overflow-hidden shadow-[0_0_0_1px_rgba(139,92,246,0.24),5px_5px_0px_var(--ink),0_18px_50px_rgba(139,92,246,0.14)]"
            >
              <div className="absolute right-4 top-14 z-10 sm:right-6 sm:top-[58px]">
                <MascotImage
                  name="doubleThumbsUp"
                  className="h-16 w-auto sm:h-20"
                  motionStyle="tilt"
                  delay={0.18}
                />
              </div>
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
                {WITH_FLEKVAR_ROWS.map(([label, value]) => (
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
        className="bg-[var(--background)] px-5 py-7 scroll-mt-24 sm:px-8 sm:py-10 sm:scroll-mt-28 md:py-14 lg:px-12 lg:py-16"
      >
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>Live Credential Demo</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            What the credential
            <br />
            actually looks like.
          </h2>
          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
            A wallet exposes raw history. A Flekvar credential turns that history into something a
            verifier can actually understand.
          </p>
        </motion.div>

        <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center sm:mt-8">
          <div className="relative mb-4 w-full max-w-[900px] sm:mb-6">
            <div className="absolute right-3 top-[-38px] sm:right-4 sm:top-[-46px]">
              <MascotImage
                name="techSavvy"
                className="h-12 w-auto sm:h-14"
                motionStyle="float"
                delay={0.08}
              />
            </div>
            <div className="mx-auto mb-4 flex w-full max-w-[360px] items-center gap-1.5 rounded-full border border-black/10 bg-white p-1 sm:mb-5 sm:max-w-[420px] sm:gap-2 sm:p-1.5 lg:max-w-[460px]">
              {([
                ["raw", "Raw Wallet View"],
                ["zk", "Flekvar Credential"],
              ] as const).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => switchDemoMode(mode)}
                  className={cx(
                    "flex-1 rounded-full px-3 py-2 text-[12px] font-semibold transition-all sm:px-4 sm:text-[13px]",
                    activeDemoMode === mode
                      ? "bg-[var(--ink)] text-white"
                      : "bg-transparent text-[var(--muted)] hover:text-[var(--ink)]",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeDemoMode}
                  {...fadeUp}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60 && activeDemoMode === "raw") {
                      switchDemoMode("zk");
                    }
                    if (info.offset.x > 60 && activeDemoMode === "zk") {
                      switchDemoMode("raw");
                    }
                  }}
                  initial={{ opacity: 0, x: activeDemoMode === "raw" ? -28 : 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeDemoMode === "raw" ? 28 : -28 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="mx-auto flex justify-center rounded-[22px] border border-black/10 bg-[var(--bg2)] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:rounded-[28px] sm:p-3"
                >
                  <PassportCard mode={activeDemoMode} />
                </motion.div>
              </AnimatePresence>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span
                  className={cx(
                    "h-2.5 w-2.5 rounded-full transition-all",
                    activeDemoMode === "raw" ? "bg-[var(--ink)]" : "bg-black/20",
                  )}
                />
                <span
                  className={cx(
                    "h-2.5 w-2.5 rounded-full transition-all",
                    activeDemoMode === "zk" ? "bg-[var(--primary)]" : "bg-black/20",
                  )}
                />
              </div>
            </div>

            <motion.div
              {...fadeUp}
              className="mx-auto hidden w-full max-w-[820px] items-center justify-center gap-4 rounded-[24px] border border-black/10 bg-[var(--bg2)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.1)] md:flex lg:gap-5 lg:rounded-[28px] lg:p-4"
            >
              <motion.div
                animate={{
                  y: activeDemoMode === "raw" ? -6 : 0,
                  opacity: activeDemoMode === "zk" ? 0.78 : 1,
                  scale: activeDemoMode === "raw" ? 1.02 : 0.985,
                }}
                transition={{ duration: 0.25 }}
              >
                <PassportCard mode="raw" />
              </motion.div>
              <motion.div
                animate={{
                  y: activeDemoMode === "zk" ? -6 : 0,
                  opacity: activeDemoMode === "raw" ? 0.78 : 1,
                  scale: activeDemoMode === "zk" ? 1.02 : 0.985,
                }}
                transition={{ duration: 0.25 }}
              >
                <PassportCard mode="zk" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="mt-3 grid w-full max-w-5xl gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
          >
            {[
              ["Contribution preserved", "Track record becomes legible without exposing raw wallet history."],
              ["Verification portable", "The same credential can travel across jobs, grants, and communities."],
              ["Selective sharing", "Only relevant proof is shown to the person asking for it."],
            ].map(([title, copy]) => (
              <Card
                key={title}
                tone="white"
                interactive={false}
                className="h-full rounded-[20px] p-3.5 sm:rounded-[28px] sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[var(--primary-glow)] text-[14px] font-bold text-[var(--primary)]">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-[16px] font-extrabold tracking-[-0.04em] text-[var(--ink)] sm:text-[20px]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-[1.5] text-[var(--muted)] sm:mt-3 sm:text-[14px] sm:leading-[1.7]">
                      {copy}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          <p className="mt-3 px-4 text-center font-mono text-[12px] text-[var(--muted)] sm:mt-4 sm:text-[13px]">
            Compare what gets exposed versus what gets verified.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-7 sm:px-8 sm:py-10 md:py-14 lg:px-12 lg:py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>How Flekvar Works</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            How Flekvar Works
          </h2>
          <p className="mt-4 max-w-[720px] text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
            Turn raw history into portable reputation.
          </p>
        </motion.div>

        <p className="mx-auto mt-3 max-w-4xl text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[16px]">
          Flekvar transforms public contribution history into a credential builders can carry across opportunities.
        </p>

        <div className="mx-auto mt-5 hidden max-w-xl flex-col items-center lg:flex">
          {FLEKVAR_FLOW.map(([title, copy], index) => (
            <div key={title} className="flex w-full flex-col items-center">
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
                <Card
                  tone={index === 1 ? "purple" : "white"}
                  interactive={false}
                  className="w-[min(520px,100%)] p-6 text-center"
                >
                  <div
                    className={cx(
                      "font-mono text-[10px] uppercase tracking-[0.16em]",
                      index === 1 ? "text-white/58" : "text-[var(--muted)]",
                    )}
                  >
                    0{index + 1}
                  </div>
                  <h3 className="mt-2 text-[22px] font-extrabold leading-[1.08] tracking-[-0.04em]">
                    {title}
                  </h3>
                  <p
                    className={cx(
                      "mt-2.5 text-[14px] leading-[1.6]",
                      index === 1 ? "text-white/76" : "text-[var(--muted)]",
                    )}
                  >
                    {copy}
                  </p>
                </Card>
              </motion.div>
              {index < FLEKVAR_FLOW.length - 1 ? (
                <div className="py-2 font-mono text-[18px] text-[var(--primary)]">↓</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-xl space-y-3 lg:hidden">
          {FLEKVAR_FLOW.map(([title, copy], index) => (
            <div key={title}>
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
                <Card
                  tone={index === 1 ? "purple" : "white"}
                  interactive={false}
                  className="p-3.5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cx(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold",
                        index === 1
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-black/10 bg-[var(--bg2)] text-[var(--primary)]",
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-extrabold tracking-[-0.04em] text-[inherit]">
                        {title}
                      </h3>
                      <p
                        className={cx(
                          "mt-1.5 text-[13px] leading-[1.55]",
                          index === 1 ? "text-white/76" : "text-[var(--muted)]",
                        )}
                      >
                        {copy}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
              {index < FLEKVAR_FLOW.length - 1 ? (
                <div className="py-1 text-center font-mono text-[14px] text-[var(--primary)]">↓</div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-7 sm:px-8 sm:py-10 md:py-14 lg:px-12 lg:py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag dark>Why Trust It</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Verifiable reputation.
            <br />
            Private by default.
          </h2>
        </motion.div>

        <div className="mx-auto mt-5 grid max-w-7xl gap-3 sm:gap-4 lg:grid-cols-3">
          {[
            ["Verifiable Activity", "Built from real onchain contribution history."],
            ["Cryptographic Verification", "Claims must match underlying activity."],
            ["Selective Disclosure", "Only relevant proof gets shared."],
          ].map(([title, copy], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
            >
              <Card tone="dark" interactive={false} className="h-full p-4 sm:p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-[15px] text-[var(--primary)]">
                  ✓
                </div>
                <h3 className="mt-4 text-[22px] font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-[26px]">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-white/66 sm:text-[15px]">
                  {copy}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-7xl text-center font-mono text-[12px] uppercase tracking-[0.18em] text-white/40">
          Verification comes from transparency.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          Privacy comes from selective disclosure.
        </p>
      </section>

      <section className="bg-[var(--bg2)] px-5 py-7 sm:px-8 sm:py-10 md:py-14 lg:px-12 lg:py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>The Privacy Problem Is Real</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            The Privacy Problem
            <br />
            Is Real
          </h2>
        </motion.div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2">
          {[
            [
              "2,000+",
              "Wallet-related privacy leaks identified across Web3 applications and wallets.",
              "https://www.usenix.org/conference/usenixsecurity23/presentation/torres",
              "USENIX Security '23",
            ],
            [
              "1,325",
              "Websites detected users through wallet probing techniques.",
              "https://www.usenix.org/conference/usenixsecurity23/presentation/torres",
              "USENIX Security '23",
            ],
          ].map(([stat, copy, href, source], index) => (
            <motion.div
              key={stat}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
            >
              <Card tone={index === 0 ? "white" : "purple"} className="h-full p-5 sm:p-6">
                <div className="text-[48px] font-extrabold leading-[0.95] tracking-[-0.06em] sm:text-[58px]">
                  {stat}
                </div>
                <p
                  className={cx(
                    "mt-4 max-w-[28rem] text-[15px] leading-[1.7]",
                    index === 0 ? "text-[var(--muted)]" : "text-white/78",
                  )}
                >
                  {copy}
                </p>
                <div className={cx("mt-5 text-[12px]", index === 0 ? "text-[var(--ink)]/62" : "text-white/72")}>
                  <div className="font-mono uppercase tracking-[0.18em]">Source:</div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={cx(
                      "mt-1 inline-flex font-mono uppercase tracking-[0.14em]",
                      index === 0 ? "text-[var(--ink)]/70" : "text-white/80",
                    )}
                  >
                    {source}
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-7 sm:px-8 sm:py-10 md:py-14 lg:px-12 lg:py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>Who It&apos;s For</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            Built first for people
            <br />
            whose work is already public.
          </h2>
        </motion.div>

        <div className="mx-auto mt-5 hidden max-w-6xl gap-4 lg:grid lg:grid-cols-3">
          {WHO_ITS_FOR_CARDS.map(([title, copy], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
            >
              <Card tone={index === 0 ? "purple" : "white"} className="h-full p-4 sm:p-5">
                <h3 className="text-[22px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[24px]">
                  {title}
                </h3>
                <p
                  className={cx(
                    "mt-2.5 text-[14px] leading-[1.65] sm:text-[15px]",
                    index === 0 ? "text-white/78" : "text-[var(--muted)]",
                  )}
                >
                  {copy}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-5 grid max-w-2xl gap-3 min-[420px]:grid-cols-2 lg:hidden">
          {WHO_ITS_FOR_CARDS.map(([title, copy], index) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
              className={cx(index === 0 && "min-[420px]:col-span-2")}
            >
              <Card tone={index === 0 ? "purple" : "white"} className="h-full p-3.5">
                <h3 className="text-[18px] font-extrabold leading-[1.08] tracking-[-0.04em]">
                  {title}
                </h3>
                <p
                  className={cx(
                    "mt-2 text-[13px] leading-[1.55]",
                    index === 0 ? "text-white/76" : "text-[var(--muted)]",
                  )}
                >
                  {copy}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--background)] px-5 py-7 sm:px-8 sm:py-10 md:py-14 lg:px-12 lg:py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--ink)] sm:text-5xl md:text-6xl">
            Questions,
            <br />
            answered simply.
          </h2>
        </motion.div>

        <div className="mx-auto mt-6 max-w-4xl space-y-2.5 sm:mt-8 sm:space-y-3">
          {[
            [
              "What is Flekvar?",
              "Flekvar is reputation infrastructure for Web3 builders. It turns contribution history into portable proof without turning your wallet into your identity.",
            ],
            [
              "How does Flekvar work?",
              "Flekvar takes visible contribution history, verifies the relevant signals, and turns them into a credential that can be shared selectively.",
            ],
            [
              "Why would someone trust a Flekvar credential?",
              "Flekvar credentials are derived from verifiable contribution history and cryptographic verification. The proof can be checked without exposing the underlying wallet history.",
            ],
            [
              "Does Flekvar replace my wallet?",
              "No. Wallets remain the ownership layer. Flekvar acts as the reputation layer.",
            ],
            [
              "When can I get access?",
              "Early access is opening in phases. Waitlist members get first invitations, testing opportunities, and a chance to help shape the first credential experience.",
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
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-[17px] font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-[20px]">
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
                  <div className="border-t border-black/10 px-4 py-4 text-[14px] leading-[1.65] text-[var(--muted)] sm:px-6 sm:py-5 sm:text-[15px]">
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
        className="bg-[var(--background)] px-5 pb-8 pt-2 scroll-mt-24 sm:px-8 sm:pb-12 sm:scroll-mt-28 lg:px-12"
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
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[24px] border-[1.5px] border-[var(--ink)] bg-[var(--ink)] p-4 shadow-[5px_5px_0px_var(--ink)] sm:p-7 md:p-9 lg:p-10"
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
          <div className="absolute right-[24px] top-1/2 hidden -translate-y-1/2 xl:block">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-24 w-24 rounded-full border border-[var(--primary)]/35 2xl:h-32 2xl:w-32"
            />
          </div>

          <div className="relative max-w-[500px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--primary)]">
              <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
              Early Access
            </div>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
              Stop sharing your wallet
              <br />
              to prove your work.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-white/60 sm:text-[16px]">
              Join the first builders testing a better way to carry reputation across Web3.
            </p>
            <div className="mt-5 rounded-[20px] border border-white/10 bg-white/6 p-4 sm:p-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--primary)]">
                Why Join Early?
              </div>
              <div className="mt-4 grid gap-2 text-[14px] leading-[1.6] text-white/78 sm:text-[15px]">
                {[
                  "Closed alpha access",
                  "First credential issuance",
                  "Direct product feedback sessions",
                  "Priority onboarding",
                  "Early ecosystem access",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/8 text-[12px] text-[var(--primary)]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <WaitlistForm tone="dark" buttonLabel="Reserve My Spot" className="mt-6 max-w-[520px] sm:mt-7" />
            <WaitlistCounter tone="dark" className="mt-4" />
          </div>
        </motion.div>
      </section>

      <footer className="bg-[var(--ink)] px-5 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="md:hidden">
            <div className="flex flex-col items-center text-center">
              <LogoMark tone="dark" className="text-[22px]" />
              <p className="mt-2 max-w-[260px] text-[13px] leading-[1.55] text-white/42">
                Privacy-first reputation and identity infrastructure for the next generation of
                onchain users.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-center">
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
                <div key={item.label}>
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/38">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[13px] text-white/70 transition-colors hover:text-[var(--primary)]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[13px] text-white/45">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-white/10 pt-4">
              {["Privacy-first", "Portable reputation", "Built in public"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--primary)]/40 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.08em] text-[var(--primary)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="mb-6 flex flex-col items-center gap-5 text-center md:mb-8 md:flex-row md:items-start md:justify-between md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <LogoMark tone="dark" className="mb-3 text-[24px]" />
                <p className="max-w-[260px] text-[14px] leading-[1.6] text-white/40">
                  Privacy-first reputation and identity infrastructure for the next generation of
                  onchain users.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5 lg:gap-8">
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
                        className="text-[14px] text-white/70 transition-colors hover:text-[var(--primary)]"
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

            <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-5 text-center md:flex-row md:items-center md:justify-between md:pt-6 md:text-left">
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
        </div>
      </footer>
    </main>
  );
}
