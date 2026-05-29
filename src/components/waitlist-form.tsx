import { useEffect, useId, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type WaitlistModalState = "success" | "duplicate" | "error" | null;

const WAITLIST_MODAL_COPY: Record<
  Exclude<WaitlistModalState, null>,
  { title: string; body: string; button: string }
> = {
  success: {
    title: "🎉 You're on the Flekvar waitlist",
    body: "Thanks for joining.\nWe'll reach out before early access opens.",
    button: "Got it",
  },
  duplicate: {
    title: "You're already on the waitlist",
    body: "This email is already registered for Flekvar updates.",
    button: "Okay",
  },
  error: {
    title: "Something went wrong",
    body: "Please try again in a few moments.",
    button: "Close",
  },
};

export default function WaitlistForm({
  tone = "light",
  buttonLabel = "Join Waitlist",
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalState, setModalState] = useState<WaitlistModalState>(null);
  const waitlist = useWaitlist();
  const inputId = useId();

  useEffect(() => {
    if (!email && !message) {
      return;
    }

    if (message) {
      setMessage("");
    }
  }, [email, message]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("");

    try {
      await waitlist.mutateAsync(normalizedEmail);
      setEmail("");
      setModalState("success");
    } catch (error) {
      if (isDuplicateWaitlistError(error)) {
        setModalState("duplicate");
        return;
      }

      console.error("[waitlist-form] submit failed", error);
      setModalState("error");
    }
  }

  const isDark = tone === "dark";
  const buttonCopy = waitlist.isPending ? "Joining..." : buttonLabel;
  const modalCopy = modalState ? WAITLIST_MODAL_COPY[modalState] : null;

  return (
    <>
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
              isDark ? "text-white/70" : "text-[var(--muted)]",
            )}
          >
            {message}
          </div>
        </motion.div>
      </form>

      <Dialog open={modalState !== null} onOpenChange={(open) => !open && setModalState(null)}>
        <DialogContent className="[&>button]:hidden max-w-[calc(100vw-2rem)] rounded-[28px] border-[1.5px] border-[var(--ink)] bg-[var(--background)] p-6 text-center shadow-[5px_5px_0px_var(--ink)] sm:max-w-[480px] sm:p-8">
          {modalCopy ? (
            <>
              <DialogHeader className="items-center space-y-3 text-center">
                <DialogTitle className="text-[28px] font-extrabold tracking-[-0.04em] text-[var(--ink)] sm:text-[32px]">
                  {modalCopy.title}
                </DialogTitle>
                <DialogDescription className="max-w-[28rem] whitespace-pre-line text-[15px] leading-[1.7] text-[var(--muted)] sm:text-[16px]">
                  {modalCopy.body}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-2 sm:justify-center sm:space-x-0">
                <button
                  type="button"
                  onClick={() => setModalState(null)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--ink)] px-6 py-3 text-[15px] font-semibold text-[var(--primary)] transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--ink)_85%,transparent)] sm:w-auto sm:min-w-[140px]"
                >
                  {modalCopy.button}
                </button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
