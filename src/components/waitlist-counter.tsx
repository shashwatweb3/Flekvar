import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MascotImage } from "@/components/mascot-image";
import { cn } from "@/lib/utils";
import { useWaitlistCount } from "@/hooks/useWaitlist";

type WaitlistCounterProps = {
  tone?: "light" | "dark";
  className?: string;
  variant?: "inline" | "hero";
};

function HeroWaitlistCard({
  countText,
  className,
}: {
  countText: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group relative overflow-visible rounded-[24px] border-[1.5px] border-[var(--ink)] bg-white px-5 pb-5 pt-14 text-[var(--ink)] shadow-[5px_5px_0px_var(--ink)] sm:rounded-[28px] sm:px-8 sm:pb-8 sm:pt-20 lg:px-10 lg:pb-10 lg:pt-24",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[42%] sm:-translate-y-[46%]">
        <MascotImage
          name="victoryJump"
          loading="eager"
          className="h-20 w-auto sm:h-28 lg:h-32"
        />
      </div>
      <span className="absolute left-6 top-7 h-2.5 w-2.5 rounded-full border border-[var(--ink)] bg-[var(--ink)] sm:left-8 sm:top-8" />
      <span className="absolute left-12 top-12 h-1.5 w-1.5 rounded-full bg-black/60 sm:left-16 sm:top-14" />
      <span className="absolute right-8 top-8 h-2 w-2 rounded-full border border-[var(--ink)] sm:right-10 sm:top-10" />
      <span className="absolute right-14 top-16 h-1.5 w-1.5 rounded-full bg-black/55 sm:right-20 sm:top-20" />
      <span className="absolute right-7 top-20 h-2 w-2 rounded-full bg-[var(--ink)] sm:right-12 sm:top-28" />

      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-[var(--ink)]" />
          LIVE
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-black/10 px-4 py-4 sm:mt-6 sm:px-5 sm:py-6">
        <div className="text-center">
          <div className="text-[60px] font-extrabold leading-[0.9] tracking-[-0.08em] sm:text-[88px] lg:text-[108px]">
            {countText}
          </div>
          <div className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink)] sm:mt-4 sm:text-[12px] sm:tracking-[0.2em]">
            BUILDERS ON THE WAITLIST
          </div>
          <div className="mt-2 text-[13px] leading-[1.55] text-[var(--muted)] sm:mt-3 sm:text-[15px] sm:leading-[1.7]">
            Early builders are joining Flekvar.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WaitlistCounter({
  tone = "light",
  className,
  variant = "inline",
}: WaitlistCounterProps) {
  const [mounted, setMounted] = useState(false);
  const { data, isLoading, isError } = useWaitlistCount();
  const [displayCount, setDisplayCount] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof data !== "number") {
      return;
    }

    const from = previousValueRef.current;
    const to = data;
    const startedAt = performance.now();
    const duration = 900;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const nextValue = Math.round(from + (to - from) * eased);

      setDisplayCount(nextValue);

      if (elapsed < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        previousValueRef.current = to;
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [data]);

  const isHero = variant === "hero";

  if (!mounted || isLoading) {
    if (isHero) {
      return <HeroWaitlistCard countText="..." className={className} />;
    }

    return (
      <div
        className={cn(
          "font-mono text-[12px] uppercase tracking-[0.18em]",
          tone === "dark" ? "text-white/45" : "text-[var(--muted)]",
          className,
        )}
      >
        Loading waitlist…
      </div>
    );
  }

  if (isError) {
    if (isHero) {
      return <HeroWaitlistCard countText="--" className={className} />;
    }

    return (
      <div
        className={cn(
          "font-mono text-[12px] uppercase tracking-[0.18em]",
          tone === "dark" ? "text-white/45" : "text-[var(--muted)]",
          className,
        )}
      >
        Waitlist count unavailable
      </div>
    );
  }

  if (isHero) {
    return <HeroWaitlistCard countText={displayCount.toLocaleString()} className={className} />;
  }

  return (
    <motion.div
      key={displayCount}
      initial={{ opacity: 0.75, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "font-mono text-[12px] uppercase tracking-[0.18em]",
        tone === "dark" ? "text-white/55" : "text-[var(--muted)]",
        className,
      )}
    >
      {displayCount.toLocaleString()} builders on the waitlist
    </motion.div>
  );
}
