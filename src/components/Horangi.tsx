import { cn } from "@/lib/utils";

export type HorangiMood = "wave" | "happy" | "sad" | "celebrate";

interface HorangiProps {
  mood?: HorangiMood;
  className?: string;
  onClick?: () => void;
}

/**
 * Horangi (호랑이) — the Korean tiger, our mascot for the Korean course.
 * Drawn as a cute SVG tiger with mood-dependent expressions.
 * The tiger is Korea's national animal, appearing in the Dangun foundation myth
 * and famously as Hodori (1988 Olympics) and Soohorang (2018 Olympics).
 */
export default function Horangi({ mood = "wave", className, onClick }: HorangiProps) {
  const isWaving = mood === "wave" || mood === "celebrate";
  const blush = mood === "happy" || mood === "celebrate";

  return (
    <svg
      viewBox="0 0 220 220"
      className={cn("select-none", className)}
      role="img"
      aria-label="Horangi, le tigre porte-bonheur coréen"
      onClick={onClick}
    >
      <defs>
        <linearGradient id="ho-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8f0" />
          <stop offset="100%" stopColor="#f5e4c8" />
        </linearGradient>
        <linearGradient id="ho-ear-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd5d5" />
          <stop offset="100%" stopColor="#f5b5b5" />
        </linearGradient>
        <linearGradient id="ho-stripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4895a" />
          <stop offset="100%" stopColor="#b87040" />
        </linearGradient>
        <radialGradient id="ho-blush" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f7a9a0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f7a9a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="110" cy="202" rx="62" ry="9" fill="#000" opacity="0.08" />

      {/* tail */}
      <path
        d="M56 182 Q24 174 28 148 Q32 128 56 134 Q70 138 62 158"
        fill="url(#ho-body)"
        stroke="#d4b896"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* tail stripes */}
      <g stroke="url(#ho-stripe)" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
        <line x1="38" y1="148" x2="46" y2="146" />
        <line x1="34" y1="158" x2="44" y2="156" />
        <line x1="33" y1="168" x2="44" y2="166" />
      </g>

      {/* body */}
      <path
        d="M62 200 Q58 138 110 132 Q162 138 158 200 Q150 208 110 208 Q70 208 62 200 Z"
        fill="url(#ho-body)"
        stroke="#d4b896"
        strokeWidth="2"
      />
      {/* belly patch */}
      <path
        d="M86 205 Q86 164 110 160 Q134 164 134 205 Q124 212 110 212 Q96 212 86 205 Z"
        fill="#fff"
        opacity="0.9"
      />

      {/* body stripes */}
      <g stroke="url(#ho-stripe)" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <line x1="64" y1="148" x2="76" y2="148" />
        <line x1="62" y1="158" x2="74" y2="158" />
        <line x1="62" y1="168" x2="76" y2="168" />
        <line x1="144" y1="148" x2="156" y2="148" />
        <line x1="146" y1="158" x2="158" y2="158" />
        <line x1="144" y1="168" x2="158" y2="168" />
      </g>

      {/* traditional Korean collar (dongjeong 동정 — white collar strip) */}
      <path
        d="M84 134 Q110 150 136 134 L136 145 Q110 162 84 145 Z"
        fill="#fff"
        stroke="#d4b896"
        strokeWidth="1.5"
        opacity="0.95"
      />
      {/* hanbok-style chest band (goreum 고름) */}
      <path
        d="M78 144 Q110 160 142 144"
        fill="none"
        stroke="#3b7dd8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="110" cy="156" r="8" fill="#f4c95d" stroke="#c99a2e" strokeWidth="1.5" />
      <line x1="110" y1="150" x2="110" y2="161" stroke="#c99a2e" strokeWidth="1.2" opacity="0.5" />
      <circle cx="110" cy="162" r="1.8" fill="#c99a2e" />

      {/* head */}
      <ellipse cx="110" cy="84" rx="52" ry="48" fill="url(#ho-body)" stroke="#d4b896" strokeWidth="2" />

      {/* forehead stripes (왕 - king character pattern) */}
      <g stroke="url(#ho-stripe)" strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <line x1="96" y1="48" x2="100" y2="56" />
        <line x1="110" y1="46" x2="110" y2="54" />
        <line x1="120" y1="48" x2="124" y2="56" />
      </g>

      {/* left ear */}
      <path d="M72 52 L58 10 Q78 18 92 40 Z" fill="url(#ho-body)" stroke="#d4b896" strokeWidth="2" />
      <path d="M72 47 L65 22 Q75 26 84 40 Z" fill="url(#ho-ear-inner)" />
      {/* right ear */}
      <path d="M148 52 L162 10 Q142 18 128 40 Z" fill="url(#ho-body)" stroke="#d4b896" strokeWidth="2" />
      <path d="M148 47 L155 22 Q145 26 136 40 Z" fill="url(#ho-ear-inner)" />

      {/* cheek fluff */}
      <g fill="url(#ho-body)" stroke="#d4b896" strokeWidth="1.5">
        <path d="M58 80 Q52 86 56 94 Q60 90 64 86 Z" />
        <path d="M162 80 Q168 86 164 94 Q160 90 156 86 Z" />
      </g>

      {/* resting paw */}
      <ellipse cx="88" cy="196" rx="15" ry="10" fill="url(#ho-body)" stroke="#d4b896" strokeWidth="1.5" />
      {/* paw pads */}
      <circle cx="82" cy="193" r="2" fill="#f0c8b0" />
      <circle cx="88" cy="191" r="2" fill="#f0c8b0" />
      <circle cx="94" cy="193" r="2" fill="#f0c8b0" />

      {/* raised beckoning paw */}
      <g className={isWaving ? "paw-wave" : undefined}>
        <path
          d="M140 128 Q168 116 176 94 L168 72 Q154 80 146 98 Q136 114 136 128 Z"
          fill="url(#ho-body)"
          stroke="#d4b896"
          strokeWidth="2"
        />
        <path
          d="M172 94 Q174 86 170 80"
          fill="none"
          stroke="#d4b896"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* raised paw pads */}
        <circle cx="160" cy="88" r="2" fill="#f0c8b0" />
        <circle cx="166" cy="84" r="2" fill="#f0c8b0" />
        <circle cx="172" cy="82" r="2" fill="#f0c8b0" />
      </g>

      {/* face */}
      {mood === "sad" ? (
        <g>
          <path d="M92 86 Q99 91 106 86" fill="none" stroke="#3a2f2a" strokeWidth="3" strokeLinecap="round" />
          <path d="M114 86 Q121 91 128 86" fill="none" stroke="#3a2f2a" strokeWidth="3" strokeLinecap="round" />
          <path d="M106 90 Q110 102 114 90 Q110 95 106 90 Z" fill="#9cc7ee" opacity="0.9" />
        </g>
      ) : mood === "happy" || mood === "celebrate" ? (
        <g>
          <path d="M90 84 Q98 76 106 84" fill="none" stroke="#3a2f2a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M114 84 Q122 76 130 84" fill="none" stroke="#3a2f2a" strokeWidth="3.5" strokeLinecap="round" />
          {mood === "celebrate" && (
            <g fill="#f4c95d">
              <path d="M68 54 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" />
              <path d="M152 64 l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5 z" />
            </g>
          )}
        </g>
      ) : (
        <g>
          <ellipse cx="98" cy="84" rx="6" ry="7" fill="#3a2f2a" />
          <ellipse cx="122" cy="84" rx="6" ry="7" fill="#3a2f2a" />
          <circle cx="101" cy="80" r="1.8" fill="#fff" />
          <circle cx="125" cy="80" r="1.8" fill="#fff" />
        </g>
      )}

      {/* blush */}
      {blush && (
        <>
          <circle cx="78" cy="98" r="9" fill="url(#ho-blush)" />
          <circle cx="142" cy="98" r="9" fill="url(#ho-blush)" />
        </>
      )}

      {/* nose */}
      <path d="M106 97 Q110 93 114 97 L110 103 Z" fill="#e5a090" />

      {/* mouth */}
      <path
        d="M101 106 Q106 112 110 106 Q114 112 119 106"
        fill="none"
        stroke="#3a2f2a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* whiskers */}
      <g stroke="#d4b896" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <line x1="66" y1="96" x2="48" y2="92" />
        <line x1="66" y1="104" x2="48" y2="104" />
        <line x1="66" y1="112" x2="48" y2="116" />
        <line x1="154" y1="96" x2="172" y2="92" />
        <line x1="154" y1="104" x2="172" y2="104" />
        <line x1="154" y1="112" x2="172" y2="116" />
      </g>

      {/* Korean coin (yeopjeon 엽전) near raised paw — traditional lucky charm */}
      <g transform="rotate(-10 196 138)">
        <ellipse cx="196" cy="138" rx="12" ry="8" fill="#f4c95d" stroke="#c99a2e" strokeWidth="2" />
        <rect x="190" y="133.5" width="12" height="2" rx="1" fill="#c99a2e" />
        <rect x="190" y="138.5" width="12" height="2" rx="1" fill="#c99a2e" />
      </g>
    </svg>
  );
}
