import { motion } from "framer-motion";
import { LogoMark } from "@/components/logo-mark";
import WaitlistCounter from "@/components/waitlist-counter";
import WaitlistForm from "@/components/waitlist-form";

export default function WaitlistStandalone() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-5 py-10 sm:px-8">
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_68%)]" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-[480px] rounded-[28px] border-[1.5px] border-[var(--ink)] bg-white p-6 shadow-[5px_5px_0px_var(--ink)] sm:p-8"
      >
        <div className="flex flex-col items-center text-center">
          <LogoMark className="text-[28px]" />
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
            Waitlist
          </div>
          <h1 className="mt-5 max-w-[18rem] text-[34px] font-extrabold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] sm:max-w-[22rem] sm:text-[40px]">
            Private professional identity for Web3.
          </h1>
          <p className="mt-4 max-w-[24rem] text-[15px] leading-[1.7] text-[var(--muted)]">
            Join the early access list for Flekvar and follow the build in public.
          </p>
        </div>

        <WaitlistForm className="mt-8 max-w-none" buttonLabel="Join Waitlist" />
        <WaitlistCounter className="mt-4 text-center" />

        <a
          href="https://x.com/Flekvarhq"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-transparent px-5 py-3 text-[14px] font-semibold text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-white"
        >
          Follow on X
        </a>

        <footer className="mt-8 border-t border-black/10 pt-5 text-center">
          <p className="text-[12px] font-mono uppercase tracking-[0.16em] text-[var(--muted)]">
            Flekvar © 2026
          </p>
        </footer>
      </motion.section>
    </main>
  );
}
