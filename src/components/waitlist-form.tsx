import { useEffect, useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  isDuplicateWaitlistError,
  isValidEmail,
  normalizeEmail,
  useWaitlist,
} from "@/hooks/useWaitlist";
import { cn } from "@/lib/utils";

type WaitlistFormProps = {
  tone?: "light" | "dark";
  buttonLabel?: string;
  className?: string;
  showCounter?: boolean;
};

export default function WaitlistForm({
  tone = "light",
  buttonLabel = "Join Waitlist",
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error" | null>(null);
  const waitlist = useWaitlist();
  const inputId = useId();

  useEffect(() => {
    if (!email && messageTone === "success") {
      return;
    }

    if (messageTone) {
      setMessage("");
      setMessageTone(null);
    }
  }, [email, messageTone]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageTone("error");
      return;
    }

    try {
      await waitlist.mutateAsync(normalizedEmail);
      setEmail("");
      setMessage("✓ You're on the waitlist.");
      setMessageTone("success");
    } catch (error) {
      if (isDuplicateWaitlistError(error)) {
        setMessage("You're already on the waitlist.");
        setMessageTone("error");
        return;
      }

      console.error("[waitlist-form] submit failed", error);
      setMessage("Something went wrong. Please try again.");
      setMessageTone("error");
    }
  }

  const isDark = tone === "dark";
  const buttonCopy = waitlist.isPending
    ? "Joining..."
    : messageTone === "success"
      ? "You're In ✓"
      : buttonLabel;

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-[520px]", className)}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          disabled={waitlist.isPending}
          className={cn(
            "min-h-12 flex-1 rounded-full border-[1.5px] px-5 text-[15px] outline-none transition-colors placeholder:text-black/35",
            isDark
              ? "border-white/15 bg-white text-[var(--ink)]"
              : "border-[var(--ink)] bg-white text-[var(--ink)]",
          )}
        />
        <button
          type="submit"
          disabled={waitlist.isPending}
          className={cn(
            "inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] px-5 py-3 text-[14px] font-semibold transition-all duration-200 sm:px-8 sm:py-3.5 sm:text-[15px]",
            isDark
              ? "border-white/15 bg-[var(--primary)] text-white hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]"
              : "border-[var(--ink)] bg-[var(--ink)] text-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--ink)_85%,transparent)]",
            waitlist.isPending && "cursor-wait opacity-80",
            messageTone === "success" && "shadow-[0_0_0_3px_rgba(139,92,246,0.18)]",
          )}
        >
          {buttonCopy}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: message ? 1 : 0,
          height: message ? "auto" : 0,
          y: message ? 0 : -4,
        }}
        transition={{ duration: 0.22 }}
        className="overflow-hidden"
      >
        <div
          aria-live="polite"
          className={cn(
            "pt-3 text-[14px] leading-[1.6]",
            messageTone === "success"
              ? isDark
                ? "text-white"
                : "text-[var(--ink)]"
              : isDark
                ? "text-white/70"
                : "text-[var(--muted)]",
          )}
        >
          {message}
        </div>
      </motion.div>
    </form>
  );
}
