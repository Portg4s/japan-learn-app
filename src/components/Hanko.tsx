import { cn } from "@/lib/utils";

interface HankoProps {
  label?: string;
  className?: string;
  title?: string;
}

/**
 * Hanko (はんこ) — a traditional Japanese vermilion seal.
 * Used to stamp items as mastered.
 */
export default function Hanko({ label = "完", className, title }: HankoProps) {
  return (
    <span
      className={cn("hanko", className)}
      title={title ?? "Maîtrisé"}
      aria-label={title ?? "Maîtrisé"}
    >
      {label}
    </span>
  );
}
