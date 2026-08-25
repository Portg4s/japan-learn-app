import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, GraduationCap, Lightbulb, Speech, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Hanko from "@/components/Hanko";
import { useLanguage } from "@/contexts/language";
import { useProgress } from "@/hooks/use-progress";
import { speak } from "@/lib/speech";
import { grammarLessons, type GrammarLesson } from "@/data/grammar";
import { koreanGrammarLessons } from "@/data/korean";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

interface QuizChoice {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

function buildComprehensionQuiz(lesson: GrammarLesson, allLessons: GrammarLesson[]): QuizChoice[] {
  const distractorPool = allLessons
    .filter((g) => g.id !== lesson.id)
    .flatMap((g) => g.examples.map((e) => e.french));

  return lesson.examples.map((ex) => {
    const others = [...new Set(distractorPool.filter((d) => d !== ex.french))];
    const picked = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    return {
      prompt: ex.japanese,
      options: [ex.french, ...picked].sort(() => Math.random() - 0.5),
      answer: ex.french,
      explanation: `${ex.romaji} → « ${ex.french} »`,
    };
  });
}

export default function GrammarTab() {
  const { language } = useLanguage();
  const isKorean = language === "korean";
  const { progress, isGrammarCompleted, completeGrammarLesson } = useProgress();

  const activeLessons = isKorean ? koreanGrammarLessons : grammarLessons;

  const [selected, setSelected] = useState<GrammarLesson | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizChoices, setQuizChoices] = useState<QuizChoice[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  const doneCount = progress.grammarCompleted.length;

  const openLesson = (lesson: GrammarLesson) => {
    setSelected(lesson);
    setQuizActive(false);
    setQuizDone(false);
  };

  const startQuiz = () => {
    if (!selected) return;
    setQuizChoices(buildComprehensionQuiz(selected, activeLessons));
    setQuizActive(true);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizSelected(null);
    setQuizDone(false);
  };

  const answerQuiz = (choice: string) => {
    if (quizAnswered) return;
    const correct = choice === quizChoices[quizIndex].answer;
    setQuizAnswered(true);
    setQuizSelected(choice);
    if (correct) setQuizScore((s) => s + 1);
  };

  const nextQuiz = () => {
    if (quizIndex + 1 >= quizChoices.length) {
      setQuizDone(true);
    } else {
      setQuizIndex((i) => i + 1);
      setQuizAnswered(false);
      setQuizSelected(null);
    }
  };

  // ── Detail view ─────────────────────────────────────────────────────────────
  if (selected) {
    const completed = isGrammarCompleted(selected.id);

    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={() => {
            setSelected(null);
            setQuizActive(false);
            setQuizDone(false);
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux leçons
        </button>

        {!quizActive && !quizDone && (
          <>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary">
                  {selected.level === "débutant" ? "🌱 Débutant" : "🔑 Essentiel"}
                </Badge>
                {completed && (
                  <Hanko label="了" className="w-8 h-8 text-sm" title="Leçon terminée" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {selected.title}
              </h2>
              <p className="text-muted-foreground mb-5">{selected.subtitle}</p>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {selected.explanation}
                </p>
              </div>

              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Exemples
              </h3>
              <div className="space-y-3">
                {selected.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-xl p-4 flex items-start gap-3"
                  >
                    <button
                      onClick={() => speak(ex.japanese, isKorean ? "ko-KR" : "ja-JP")}
                      className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                      aria-label="Écouter"
                    >
                      <Speech className="w-4 h-4 text-primary" />
                    </button>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-lg">
                        {ex.japanese}
                      </p>
                      <p className="text-sm text-primary/80">{ex.romaji}</p>
                      <p className="text-base text-foreground/80 font-medium">
                        {ex.french}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <span className="font-semibold">Astuce : </span>
                  {selected.tip}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  completeGrammarLesson(selected.id);
                  openLesson(selected);
                }}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Leçon terminée
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    J'ai compris
                  </>
                )}
              </button>
              <button
                onClick={startQuiz}
                className="flex-1 py-3 border border-primary/30 bg-primary/5 text-primary rounded-xl font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Quiz de compréhension
              </button>
            </div>
          </>
        )}

        {/* Comprehension quiz */}
        {quizActive && !quizDone && quizChoices.length > 0 && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Question {quizIndex + 1}/{quizChoices.length}
                </span>
                <span className="font-semibold text-foreground">
                  Score : {quizScore}
                </span>
              </div>
              <Progress
                value={((quizIndex + 1) / quizChoices.length) * 100}
                className="h-2"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Que signifie cette phrase ?
              </p>
              <div className="w-32 h-24 mx-auto bg-primary/5 rounded-xl flex items-center justify-center mb-6 border border-primary/10">
                <span className="text-2xl font-bold text-primary px-3">
                  {quizChoices[quizIndex].prompt}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                {quizChoices[quizIndex].options.map((opt, i) => {
                  const isCorrect = opt === quizChoices[quizIndex].answer;
                  const isWrongSel =
                    quizAnswered && quizSelected === opt && !isCorrect;
                  let cls =
                    "w-full py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ";
                  if (!quizAnswered)
                    cls +=
                      "border-border hover:border-primary/40 bg-muted/30 text-foreground";
                  else if (isCorrect) cls += "border-green-500 bg-green-50 text-green-700";
                  else if (isWrongSel) cls += "border-red-400 bg-red-50 text-red-600";
                  else cls += "border-border bg-muted/20 text-muted-foreground";
                  return (
                    <button
                      key={i}
                      onClick={() => answerQuiz(opt)}
                      disabled={quizAnswered}
                      className={cls}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {quizAnswered && (
                <div className="mt-5 max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground mb-3">
                    💡 {quizChoices[quizIndex].explanation}
                  </p>
                  <button
                    onClick={nextQuiz}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {quizIndex + 1 >= quizChoices.length
                      ? "Voir les résultats"
                      : "Question suivante"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quiz results */}
        {quizDone && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4"
            >
              <GraduationCap className="w-10 h-10 text-accent" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Quiz de compréhension terminé !
            </h3>
            <p className="text-muted-foreground mb-6">
              {quizScore}/{quizChoices.length} bonnes réponses
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSelected(null);
                  setQuizDone(false);
                  setQuizActive(false);
                }}
                className="px-6 py-2.5 border border-border rounded-xl font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                Retour aux leçons
              </button>
              <button
                onClick={startQuiz}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Refaire
              </button>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // ── Lesson list ─────────────────────────────────────────────────────────────
  return (
    <motion.div
      className="space-y-6"
      variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground font-display">Grammaire</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Leçons terminées</span>
            <span className="font-semibold text-foreground">
              {doneCount}/{activeLessons.length}
            </span>
          </div>            <Progress value={(doneCount / activeLessons.length) * 100} className="h-2.5" />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-3">
        {activeLessons.map((lesson, index) => {
          const completed = isGrammarCompleted(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => openLesson(lesson)}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors cursor-pointer text-left group"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors ${
                  completed
                    ? ""
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                }`}
              >
                {completed ? (
                  <Hanko label="了" className="w-10 h-10 text-base" title="Leçon terminée" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{lesson.title}</p>
                <p className="text-xs text-muted-foreground">
                  {lesson.subtitle}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {lesson.level === "débutant" ? "🌱" : "🔑"}
              </Badge>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
