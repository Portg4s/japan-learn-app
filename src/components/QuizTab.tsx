import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, RotateCcw, X, Zap, BarChart3, GraduationCap, BookOpen, Speech } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ManekiNeko from "@/components/ManekiNeko";
import SakuraPetals, { SakuraBurst } from "@/components/SakuraPetals";
import { useLanguage } from "@/contexts/language";
import { useProgress } from "@/hooks/use-progress";
import { speak } from "@/lib/speech";
import { playCorrect, playWrong, playClick, playComplete } from "@/lib/sounds";
import {
  buildKanaQuestions,
  buildVocabQuestions,
  buildPhraseQuestions,
  buildReviewQuestions,
  rebuildSession,
  getKanaList,
  type QuizQuestion,
  type FailedItem,
} from "@/lib/quiz-engine";
import type { Kana } from "@/data/japanese";
import { hangeul } from "@/data/korean";
import type { VocabWord } from "@/data/vocabulary";
import { allVocabWords } from "@/data/vocabulary";
import { allKoreanVocabWords } from "@/data/korean";
import type { TravelPhrase } from "@/data/phrases";
import { allPhrases } from "@/data/phrases";
import { allKoreanPhrases } from "@/data/korean";

export interface QuizSession {
  title: string;
  questions: QuizQuestion[];
}

type QuizMode = "kana" | "vocab" | "phrases";
type KanaType = "hiragana" | "katakana" | "hangeul";
type Direction = "forward" | "reverse" | "both";

interface QuizTabProps {
  session: QuizSession | null;
  onSessionChange: (session: QuizSession | null) => void;
  onGoToLearn: () => void;
}

interface ActiveState {
  index: number;
  score: number;
  answered: boolean;
  selected: string | null;
  correct: string | null;
  finished: boolean;
}

const initialActive: ActiveState = {
  index: 0,
  score: 0,
  answered: false,
  selected: null,
  correct: null,
  finished: false,
};

export default function QuizTab({ session, onSessionChange, onGoToLearn }: QuizTabProps) {
  const { language } = useLanguage();
  const isKorean = language === "korean";

  const {
    progress,
    markKanaCorrect,
    markKanaWrong,
    markSeen,
    markVocabResult,
    markPhraseCorrect,
    completeLesson,
    getNextToLearn,
    getNextVocabToLearn,
    getNextPhrasesToLearn,
  } = useProgress();

  const activeVocabAll = isKorean ? allKoreanVocabWords : allVocabWords;
  const activePhrasesAll = isKorean ? allKoreanPhrases : allPhrases;

  const [mode, setMode] = useState<QuizMode>("kana");
  const [kanaType, setKanaType] = useState<KanaType>("hiragana");
  const [direction, setDirection] = useState<Direction>("both");
  const [count, setCount] = useState(10);
  // Sync kana type to language
  useEffect(() => {
    if (isKorean && kanaType !== "hangeul") setKanaType("hangeul");
    else if (!isKorean && kanaType === "hangeul") setKanaType("hiragana");
  }, [isKorean, kanaType]);
  // NOTE: quiz state is reset by remounting this component via the `key`
  // prop from Landing whenever a new session is launched.
  const [active, setActive] = useState<ActiveState>(initialActive);

  // ── Adaptive retry: store items answered wrong for a review round ──────────
  const [failedItems, setFailedItems] = useState<FailedItem[]>([]);
  const [needReviewRound, setNeedReviewRound] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState<QuizQuestion[] | null>(
    null
  );

  const questions = reviewQuestions ?? session?.questions ?? [];
  const totalQuestions = questions.length;
  const isReviewRound = reviewQuestions !== null;

  const current: QuizQuestion | null = questions[active.index] ?? null;

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!current || active.answered) return;
      const isCorrect = answer === current.answer;

      if (isCorrect) playCorrect();
      else playWrong();

      // Record progress by question kind
      if (current.kind === "kana") {
        const k = current.ref as Kana;
        if (isCorrect) markKanaCorrect(k);
        else markKanaWrong(k);
        markSeen(k);
      } else if (current.kind === "vocab") {
        markVocabResult(current.ref as VocabWord, isCorrect);
      } else {
        markPhraseCorrect(current.ref as TravelPhrase);
      }

      // Track failed items for adaptive review round (only in main round)
      if (!isCorrect && !isReviewRound) {
        setFailedItems((prev) => {
          // avoid duplicates
          if (prev.some((f) => f.kind === current.kind && f.ref === current.ref))
            return prev;
          return [...prev, { kind: current.kind, ref: current.ref }];
        });
      }

      setActive((prev) => ({
        ...prev,
        answered: true,
        selected: answer,
        correct: current.answer,
        score: prev.score + (isCorrect ? 1 : 0),
      }));
    },
    [current, active.answered, markKanaCorrect, markKanaWrong, markSeen, markVocabResult, markPhraseCorrect, isReviewRound]
  );

  const nextQuestion = useCallback(() => {
    const nextIndex = active.index + 1;
    if (nextIndex >= totalQuestions) {
      // Main round finished → check if we need a review round
      if (!isReviewRound && failedItems.length > 0 && !needReviewRound) {
        setNeedReviewRound(true);
        setReviewQuestions(buildReviewQuestions(failedItems));
        setActive((prev) => ({
          ...initialActive,
          score: prev.score, // carry score
        }));
      } else {
        playComplete();
        completeLesson();
        setActive((prev) => ({ ...prev, finished: true }));
      }
    } else {
      setActive((prev) => ({
        ...prev,
        index: nextIndex,
        answered: false,
        selected: null,
        correct: null,
      }));
    }
  },    [active.index, totalQuestions, isReviewRound, failedItems, needReviewRound, completeLesson]);

  // ── Keyboard shortcuts (1-4 for choices) ────────────────────────────────
  useEffect(() => {
    if (!current || active.answered) return;
    const onKey = (e: KeyboardEvent) => {
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < current.options.length) {
        playClick();
        handleAnswer(current.options[idx]);
      }
      if (e.key === "Enter" && active.answered) {
        nextQuestion();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, active.answered, handleAnswer, nextQuestion]);

  const launchSession = useCallback(
    (title: string, qs: QuizQuestion[]) => {
      onSessionChange({ title, questions: qs });
    },
    [onSessionChange]
  );

  const startConfigQuiz = useCallback(() => {
    let qs: QuizQuestion[] = [];
    let title = "";
    if (mode === "kana") {
      let list: Kana[];
      if (isKorean) {
        list = hangeul as Kana[];
        title = "Quiz Hangeul";
      } else {
        list = getKanaList(kanaType as "hiragana" | "katakana");
        title = kanaType === "hiragana" ? "Quiz Hiragana" : "Quiz Katakana";
      }
      const due = getNextToLearn(list, count * 2);
      qs = buildKanaQuestions(
        due.length >= count ? due : list,
        count,
        direction !== "forward"
      );
    } else if (mode === "vocab") {
      const due = getNextVocabToLearn(activeVocabAll, count * 2);
      title = "Quiz Vocabulaire";
      qs = buildVocabQuestions(due, count, direction !== "forward");
    } else {
      const due = getNextPhrasesToLearn(activePhrasesAll, count * 2);
      title = "Quiz Phrases";
      qs = buildPhraseQuestions(due, count);
    }
    launchSession(title, qs);
  }, [mode, kanaType, direction, count, isKorean, activeVocabAll, activePhrasesAll, launchSession, getNextToLearn, getNextVocabToLearn, getNextPhrasesToLearn]);

  const replay = useCallback(() => {
    if (!session) return;
    launchSession(session.title, rebuildSession(session.questions));
  }, [session, launchSession]);

  const exitQuiz = useCallback(() => {
    onSessionChange(null);
    setActive(initialActive);
  }, [onSessionChange]);

  const masteryCount = useMemo(
    () =>
      Object.values(progress.vocabProgress).filter((v) => v.mastered).length,
    [progress.vocabProgress]
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* ── Configuration screen (no active session) ── */}
      {!session && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground font-display">Quiz</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h3 className="font-semibold text-lg text-foreground">
              Configurer le quiz
            </h3>

            {/* Mode */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Contenu
              </p>
              <div className="flex bg-muted rounded-xl p-1 gap-1">
                {(
                  [
                    { value: "kana" as QuizMode, label: isKorean ? "Hangeul" : "Kana" },
                    { value: "vocab" as QuizMode, label: "Vocabulaire" },
                    { value: "phrases" as QuizMode, label: "Phrases" },
                  ]
                ).map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      mode === m.value
                        ? "bg-card text-foreground shadow-sm border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kana subtype */}
            {mode === "kana" && (
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  Type de kana
                </p>
                <div className="flex bg-muted rounded-xl p-1 gap-1">
                  {(isKorean ? ["hangeul"] as KanaType[] : ["hiragana", "katakana"] as KanaType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setKanaType(t)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        kanaType === t
                          ? "bg-card text-foreground shadow-sm border border-border"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t === "hiragana" ? "Hiragana" : t === "katakana" ? "Katakana" : "Hangeul"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Direction */}
            {(mode === "kana" || mode === "vocab") && (
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  Sens des questions
                </p>
                <div className="flex bg-muted rounded-xl p-1 gap-1">
                  {(
                    [
                      { value: "forward" as Direction, label: "かな → FR" },
                      { value: "reverse" as Direction, label: "FR → かな" },
                      { value: "both" as Direction, label: "Les deux" },
                    ]
                  ).map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDirection(d.value)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        direction === d.value
                          ? "bg-card text-foreground shadow-sm border border-border"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question count */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Nombre de questions : {count}
              </p>
              <div className="flex gap-2">
                {[5, 10, 15].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={`flex-1 py-2 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                      count === c
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startConfigQuiz}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Démarrer le quiz
            </button>
          </div>

          {/* Stats */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h4 className="font-semibold text-foreground mb-3">
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Mes statistiques
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {progress.totalXp}
                </p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {progress.completedLessons}
                </p>
                <p className="text-xs text-muted-foreground">Leçons</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {masteryCount}
                </p>
                <p className="text-xs text-muted-foreground">Mots maîtrisés</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Active quiz ── */}
      {session && !active.finished && current && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={exitQuiz}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Quitter
              </button>
              <span className="text-sm font-semibold text-foreground">
                {isReviewRound ? "🔁 Révision" : session.title}
              </span>
              <span className="text-sm text-muted-foreground">
                {active.index + 1}/{totalQuestions}
              </span>
            </div>
            <Progress
              value={((active.index + 1) / totalQuestions) * 100}
              className="h-2"
            />
          </div>

          {/* Question — vertical slide (Duolingo style) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-6 sm:p-8 text-center"
            >
            <p className="text-sm text-muted-foreground mb-4">
              {current.promptLabel}
            </p>

            <div className="relative w-40 h-40 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-3 border border-primary/10">
              <span className="text-4xl sm:text-5xl font-bold text-primary px-4 break-all">
                {current.prompt}
              </span>
              {current.kind === "kana" && (
                <button
                  onClick={() => speak(current.prompt, isKorean ? "ko-KR" : "ja-JP")}
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-opacity cursor-pointer"
                  aria-label="Écouter la prononciation"
                >
                  <Speech className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Choices */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              {current.options.map((choice, i) => {
                const isCorrectAnswer = choice === current.answer;
                const isSelectedWrong =
                  active.answered &&
                  active.selected === choice &&
                  !isCorrectAnswer;

                let cls =
                  "w-full py-4 rounded-xl text-base font-semibold border-2 transition-all cursor-pointer ";
                if (!active.answered) {
                  cls +=
                    "border-border hover:border-primary/40 bg-muted/30 hover:bg-muted/50 text-foreground hover:-translate-y-0.5 active:translate-y-0";
                } else if (isCorrectAnswer) {
                  cls += "border-green-500 bg-green-50 text-green-700 animate-pop dark:bg-green-950/30 dark:text-green-400";
                } else                  if (isSelectedWrong) {
                  cls += "border-red-400 bg-red-50 text-red-600 animate-shake dark:bg-red-950/30 dark:text-red-400";
                } else {
                  cls += "border-border bg-muted/20 text-muted-foreground";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(choice)}
                    disabled={active.answered}
                    className={cls}
                  >
                    {choice}
                    {active.answered && isCorrectAnswer && (
                      <Check className="w-4 h-4 inline ml-1" />
                    )}
                    {isSelectedWrong && (
                      <X className="w-4 h-4 inline ml-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {active.answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 max-w-sm mx-auto"
              >
                {active.selected === active.correct ? (
                  <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                    ✅ Bien joué !
                  </p>
                ) : (
                  <p className="text-red-500 font-medium mb-1">
                    ❌ La bonne réponse était :
                  </p>
                )}
                {active.selected !== active.correct && (
                  <p className="text-lg font-bold text-foreground mb-1">
                    {current.answer}
                  </p>
                )}
                <button
                  onClick={nextQuestion}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {active.index + 1 >= totalQuestions
                    ? "Voir les résultats"
                    : "Question suivante"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Results ── */}
      {session && active.finished && (() => {
        const ratio = active.score / questions.length;
        const catMood = ratio >= 0.8 ? "celebrate" : ratio >= 0.5 ? "happy" : "sad";
        const catLine =
          ratio === 1
            ? "にゃん！ かんぺき！ Parfait !"
            : ratio >= 0.8
              ? "にゃんにゃん！ Excellent travail !"
              : ratio >= 0.5
                ? "いいちょうし！ Bien joué, continue !"
                : "だいじょうぶ、つづけよう ! On continue ensemble !";

        return (
          <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 text-center overflow-hidden">
            {ratio >= 0.8 && <SakuraBurst count={18} />}
            <SakuraPetals count={6} className="opacity-70" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-28 h-28 mx-auto mb-3"
            >
              <ManekiNeko mood={catMood} className="w-full h-full" />
            </motion.div>

            <div className="speech-bubble speech-bubble-plain bg-primary/5 border border-primary/10 rounded-2xl px-4 py-2 text-sm font-semibold text-primary inline-block mb-4">
              {catLine}
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-1 font-display">
              {isReviewRound ? "Révision terminée !" : "Quiz terminé !"}
            </h3>
            <p className="text-muted-foreground mb-6">
              Tu as obtenu {active.score}/{totalQuestions} bonnes réponses
            </p>

            <Progress
              value={ratio * 100}
              className="h-3 max-w-xs mx-auto mb-2"
            />
            <p className="text-sm font-semibold text-foreground mb-6">
              {isReviewRound
                ? "✅ Tu as revu tes erreurs — la répétition, c'est la clé !"
                : ratio === 1
                  ? "🌟 Parfait ! Tout est juste !"
                  : ratio >= 0.8
                    ? "👏 Excellent travail !"
                    : ratio >= 0.5
                      ? "💪 Continue comme ça !"
                      : "📚 Continue à t'entraîner, tu progresses !"}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={replay}
                className="px-6 py-2.5 border border-border rounded-xl font-medium hover:bg-muted transition-colors cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Refaire
              </button>
              <button
                onClick={onGoToLearn}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Réviser
              </button>
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
}
