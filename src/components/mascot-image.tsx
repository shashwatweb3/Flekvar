import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MASCOT_URLS = {
  frontView: "https://assets.masko.ai/0fef9b/mascot-be83/front-view-0c348481.png",
  sideProfile: "https://assets.masko.ai/0fef9b/mascot-be83/side-profile-45d20f99.png",
  backView: "https://assets.masko.ai/0fef9b/mascot-be83/back-view-68ef5dfa.png",
  doubleThumbsUp: "https://assets.masko.ai/0fef9b/mascot-be83/double-thumbs-up-36405b3b.png",
  victoryJump: "https://assets.masko.ai/0fef9b/mascot-be83/victory-jump-92cada4e.png",
  curiousShrug: "https://assets.masko.ai/0fef9b/mascot-be83/curious-shrug-9a79b5cb.png",
  focusedReading: "https://assets.masko.ai/0fef9b/mascot-be83/focused-reading-619e7e0f.png",
  bubbleGumPop: "https://assets.masko.ai/0fef9b/mascot-be83/bubble-gum-pop-5a905574.png",
  techSavvy: "https://assets.masko.ai/0fef9b/mascot-be83/tech-savvy-1b07b1cc.png",
} as const;

export type MascotName = keyof typeof MASCOT_URLS;

type MascotImageProps = {
  name: MascotName;
  className?: string;
  tone?: "light" | "dark";
  motionStyle?: "float" | "tilt" | "none";
  loading?: "lazy" | "eager";
  delay?: number;
};

export function MascotImage({
  name,
  className,
  tone = "light",
  motionStyle = "float",
  loading = "lazy",
  delay = 0,
}: MascotImageProps) {
  const filter =
    tone === "dark"
      ? "grayscale(1) invert(1) contrast(1.02) brightness(1.04)"
      : "grayscale(1) contrast(1.08)";

  const animate =
    motionStyle === "none"
      ? { opacity: 1, y: 0, rotate: 0 }
      : motionStyle === "tilt"
        ? { opacity: 1, y: [0, -4, 0], rotate: [0, -1.5, 0] }
        : { opacity: 1, y: [0, -4, 0], rotate: [0, 1.25, 0] };

  const transition =
    motionStyle === "none"
      ? { opacity: { duration: 0.35, delay } }
      : {
          opacity: { duration: 0.35, delay },
          y: {
            duration: 4.8 + delay,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const,
          },
          rotate: {
            duration: 5.6 + delay,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const,
          },
        };

  return (
    <motion.img
      aria-hidden="true"
      src={MASCOT_URLS[name]}
      alt=""
      loading={loading}
      decoding="async"
      initial={{ opacity: 0, y: 8, rotate: 0 }}
      animate={animate}
      transition={transition}
      className={cn("pointer-events-none select-none object-contain", className)}
      style={{ filter }}
    />
  );
}
