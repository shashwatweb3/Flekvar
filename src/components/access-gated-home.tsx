import { motion } from "framer-motion";
import { useEffect, useId, useState, type FormEvent } from "react";
import Landing from "@/components/Landing";
import { LogoMark } from "@/components/logo-mark";

const ACCESS_SESSION_KEY = "flekvar-access-session";
const ACCESS_SESSION_VALUE = "granted";
const ACCESS_CODE_HASH =
  "0c73db59ec4c223a7b4c27df869883526f906bc9c5e0109c33540443a63e462d";

type GateState = "checking" | "locked" | "unlocked";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

async function sha256Hex(value: string) {
  const normalizedValue = value.trim();
  const encoded = new TextEncoder().encode(normalizedValue);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = Array.from(new Uint8Array(digest));

  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function GateFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-5 py-10 sm:px-8">
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_65%)]" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cx(
          "relative w-full max-w-[420px] rounded-[28px] border-[1.5px] border-[var(--ink)] bg-white p-6 shadow-[5px_5px_0px_var(--ink)] sm:p-8",
          className,
        )}
      >
        {children}
      </motion.div>
    </main>
  );
}

export default function AccessGatedHome() {
  const [gateState, setGateState] = useState<GateState>("checking");
  const [accessCode, setAccessCode] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const inputId = useId();

  useEffect(() => {
    try {
      const isUnlocked =
        window.sessionStorage.getItem(ACCESS_SESSION_KEY) === ACCESS_SESSION_VALUE;
      setGateState(isUnlocked ? "unlocked" : "locked");
    } catch {
      setGateState("locked");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    try {
      const hashedInput = await sha256Hex(accessCode);

      if (hashedInput === ACCESS_CODE_HASH) {
        window.sessionStorage.setItem(ACCESS_SESSION_KEY, ACCESS_SESSION_VALUE);
        setGateState("unlocked");
        setAccessCode("");
        return;
      }

      setMessage("Invalid access code.");
      setShakeCount((current) => current + 1);
    } catch {
      setMessage("Unable to verify access code.");
      setShakeCount((current) => current + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (gateState === "unlocked") {
    return <Landing />;
  }

  if (gateState === "checking") {
    return (
      <GateFrame className="flex min-h-[320px] flex-col items-center justify-center text-center">
        <LogoMark className="text-[26px]" />
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Checking access
        </p>
      </GateFrame>
    );
  }

  return (
    <GateFrame>
      <div className="flex flex-col items-center text-center">
        <LogoMark className="text-[26px]" />
        <div className="mt-7 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
          <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          Private Access
        </div>
        <h1 className="mt-5 text-[34px] font-extrabold tracking-[-0.05em] text-[var(--ink)] sm:text-[40px]">
          Private Access
        </h1>
        <p className="mt-3 max-w-[18rem] text-[15px] leading-[1.65] text-[var(--muted)]">
          Enter access code to continue.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        animate={
          shakeCount > 0
            ? { x: [0, -8, 8, -6, 6, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.32 }}
        className="mt-8"
      >
        <label htmlFor={inputId} className="sr-only">
          Access code
        </label>
        <input
          id={inputId}
          type="password"
          value={accessCode}
          onChange={(event) => setAccessCode(event.target.value)}
          placeholder="Access code"
          autoComplete="off"
          spellCheck={false}
          disabled={isSubmitting}
          className="min-h-12 w-full rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--background)] px-5 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-black/35 focus:border-[var(--primary)]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--primary)] px-5 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)] disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting ? "Unlocking..." : "Unlock Access"}
        </button>
        <div className="mt-3 text-center">
          <p className="text-[14px] leading-[1.6] text-[var(--muted)]">
            Don&apos;t have access yet? Join the public waitlist.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
            Open
          </div>
          <a
            href="https://waitlist.flekvar.xyz"
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border-[1.5px] border-[var(--ink)] bg-white px-5 py-3 text-[14px] font-semibold text-[var(--ink)] transition-all duration-200 hover:bg-[var(--background)]"
          >
            Join Public Waitlist
          </a>
        </div>
        <div
          aria-live="polite"
          className={cx(
            "overflow-hidden text-center text-[14px] leading-[1.6] text-[var(--muted)] transition-all duration-200",
            message ? "mt-3 max-h-12 opacity-100" : "mt-0 max-h-0 opacity-0",
          )}
        >
          {message}
        </div>
      </motion.form>
    </GateFrame>
  );
}
