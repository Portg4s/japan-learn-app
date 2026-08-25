/**
 * Speech Recognition utility for pronunciation exercises.
 * Uses the Web Speech API's SpeechRecognition interface.
 *
 * Note: SpeechRecognition requires HTTPS or localhost and is available
 * on Chrome, Edge, Safari 14.1+, and most mobile browsers.
 */

// TypeScript doesn't include SpeechRecognition in its default lib
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionError) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export type RecognitionStatus = "idle" | "listening" | "error" | "result";

export interface RecognitionResult {
  transcript: string;
  confidence: number;
}

export interface MatchResult {
  spoken: string;
  expected: string;
  confidence: number;
  score: number;
  charMap: { char: string; expected: string; ok: boolean }[];
  pass: boolean;
}

let recognitionInstance: SpeechRecognition | null = null;

function getRecognition(): SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  const SR = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) return null;
  if (!recognitionInstance) {
    const instance = new SR();
    instance.continuous = false;
    instance.interimResults = false;
    instance.maxAlternatives = 1;
    recognitionInstance = instance;
  }
  return recognitionInstance;
}

export function isRecognitionSupported(): boolean {
  return getRecognition() !== null;
}

export function listenOnce(lang: string): Promise<RecognitionResult> {
  const rec = getRecognition();
  if (!rec) {
    return Promise.reject(
      new Error("Speech Recognition n'est pas supporte par ce navigateur.")
    );
  }

  rec.lang = lang;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      rec.stop();
      reject(new Error("Temps ecoule - essaie de parler plus fort ou plus pres du micro."));
    }, 8000);

    rec.onresult = (event) => {
      clearTimeout(timer);
      const result = event.results[0]?.[0];
      resolve({
        transcript: result?.transcript ?? "",
        confidence: result?.confidence ?? 0,
      });
    };

    rec.onerror = (event) => {
      clearTimeout(timer);
      const messages: Record<string, string> = {
        "not-allowed": "Acces au micro refuse. Autorise-le dans les parametres.",
        "no-speech": "Aucune parole detectee. Essaie encore !",
        "audio-capture": "Micro non trouve. Verifie tes peripheriques.",
        "network": "Erreur reseau - verifie ta connexion.",
        "aborted": "Annule.",
      };
      reject(
        new Error(messages[event.error] ?? `Erreur micro : ${event.error}`)
      );
    };

    rec.onend = () => {
      clearTimeout(timer);
    };

    try {
      rec.start();
    } catch (e) {
      clearTimeout(timer);
      reject(e);
    }
  });
}

export function compareText(spoken: string, expected: string): MatchResult {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[、。！？・「」『』（）［］]/g, "")
      .replace(/[.!,?;:'"()[\]]/g, "");

  const spokenClean = norm(spoken);
  const expectedClean = norm(expected);

  const charMap: { char: string; expected: string; ok: boolean }[] = [];
  const maxLen = Math.max(spokenClean.length, expectedClean.length);
  let matches = 0;

  for (let i = 0; i < maxLen; i++) {
    const s = spokenClean[i] ?? "";
    const e = expectedClean[i] ?? "";
    const ok = s.toLowerCase() === e.toLowerCase();
    if (ok) matches++;
    charMap.push({ char: s || ".", expected: e || ".", ok });
  }

  const score = maxLen > 0 ? matches / maxLen : 0;

  return {
    spoken: spokenClean,
    expected: expectedClean,
    confidence: 0,
    score,
    charMap,
    pass: score >= 0.6,
  };
}

export async function pronounceCheck(
  text: string,
  lang: string
): Promise<MatchResult> {
  const result = await listenOnce(lang);
  const match = compareText(result.transcript, text);
  match.confidence = result.confidence;
  return match;
}
