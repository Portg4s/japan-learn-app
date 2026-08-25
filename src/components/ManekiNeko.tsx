import { cn } from "@/lib/utils";

export type NekoMood = "wave" | "happy" | "sad" | "celebrate";

interface ManekiNekoProps {
  mood?: NekoMood;
  className?: string;
  onClick?: () => void;
}

/**
 * Maneki-neko (招き猫) — the beckoning cat, our mascot.
 * Drawn as a single SVG with mood-dependent expressions.
 */
export default function ManekiNeko({ mood = "wave", className, onClick }: ManekiNekoProps) {
  const isWaving = mood === "wave" || mood === "celebrate";
  const blush = mood === "happy" || mood === "celebrate";

  return (
    <svg
      viewBox="0 0 220 220"
      className={cn("select-none", className)}
      role="img"
      aria-label="Maneki-neko, le chat porte-bonheur"
      onClick={onClick}
    >
      <defs>
        <linearGradient id="neko-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f5e9d7" />
        </linearGradient>
        <linearGradient id="neko-ear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbd9d4" />
          <stop offset="100%" stopColor="#f3b7ae" />
        </linearGradient>
        <radialGradient id="neko-blush" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f7a9a0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f7a9a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="110" cy="202" rx="62" ry="9" fill="#000" opacity="0.08" />

      {/* tail */}
      <path
        d="M52 180 Q20 176 24 152 Q27 132 50 136 Q66 138 60 160"
        fill="none"
        stroke="url(#neko-body)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* body */}
      <path
        d="M62 200 Q58 138 110 132 Q162 138 158 200 Q150 208 110 208 Q70 208 62 200 Z"
        fill="url(#neko-body)"
        stroke="#e5d5bd"
        strokeWidth="2"
      />
      {/* belly patch */}
      <path
        d="M86 205 Q86 164 110 160 Q134 164 134 205 Q124 212 110 212 Q96 212 86 205 Z"
        fill="#fff"
        opacity="0.9"
      />

      {/* collar */}
      <path
        d="M78 132 Q110 148 142 132 L142 146 Q110 162 78 146 Z"
        fill="#c73e3a"
      />
      <path
        d="M78 132 Q110 148 142 132"
        fill="none"
        stroke="#a8322e"
        strokeWidth="2"
      />

      {/* bell */}
      <circle cx="110" cy="150" r="9" fill="#f4c95d" stroke="#c99a2e" strokeWidth="2" />
      <line x1="110" y1="143" x2="110" y2="156" stroke="#c99a2e" strokeWidth="1.5" />
      <circle cx="110" cy="158" r="2" fill="#c99a2e" />

      {/* head */}
      <ellipse cx="110" cy="86" rx="52" ry="48" fill="url(#neko-body)" stroke="#e5d5bd" strokeWidth="2" />

      {/* left ear */}
      <path d="M72 56 L60 14 Q78 20 92 42 Z" fill="url(#neko-body)" stroke="#e5d5bd" strokeWidth="2" />
      <path d="M72 50 L65 24 Q76 28 84 42 Z" fill="url(#neko-ear)" />
      {/* right ear */}
      <path d="M148 56 L160 14 Q142 20 128 42 Z" fill="url(#neko-body)" stroke="#e5d5bd" strokeWidth="2" />
      <path d="M148 50 L155 24 Q144 28 136 42 Z" fill="url(#neko-ear)" />

      {/* resting paw */}
      <ellipse cx="88" cy="196" rx="15" ry="10" fill="url(#neko-body)" stroke="#e5d5bd" strokeWidth="1.5" />

      {/* raised beckoning paw (waves) */}
      <g className={isWaving ? "paw-wave" : undefined}>
        <path
          d="M140 130 Q168 118 176 96 L168 74 Q154 82 146 100 Q136 116 136 130 Z"
          fill="url(#neko-body)"
          stroke="#e5d5bd"
          strokeWidth="2"
        />
        <path
          d="M172 96 Q174 88 170 82"
          fill="none"
          stroke="#dcc7a8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* face */}
      {/* eyes by mood */}
      {mood === "sad" ? (
        <g>
          <path d="M92 88 Q99 93 106 88" fill="none" stroke="#4a3632" strokeWidth="3" strokeLinecap="round" />
          <path d="M114 88 Q121 93 128 88" fill="none" stroke="#4a3632" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M106 92 Q110 104 114 92 Q110 97 106 92 Z"
            fill="#9cc7ee"
            opacity="0.9"
          />
        </g>
      ) : mood === "happy" || mood === "celebrate" ? (
        <g>
          <path d="M90 86 Q98 78 106 86" fill="none" stroke="#4a3632" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M114 86 Q122 78 130 86" fill="none" stroke="#4a3632" strokeWidth="3.5" strokeLinecap="round" />
          {mood === "celebrate" && (
            <g fill="#f4c95d">
              <path d="M70 58 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" />
              <path d="M150 66 l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5 z" />
            </g>
          )}
        </g>
      ) : (
        <g>
          <ellipse cx="98" cy="86" rx="6" ry="7" fill="#4a3632" />
          <ellipse cx="122" cy="86" rx="6" ry="7" fill="#4a3632" />
          <circle cx="101" cy="82" r="1.8" fill="#fff" />
          <circle cx="125" cy="82" r="1.8" fill="#fff" />
        </g>
      )}

      {/* blush */}
      {blush && (
        <>
          <circle cx="78" cy="100" r="9" fill="url(#neko-blush)" />
          <circle cx="142" cy="100" r="9" fill="url(#neko-blush)" />
        </>
      )}

      {/* nose */}
      <path d="M106 99 Q110 95 114 99 L110 105 Z" fill="#e58e84" />

      {/* mouth */}
      <path
        d="M101 108 Q106 114 110 108 Q114 114 119 108"
        fill="none"
        stroke="#4a3632"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* whiskers */}
      <g stroke="#d9c3a5" strokeWidth="2" strokeLinecap="round">
        <line x1="70" y1="98" x2="52" y2="94" />
        <line x1="70" y1="106" x2="52" y2="106" />
        <line x1="70" y1="114" x2="52" y2="118" />
        <line x1="150" y1="98" x2="168" y2="94" />
        <line x1="150" y1="106" x2="168" y2="106" />
        <line x1="150" y1="114" x2="168" y2="118" />
      </g>

      {/* koban coin near raised paw */}
      <g transform="rotate(-12 196 140)">
        <ellipse cx="196" cy="140" rx="13" ry="9" fill="#f4c95d" stroke="#c99a2e" strokeWidth="2" />
        <rect x="189" y="135" width="14" height="2.5" rx="1.2" fill="#c99a2e" />
        <rect x="189" y="141" width="14" height="2.5" rx="1.2" fill="#c99a2e" />
      </g>
    </svg>
  );
}
