import type { Kana } from "@/data/japanese";
import { hiragana, katakana } from "@/data/japanese";
import type { VocabWord } from "@/data/vocabulary";
import { allVocabWords } from "@/data/vocabulary";
import type { TravelPhrase } from "@/data/phrases";
import { allPhrases } from "@/data/phrases";

export interface QuizQuestion {
  prompt: string;
  promptLabel: string; // instruction shown above the prompt
  answer: string;
  options: string[];
  kind: "kana" | "vocab" | "phrase";
  ref: Kana | VocabWord | TravelPhrase;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct: string, pool: string[], count = 3): string[] {
  const unique = [...new Set(pool.filter((v) => v !== correct))];
  return shuffle(unique).slice(0, count);
}

function makeOptions(correct: string, pool: string[]): string[] {
  return shuffle([correct, ...pickDistractors(correct, pool)]);
}

// ── Kana questions ────────────────────────────────────────────────────────────
export function buildKanaQuestions(
  kanaList: Kana[],
  count: number,
  includeReverse: boolean = true
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const list = shuffle(kanaList);

  for (const k of list) {
    if (questions.length >= count) break;
    const forward: QuizQuestion = {
      prompt: k.character,
      promptLabel: "Quelle est la lecture de ce caractère ?",
      answer: k.romaji,
      options: makeOptions(k.romaji, list.map((x) => x.romaji)),
      kind: "kana",
      ref: k,
    };
    questions.push(forward);

    if (includeReverse && questions.length < count) {
      const reverse: QuizQuestion = {
        prompt: k.romaji,
        promptLabel: "Quel caractère correspond à cette lecture ?",
        answer: k.character,
        options: makeOptions(k.character, list.map((x) => x.character)),
        kind: "kana",
        ref: k,
      };
      questions.push(reverse);
    }
  }
  return shuffle(questions).slice(0, count);
}

// ── Vocabulary questions ──────────────────────────────────────────────────────
export function buildVocabQuestions(
  words: VocabWord[],
  count: number,
  includeReverse: boolean = true
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const list = shuffle(words);
  const frenchPool = allVocabWords.map((w) => w.french);
  const japanesePool = allVocabWords.map((w) => w.japanese);

  for (const w of list) {
    if (questions.length >= count) break;
    const forward: QuizQuestion = {
      prompt: w.japanese,
      promptLabel: "Quel est le sens de ce mot ?",
      answer: w.french,
      options: makeOptions(w.french, frenchPool),
      kind: "vocab",
      ref: w,
    };
    questions.push(forward);

    if (includeReverse && questions.length < count) {
      const reverse: QuizQuestion = {
        prompt: w.french,
        promptLabel: "Comment dit-on ce mot en japonais ?",
        answer: w.japanese,
        options: makeOptions(w.japanese, japanesePool),
        kind: "vocab",
        ref: w,
      };
      questions.push(reverse);
    }
  }
  return shuffle(questions).slice(0, count);
}

// ── Phrase questions ──────────────────────────────────────────────────────────
export function buildPhraseQuestions(
  phrases: TravelPhrase[],
  count: number
): QuizQuestion[] {
  const list = shuffle(phrases);
  const frenchPool = allPhrases.map((p) => p.french);

  return list.slice(0, count).map((p) => ({
    prompt: p.japanese,
    promptLabel: "Que signifie cette phrase ?",
    answer: p.french,
    options: makeOptions(p.french, frenchPool),
    kind: "phrase",
    ref: p,
  }));
}

// ── Daily mixed lesson ────────────────────────────────────────────────────────
export interface DailyLessonInput {
  kanaToLearn: Kana[];
  vocabToLearn: VocabWord[];
  phrasesToLearn: TravelPhrase[];
}

export function buildLessonQuestions(input: DailyLessonInput): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Kana: up to 6 questions (3 chars, both directions)
  questions.push(...buildKanaQuestions(input.kanaToLearn.slice(0, 3), 6, true));
  // Vocabulary: up to 4 questions (2 words, both directions)
  questions.push(...buildVocabQuestions(input.vocabToLearn.slice(0, 2), 4, true));
  // Phrases: 2 questions
  questions.push(...buildPhraseQuestions(input.phrasesToLearn.slice(0, 2), 2));

  return shuffle(questions);
}

// ── Rebuild a session from a previous one (for "Refaire") ────────────────────
// Rebuilds from the same item refs but with fresh, well-mixed options.
export function rebuildSession(questions: QuizQuestion[]): QuizQuestion[] {
  const kanaRefs = questions
    .filter((q) => q.kind === "kana")
    .map((q) => q.ref as Kana);
  const vocabRefs = questions
    .filter((q) => q.kind === "vocab")
    .map((q) => q.ref as VocabWord);
  const phraseRefs = questions
    .filter((q) => q.kind === "phrase")
    .map((q) => q.ref as TravelPhrase);

  const rebuilt: QuizQuestion[] = [];
  rebuilt.push(...buildKanaQuestions(kanaRefs, kanaRefs.length * 2, true));
  rebuilt.push(...buildVocabQuestions(vocabRefs, vocabRefs.length * 2, true));
  rebuilt.push(...buildPhraseQuestions(phraseRefs, phraseRefs.length));
  return rebuilt;
}

// ── Failed-item discriminator for review rounds ──────────────────────────────
export interface FailedItem {
  kind: "kana" | "vocab" | "phrase";
  ref: Kana | VocabWord | TravelPhrase;
}

/** Build questions for a review round from previously-failed items. */
export function buildReviewQuestions(failed: FailedItem[]): QuizQuestion[] {
  const kanaRefs = failed
    .filter((f) => f.kind === "kana")
    .map((f) => f.ref as Kana);
  const vocabRefs = failed
    .filter((f) => f.kind === "vocab")
    .map((f) => f.ref as VocabWord);
  const phraseRefs = failed
    .filter((f) => f.kind === "phrase")
    .map((f) => f.ref as TravelPhrase);

  return [
    ...buildKanaQuestions(kanaRefs, kanaRefs.length * 2, true),
    ...buildVocabQuestions(vocabRefs, vocabRefs.length * 2, true),
    ...buildPhraseQuestions(phraseRefs, phraseRefs.length),
  ];
}

// Helper to get the right kana list for a type
export function getKanaList(type: "hiragana" | "katakana"): Kana[] {
  return type === "hiragana" ? hiragana : katakana;
}
