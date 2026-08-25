/**
 * Speak text using the Web Speech API with the best available native voice.
 * Supports Japanese (ja-JP) and Korean (ko-KR).
 * Falls back silently if speech synthesis is unavailable.
 */

/** Preferred premium voices by language — ranked best-first */
const PREFERRED_VOICES: Record<string, string[]> = {
  "ja-JP": [
    "Kyoko",     // macOS/iOS — premium Japanese female
    "Otoya",     // macOS/iOS — premium Japanese male
    "Hattori",   // macOS/iOS — Japanese
    "O-ren",     // macOS/iOS — Japanese
    "Google 日本語", // Chrome — Google Japanese
  ],
  "ko-KR": [
    "Yuna",      // macOS/iOS — premium Korean female
    "Narae",     // macOS/iOS — premium Korean
    "Google 한국어", // Chrome — Google Korean
  ],
};

let cachedVoices: SpeechSynthesisVoice[] | null = null;

function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  if (cachedVoices) return cachedVoices;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) cachedVoices = voices;
  return voices;
}

function findBestVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = getVoices();
  if (voices.length === 0) return null;

  // Try to find a preferred voice for this language
  const prefs = PREFERRED_VOICES[lang] ?? [];
  for (const pref of prefs) {
    const match = voices.find(
      (v) => v.lang.startsWith(lang.split("-")[0]) && v.name.includes(pref)
    );
    if (match) return match;
  }

  // Fallback: any voice matching the language prefix
  const langMatch = voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  return langMatch ?? null;
}

/**
 * Speak text in the given language. The lang should be a BCP 47 tag
 * like "ja-JP" or "ko-KR". Defaults to "ja-JP" for backward compatibility.
 */
export function speak(text: string, lang = "ja-JP"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  // Cancel any queued speech first
  synth.cancel();

  // Handle lazy voice loading (Chrome may return empty until voiceschanged)
  const voices = synth.getVoices();
  if (voices.length === 0) {
    // Wait for voices to load, then speak
    const onVoicesChanged = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      cachedVoices = synth.getVoices();
      speakNow(text, lang);
    };
    synth.addEventListener("voiceschanged", onVoicesChanged);
    // Safety timeout: speak with default voice after 2s
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakNow(text, lang);
    }, 2000);
    return;
  }

  cachedVoices = voices;
  speakNow(text, lang);
}

function speakNow(text: string, lang: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  // Adjust rate for each language (Korean can be slightly faster, Japanese needs slower)
  if (lang === "ko-KR") {
    utterance.rate = 0.8;
  } else {
    utterance.rate = 0.75;
  }
  utterance.pitch = 1;

  const voice = findBestVoice(lang);
  if (voice) {
    utterance.voice = voice;
  }

  synth.speak(utterance);
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
