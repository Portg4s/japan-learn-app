import { useMemo, type CSSProperties } from "react";

// Deterministic pseudo-random generator (mulberry32) — pure, so petals stay
// stable across re-renders and lint's purity rule is satisfied.
function createRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SakuraPetalsProps {
  count?: number;
  className?: string;
}

function Petal({ size, color }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2 C15 5 18 6 18 10 C18 14.5 14.5 18 12 21 C9.5 18 6 14.5 6 10 C6 6 9 5 12 2 Z"
        fill={color ?? "#ffb7c5"}
        opacity="0.9"
      />
      <path
        d="M12 2 C15 5 18 6 18 10 C18 14.5 14.5 18 12 21"
        fill="none"
        stroke="#f797ac"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * Gentle falling sakura petals drifting across the background.
 */
export default function SakuraPetals({ count = 14, className }: SakuraPetalsProps) {
  const petals = useMemo(() => {
    const rand = createRandom(42 + count);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: 10 + rand() * 14,
      delay: -rand() * 12,
      duration: 9 + rand() * 8,
      sway: 20 + rand() * 50,
      opacity: 0.35 + rand() * 0.4,
    }));
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="sakura-petal"
          style={
            {
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
              "--sway": `${p.sway}px`,
            } as CSSProperties
          }
        >
          <Petal size={p.size} />
        </span>
      ))}
    </div>
  );
}

/**
 * A celebratory burst of petals exploding from the center.
 */
export function SakuraBurst({ count = 16, className }: { count?: number; className?: string }) {
  const particles = useMemo(() => {
    const rand = createRandom(7);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + rand() * 0.5;
      const dist = 90 + rand() * 130;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 40,
        rotate: rand() * 720 - 360,
        size: 12 + rand() * 12,
        delay: rand() * 0.35,
        duration: 1.1 + rand() * 0.9,
      };
    });
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="burst-particle"
          style={
            {
              "--bx": `${p.x}px`,
              "--by": `${p.y}px`,
              "--br": `${p.rotate}deg`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as CSSProperties
          }
        >
          <Petal size={p.size} />
        </span>
      ))}
    </div>
  );
}
