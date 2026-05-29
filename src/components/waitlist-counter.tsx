import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWaitlistCount } from "@/hooks/useWaitlist";

type WaitlistCounterProps = {
  tone?: "light" | "dark";
  className?: string;
};

export default function WaitlistCounter({
  tone = "light",
  className,
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

  if (!mounted || isLoading) {
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
