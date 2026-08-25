import { useState, useEffect, useCallback } from "react";
import type { Kana } from "@/data/japanese";
import type { VocabWord } from "@/data/vocabulary";
import type { TravelPhrase } from "@/data/phrases";
import { useLanguage } from "@/contexts/language";

function getStorageKey(lang: string): string {
  return `${lang}-learn-progress`;
}

export interface KanaProgress {
  romaji: string;
  type: "hiragana" | "katakana" | "hangeul";
  mastered: boolean;
  seenCount: number;
  correctCount: number;
  lastSeen: string | null;
  lastCorrect: string | null;
}

export interface VocabProgress {
  wordId: string;
  mastered: boolean;
  seenCount: number;
  correctCount: number;
}

// ── SRS Leitner box ──────────────────────────────────────────────────────────
export interface SrsEntry {
  box: number; // 0 = new, 1-4 = Leitner boxes
  nextReview: string; // ISO date when due
  lastReviewed: string | null;
  correctStreak: number;
  wrongCount: number;
}

const LEITNER_INTERVALS = [1, 3, 7, 30, 90]; // days per box (box 0→1d, 1→3d, 2→7d, 3→30d, 4→90d)

function computeNextReview(box: number): string {
  const d = new Date();
  d.setDate(d.getDate() + (LEITNER_INTERVALS[box] ?? 1));
  return d.toISOString().split("T")[0];
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export interface UserProgress {
  hiraganaLearned: number;
  katakanaLearned: number;
  totalXp: number;
  streak: number;
  lastPracticeDate: string | null;
  kanaProgress: Record<string, KanaProgress>;
  vocabProgress: Record<string, VocabProgress>;
  grammarCompleted: string[];
  phrasesLearned: string[];
  completedLessons: number;
  // Spaced repetition state — unified for kana, vocab, phrases
  srs: Record<string, SrsEntry>;
}

function makeDefaultProgress(): UserProgress {
  return {
    hiraganaLearned: 0,
    katakanaLearned: 0,
    totalXp: 0,
    streak: 0,
    lastPracticeDate: null,
    kanaProgress: {},
    vocabProgress: {},
    grammarCompleted: [],
    phrasesLearned: [],
    completedLessons: 0,
    srs: {},
  };
}

// ── Data sanitization ────────────────────────────────────────────────────────
const toNumber = (v: unknown): number =>
  typeof v === "number" && Number.isFinite(v) ? v : 0;

const toStringOrNull = (v: unknown): string | null =>
  typeof v === "string" ? v : null;

function loadProgress(lang: string): UserProgress {
  const defaults = makeDefaultProgress();
  try {
    const raw = localStorage.getItem(getStorageKey(lang));
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<UserProgress>;

    const kanaProgress =
      parsed.kanaProgress && typeof parsed.kanaProgress === "object"
        ? (parsed.kanaProgress as Record<string, KanaProgress>)
        : {};
    const vocabProgress =
      parsed.vocabProgress && typeof parsed.vocabProgress === "object"
        ? (parsed.vocabProgress as Record<string, VocabProgress>)
        : {};
    const grammarCompleted = Array.isArray(parsed.grammarCompleted)
      ? parsed.grammarCompleted.filter((x): x is string => typeof x === "string")
      : [];
    const phrasesLearned = Array.isArray(parsed.phrasesLearned)
      ? parsed.phrasesLearned.filter((x): x is string => typeof x === "string")
      : [];
    const srs =
      parsed.srs && typeof parsed.srs === "object"
        ? (parsed.srs as Record<string, SrsEntry>)
        : {};

    return {
      ...defaults,
      ...parsed,
      hiraganaLearned: toNumber(parsed.hiraganaLearned),
      katakanaLearned: toNumber(parsed.katakanaLearned),
      totalXp: toNumber(parsed.totalXp),
      streak: toNumber(parsed.streak),
      completedLessons: toNumber(parsed.completedLessons),
      lastPracticeDate: toStringOrNull(parsed.lastPracticeDate),
      kanaProgress,
      vocabProgress,
      grammarCompleted,
      phrasesLearned,
      srs,
    };
  } catch {
    return defaults;
  }
}

function saveProgress(lang: string, progress: UserProgress): void {
  localStorage.setItem(getStorageKey(lang), JSON.stringify(progress));
}

// ── SRS helpers ──────────────────────────────────────────────────────────────

function getKanaKey(kana: Kana): string {
  return `${kana.type}-${kana.romaji}`;
}

function srsKey(kind: string, id: string): string {
  return `${kind}:${id}`;
}

function promoteBox(box: number): number {
  return Math.min(box + 1, 4);
}

function demoteBox(box: number): number {
  return Math.max(box - 1, 0);
}

export function useProgress() {
  const { language } = useLanguage();
  const langKey = language;

  const [progress, setProgress] = useState<UserProgress>(() => loadProgress(langKey));

  // Reload progress when language changes
  useEffect(() => {
    setProgress(loadProgress(langKey));
  }, [langKey]);

  useEffect(() => {
    saveProgress(langKey, progress);
  }, [progress, langKey]);

  // ── Streak ─────────────────────────────────────────────────────────────────
  const updateStreak = useCallback(() => {
    setProgress((prev) => {
      const today = todayStr();
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];
      if (prev.lastPracticeDate === today) return prev;
      return {
        ...prev,
        streak:
          prev.lastPracticeDate === yesterday ? prev.streak + 1 : 1,
        lastPracticeDate: today,
      };
    });
  }, []);

  // ── SRS recording ──────────────────────────────────────────────────────────
  const recordSrs = useCallback(
    (kind: string, id: string, correct: boolean) => {
      setProgress((prev) => {
        const key = srsKey(kind, id);
        const existing = prev.srs[key];
        const box = existing ? existing.box : 0;
        const newBox = correct ? promoteBox(box) : demoteBox(box);
        const updated: SrsEntry = {
          box: newBox,
          nextReview: computeNextReview(newBox),
          lastReviewed: todayStr(),
          correctStreak: correct
            ? (existing?.correctStreak ?? 0) + 1
            : 0,
          wrongCount: correct
            ? (existing?.wrongCount ?? 0)
            : (existing?.wrongCount ?? 0) + 1,
        };
        return {
          ...prev,
          srs: { ...prev.srs, [key]: updated },
          totalXp: prev.totalXp + (correct ? 10 : 0),
        };
      });
      // Don't nest setProgress — the updater handles XP. For marking
      // also update the legacy progress counters:
      setProgress((prev) => {
        // Recompute hiragana/katakana mastery counts from SRS box >= 3
        let hira = 0;
        let kata = 0;
        for (const [k, s] of Object.entries(prev.srs)) {
          if (s.box >= 3 && k.startsWith("kana:")) {
            if (k.includes(":hiragana:")) hira++;
            else if (k.includes(":katakana:")) kata++;
          }
        }
        return { ...prev, hiraganaLearned: hira, katakanaLearned: kata };
      });
    },
    []
  );

  // ── Kana tracking (kept for backward compat, supplemented by SRS) ──────────
  const markSeen = useCallback((kana: Kana) => {
    setProgress((prev) => {
      const key = getKanaKey(kana);
      const existing = prev.kanaProgress[key];
      const updated: KanaProgress = existing
        ? { ...existing, seenCount: existing.seenCount + 1, lastSeen: new Date().toISOString() }
        : {
            romaji: kana.romaji,
            type: kana.type,
            mastered: false,
            seenCount: 1,
            correctCount: 0,
            lastSeen: new Date().toISOString(),
            lastCorrect: null,
          };
      return {
        ...prev,
        kanaProgress: { ...prev.kanaProgress, [key]: updated },
      };
    });
  }, []);

  const markKanaCorrect = useCallback((kana: Kana) => {
    // Update SRS first
    recordSrs("kana", getKanaKey(kana), true);
    // Legacy mastery tracking
    setProgress((prev) => {
      const key = getKanaKey(kana);
      const existing = prev.kanaProgress[key] || {
        romaji: kana.romaji,
        type: kana.type,
        mastered: false,
        seenCount: 0,
        correctCount: 0,
        lastSeen: null,
        lastCorrect: null,
      };
      const newCorrectCount = existing.correctCount + 1;
      return {
        ...prev,
        kanaProgress: {
          ...prev.kanaProgress,
          [key]: {
            ...existing,
            correctCount: newCorrectCount,
            mastered: newCorrectCount >= 3,
            lastCorrect: new Date().toISOString(),
          },
        },
        totalXp: prev.totalXp + 10,
      };
    });
  }, [recordSrs]);

  const markKanaWrong = useCallback((kana: Kana) => {
    recordSrs("kana", getKanaKey(kana), false);
    setProgress((prev) => {
      const key = getKanaKey(kana);
      const existing = prev.kanaProgress[key];
      if (!existing) return prev;
      return {
        ...prev,
        kanaProgress: {
          ...prev.kanaProgress,
          [key]: { ...existing, lastSeen: new Date().toISOString() },
        },
      };
    });
  }, [recordSrs]);

  // ── Vocabulary tracking ────────────────────────────────────────────────────
  const markVocabResult = useCallback(
    (word: VocabWord, correct: boolean) => {
      recordSrs("vocab", word.id, correct);
      setProgress((prev) => {
        const existing = prev.vocabProgress[word.id] || {
          wordId: word.id,
          mastered: false,
          seenCount: 0,
          correctCount: 0,
        };
        return {
          ...prev,
          vocabProgress: {
            ...prev.vocabProgress,
            [word.id]: {
              ...existing,
              seenCount: existing.seenCount + 1,
              correctCount: correct ? existing.correctCount + 1 : existing.correctCount,
              mastered: correct ? existing.correctCount + 1 >= 3 : false,
            },
          },
          totalXp: prev.totalXp + (correct ? 10 : 0),
        };
      });
    },
    [recordSrs]
  );

  // ── Phrase tracking ─────────────────────────────────────────────────────────
  const markPhraseLearned = useCallback((phrase: TravelPhrase) => {
    setProgress((prev) => {
      if (prev.phrasesLearned.includes(phrase.id)) return prev;
      return {
        ...prev,
        phrasesLearned: [...prev.phrasesLearned, phrase.id],
        totalXp: prev.totalXp + 5,
      };
    });
  }, []);

  const markPhraseCorrect = useCallback((phrase: TravelPhrase) => {
    recordSrs("phrase", phrase.id, true);
    setProgress((prev) => {
      if (prev.phrasesLearned.includes(phrase.id)) return prev;
      return {
        ...prev,
        phrasesLearned: [...prev.phrasesLearned, phrase.id],
        totalXp: prev.totalXp + 10,
      };
    });
  }, [recordSrs]);

  // ── Grammar tracking ────────────────────────────────────────────────────────
  const completeGrammarLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.grammarCompleted.includes(lessonId)) return prev;
      return {
        ...prev,
        grammarCompleted: [...prev.grammarCompleted, lessonId],
        totalXp: prev.totalXp + 20,
      };
    });
    updateStreak();
  }, [updateStreak]);

  // ── Selectors ───────────────────────────────────────────────────────────────
  const isKanaMastered = useCallback(
    (kana: Kana): boolean => {
      const key = getKanaKey(kana);
      return progress.kanaProgress[key]?.mastered || false;
    },
    [progress.kanaProgress]
  );

  const isVocabMastered = useCallback(
    (wordId: string): boolean => {
      return progress.vocabProgress[wordId]?.mastered || false;
    },
    [progress.vocabProgress]
  );

  const isPhraseLearned = useCallback(
    (phraseId: string): boolean => {
      return progress.phrasesLearned.includes(phraseId);
    },
    [progress.phrasesLearned]
  );

  const isGrammarCompleted = useCallback(
    (lessonId: string): boolean => {
      return progress.grammarCompleted.includes(lessonId);
    },
    [progress.grammarCompleted]
  );

  // ── SRS-aware selection (Leitner priority) ────────────────────────────────

  const getNextToLearn = useCallback(
    (kanaList: Kana[], count = 5): Kana[] => {
      const today = todayStr();
      const items = kanaList.map((item) => {
        const s = progress.srs[srsKey("kana", getKanaKey(item))];
        return { item, srs: s ?? null };
      });
      items.sort((a, b) => {
        const ad = a.srs ? a.srs.nextReview <= today : true;
        const bd = b.srs ? b.srs.nextReview <= today : true;
        if (ad !== bd) return ad ? -1 : 1;
        return (a.srs?.box ?? 0) - (b.srs?.box ?? 0);
      });
      return items.slice(0, count).map((x) => x.item);
    },
    [progress.srs]
  );

  const getNextVocabToLearn = useCallback(
    (wordPool: VocabWord[], count = 8): VocabWord[] => {
      const today = todayStr();
      const items = wordPool.map((w) => {
        const s = progress.srs[srsKey("vocab", w.id)];
        return { item: w, srs: s ?? null };
      });
      items.sort((a, b) => {
        const ad = a.srs ? a.srs.nextReview <= today : true;
        const bd = b.srs ? b.srs.nextReview <= today : true;
        if (ad !== bd) return ad ? -1 : 1;
        return (a.srs?.box ?? 0) - (b.srs?.box ?? 0);
      });
      return items.slice(0, count).map((x) => x.item);
    },
    [progress.srs]
  );

  const getNextPhrasesToLearn = useCallback(
    (phrasePool: TravelPhrase[], count = 4): TravelPhrase[] => {
      const today = todayStr();
      const items = phrasePool.map((p) => {
        const s = progress.srs[srsKey("phrase", p.id)];
        return { item: p, srs: s ?? null };
      });
      items.sort((a, b) => {
        const ad = a.srs ? a.srs.nextReview <= today : true;
        const bd = b.srs ? b.srs.nextReview <= today : true;
        if (ad !== bd) return ad ? -1 : 1;
        return (a.srs?.box ?? 0) - (b.srs?.box ?? 0);
      });
      return items.slice(0, count).map((x) => x.item);
    },
    [progress.srs]
  );

  const completeLesson = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons + 1,
      totalXp: prev.totalXp + 25,
    }));
    updateStreak();
  }, [updateStreak]);

  const resetProgress = useCallback(() => {
    const fresh = makeDefaultProgress();
    setProgress(fresh);
    saveProgress(langKey, fresh);
  }, [langKey]);

  return {
    progress,
    markSeen,
    markKanaCorrect,
    markKanaWrong,
    markVocabResult,
    markPhraseLearned,
    markPhraseCorrect,
    completeGrammarLesson,
    getNextToLearn,
    getNextVocabToLearn,
    getNextPhrasesToLearn,
    isKanaMastered,
    isVocabMastered,
    isPhraseLearned,
    isGrammarCompleted,
    completeLesson,
    updateStreak,
    resetProgress,
  };
}
