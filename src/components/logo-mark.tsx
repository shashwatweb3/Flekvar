import type { ReactNode } from "react";
import logoSvg from "@/assets/flekvar-logo.svg?url";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function FlekvarGlyph({
  className,
  alt = "Flekvar logo",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={logoSvg}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}

function LogoIcon({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center overflow-hidden rounded-[10px]",
        tone === "light" ? "bg-[var(--ink)]" : "bg-transparent",
        className,
      )}
    >
      <FlekvarGlyph className="h-full w-full object-contain" />
    </span>
  );
}

export function LogoMark({
  tone = "light",
  className,
  label = "Flekvar",
}: {
  tone?: "light" | "dark";
  className?: string;
  label?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex items-center gap-3 text-[22px] font-extrabold tracking-[-0.04em]",
        tone === "light" ? "text-[var(--ink)]" : "text-white",
        className,
      )}
    >
      <LogoIcon
        tone={tone}
        className={cx(
          "h-7 w-7 shrink-0 sm:h-8 sm:w-8",
          tone === "dark" && "sm:h-9 sm:w-9",
        )}
      />
      <span>{label}</span>
    </div>
  );
}
